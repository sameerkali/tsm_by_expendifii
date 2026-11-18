# Modern web audit: `src/`

**Date:** 2026-11-18
**Tool:** Google Chrome's `modern-web-guidance` skill (guide set `2026_11_10`, 209 guides)
**Scope:** all 182 source files in `src/` (about 25,000 lines). `node_modules`, `.next` and test files were not checked.

## How this was checked

1. `npx -y modern-web-guidance@latest legacy-scan src --json` ran the tool's automatic rules: 52 rules from 38 guides, about 20% of the catalog. It reported 7 matches. After checking each one against the tool's own keep/drop rules, they come down to 2 real issues (items 3 and 11) and 1 that needs no change (item 19).
2. The rest of `src/` was checked by hand against the guides that apply to this app: dialogs, drawers, forms, accordions, spinners, motion, dates, security and performance. Every item below names the guide it comes from. Items marked *(not in guides)* are worth fixing but are not covered by the guide set.

**Browser support policy used:** features that have worked in all major browsers for 2.5+ years ("Baseline Widely available") are used without fallbacks. Newer features ("Newly available") need a fallback, and each item says which applies.

## Fix status (2026-11-18)

Checked with `tsc`, `vitest` (29 tests pass), `eslint` (no new problems), a production `next build`, and browser checks against `next start`.

| # | Status | What was done |
| --- | --- | --- |
| 1 | Fixed | All 7 modals use a native `<dialog>` through `src/hooks/useModalDialog.ts`. Toasts were moved into the top layer (`src/components/shared/ToastLayer.tsx`) so they still show above open modals. While a modal is open, toasts can't be clicked and close on their own timer. |
| 2 | Fixed | The GR and customer panels are modal `<dialog>`s with the same slide animation (`.side-panel` in `globals.css`). The closed mobile sidebar is `invisible`. |
| 3 | Fixed | `color-scheme` is set on `:root` and `.dark` in `globals.css`, which covers all three theme toggles. |
| 4 | Fixed | Login, register and reset forms, plus `ui` `Input`/`Textarea`: `autocomplete`, labels, `aria-invalid` and `aria-describedby`. |
| 5 | Fixed | Font sizes are percentages, and "Default" sets nothing. `<meta name="text-scale">` was not added. |
| 6 | Fixed | `h-dvh` / `min-h-dvh`. |
| 7 | Fixed differently | Kept the `h3` + `button` accordion that the tests require. Collapsed answers get `hidden="until-found"`, and `beforematch` opens a find-in-page match. No `<details>`. |
| 8 | Fixed | Lenis is skipped when reduced motion is on, and ignores scrolling inside dialogs. |
| 9 | Fixed | `role="status"` with visible or screen-reader-only text. Spinners slow down under reduced motion. |
| 10 | Fixed | The banner has a persistent `role="status"` live region. It is still not mounted in `layout.tsx`. |
| 11 | Fixed | Standard `scrollbar-width` / `scrollbar-color`, with the `::-webkit-scrollbar` rules kept as a fallback. |
| 12 | Fixed differently | Esc, Tab-away and outside-click now close every dropdown (`src/hooks/useDismissOnOutside.ts`). They stay inline rather than using popovers, which would need CSS anchor positioning, not yet in all browsers. |
| 13 | Fixed | `file.arrayBuffer()`, `xlsx` loaded only when needed, upgraded to SheetJS 0.20.3 from `cdn.sheetjs.com`, and the drop zone is a `<label>`. |
| 14 | Partly | `'unsafe-eval'` is allowed only in development, and `object-src 'none'` was added. Nonce-based CSP was not done because it would make every page dynamically rendered. |
| 15 | Fixed | Copy waits for `writeText()` and shows an error if it fails. |
| 16 | Fixed | CSS scroll-driven animation, with the JS as the fallback. The homepage hero uses `overflow: clip` so the animation follows page scroll. |
| 17 | Fixed | The countdown is a 10s CSS animation that advances the slide on `animationend`. No autoplay under reduced motion. |
| 18 | Fixed | `formatRange()` in `en-IN`, and an explicit `en-IN` in the company profile. The printing-page timezone code was left as is. |
| 19 | No change | As recommended. |
| Optional | Partly | Google Analytics script set to `fetchpriority="low"`. The switch, anchor-positioning and `base-select` upgrades were not done. |

## Summary

| # | Issue | Priority | Guide |
| --- | --- | --- | --- |
| 1 | 7 modals built from `div`s instead of `<dialog>` | High | `dialog`, `prevent-page-scroll-under-modal-dialog` |
| 2 | Closed slide-in panels and mobile sidebar can still be reached with the keyboard | High | `dialog`, `navigation-drawer` |
| 3 | Dark mode never sets `color-scheme` | High | `dark-mode-toggle`, `dark-mode` |
| 4 | Login, register and reset forms have no `autocomplete`, and errors aren't linked to fields | High | `autofill-sign-in-form`, `autofill-sign-up-form`, `accessible-error-announcement` |
| 5 | Font size setting forces the root size in `px` | Medium | `respect-os-text-scale` |
| 6 | `h-screen` (100vh) on app shells cuts off content on mobile | Medium | `responsive-design` |
| 7 | Collapsed FAQ answers are invisible but still read aloud and found by Ctrl+F | Medium | `accordion`, `search-hidden-content` |
| 8 | Lenis smooth scroll ignores reduced-motion | Medium | `motion` |
| 9 | Loading spinners aren't announced to screen readers | Medium | `spinner` |
| 10 | Offline/online banner isn't announced | Medium | `persistent-toast-notifications` |
| 11 | Custom scrollbar only works in Chrome and Safari | Medium | `customize-scrollbar-color-and-thickness` |
| 12 | Dropdowns only close on mouse click outside them | Medium | `viewport-aware-dropdowns` |
| 13 | Spreadsheet import uses a deprecated API, an outdated `xlsx` package, and loads up front | Medium | *(mostly not in guides)* |
| 14 | Content Security Policy allows `unsafe-inline` and `unsafe-eval` scripts | Medium | `security` |
| 15 | Copy-to-clipboard shows success even when it fails | Low | `copy-button` |
| 16 | Screenshot scroll effect runs on a JS scroll listener | Low | `parallax-scroll-effects` |
| 17 | Dashboard carousel re-renders 10×/second for its progress bar | Low | `carousel`, `motion` |
| 18 | Date formatting is inconsistent, plus a timezone workaround | Low | `capture-location-agnostic-data` |
| 19 | `[...arr].sort()` → `toSorted()` | No change | `js` |

---

## High

### 1. Modals are `div` overlays, not `<dialog>`

No component uses `<dialog>`. Each modal rebuilds part of what the browser already provides, and most leave pieces out:

| Component | Accessible role | Esc closes | Keeps focus inside | Scroll lock |
| --- | --- | --- | --- | --- |
| `src/components/shared/Modal.tsx:75` (used by ActivationModal, CookiePolicyModal) | none | manual `keydown` | no | `body.style.overflow` |
| `src/components/ui/index.tsx:262` `Modal` (used by LogoutModal) | none | no | no | no |
| `src/components/shared/ConfirmDialog.tsx:35` | none | no | no | no |
| `src/components/auth/ActivationImageModal.tsx:68` | none | manual `keydown` | no | `body.style.overflow` |
| `src/components/auth/DeactivatedAccountModal.tsx:67` | `alertdialog` | manual `keydown` | no | no |
| `src/components/desktop/DesktopDownloadDialog.tsx:126` | `dialog` | manual `keydown` | manual focus trap | `body.style.overflow` |
| `src/app/(dashboard)/printing/page.tsx:50` PDF modal | none | no | no | no |

**Effect on users:** keyboard and screen-reader users can Tab out of an open modal into the page behind it. Most modals have no accessible role, so screen readers don't announce them as dialogs. Several have no Esc key. Each one also resets `body.style.overflow` on its own, so when two modals stack (e.g. ConfirmDialog over Modal), closing one unlocks scrolling for both.

**Fix (`dialog` guide, rule 1):** render a `<dialog>` and open it with `ref.current.showModal()`. The browser then handles making the page inert, keeping focus inside, the top layer (so the z-index values like `z-[100]`, `z-[101]` and `z-[200]` can go), `::backdrop`, Esc, and returning focus to the button that opened it. Remove the `role="dialog"`/`aria-modal` attributes, the `keydown` handlers, the focus trap and the `body.style.overflow` code. Name each dialog with `aria-labelledby`, and put `autofocus` on the first field (or on **Cancel** in destructive confirmations).

- Click-outside to close: `closedby="any"` works in Chrome 134+ and Firefox 141+ but not Safari. Keep a backdrop click handler as the fallback; the guide includes the feature check.
- Scroll lock (`prevent-page-scroll-under-modal-dialog`): don't set `overflow: hidden` on `html` or `body`. Use `dialog:modal { overscroll-behavior: contain }` and `dialog::backdrop { overflow: hidden; overscroll-behavior: contain }`.
- One shared `<Dialog>` component can replace all seven.

### 2. Closed slide-in panels and the mobile sidebar can still be reached with the keyboard

- `src/components/gr/GRFormPanel.tsx:762`
- `src/components/customers/CustomerFormPanel.tsx:426`
- `src/components/layout/Sidebar.tsx:39` (mobile)

These are always rendered and only moved off-screen with `translate-x-full`. When closed, every input in the GR form (dozens of fields) and every sidebar link can still be reached with Tab and is still read by screen readers. The two form panels also have no Esc handling.

**Fix:** the form panels block the page with a backdrop, so they are modal dialogs (`dialog` guide, rule 1). Build them on the same `<dialog>` + `showModal()` as item 1 and keep the slide animation. For the mobile sidebar (`navigation-drawer`), use a dialog or popover, or at minimum set the `inert` attribute while it is closed (works in all browsers since 2023).

### 3. Dark mode never sets `color-scheme` (found by `legacy-scan`)

- `src/components/landing/LandingThemeToggle.tsx:34`
- `src/providers/PreferencesProvider.tsx:52`
- `src/app/layout.tsx:96-100` (the script that applies the theme before first paint; same gap, not flagged by the scanner)

These toggle the `.dark` class, but nothing in the app sets `color-scheme` (no meta tag, CSS property or Next.js `viewport.colorScheme`). **Effect:** in dark mode, the parts the browser draws itself stay light: scrollbars, date pickers, checkboxes, `<select>` menus and autofill backgrounds.

**Fix:** keep `color-scheme` in step with `.dark`. For example, in CSS, `:root { color-scheme: light } :root.dark { color-scheme: dark }`. Or, in all three places, update `<meta name="color-scheme">` to `light`, `dark` or `light dark` for "system". `color-scheme` has worked in all browsers since 2022.

### 4. Sign-in forms: missing `autocomplete`, and errors not linked to fields

| Field | File | Should have |
| --- | --- | --- |
| Login email | `src/components/auth/LoginForm.tsx:57` | `autocomplete="username"`, `spellcheck="false"` |
| Login password | `src/components/auth/LoginForm.tsx:73` | `autocomplete="current-password"` |
| Register email | `src/components/auth/RegisterForm.tsx:557` | `autocomplete="username"`, `spellcheck="false"` |
| Register password | `src/components/auth/RegisterForm.tsx:590` | `autocomplete="new-password"` |
| Reset new password + confirm | `src/components/auth/ForgotPasswordForm.tsx:232`, `:267` | `autocomplete="new-password"` |

The `autofill-sign-in-form` guide marks `current-password` as mandatory. Without these, password managers often fail to fill or save credentials.

**Errors (`accessible-error-announcement`):** the auth forms and the shared `Input`/`Textarea` (`src/components/ui/index.tsx:26`, `:41`) show error text but never set `aria-invalid` or connect the message with `aria-describedby`. Screen readers therefore don't announce which field failed. Only `DesktopDownloadDialog` and `LicenceKeyRequestForm` do this correctly; copy their approach. The auth inputs also use only a placeholder and no `<label>`.

---

## Medium

### 5. The font-size setting forces the root size in `px`

- `src/providers/PreferencesProvider.tsx:59-61`
- `src/app/layout.tsx:100-102`

`document.documentElement.style.fontSize` is set to `14px`/`16px`/`18px`/`20px`, and the default "md" option also writes `16px`. That overrides the default font size set in the user's browser or OS for everyone, including people who never opened the setting. `respect-os-text-scale`: use relative sizes and don't override the root font size.

**Fix:** use percentages of the user's default (`87.5%`, `100%`, `112.5%`, `125%`), and set nothing for "md". Optionally add `<meta name="text-scale" content="scale">` to follow OS text scaling. Only do that once nothing overrides the root size.

### 6. `h-screen` (100vh) cuts off content on mobile

- `src/app/(auth)/layout.tsx:25` (`h-screen overflow-hidden`)
- `src/components/layout/DashboardLayout.tsx:107`, `:117` (`h-screen ... overflow-hidden`)

On phones, `100vh` is taller than the visible area while the address bar is showing. With `overflow-hidden`, the bottom of the page (the sidebar's bottom items, form buttons) sits under the browser toolbar and can't be scrolled into view. **Fix (`responsive-design`):** use `h-dvh` instead of `h-screen`. `min-h-screen` in `error.tsx`, `not-found.tsx`, `live-demo/page.tsx` and `forgot-password/page.tsx` is less serious, but `min-h-dvh` is better there too.

### 7. FAQ accordion: collapsed answers are invisible but still present

- `src/components/landing/FAQSection.tsx:105-120` (and the right column at about line 165)

Closed answers are hidden only with `grid-rows-[0fr] opacity-0`. Screen readers still read every answer, links inside a closed answer can still receive Tab focus, and Ctrl+F matches invisible text without opening it. The `onKeyDown` handler on lines 27-32 duplicates what a `<button>` already does.

**Fix (`accordion`, `search-hidden-content`):** use `<details name="faq"><summary>…</summary>…</details>`. `<details>` has worked in all browsers since 2020. `name` gives one-open-at-a-time behavior and has been Newly available since 2024. Ctrl+F then opens the matching answer automatically. Animate with `::details-content` + `interpolate-size` as an optional extra (Newly available since 2025); without it, the answers just open instantly.

### 8. Smooth scrolling ignores reduced-motion

- `src/components/landing/SmoothScroll.tsx:33-56`

Lenis takes over wheel scrolling on every marketing page, even when the user's OS has reduced motion turned on. The `motion` guide says to always respect that setting. **Fix:** return early when `matchMedia('(prefers-reduced-motion: reduce)').matches`.

### 9. Loading spinners aren't announced

- `src/components/ui/index.tsx:188` (`Spinner`)
- Full-page loading states: `src/app/(dashboard)/customers/CustomersClient.tsx:117`, `customers/[id]/page.tsx:78`, `demo/DemoClient.tsx:31`, `gr/page.tsx:266`, `printing/page.tsx:199`, `dashboard/DashboardClient.tsx:117`, `src/app/live-demo/page.tsx:24`, `src/components/layout/DashboardLayout.tsx:108`

Each is just a spinning icon with no text. **Fix (`spinner`):** wrap it in `role="status"` with visually hidden text such as "Loading customers…", and slow or stop the spin when reduced motion is on.

### 10. Offline/online banner isn't announced

- `src/components/NetworkStatusBanner.tsx:81`, `:95`, `:134`

Going offline or reconnecting changes the screen silently for screen-reader users. **Fix (`persistent-toast-notifications`):** add `role="status"` (or `aria-live="polite"`) to the banner container. Optionally render it as `popover="manual"` (Newly available since 2025) so it sits in the top layer and the `z-[9999]` can go.

### 11. Custom scrollbar only works in Chrome and Safari (found by `legacy-scan`)

- `src/app/globals.css:42-62` (`.custom-scrollbar`)

It uses only the non-standard `::-webkit-scrollbar` rules, so Firefox shows the default scrollbar. **Fix (`customize-scrollbar-color-and-thickness`):**

```css
.custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
.dark .custom-scrollbar { scrollbar-color: #334155 transparent; }
@supports not (scrollbar-color: auto) {
  /* move the existing ::-webkit-scrollbar rules in here */
}
```

`scrollbar-width` (2024) and `scrollbar-color` (2025) are Newly available; the webkit rules stay as the fallback.

### 12. Dropdowns only close on a mouse click outside

- `src/components/auth/RegisterForm.tsx:38-47` (city picker)
- `src/components/gr/GRFormPanel.tsx:367-378` and about line 738
- `src/components/customers/CustomerFormPanel.tsx` about line 150

Each listens for `mousedown` on the whole document. Pressing Esc or tabbing away leaves the list open. These lists can also be clipped inside the form panels, which use `overflow`. **Fix (`viewport-aware-dropdowns`):** render the list with `popover="auto"`. It gets click-outside and Esc closing plus the top layer automatically. Newly available since 2025; the guide covers the fallback.

### 13. Spreadsheet import *(mostly not in guides)*

- `src/app/(dashboard)/settings/components/ImportDataSection.tsx:8`, `:89-113`

- `FileReader.readAsBinaryString` is deprecated in the File API spec. Use `const buf = await file.arrayBuffer()` and `XLSX.read(buf, { type: 'array' })`, which also removes the `new Promise` + `onload` code.
- `import * as XLSX from 'xlsx'` puts the whole spreadsheet library in the Settings page bundle, even though it's only used after a file is picked. Load it on demand with `const XLSX = await import('xlsx')` inside the handler.
- `xlsx@0.18.5` is the last release published to npm. SheetJS now publishes only from its own CDN, and 0.18.5 has known security advisories (prototype pollution and ReDoS). That matters here because it parses files users upload. Install the current release from `cdn.sheetjs.com`.
- The drop zone is a `div` with `role="button"` and its own Enter/Space handling (line 202). A `<label>` wrapping the file `<input>` gets keyboard support for free.

### 14. Content Security Policy allows `unsafe-inline` and `unsafe-eval` scripts

- `next.config.ts:66` (`script-src 'self' 'unsafe-inline' 'unsafe-eval' …`)

These two keywords switch off most of the XSS protection the policy is meant to give. **Fix (`security`):** generate a nonce per request in middleware, pass it to Next.js, and move to `script-src 'nonce-…' 'strict-dynamic'`. Add `require-trusted-types-for 'script'` when ready. Roll it out as `Content-Security-Policy-Report-Only` first and check the reports before enforcing. `'unsafe-eval'` is normally needed only in `next dev`.

---

## Low

### 15. Copy-to-clipboard shows success even when it fails

- `src/app/(dashboard)/customers/[id]/page.tsx:68-73`
- `src/app/(dashboard)/settings/components/CompanyProfileSection.tsx:91`

`navigator.clipboard.writeText()` is never awaited, so "Copied" appears even if the browser blocks it. **Fix (`copy-button`):** `try { await navigator.clipboard.writeText(text); toast.success(…) } catch { toast.error(…) }`.

### 16. Screenshot scroll effect runs on a JS scroll listener

- `src/components/shared/ScrollImage.tsx:50-97`

The tilt-and-settle effect calculates a transform on every scroll and resize event. **Fix (`parallax-scroll-effects`):** a CSS scroll-driven animation (`animation-timeline: view()`) inside `@supports ((animation-timeline: view()) and (animation-range: entry))`, keeping the current JS as the fallback. This has only been Newly available since 2026-10-27, so the fallback is required. Reduced-motion is already handled.

### 17. Dashboard carousel re-renders 10 times a second

- `src/app/(dashboard)/dashboard/DashboardClient.tsx:98-106`

A 100 ms `setInterval` calls `setProgress` just to draw the progress bar, which means 10 React re-renders per second while the dashboard is open. **Fix:** draw the bar with a 10 s CSS animation, restart it on slide change via `key`, and advance on `animationend`. Per the `carousel` and `motion` guides, don't autoplay when reduced motion is on. The existing pause control is good; keep it.

### 18. Date formatting

- `src/app/(dashboard)/settings/components/SubscriptionSection.tsx:57-70`: builds a date range from 5 `toLocaleDateString('en-US', …)` calls, while the rest of the app uses `en-IN`. *(Not in guides)* Use `new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).formatRange(start, end)`.
- `src/app/(dashboard)/settings/components/CompanyProfileSection.tsx:222`: `toLocaleDateString()` with no locale, so it formats differently from everywhere else. Pass `'en-IN'`.
- `src/app/(dashboard)/printing/page.tsx:21-25`: gets today's date by subtracting `getTimezoneOffset()`. It works. The modern form (`capture-location-agnostic-data`) is `Temporal.Now.plainDateISO().toString()`, but Temporal is not yet in all browsers and the guide's fallback is a ~15 KB polyfill. Low value; leave it unless you adopt Temporal elsewhere.

### 19. `toSorted()`: no change needed (found by `legacy-scan`)

- `src/components/dashboard/AnalyticsDashboard.tsx:50`: `[...data.recentGRs].sort(…)`

The scanner's own rule says to drop this finding when the project targets JavaScript older than ES2023, and `tsconfig.json` targets ES2017. Next.js's default browser list also includes Firefox 111-114, which don't have `toSorted()`. The current code is correct.

---

## Optional upgrades (newer platform features, not problems)

- **Cookie toggles** (`CookieSettingsSection.tsx:60`): `role="switch"` on a `<button>` is already accessible. The `switch` guide's native `<input type="checkbox" switch>` would replace the custom markup.
- **Navbar hover pill** (`src/components/landing/Navbar.tsx:44-52`): positioned by measuring links in JS. `anchor-positioning-tab-underline` does this in CSS.
- **Branded `<select>`s** (`ui/index.tsx:64`, `GRFormPanel.tsx`, `Pagination.tsx`): `branded-select-styling` (`appearance: base-select`) can style the open list too. It isn't in all browsers yet, so use it only as an extra.
- **Google Analytics script** (`src/components/analytics/GoogleAnalytics.tsx:92`): `optimize-script-priority` says to mark non-essential scripts `fetchpriority="low"`.

## Checked and already fine

- Events already use `new Event()`/`new CustomEvent()`; no `document.createEvent`.
- `useNetworkStatus` already uses `AbortSignal.timeout()`.
- No `JSON.parse(JSON.stringify())` cloning, `execCommand('copy')`, `unload` handlers, or `hasOwnProperty` calls.
- `LiteYouTube` uses a click-to-load thumbnail and lazy-loads it.
- `JsonLd` escapes `<` in inline JSON.
- Reduced-motion is respected for the hero beams and the desktop download dialog.
- Marketing comparison tables use `<th scope>` correctly.
- `LiveDemoLink` uses `requestIdleCallback` with a `setTimeout` fallback.
