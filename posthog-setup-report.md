<wizard-report>
# PostHog post-wizard report

The wizard completed a full PostHog integration for TMS by Expendifii. PostHog is initialized via `instrumentation-client.ts` (Next.js 15.3+ recommended pattern), which replaces the previous `PostHogProvider` + `analytics.ts` init approach. A reverse proxy was added through Next.js rewrites so all tracking calls route through `/ingest/*` instead of hitting PostHog directly, improving ad-blocker resilience. A server-side client (`src/lib/posthog-server.ts`) was created using `posthog-node` for future server-side tracking. Thirteen events are now captured across the core user flows: auth, goods receipt management, customer management, settings, and guest mode.

| Event | Description | File |
|---|---|---|
| `user_signed_in` | Fired when a user successfully logs into their account. | `src/hooks/useAuth.ts` |
| `user_registered` | Fired when a new company account is successfully registered. | `src/hooks/useAuth.ts` |
| `account_activated` | Fired when a user activates their account with a coupon code. | `src/hooks/useAuth.ts` |
| `user_signed_out` | Fired when a user logs out of their account. | `src/hooks/useAuth.ts` |
| `company_profile_updated` | Fired when the user saves changes to their company profile in settings. | `src/hooks/useAuth.ts` |
| `gr_created` | Fired when a new Goods Receipt is successfully created. | `src/components/gr/GRFormPanel.tsx` |
| `gr_updated` | Fired when an existing Goods Receipt is successfully updated. | `src/components/gr/GRFormPanel.tsx` |
| `gr_deleted` | Fired when a Goods Receipt is deleted. | `src/app/(dashboard)/gr/page.tsx` |
| `gr_duplicated` | Fired when a Goods Receipt is duplicated to create a new one. | `src/app/(dashboard)/gr/page.tsx` |
| `gr_pdf_downloaded` | Fired when a user downloads the PDF for a Goods Receipt. | `src/app/(dashboard)/gr/page.tsx` |
| `customer_created` | Fired when a new customer is added to the registry. | `src/components/customers/CustomerFormPanel.tsx` |
| `customer_updated` | Fired when an existing customer record is updated. | `src/components/customers/CustomerFormPanel.tsx` |
| `guest_mode_entered` | Fired when a visitor starts a guest demo session. | `src/components/auth/LoginForm.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/486023/dashboard/1760975)
- [User Signups & Logins Over Time](https://us.posthog.com/project/486023/insights/mT7FLFXb)
- [Registration → Activation Funnel](https://us.posthog.com/project/486023/insights/rVhksKiV)
- [Goods Receipt Activity](https://us.posthog.com/project/486023/insights/TCH9Wpn6)
- [Feature Engagement](https://us.posthog.com/project/486023/insights/TuJbM0iw)
- [Guest vs Authenticated Sessions](https://us.posthog.com/project/486023/insights/NM5au2RV)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any CI/deployment scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — the current implementation only identifies on fresh login via `user_signed_in`; returning sessions restored from cookies/localStorage will be anonymous until the next login.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
