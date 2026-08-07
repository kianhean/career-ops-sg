# Singapore ATS Coverage — career-ops expansion map

Singapore-focused inventory of ATS vendors behind every tracked Singapore/APAC
employer, mapped to the provider modules in the **career-ops** skill
(`providers/*.mjs`). The goal of this repo is to expand career-ops' zero-token
ATS scanning for the Singapore market: every row under **Direct** is a company
the skill can already scan end-to-end; the **Gap** sections are the expansion
targets.

Data provenance: verified 2026-08-06 against `career-search` repo
(`portals.yml → tracked_companies`, every entry end-to-end tested with
`node scan.mjs --company "<name>"`); OCBC, FactSet, LSEG rows added
2026-08-07 (see roadmap "Resolved 2026-08-07" for how the earlier
DNS-blocked/Taleo guesses turned out to be stale, not network-limited).

Legend: **Direct** = zero-token scan via the vendor's public API (no LLM/websearch).
**Websearch** = fallback scan via `scan_query` (broader but can lag the real board).
**Provider** = the career-ops module that serves this ATS vendor.

## Direct ATS (40 companies, 10 vendors)

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
| GoTo Group | Lever | `lever.mjs` | jobs.lever.co/GoToGroup | live (48 postings, 19 Singapore) — previously logged "SPA, no markers"; found via websearch, not visible from curl-ing `gotocompany.com` directly |
| DBS Bank | Workday | `workday.mjs` | dbs.wd3.myworkdayjobs.com/DBS_Careers | live (1,382 postings) |
| UOB | Workday | `workday.mjs` | uobgroup.wd3.myworkdayjobs.com/UOBExternal | live (976 postings) |
| Grab | SmartRecruiters (Umbraco branded front) | `smartrecruiters.mjs` | www.grab.careers/en/jobs/ (SR API: `/v1/companies/Grab/postings`; RSS: `/en/jobs/xml/?rss=true`) | live (346 postings, 77 SG) — migrated from Workday; old board dead |
| Nasdaq | Workday | `workday.mjs` | nasdaq.wd1.myworkdayjobs.com/Global_External_Site | live (184 postings) |
| PropertyGuru | Workday | `workday.mjs` | propertyguru.wd105.myworkdayjobs.com/en-US/PropertyGuru/ | live (24 postings) |
| S&P Global | Workday | `workday.mjs` | spgi.wd5.myworkdayjobs.com/SPGI_Careers | live (296 postings) |
| Visa | Workday | `workday.mjs` | visa.wd5.myworkdayjobs.com/Visa | live (772 postings) — the **wd5** tenant; `visa.wd1` 500s on every site name |
| OCBC | Workday | `workday.mjs` | ocbc.wd102.myworkdayjobs.com/External | live (989 postings, incl. OCBC Singapore, OCBC Malaysia, Bank of Singapore reqs) — **not Taleo**; bank migrated off `ocbc.taleo.net` (now globally NXDOMAIN) |
| FactSet | Workday | `workday.mjs` | factset.wd108.myworkdayjobs.com/FactSetCareers | live (63 postings) — the **wd108** tenant; `factset.wd1` returns HTTP_422 on every payload |
| LSEG | Workday | `workday.mjs` | lseg.wd3.myworkdayjobs.com/Careers | live (792 postings, 18 matching "Singapore") — site is `Careers`, not `Graduate_Careers` (5 postings, campus-only) |
| MSCI | iCIMS | `icims.mjs` | globalcareers-msci.icims.com | live (93 postings) |
| Standard Chartered | SuccessFactors (CSB) | `successfactors.mjs` | jobs.standardchartered.com/ (`provider: successfactors`) | live (697 postings; first posting already a SG role) |
| CPF Board | SuccessFactors (CSB) | `successfactors.mjs` | careers.cpf.gov.sg/search/?q=& (`provider: successfactors`) | live (23 postings; CSB API reachable directly at careers.cpf.gov.sg — see gotchas) |
| SGX | SuccessFactors (J2W server-rendered) | `successfactors.mjs` (needs J2W HTML-parser variant) | careers.sgx.com/search/?q=& | live (25 postings, all SG) — server-rendered search, `startrow` pagination; CSB API on branded host is 401 auth-gated (see gotchas) |
| GIC | SuccessFactors (RMK, J2W branded host) | `successfactors.mjs` (needs J2W HTML-parser variant) | careers.gic.com.sg/search/?q=& | live (20+ postings) — RMK on `career10.successfactors.com` (`company=gicprivate`); CSB API on branded host errors; J2W server-rendered search works |
| NETS | SuccessFactors (RMK, J2W branded host) | `successfactors.mjs` (needs J2W HTML-parser variant) | careers.nets.com.sg/search/?q=& | live (25+ postings) — same `career10.successfactors.com` instance as GIC (`company=NETS`); CSB API on branded host errors; J2W server-rendered search works |
| Ninja Van | Lever | `lever.mjs` | jobs.lever.co/ninjavan | live (174 postings, 15 SG) — single Lever board serves both Ninja Van (logistics) and Ninja Mart (FMCG) under same parent company |
| BlackRock | Radancy (TalentBrew) | `radancy.mjs` | careers.blackrock.com/en/search-jobs (`provider: radancy`) | live (280 postings) |
| Mastercard | Phenom (fronting Workday) | `phenom.mjs` | careers.mastercard.com (`provider: phenom`) | live (1,129 postings; SG roles prominent) |
| Carousell | SmartRecruiters | `smartrecruiters.mjs` | jobs.smartrecruiters.com/CarousellGroup | live (50 postings, 9 SG) — the public company id is **`CarousellGroup`**, not `Carousell`; the 2026-08-06 note ("private company id, public SR API 404s") was a wrong slug guess, not an actual access restriction |

Also direct: **Jobstreet Singapore** (job board, SEEK v5 API, `provider: jobstreet`
with `siteKey: SG-Main`) under `job_boards`. The other `job_boards` entries
(SolidJobs IT etc.) are API-direct but Polish-market/disabled.

**MyCareersFuture** (SG national job board) — public API verified live
(2026-08-06), zero-token from plain curl, no cookies/CSRF:
`POST https://api.mycareersfuture.gov.sg/v2/search?limit=20&page=0` with body
`{"sessionId":"","search":"<query>","postingCompany":[],"sortBy":["new_posting_date"]}`.
Response: paginated `results[]` with `metadata.{jobPostId, newPostingDate,
jobDetailsUrl}`, `postedCompany.{uen,name}`, `salary`, `address.districts`.
Pagination via `_links.next/page=N`. Reference provider module ships in this
repo (`mycareersfuture.mjs` — verified standalone, 849 postings for "software
engineer" on 2026-08-06); drop it into career-ops `providers/`, then MCF moves
under `job_boards` and the ×3 MyCareersFuture `search_queries` entries retire.

## Backlog

The 18 websearch-fallback companies and the `search_queries` boards now live
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
| Workday | `workday.mjs` | 9 (DBS, Nasdaq, PropertyGuru, S&P Global, UOB, Visa, OCBC, FactSet, LSEG) | ✓ direct |
| Lever | `lever.mjs` | 4 (Coda Payments, Ninja Van, Nium, GoTo Group) | ✓ direct |
| Ashby | `ashby.mjs` | 2 | ✓ direct |
| SuccessFactors | `successfactors.mjs` | 5 (Standard Chartered, CPF Board — CSB; GIC, NETS — RMK/J2W; SGX — J2W) | ✓ direct; J2W HTML-parser variant needed for SGX, GIC, NETS |
| Phenom | `phenom.mjs` | 1 | ✓ direct |
| Radancy | `radancy.mjs` | 1 | ✓ direct |
| iCIMS | `icims.mjs` | 1 | ✓ direct |
| SmartRecruiters | `smartrecruiters.mjs` | 2 (Grab, Carousell — both public company ids on the standard API) | ✓ direct |
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

A `careers.<company>.com` DNS failure is not proof the ATS is blocked or
unknown — verify with a public DoH resolver (`https://dns.google/resolve?name=...`)
before writing a company off as network-blocked. FactSet and LSEG were both
logged 2026-08-06 as "DNS-unresolvable from this network"; re-checked
2026-08-07, `careers.factset.com` and `careers.lseg.com` are NXDOMAIN
*globally* — those subdomains never existed. Both companies' real career
sites are plain `*.myworkdayjobs.com` tenants (`factset.wd108`, `lseg.wd3`,
site `Careers`) linked from ordinary marketing pages (`factset.com/careers`,
`lseg.com/en/careers`). Same pattern caught OCBC: the Taleo board logged
2026-08-06 (`ocbc.taleo.net`) is NXDOMAIN globally too — not blocked, gone.
The bank migrated to Workday (`ocbc.wd102`) and the doc's ATS guess was stale,
not network-limited. Lesson: always search for the current careers page
before trusting an old vendor guess or a DNS failure as "still blocked".

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

**RMK + J2W hybrid**: GIC and NETS are RMK instances on `career10.successfactors.com`
(`company=gicprivate` / `company=NETS`) with J2W-branded fronts (`careers.gic.com.sg`,
`careers.nets.com.sg`). The CSB API on the branded host returns an error
(`{"error":"Error retrieving jobs"}`) — not 401, but the endpoint is non-functional.
The J2W server-rendered search works: `GET /search/?q=&sortColumn=referencedate&sortDirection=desc&startrow=0`
returns jobs as HTML tiles. Same `startrow` pagination pattern as SGX; the
`successfactors.mjs` J2W HTML-parser variant can serve all three.

## Expansion roadmap (next candidates to resolve)

Priority order — these are the SG companies that move from Websearch → Direct,
expanding career-ops' SG coverage:

1. **Temasek** — `www.temasek.com.sg` itself is 403 WAF-blocked, but the real
   careers portal lives off-domain: **SAP SuccessFactors** RCM/CSB 2.0 career
   site at `career2.successfactors.eu/career?company=temasekcapP2` (verified
   2026-08-07, HTTP 200 from plain curl). Not a simple REST board though —
   the job search widget (`getInitialJobSearchData`) is wired through the
   classic SF `AjaxService`/JSF ViewState postback pattern, not a bare JSON
   endpoint like the CSB/RMK/J2W variants already supported. Needs either the
   real XHR payload captured from a browser session, or a headless-browser
   scan like `scan-interamt.mjs`.
2. **HRT** — custom ATS with a public jobs API; a `local_parser` is plausible.
3. **NBIM** — confirmed **Webcruiter** (`398280.webcruiter.no`, Nordic ATS); no
   existing provider module; would need a new provider.
4. **Fullerton Fund Management** — jobs are **LinkedIn only** (`linkedin.com/company/fullerton-fund-management-company/jobs/`);
   not zero-token scannable.
5. **Wise** — **SmartRecruiters Attrax** custom career site (`wise.jobs`);
   underlying ATS may be SmartRecruiters but public API not directly accessible.
6. **Endowus** — `careers-page.com` custom platform (`endowus.careers-page.com`);
   no standard ATS markers found.
7. **MAS** — no direct job listings found on `mas.gov.sg/careers`; likely
   Careers@Gov (government HR system) with no public API.
8. **Atlassian** — **Beamery**-backed (`flows.beamery.com/atlassian/tcsignup`
   talent-community signup, found 2026-08-07); this is Beamery's CRM/signup
   widget, not confirmed as the actual job-listing source — Lever/Greenhouse/
   SmartRecruiters/Workday slug guesses (`atlassian`) all miss. Needs the
   real job-search XHR captured from a browser session to find the API.
9. **Traveloka** — a `traveloka.wd3.myworkdayjobs.com/Traveloka` Workday board
   is indexed by search engines but returns `HTTP_422` live (2026-08-07) on
   every site-name/tenant guess tried — likely a decommissioned board; current
   `careers.traveloka.com/jobs` is client-rendered with no ATS markers in the
   initial HTML. Re-probe if the real API surfaces (e.g. via captured XHR).
10. **Sea Group, Shopee, Canva, Revolut, Aspire, StashAway** — all SPA/JS
    shells with no ATS markers extractable from curl; re-checked 2026-08-07,
    still no hits via curl+grep or vendor-slug guessing.

**Resolved 2026-08-07**: OCBC (Workday `ocbc.wd102`, not Taleo — bank
migrated off `ocbc.taleo.net`, which is now globally NXDOMAIN, not just
network-blocked), FactSet (Workday `factset.wd108`, `careers.factset.com`
DNS never existed — the actual tenant domain is `*.myworkdayjobs.com`), LSEG
(Workday `lseg.wd3`, site `Careers` not `Graduate_Careers` — `careers.lseg.com`
also never existed, real page is `lseg.com/en/careers`). All three DNS
"blocks" from 2026-08-06 were misdiagnosed: the branded `careers.*` subdomains
simply don't exist (confirmed via public DoH resolver, not just this
network) — the companies use unbranded Workday tenant URLs directly.

**Also resolved 2026-08-07** (found via websearch, not curl-only re-checks):
GoTo Group (Lever, `jobs.lever.co/GoToGroup`, 48 postings/19 SG — the
`gotocompany.com` careers page itself is a JS shell with no markers, but the
Lever board is public and unrelated to that domain) and Carousell
(SmartRecruiters, `jobs.smartrecruiters.com/CarousellGroup`, 50 postings/9 SG
— the 2026-08-06 note called this "private company id, 404s on `Carousell`",
which was simply the wrong slug: the real one is `CarousellGroup`).

Rule of thumb: never hand-guess a board slug into `portals.yml` — a wrong slug fails
silently and looks like zero openings. Verify, then commit (career-search runs from
ephemeral containers; nothing persists uncommitted).
