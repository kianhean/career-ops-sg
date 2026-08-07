# TODO — Websearch fallback → Direct

Companies that still scan via websearch fallback (`scan_query`) instead of a
zero-token ATS provider, plus candidates not yet in `portals.yml` at all.
When a company gets resolved (verify-then-commit per `sg-ats-coverage.md`),
move it to the Direct table there and delete its row here — resolved history
lives in `sg-ats-coverage.md`'s roadmap section, not here.

Priority order for tackling these: the **Expansion roadmap** section in
`sg-ats-coverage.md`.

## Probed — not yet direct

Each row records what was tried and why the board isn't direct yet — the
"Known ATS / why not direct" column IS the next step.

| Company | Known ATS / why not direct |
|---|---|
| Sea Group | careers SPA; no vendor markers; SR slugs verified absent — note: Shopee (Sea subsidiary) turned out to run WorkAtSea, `ats.workatsea.com`; worth re-checking if Sea Group's own board shares that host |
| Traveloka | `traveloka.wd3.myworkdayjobs.com/Traveloka` is indexed by search engines but returns `HTTP_422` live on every site/tenant guess (2026-08-07) — likely a decommissioned Workday board; current `careers.traveloka.com/jobs` is client-rendered, no ATS markers in initial HTML |
| Atlassian | **Beamery**-backed talent-community signup found (`flows.beamery.com/atlassian/tcsignup`, 2026-08-07) — that's Beamery's CRM widget, not confirmed as the job-listing source; gh/lever/SR/workday slug guesses (`atlassian`) all miss |
| Canva | JS shell; no markers; slugs absent |
| Aspire | SPA; no markers |
| StashAway | SPA; no markers |
| Endowus | `careers-page.com` custom platform (`endowus.careers-page.com`, linked from Webflow careers page); no standard ATS markers visible |
| Revolut | 873 KB SPA; no markers; careers page 403 from this network |
| Hudson River Trading | Greenhouse board exists but is **talent-community only** (campus listings); real board is custom ATS |
| DRW | no markers; gh `drw`/`drwgroup` absent |
| Citadel Securities | JS shell; gh `citadel` (0 postings)/`citadelsec`/`citadelsecurities` absent |
| Bloomberg | small page, no markers — custom recruiting system |
| Temasek | `www.temasek.com.sg` is 403 WAF-blocked, but real careers portal found: **SAP SuccessFactors** RCM/CSB 2.0 at `career2.successfactors.eu/career?company=temasekcapP2` (200 OK). Not a bare REST board — job search is wired through classic SF `AjaxService`/JSF ViewState postback (`getInitialJobSearchData`), unlike the CSB/RMK/J2W variants already supported. Needs captured XHR payload or a headless-browser scan. |
| MAS | no markers; `mas.gov.sg/careers` is Sitecore CMS; no direct job listings found — positions likely on Careers@Gov (government HR system) with no public API |
| Fullerton Fund Management | no markers; jobs linked to **LinkedIn only** (`linkedin.com/company/fullerton-fund-management-company/jobs/`) — not zero-token scannable |
| NBIM | **Webcruiter** (`398280.webcruiter.no`, Nordic ATS) — no existing provider; would need new provider module |
| Maybank | `maybankjobs.com` is a 14.5 KB JS shell; no ATS markers in initial HTML; needs a headless-browser scan to find the real API |
| Deutsche Bank | `careers.db.com/professionals/search-roles/` is fully client-rendered (92 KB, zero markers, no discoverable API path in raw HTML); needs a headless-browser scan |

Also websearch: the boards in `search_queries` (LinkedIn ×3, Nodeflair ×2,
Tech in Asia, Glints, RemoteOK, Remotive ×2, WeWorkRemotely ×2, Himalayas,
Working Nomads, Greenhouse/Ashby/Lever APAC cross-portal discovery ×6,
HN Who's Hiring).

**MyCareersFuture ×3**: API verified direct zero-token (2026-08-06) —
`POST api.mycareersfuture.gov.sg/v2/search` (see sg-ats-coverage.md "Also
direct"). Only needs a `mycareersfuture.mjs` provider in career-ops; then
these three `search_queries` entries retire under `job_boards`.

## New candidates (not yet probed)

Not in `portals.yml` yet — grouped by the same clusters as companies already
resolved in `sg-ats-coverage.md`, on the theory that sector-adjacent
employers often share ATS vendor/pattern. None of these have been fetched or
slug-probed; treat every name here as an unknown until it goes through the
verify steps in `sg-ats-coverage.md` ("How boards were verified"). Move a
name to the table above once it's been tried and failed, or straight to the
Direct table if verified live.

| Company | Cluster | Why adjacent |
|---|---|---|
| Susquehanna (SIG) | Prop trading / market makers | mostly Greenhouse cluster (Jane Street, Jump, IMC, Optiver, Squarepoint, Tower, DRW, Citadel Securities, HRT) |
| Akuna Capital | Prop trading / market makers | ″ |
| XTX Markets | Prop trading / market makers | ″ |
| Old Mission | Prop trading / market makers | ″ |
| Radix Trading | Prop trading / market makers | ″ |
| Graviton Research Capital | Prop trading / market makers | ″ |
| Qube Research & Technologies (QRT) | Prop trading / market makers | ″ |
| GSA Capital | Prop trading / market makers | ″ |
| Man Group (Man AHL) | Prop trading / market makers | ″ |
| Virtu Financial | Prop trading / market makers | ″ |
| Two Sigma | Prop trading / market makers | ″ |
| Millennium | Prop trading / market makers | ″ |
| Point72 | Prop trading / market makers | ″ |
| Balyasny | Prop trading / market makers | ″ |
| Rapyd | Fintech / payments | adjacent to Adyen, Stripe, Airwallex, Thunes, Nium, Coda Payments, Aspire |
| Checkout.com | Fintech / payments | ″ |
| dLocal | Fintech / payments | ″ |
| Xendit | Fintech / payments | ″ |
| Circle | Fintech / payments | ″ |
| Ripple | Fintech / payments | ″ |
| Klarna | Fintech / payments | ″ |
| PayPal | Fintech / payments | ″ |
| Worldpay | Fintech / payments | ″ |
| Currencycloud | Fintech / payments | ″ |
| Mapletree | Asset managers / SWF-adjacent | Temasek portfolio entity, likely separate career site |
| CapitaLand Investment | Asset managers / SWF-adjacent | Temasek portfolio entity, likely separate career site |
| Vertex Ventures | Asset managers / SWF-adjacent | Temasek portfolio entity, likely separate career site |
| Azalea Asset Management | Asset managers / SWF-adjacent | Temasek portfolio entity, likely separate career site |
| Pavilion Capital | Asset managers / SWF-adjacent | Temasek portfolio entity, likely separate career site |
| APG | Asset managers / SWF-adjacent | other SWF/pension with SG office |
| PSP Investments | Asset managers / SWF-adjacent | other SWF/pension with SG office |
| CPP Investments | Asset managers / SWF-adjacent | other SWF/pension with SG office |
| ADIA | Asset managers / SWF-adjacent | other SWF/pension with SG office |
| State Street | Asset managers / SWF-adjacent | adjacent to BlackRock, MSCI, S&P Global, LSEG, Nasdaq, FactSet |
| PIMCO | Asset managers / SWF-adjacent | ″ |
| Fidelity International | Asset managers / SWF-adjacent | ″ |
| Schroders | Asset managers / SWF-adjacent | ″ |
| abrdn | Asset managers / SWF-adjacent | ″ |
| Allianz Global Investors | Asset managers / SWF-adjacent | ″ |
| KKR | Asset managers / SWF-adjacent | ″ |
| Blackstone | Asset managers / SWF-adjacent | ″ |
| Carlyle | Asset managers / SWF-adjacent | ″ |
| Apollo | Asset managers / SWF-adjacent | ″ |
| Hong Leong Bank | Banks | adjacent to DBS, UOB, OCBC, Standard Chartered, RHB, CIMB |
| AIA | Insurance | adjacent to Great Eastern-linked statutory entities |
| Prudential | Insurance | ″ |
| Great Eastern | Insurance | ″ |
| Manulife | Insurance | ″ |
| NTUC Income | Insurance | ″ |
| Allianz | Insurance | ″ |
| Sompo | Insurance | ″ |
| ByteDance/TikTok | SPA-shell tech | same bucket as Sea Group/Traveloka/Atlassian/Canva/Revolut — expect no markers on the marketing domain, check websearch or capture browser network traffic (Playwright) for the real API host (worked for GoTo Group, Carousell, Shopee) |
| Lazada | SPA-shell tech | ″ |
| Agoda | SPA-shell tech | ″ |
| Klook | SPA-shell tech | ″ |
| Booking.com | SPA-shell tech | ″ |
| Gojek (if still distinct from GoTo) | SPA-shell tech | ″ |
| Zalo/VNG | SPA-shell tech | ″ |
| HDB | Statutory boards / govt | same bucket as CPF Board/SGX/MAS — likely Careers@Gov with no public API, low priority |
| IMDA | Statutory boards / govt | ″ |
| GovTech | Statutory boards / govt | ″ |
| EDB | Statutory boards / govt | ″ |
| JTC | Statutory boards / govt | ″ |
| LTA | Statutory boards / govt | ″ |
| PUB | Statutory boards / govt | ″ |
| MOM | Statutory boards / govt | ″ |
| Syfe | Wealth / investing platforms | adjacent to Endowus, StashAway, Aspire |
| Kristal.AI | Wealth / investing platforms | ″ |
| Bambu | Wealth / investing platforms | ″ |
| Tiger Brokers | Wealth / investing platforms | ″ |
| Saxo Markets | Wealth / investing platforms | ″ |
| iFAST/FSMOne | Wealth / investing platforms | ″ |
| Coinbase | Crypto | SG-hub exchange cluster |
| Amber Group | Crypto | ″ |
| Matrixport | Crypto | ″ |
| OKX | Crypto | ″ |
| Bybit | Crypto | ″ |
