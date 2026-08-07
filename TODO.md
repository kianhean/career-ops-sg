# TODO — Websearch fallback → Direct

The 18 SG/APAC companies that still scan via websearch fallback
(`scan_query`) instead of a zero-token ATS provider. Each row records what
was tried and why the board isn't direct yet — the "Known ATS / why not
direct" column IS the next step. When a company gets resolved, move it to
the Direct table in `sg-ats-coverage.md` (verify-then-commit) and remove
it here.

**Resolved (2026-08-06)**: UOB (Workday, `uobgroup.wd3.myworkdayjobs.com/UOBExternal`,
976 postings), GIC (SuccessFactors RMK, `careers.gic.com.sg`, J2W search),
NETS (SuccessFactors RMK, `careers.nets.com.sg`, J2W search),
Ninja Van (Lever, `jobs.lever.co/ninjavan`, 174 postings / 15 SG) —
moved to Direct table in `sg-ats-coverage.md`.

**Resolved (2026-08-07)**: OCBC (Workday, `ocbc.wd102.myworkdayjobs.com/External`,
989 postings — **not Taleo**; the `ocbc.taleo.net` board this repo logged on
2026-08-06 is globally NXDOMAIN, the bank has since migrated to Workday),
FactSet (Workday, `factset.wd108.myworkdayjobs.com/FactSetCareers`,
63 postings — `careers.factset.com` never existed, that was a bad guess, not
a network block), LSEG (Workday, `lseg.wd3.myworkdayjobs.com/Careers`,
792 postings, 18 SG-matching — `careers.lseg.com` never existed either; real
site is `lseg.com/en/careers`), GoTo Group (Lever, `jobs.lever.co/GoToGroup`,
48 postings / 19 SG — found via websearch, not visible from curl-ing
`gotocompany.com` directly), Carousell (SmartRecruiters,
`jobs.smartrecruiters.com/CarousellGroup`, 50 postings / 9 SG — the
"private company id" note was wrong: the real public slug is
`CarousellGroup`, not `Carousell`) — moved to Direct table in
`sg-ats-coverage.md`.

**Resolved (2026-08-07, batch 3 — bank cluster)**: RHB Bank (Workday,
`rhb.wd102.myworkdayjobs.com/RHBExternalCareerSite`, 368 postings / 9 SG),
Citi (Radancy, `jobs.citi.com/search-jobs`, 3,425 postings — same provider as
BlackRock), HSBC (**new vendor Eightfold**, `hsbc.eightfold.ai/api/apply/v2/jobs`,
68 SG postings — `mycareer.hsbc.com` is a separate Avature-powered legacy
portal, not the live board), CIMB (**new vendor Oracle Recruiting Cloud**,
`ejox.fa.ap1.oraclecloud.com`, 509 postings on site CX_1 of 11), JPMorgan
Chase (Oracle Recruiting Cloud, `jpmc.fa.oraclecloud.com`, 7,482 postings on
site CX_1001), ANZ (SuccessFactors J2W, same `career10.successfactors.com`
RMK instance as GIC/NETS, `company=anzbanking`, `q=Singapore` narrows to 5) —
moved to Direct table in `sg-ats-coverage.md`. Maybank and Deutsche Bank were
probed in the same batch and stayed open (added to the table below).

**Resolved (2026-08-07, batch 4 — user-supplied URLs)**: Shopee (**new vendor
WorkAtSea**, Sea Group's own custom ATS — `ats.workatsea.com/ats/api/v1/user/job/list/`,
2,638 postings across all Sea Group markets; the real API host only surfaced
via a captured browser network trace, not curl+grep) and Wise (resolves the
"public SR API not directly accessible" note — the SmartRecruiters Attrax
front end itself is server-rendered HTML, `wise.jobs/jobs?options=320&page=1`,
30 SG postings, no API call needed) — moved to Direct table in
`sg-ats-coverage.md`.

Priority order for tackling these: the **Expansion roadmap** section in
`sg-ats-coverage.md`.

| Company | Known ATS / why not direct |
|---|---|
| Sea Group | careers SPA; no vendor markers; SR slugs verified absent — note: Shopee (Sea subsidiary) turned out to run WorkAtSea, `ats.workatsea.com`; worth re-checking if Sea Group's own board shares that host |
| Shopee | → **Resolved** — moved to Direct. |
| GoTo Group | → **Resolved** — moved to Direct. |
| Traveloka | `traveloka.wd3.myworkdayjobs.com/Traveloka` is indexed by search engines but returns `HTTP_422` live on every site/tenant guess (2026-08-07) — likely a decommissioned Workday board; current `careers.traveloka.com/jobs` is client-rendered, no ATS markers in initial HTML |
| Carousell | → **Resolved** — moved to Direct. |
| Ninja Van | → **Resolved** — moved to Direct. |
| Atlassian | **Beamery**-backed talent-community signup found (`flows.beamery.com/atlassian/tcsignup`, 2026-08-07) — that's Beamery's CRM widget, not confirmed as the job-listing source; gh/lever/SR/workday slug guesses (`atlassian`) all miss |
| Canva | JS shell; no markers; slugs absent |
| Aspire | SPA; no markers |
| StashAway | SPA; no markers |
| Endowus | `careers-page.com` custom platform (`endowus.careers-page.com`, linked from Webflow careers page); no standard ATS markers visible |
| Wise | → **Resolved** — moved to Direct. |
| Revolut | 873 KB SPA; no markers; careers page 403 from this network |
| Hudson River Trading | Greenhouse board exists but is **talent-community only** (campus listings); real board is custom ATS |
| DRW | no markers; gh `drw`/`drwgroup` absent |
| Citadel Securities | JS shell; gh `citadel` (0 postings)/`citadelsec`/`citadelsecurities` absent |
| FactSet | → **Resolved** — moved to Direct. |
| Bloomberg | small page, no markers — custom recruiting system |
| LSEG | → **Resolved** — moved to Direct. |
| OCBC | → **Resolved** — moved to Direct. |
| UOB | → **Resolved** — moved to Direct. |
| GIC | → **Resolved** — moved to Direct. |
| Temasek | `www.temasek.com.sg` is 403 WAF-blocked, but real careers portal found: **SAP SuccessFactors** RCM/CSB 2.0 at `career2.successfactors.eu/career?company=temasekcapP2` (200 OK). Not a bare REST board — job search is wired through classic SF `AjaxService`/JSF ViewState postback (`getInitialJobSearchData`), unlike the CSB/RMK/J2W variants already supported. Needs captured XHR payload or a headless-browser scan. |
| MAS | no markers; `mas.gov.sg/careers` is Sitecore CMS; no direct job listings found — positions likely on Careers@Gov (government HR system) with no public API |
| Fullerton Fund Management | no markers; jobs linked to **LinkedIn only** (`linkedin.com/company/fullerton-fund-management-company/jobs/`) — not zero-token scannable |
| NBIM | **Webcruiter** (`398280.webcruiter.no`, Nordic ATS) — no existing provider; would need new provider module |
| NETS | → **Resolved** — moved to Direct. |
| Maybank | `maybankjobs.com` is a 14.5 KB JS shell; no ATS markers in initial HTML; needs a headless-browser scan to find the real API |
| Deutsche Bank | `careers.db.com/professionals/search-roles/` is fully client-rendered (92 KB, zero markers, no discoverable API path in raw HTML); needs a headless-browser scan |

Also websearch: the boards in `search_queries` (LinkedIn ×3, Nodeflair ×2,
Tech in Asia, Glints, RemoteOK, Remotive ×2, WeWorkRemotely ×2, Himalayas,
Working Nomads, Greenhouse/Ashby/Lever APAC cross-portal discovery ×6,
HN Who's Hiring).

## New candidates (not yet probed)

Not in `portals.yml` yet — grouped by the same clusters as companies already
resolved above, on the theory that sector-adjacent employers often share ATS
vendor/pattern. None of these have been fetched or slug-probed; treat every
name here as an unknown until it goes through the verify steps in
`sg-ats-coverage.md` ("How boards were verified"). Move a name to the table
above once it's been tried and failed, or straight to the Direct table if
verified live.

**Prop trading / market makers** (adjacent to Jane Street, Jump, IMC, Optiver,
Squarepoint, Tower, DRW, Citadel Securities, HRT — this cluster is mostly
Greenhouse): Susquehanna (SIG), Akuna Capital, XTX Markets, Old Mission,
Radix Trading, Graviton Research Capital, Qube Research & Technologies (QRT),
GSA Capital, Man Group (Man AHL), Virtu Financial, Two Sigma, Millennium,
Point72, Balyasny.

**Fintech / payments** (adjacent to Adyen, Stripe, Airwallex, Thunes, Nium,
Coda Payments, Wise, Aspire): Rapyd, Checkout.com, dLocal, Xendit, Circle,
Ripple, Klarna, PayPal, Worldpay, Currencycloud.

**Asset managers / SWF-adjacent** (adjacent to GIC, Temasek, BlackRock, MSCI,
S&P Global, LSEG, Nasdaq, FactSet, NBIM): Temasek portfolio entities with
likely separate career sites (Mapletree, CapitaLand Investment, Vertex
Ventures, Azalea Asset Management, Pavilion Capital); other SWFs/pensions with
SG offices (APG, PSP Investments, CPP Investments, ADIA); asset managers
(State Street, PIMCO, Fidelity International, Schroders, abrdn, Allianz
Global Investors, KKR, Blackstone, Carlyle, Apollo).

**Banks** (adjacent to DBS, UOB, OCBC, Standard Chartered): Hong Leong Bank.
CIMB, HSBC, Citi, JPMorgan, ANZ, RHB → **resolved 2026-08-07**, moved to
Direct table in `sg-ats-coverage.md` (CIMB and JPMorgan surfaced a new
vendor, Oracle Recruiting Cloud; HSBC surfaced another, Eightfold — both need
provider modules, see "Vendor → provider coverage matrix" gap rows). Maybank
and Deutsche Bank were probed and are still open — see below.

**Insurance**: AIA, Prudential, Great Eastern, Manulife, NTUC Income,
Allianz, Sompo.

**SPA-shell tech** (same bucket as Sea Group/Traveloka/Atlassian/Canva/
Revolut — expect no markers on the marketing domain itself, but check
websearch for a separate ATS board first, or capture the browser's network
traffic (Playwright) for the real API host: GoTo Group and Carousell were
both in this bucket until 2026-08-07, when websearch turned up their real
Lever/SmartRecruiters boards on unrelated domains, and Shopee's real API
host (`ats.workatsea.com`) only surfaced via a captured XHR trace):
ByteDance/TikTok, Lazada, Agoda, Klook, Booking.com, Gojek (if still distinct
from GoTo), Zalo/VNG.

**Statutory boards / govt** (same bucket as CPF Board/SGX/MAS — likely
Careers@Gov with no public API, low priority): HDB, IMDA, GovTech, EDB, JTC,
LTA, PUB, MOM.

**Wealth / investing platforms** (adjacent to Endowus, StashAway, Aspire):
Syfe, Kristal.AI, Bambu, Tiger Brokers, Saxo Markets, iFAST/FSMOne.

**Crypto** (SG-hub exchanges, new cluster): Coinbase, Amber Group,
Matrixport, OKX, Bybit.

**MyCareersFuture ×3**: API verified direct zero-token (2026-08-06) —
`POST api.mycareersfuture.gov.sg/v2/search` (see sg-ats-coverage.md "Also
direct"). Only needs a `mycareersfuture.mjs` provider in career-ops; then
these three `search_queries` entries retire under `job_boards`.
