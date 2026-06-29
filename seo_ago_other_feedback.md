# TSM by Expendifii — SEO / AEO / GEO Fix Plan

Audit target: `tsm.expendifii.com`
Goal: Fix every flagged issue in priority order so the site ranks well in **classic SEO**, gets cited in **AI answers (AEO)**, and is well-understood by **generative engines (GEO)**.

Legend: 🔴 Critical · 🟠 High · 🟡 Medium · ✓ Already passing (don't touch)

---

## Phase 1 — Security Headers (🔴 Critical, do first, ~30 min)

These are server-level header issues — same fix location (your reverse proxy / Next.js config / Express middleware), so batch them together.

1. **Add `Content-Security-Policy` header** — mitigates XSS.
2. **Add `X-Content-Type-Options: nosniff` header**
3. **Add `X-Frame-Options: SAMEORIGIN`** (or `DENY`) — clickjacking protection.
4. **Add `Referrer-Policy: strict-origin-when-cross-origin`**
5. **Add `Permissions-Policy`** — restrict camera/mic/geolocation you don't use.

> Where: If on Vercel/Next.js, set these in `next.config.js` under `headers()`. If behind your own Express server, add via `helmet` middleware (`npm i helmet`, then `app.use(helmet())` covers most of these in one shot).

---

## Phase 2 — Crawlability & Indexing Fixes (🟠 High)

6. **Fix `sitemap.xml` — currently found but invalid XML.** Validate it (paste into an XML validator) — usually a missing closing tag, wrong namespace, or trailing comma if auto-generated. Re-deploy once it's valid.
7. **Reference the sitemap inside `robots.txt`** — add a line:
   ```
   Sitemap: https://tsm.expendifii.com/sitemap.xml
   ```
8. **Add `max-image-preview:large`** to your robots meta tag so Google Discover can use full-size image previews:
   ```html
   <meta name="robots" content="index, follow, max-image-preview:large">
   ```

---

## Phase 3 — Brand & Schema Consistency (🔴 Critical for AEO/GEO)

This is the single biggest lever for AI citation — AI engines need one consistent, well-described brand identity.

9. **Fix brand name inconsistency.** Pick ONE canonical name (recommend: "TSM by Expendifii") and use it identically in:
   - `<title>` tag
   - `og:site_name` (currently "Expendifii TMS" — mismatch flagged)
   - Organization schema `name` field
10. **Add an `Organization` JSON-LD schema** (you only have `SoftwareApplication` right now). Include `name`, `url`, `logo`, `founder`, `contactPoint`.
11. **Add `sameAs` links** inside that Organization schema — link to your LinkedIn, Twitter/X, GitHub, Crunchbase, etc. (whatever profiles exist). This is how AI engines verify/connect your brand to a real entity.
12. **Add `FAQPage` schema** (paired with the FAQ content you'll add in Phase 4).
13. **Add `Speakable` schema** — marks key paragraphs as voice-assistant readable.
14. **Add `SearchAction` schema** (sitelinks search box) if you have on-site search; otherwise low priority — skip.
15. **Add `BreadcrumbList` schema** for internal nav context.
16. **Add `author` schema with credentials** — right now you have an author byline but no schema/credentials backing it (E-E-A-T signal). Add a `Person` schema with `jobTitle`, `sameAs` (LinkedIn), and a short bio.
17. **Mention your brand name "Expendifii TMS" / "TSM by Expendifii" at least 3–5 times naturally in body copy** — currently 0 times in content body. AI engines use repetition for entity recognition.

---

## Phase 4 — Content Structure for AI Extraction (🟠 High, biggest AEO/GEO win)

AI answer engines (ChatGPT, Perplexity, Google AI Overviews) extract content based on structure, not just words. Add these content blocks:

18. **Add a real FAQ section** (5–8 Q&A pairs) covering things like "What is a Transport Management System?", "How does TSM by Expendifii help logistics companies?", "Is TSM suitable for small fleets?" — wrap each in `<h3>` question + short answer paragraph, and mirror it in the `FAQPage` schema from step 12.
19. **Add a "Key Takeaways" / TL;DR summary box** near the top of the page — 3–5 bullet points summarizing the page.
20. **Add a Table of Contents with jump links** if the page is long (you have 922 words / 5 sections — borderline, but worth it for AEO).
21. **Add numbered step-by-step content** (e.g., "How TSM Works in 4 Steps") using `<ol>` — currently you only use one list type; mix in ordered lists.
22. **Add at least one data table** — e.g., comparing plans, or comparing manual tracking vs. TSM features. AI loves tables for citation.
23. **Add a short "Comparison" callout** if not already prominent — you already have comparison content detected, just make sure it's structurally clear (table or definition list).
24. **Use `<dl>` (definition list)** for term/value pairs — e.g., glossary of logistics terms (POD, GRN, LR, e-way bill).
25. **Format key facts as `**Label:** value`** patterns throughout body copy — e.g., `**Pricing:** ₹X/month`, `**Setup time:** 24 hours`.
26. **Add a short conclusion/verdict section** at the end — "Why choose TSM" recap with a clear recommendation.
27. **Add `<details>/<summary>` expandable Q&A blocks** for secondary FAQs to keep the page lean while still being crawlable.

---

## Phase 5 — Trust & Authority Signals (🟡 Medium, supports E-E-A-T)

28. **Add source citations** — when you state a stat or claim (e.g., "70% of Indian transporters still use paper LRs"), link to the source study/report.
29. **Add a few outbound links to authoritative sources** — Schema.org, Google's own logistics/business data, an industry report. (Currently 0 external links — even 2–3 high-quality ones help.)
30. **Add `cite` attributes to your 3 blockquotes** — link each quote/testimonial to its source (LinkedIn post, review page, etc.).
31. **Add dates to content** — wrap any "last updated" or "published" date in `<time datetime="2026-06-25">June 25, 2026</time>` so AI knows the content is fresh.
32. **Add a `dateModified` field to your schema** and refresh it whenever you meaningfully edit the page (combats "content not updated in 90+ days" flag long-term).
33. **Add an "On the other hand…" balanced perspective paragraph** — e.g., acknowledge a limitation/use-case where TSM isn't the fit, then pivot back. Single-perspective content is dinged by GEO checkers.

---

## Phase 6 — Technical / Performance Cleanup (🟡 Medium)

34. **Move inline JS (72.5 KB) to external script files** and add `defer`/`async`.
35. **Fix the 1 render-blocking script in `<head>`** — add `defer` or move to end of `<body>`.
36. **Add `theme-color` meta tag**:
    ```html
    <meta name="theme-color" content="#0284c7">
    ```
    (use your sky-600 brand accent).
37. **Add a Web App Manifest** (`manifest.json`) — improves installability/PWA signals.
38. **Add `dns-prefetch` / `preconnect` hints** for any third-party domains you load fonts/scripts from.
39. **Improve text-to-HTML ratio (currently 4.1%)** — this will naturally improve as you add FAQ/TOC/tables content from Phase 4; no separate action needed beyond that.
40. **Break up the 1 paragraph exceeding 150 words** into shorter chunks (aim 20–80 words per paragraph — only 32% are currently in that range).

---

## Phase 7 — Nice-to-Have / Low Priority

41. Add an RSS/Atom feed link in `<head>` if you plan to publish blog content regularly.
42. Add IndexNow integration for instant Bing/Yandex re-indexing on updates.
43. Add `hreflang` tags only if/when you launch multi-language versions.
44. Add video content (e.g., a 60-second product demo embed) — boosts AEO multimedia signals.
45. Add at least one relevant image with descriptive `alt` text (currently zero images on page — also helps general SEO and social shares beyond your existing OG image).

---

## Suggested Order of Attack

| Week | Focus |
|---|---|
| 1 | Phase 1 (headers) + Phase 2 (sitemap/robots) — quick technical wins |
| 2 | Phase 3 (schema + brand consistency) — foundation for AI trust |
| 3 | Phase 4 (FAQ, tables, TL;DR, lists) — the content engine moves |
| 4 | Phase 5 (citations, dates, balance) — polish authority signals |
| 5 | Phase 6 + 7 — performance and extras |

Once Phases 1–4 are done, re-run the audit — most of the 🟠/🟡 AEO and GEO warnings should clear automatically since they're driven by the same handful of structural additions (FAQ schema, Organization schema, tables/lists, dates).