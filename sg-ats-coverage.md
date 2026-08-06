# Singapore ATS Coverage — career-ops expansion map

Singapore-focused inventory of ATS vendors behind every tracked Singapore/APAC
employer, mapped to the provider modules in the **career-ops** skill
(`providers/*.mjs`). The goal of this repo is to expand career-ops' zero-token
ATS scanning for the Singapore market: every row under **Direct** is a company
the skill can already scan end-to-end; the **Gap** sections are the expansion
targets.

Data provenance: verified 2026-08-06 against `career-search` repo
(`portals.yml → tracked_companies`, every entry end-to-end tested with
`node scan.mjs --company "<name>"`).

Legend: **Direct** = zero-token scan via the vendor's public API (no LLM/websearch).
**Websearch** = fallback scan via `scan_query` (broader but can lag the real board).
**Provider** = the career-ops module that serves this ATS vendor.

## Direct ATS (31 companies, 10 vendors)

| Company | ATS vendor | career-ops provider | Board URL | Verified state (2026-08-06) |
|---|---|---|---|---|
| Adyen | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/adyen | live |
| Cloudflare | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/cloudflare | live |
| Datadog | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/datadog | live |
| Elastic | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/elastic | live |
| Flow Traders | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/flowtraders | live (37 postings) |
| GitLab | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/gitlab | live |
| IMC Trading | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/imc | live (163 postings) |
| Jane Street | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/janestreet | live (225 postings, incl. HK ML roles) |
| Jump Trading | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/jumptrading | live (105 postings) |
| MongoDB | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/mongodb | live |
| Optiver | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/optiver | board live, **0 postings** at verify time |
| Squarepoint Capital | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/squarepointcapital | live (87 postings) |
| Stripe | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/stripe | live |
| Thunes | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/thunes | live |
| Tower Research Capital | Greenhouse | `greenhouse.mjs` | job-boards.greenhouse.io/towerresearchcapital | live (74 postings) |
| Airwallex | Ashby | `ashby.mjs` | jobs.ashbyhq.com/airwallex | live |
| Confluent | Ashby | `ashby.mjs` | jobs.ashbyhq.com/confluent | live |
| Coda Payments | Lever | `lever.mjs` | jobs.lever.co/Coda | live (24 postings) — **slug is capital-C `Coda`** |
| Nium | Lever | `lever.mjs` | jobs.lever.co/nium | live |
| DBS Bank | Workday | `workday.mjs` | dbs.wd3.myworkdayjobs.com/DBS_Careers | live (1,382 postings) |
| Grab | SmartRecruiters (Umbraco branded front) | `smartrecruiters.mjs` | www.grab.careers/en/jobs/ (SR API: `/v1/companies/Grab/postings`; RSS: `/en/jobs/xml/?rss=true`) | live (346 postings, 77 SG) — migrated from Workday; old board dead |
| Nasdaq | Workday | `workday.mjs` | nasdaq.wd1.myworkdayjobs.com/Global_External_Site | live (184 postings) |
| PropertyGuru | Workday | `workday.mjs` | propertyguru.wd105.myworkdayjobs.com/en-US/PropertyGuru/ | live (24 postings) |
| S&P Global | Workday | `workday.mjs` | spgi.wd5.myworkdayjobs.com/SPGI_Careers | live (296 postings) |
| Visa | Workday | `workday.mjs` | visa.wd5.myworkdayjobs.com/Visa | live (772 postings) — the **wd5** tenant; `visa.wd1` 500s on every site name |
| MSCI | iCIMS | `icims.mjs` | globalcareers-msci.icims.com | live (93 postings) |
| Standard Chartered | SuccessFactors (CSB) | `successfactors.mjs` | jobs.standardchartered.com/ (`provider: successfactors`) | live (697 postings; first posting already a SG role) |
| CPF Board | SuccessFactors (CSB) | `successfactors.mjs` | careers.cpf.gov.sg/search/?q=& (`provider: successfactors`) | live (23 postings; CSB API reachable directly at careers.cpf.gov.sg — see gotchas) |
| SGX | SuccessFactors (J2W server-rendered) | `successfactors.mjs` (needs J2W HTML-parser variant) | careers.sgx.com/search/?q=& | live (25 postings, all SG) — server-rendered search, `startrow` pagination; CSB API on branded host is 401 auth-gated (see gotchas) |
| BlackRock | Radancy (TalentBrew) | `radancy.mjs` | careers.blackrock.com/en/search-jobs (`provider: radancy`) | live (280 postings) |
| Mastercard | Phenom (fronting Workday) | `phenom.mjs` | careers.mastercard.com (`provider: phenom`) | live (1,129 postings; SG roles prominent) |

Also direct: **Jobstreet Singapore** (job board, SEEK v5 API, `provider: jobstreet`
with `siteKey: SG-Main`) under `job_boards`. The other `job_boards` entries
(SolidJobs IT etc.) are API-direct but Polish-market/disabled.

## Backlog

The 28 websearch-fallback companies and the `search_queries` boards now live
in **`TODO.md`** — the "Known ATS / why not direct" notes there are the next
steps. Resolved companies move back here as Direct rows.

## Vendor → provider coverage matrix

Every vendor in the Direct table already has a zero-token provider module in
career-ops — the vendor layer is complete. The Singapore expansion work is at
the **company level**: discovering the right tenant/slug/endpoint, not building
new vendors.

| Vendor | Provider module | SG companies served | Status |
|---|---|---|---|
| Greenhouse | `greenhouse.mjs` | 15 | ✓ direct |
| Workday | `workday.mjs` | 5 (DBS, Nasdaq, PropertyGuru, S&P Global, Visa) | ✓ direct |
| Lever | `lever.mjs` | 2 | ✓ direct |
| Ashby | `ashby.mjs` | 2 | ✓ direct |
| SuccessFactors | `successfactors.mjs` | 3 (Standard Chartered, CPF Board — CSB; SGX — J2W) | ✓ direct; J2W HTML-parser variant needed for SGX |
| Phenom | `phenom.mjs` | 1 | ✓ direct |
| Radancy | `radancy.mjs` | 1 | ✓ direct |
| iCIMS | `icims.mjs` | 1 | ✓ direct |
| SmartRecruiters | `smartrecruiters.mjs` | 1 (Grab — public company id) | ✓ direct; Carousell still needs `local_parser` via its WP proxy |
| SEEK (Jobstreet) | `jobstreet.mjs` | 1 (job board) | ✓ direct, `siteKey: SG-Main` |
| Custom/unknown | — | HRT, Bloomberg, Citadel, DRW, Sea, Shopee, … | gap: see roadmap |

## How boards were verified (repeat for new candidates)

1. `node discover-ats.mjs --in companies.yml --summary` — name-based guessing only; low recall.
2. Fetch the careers page (`curl -sL` with a browser UA) → grep for embedded ATS markers
   (greenhouse, ashbyhq, lever, myworkdayjobs, icims, smartrecruiters, successfactors,
   radancy, workable, avature, …). Catches server-rendered pages; SPAs show nothing.
3. Slug-probe vendor APIs (gh/ashby/lever/SR/workable) — **then always verify the
   company identity**, never trust a 200:
   - Greenhouse: `GET /v1/boards/<slug>` returns the board `name` (and 404 for unknown)
   - SmartRecruiters: `GET /v1/companies/<id>` returns `name` — **`/postings` 200s on
     ANY slug, it is NOT a hit signal**
   - Lever: `GET /v0/postings/<slug>` can return *another company's* postings — check
     the first posting
4. Live-endpoint checks: Greenhouse `/v1/boards/<slug>/jobs`, Lever `/v0/postings/<slug>`,
   Workday `POST /wday/cxs/<tenant>/<site>/jobs`, iCIMS `/<host>/jobs/search`,
   Radancy `/en/search-jobs`, SuccessFactors `POST /services/recruiting/v1/jobs`
   (CSB variant) or `GET /tile-search-results/` (RMK variant), Phenom
   `POST /widgets` (refineSearch).
5. End-to-end: `node scan.mjs --company "<name>"` must return a real job count.

## Workday gotchas seen live

A tenant may answer 500 on *every* site name on one instance while the real board
lives on another instance and site — Visa is `visa.wd5.myworkdayjobs.com/Visa`,
not `visa.wd1` (which 500s). And a brand's obvious domain may not exist:
`careers.visa.com` is NXDOMAIN — the branded front is `corporate.visa.com/en/jobs/`,
which embeds the Workday link. Probe the branded jobs page for the embed; don't
guess the tenant from the brand.

## SuccessFactors gotchas seen live

The raw sapsf.com instance answers **403 (WAF)** from this network — but the
branded careers domain can **proxy the CSB API through its own host**. CPF Board
(`career44.sapsf.com` instance) is the live example: `career44.sapsf.com/services/recruiting/v1/jobs`
403s, while `careers.cpf.gov.sg/services/recruiting/v1/jobs` returns 200 from
plain curl with no cookies or CSRF token:

```
POST https://careers.cpf.gov.sg/services/recruiting/v1/jobs
{"locale":"en_GB","pageNumber":0,"sortBy":"","keywords":"","location":"",
 "facetFilters":{},"brand":"","skills":[],"categoryId":0,"alertId":"","rcmCandidateId":""}
```

Response: `jobSearchResult[]` (each with `response.{id, unifiedStandardTitle,
unifiedStandardStart DD/MM/YYYY, cust_jobCategory, cust_jobFamily, urlTitle}`)
plus `totalJobs`. Job detail URLs: `/job/<urlTitle>/<id>-en_GB` (verified 200).
No location field — statutory boards post SG-only roles. Quirk: the feed can
list the same req id on two pages (1637 on 2026-08-06) — dedup by req id.
**Probe the branded domain's `/services/recruiting/v1/jobs` before declaring a
SuccessFactors board WAF-blocked.**

But the proxy is not always open: **SGX's** branded host proxies the CSB
endpoint yet answers **401 auth-gated** (`careers.sgx.com/services/recruiting/v1/jobs`
→ 401; CPF's → 200 open). SGX works zero-token anyway, because the J2W
**search page itself is server-rendered**: `GET /search/?q=&sortColumn=referencedate&sortDirection=desc&startrow=<0,10,20…>`
returns the jobs directly in HTML (`/job/<Location>-<slug>/<reqid>/` links,
pagination via `startrow`), and detail pages carry a `Posted` meta date.
So for every J2W tenant: try the CSB API on the branded host first, and if it
401s, fall back to parsing the server-rendered search page — no WAF can block
the page the applicant actually reads.

## Expansion roadmap (next candidates to resolve)

Priority order — these are the SG companies that move from Websearch → Direct,
expanding career-ops' SG coverage:

1. **Carousell** — SmartRecruiters behind their WordPress proxy; a `local_parser`
   script could call `/wp-content/themes/suki/smartrecruiters/api.php` directly
   (bypasses the private-company-id 404). **Pattern to copy: Grab** — its branded
   Umbraco front wraps a *public* SR company id (`Grab`), so the plain SR API
   works zero-token (`/v1/companies/Grab/postings`, `totalFound` matches the
   site's own RSS feed). If Carousell's id ever turns public, same path.
2. **GIC, Temasek, OCBC, UOB** — most likely Workday tenants; a tenant URL (e.g. from
   a LinkedIn job link or careers-page footer on another network) unlocks direct
   scanning via the existing `workday.mjs`.
3. **FactSet, LSEG** — careers subdomains DNS-blocked here. Resolve DNS elsewhere,
   identify ATS, then re-probe.
4. **HRT** — custom ATS with a public jobs API; a `local_parser` is plausible.

Rule of thumb: never hand-guess a board slug into `portals.yml` — a wrong slug fails
silently and looks like zero openings. Verify, then commit (career-search runs from
ephemeral containers; nothing persists uncommitted).
