# Citrus Marriage Counseling

Christian marriage counseling, premarital counseling and faith-based counseling with
**Pastor Brandon Bankert**, a ministry of Bethel Baptist Church, Hernando, Florida.

Live: https://www.citrusmarriagecounseling.com · Church site: https://bethelbaptisthernando.org

Next.js 16 (App Router), Tailwind 4, self-hosted fonts (Newsreader + Figtree), deployed on Vercel from `main`.

## Where things live

| What | File |
| --- | --- |
| Prices, phone, address, Pastor Brandon's facts, navigation | `src/lib/site.ts` |
| The 11 area pages (every Citrus County community) | `src/lib/areas.ts` |
| Shared FAQ answers (also the FAQ structured data) | `src/lib/faqs.ts` |
| Structured data (practice, pastor, church, services) | `src/lib/schema.ts` |
| Consultation form delivery | `src/app/api/form/route.ts`, `src/config/chat.ts` |
| County map data (generated) | `src/lib/map-data.ts` |

## Rules this site keeps

- **Prices:** show the per-session price only. Premarital counseling is an 8-session package paid at the start, but the
  site never shows the package total; it says "eight sessions" and "$62.50 a session". Marriage counseling has no
  published price yet (`pricing.marriageSession` is `null`); the pages say the cost is explained at the free consultation.
- **Words:** "Christian counseling", "Christian counselor", "pastor". Never "therapy", "therapist", "licensed",
  "mental health counselor" or "marriage and family therapist". Florida's clergy exemption (s. 491.014(3)) covers
  counseling done under the church's oversight; the footer and FAQ say it is not licensed therapy.
- **Florida premarital course:** the site says couples who finish a *registered* course get the license discount and
  skip the three-day wait, and to "ask about the course certificate". Only say Pastor Brandon's course qualifies once he
  has filed the provider affidavit with the Citrus County Clerk (s. 741.0305(5)).
- **Addiction and depression** (`/christian-addiction-counseling`, `/christian-counseling-for-depression`): always
  "alongside a doctor / treatment program, not instead of it", with 911, 988 and (for addiction) the SAMHSA helpline
  on the page. Never promise to treat or cure, never tell anyone to stop a medication, never call it therapy.
- **Pictures:** no Bible (or other books) in the counseling illustrations (Eli's call). Props stay to mugs, flowers,
  a workbook.
- **Policies he discusses in person** (for example whom he will counsel alone) stay off the site.
- **Area pages** must each carry facts about that place (drive, roads, local notes). Pages that only swap the town name
  are treated as spam by search engines.
- **No demo tracking script.** Bethel is a paying client.
- **Colours (Eli's pick): black and lime.** `night*` is the black surfaces, `accent*` is lime for text and lines
  (`accent-deep` on cream, `accent-light` on black), `lime*` is the cord and the call-to-action buttons, which take
  dark text (white on lime is too faint). No gold.
- **Free consultation opens as a popup** (`src/components/ConsultPopup.tsx`). Links still point at `/free-consultation`,
  so the page keeps working for search engines and cmd-click.

## Forms and chat

The consultation form and the chat bubble use Bethel's Website Chat connection, so both land in Bethel's
`#bethelhernando` Slack channel on Pastor Brandon's phone. Spam defences are the same as Bethel's form (signed load-time
token, honeypots, field allowlist, rate limits, name/phone/email checks).

## Regenerating data

```bash
python3 scripts/routes.py      # geocode each community (Nominatim) + drive route to the church (OSRM) → routes.json
python3 scripts/mapgen.py <dir with citrus.geojson, water.geojson, routes.json> src/lib/map-data.ts
```

`citrus.geojson` is the county from Census TIGERweb (`State_County/MapServer/1`, GEOID 12017); `water.geojson` is
`Hydro/MapServer/1` areas over 1.5 km² in the county's bounding box.

## Search setup still to do (by hand)

- Google Search Console: verify `citrusmarriagecounseling.com` and submit `/sitemap.xml`.
- Google Business Profile for "Citrus Marriage Counseling" at the church address, service area Citrus County.
- Link to this site from Bethel's counseling section (`bethelbaptisthernando.org/ministries#counseling`).
