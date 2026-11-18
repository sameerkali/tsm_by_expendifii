# Video and case study kit

Two things the website needs that only real recordings and real customers can provide. The code is ready for both.

---

## 1. Product video: creating and printing a GR

**Goal:** one short, real video that shows a GR being created and printed. It appears on `/gr-software` and `/bilty-software` with `VideoObject` schema, which makes it eligible for video results in Google and gives BiltyOne a YouTube channel (a useful brand profile for `SOCIAL_PROFILES`).

**Length:** 60 to 120 seconds. **Format:** 1920x1080 screen recording plus a phone shot of the printer. **Voice:** Hindi or Hinglish, the way you'd explain it to a transporter.

### Shot list

| # | Shot | What to show | Seconds |
|---|---|---|---|
| 1 | Paper GR book (phone camera) | A carbon GR book being filled by hand | 5 |
| 2 | GR tab | The GR list, then click **New Receipt** | 8 |
| 3 | Pick consignor | Type a saved customer's name and select them: details and rate fill in | 15 |
| 4 | Goods and route | Consignee, from and to city, goods, weight or boxes; freight calculates as you type | 25 |
| 5 | Vehicle and documents | Vehicle number, driver, invoice and e-way bill numbers | 15 |
| 6 | Save | The GR number appears automatically | 5 |
| 7 | Print | Click print: the PDF with driver, consignor and consignee copies opens | 10 |
| 8 | Printer (phone camera) | The three copies coming out of a normal office printer | 8 |
| 9 | End card | "Free for early transporters · biltyone.com" | 5 |

Use a real-looking demo company, never a real customer's data.

### Script (Hinglish, adjust freely)

> Paper GR book mein ek bilty banane mein 15 minute lagte hain. BiltyOne mein dekhiye.
> GR tab kholiye, New Receipt. Customer ka naam likhiye: unka phone, GSTIN aur rate apne aap aa gaya.
> Kahan se kahan, kya maal, kitna weight. Freight khud calculate ho raha hai.
> Gaadi number, driver, invoice aur e-way bill number. Save. GR number apne aap.
> Print dabaiye: driver, consignor aur consignee, teeno copy ek PDF mein.
> Kisi bhi printer par. Do minute, poori bilty. BiltyOne, transporters ke liye free.

### Publishing

1. Upload to YouTube. Title: **How to create and print a GR (bilty) in 2 minutes | BiltyOne**. In the description, link `https://biltyone.com/lorry-receipt-software` and add chapters (0:00 New GR, 0:15 Customer, 0:40 Goods and freight, 1:05 Print).
2. Fill in `PRODUCT_VIDEO` in `src/config/video.ts` (YouTube ID, title, description, upload date, duration such as `PT1M45S`).
3. Add the channel URL to `SOCIAL_PROFILES` in `src/config/site.ts`.

---

## 2. Customer case studies

**Rule:** publish nothing without written consent, and every detail must be checkable. India's advertising code (ASCI guidelines on endorsements) requires disclosing any material connection. If the customer is family, a friend, an investor or got anything in return, say so on the page.

### Consent form (send on WhatsApp or email; keep the reply)

> I, [full name], [role] of [business name], [city], agree that BiltyOne may publish my name, business name, city, photo or logo, and the quotes and figures below on biltyone.com and BiltyOne's social media. I have read the final text. I can ask for it to be removed at any time by writing to BiltyOne.
>
> Relationship to BiltyOne's team (if any): [none / family / friend / other]
>
> Signed / confirmed on [date]

### Interview questions (15 minutes, in Hindi or English)

1. What does your business do? How many trucks, how many GRs a month, which routes?
2. How did you make GRs before BiltyOne? Paper book, Excel, other software?
3. What went wrong with that? A real example: a lost GR, a billing mistake, a dispute.
4. How long did one GR take before, and how long now? (Time it if you can.)
5. How long does month-end billing take now compared with before?
6. Which BiltyOne feature do you use most?
7. Who in your office uses it? Was it hard for them to learn?
8. What would you tell another transporter thinking about switching?
9. What should BiltyOne do better? (Keep this, it makes the story believable.)

### What to publish for each case study

- Business name, city, fleet size, the owner's name and photo (or the business logo)
- Before / after in numbers, only numbers the customer confirmed (minutes per GR, hours on billing)
- Two or three direct quotes in their own words (Hindi is fine; add a translation)
- The month and year it was recorded
- The relationship disclosure, if any

When you have the first two, I can build a `/case-studies` page with `Review` markup and link it from the homepage and `/why-biltyone`. Until then, testimonials without consent and verifiable details should not be added to the site.
