# TODO — Websearch fallback → Direct

The 23 SG/APAC companies that still scan via websearch fallback
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

Priority order for tackling these: the **Expansion roadmap** section in
`sg-ats-coverage.md`.

| Company | Known ATS / why not direct |
|---|---|
| Sea Group | careers SPA; no vendor markers; SR slugs verified absent |
| Shopee | JS shell (3.5 KB); no markers; gh/ashby/lever/SR slugs absent |
| GoTo Group | careers SPA; no markers |
| Traveloka | careers SPA; no markers |
| Carousell | **SmartRecruiters-backed** (WordPress `api.php` proxy) but private company id — public SR API 404s |
| Ninja Van | → **Resolved** — moved to Direct. |
| Atlassian | careers SPA; gh/ashby/lever slugs absent |
| Canva | JS shell; no markers; slugs absent |
| Aspire | SPA; no markers |
| StashAway | SPA; no markers |
| Endowus | `careers-page.com` custom platform (`endowus.careers-page.com`, linked from Webflow careers page); no standard ATS markers visible |
| Wise | **SmartRecruiters Attrax** custom career site (`wise.jobs`) — footer confirms "Career site system powered by SmartRecruiters Attrax"; jobs loaded via Attrax search widget; public SR API not directly accessible |
| Revolut | 873 KB SPA; no markers; careers page 403 from this network |
| Hudson River Trading | Greenhouse board exists but is **talent-community only** (campus listings); real board is custom ATS |
| DRW | no markers; gh `drw`/`drwgroup` absent |
| Citadel Securities | JS shell; gh `citadel` (0 postings)/`citadelsec`/`citadelsecurities` absent |
| FactSet | `careers.factset.com` **DNS-unresolvable** from this network — ATS unknown |
| Bloomberg | small page, no markers — custom recruiting system |
| LSEG | `careers.lseg.com` **DNS-unresolvable** from this network — ATS unknown |
| OCBC | **Taleo** (`ocbc.taleo.net/careersection/ocbc_external/jobsearch.ftl` from careers page) but DNS-unresolvable from this network; `taleo.net` domain completely blocked. Taleo not in career-ops provider list. |
| UOB | → **Resolved** — moved to Direct. |
| GIC | → **Resolved** — moved to Direct. |
| Temasek | **403 WAF-blocked** entirely from this network — homepage inaccessible; ATS unknown |
| MAS | no markers; `mas.gov.sg/careers` is Sitecore CMS; no direct job listings found — positions likely on Careers@Gov (government HR system) with no public API |
| Fullerton Fund Management | no markers; jobs linked to **LinkedIn only** (`linkedin.com/company/fullerton-fund-management-company/jobs/`) — not zero-token scannable |
| NBIM | **Webcruiter** (`398280.webcruiter.no`, Nordic ATS) — no existing provider; would need new provider module |
| NETS | → **Resolved** — moved to Direct. |

Also websearch: the boards in `search_queries` (LinkedIn ×3, Nodeflair ×2,
Tech in Asia, Glints, RemoteOK, Remotive ×2, WeWorkRemotely ×2, Himalayas,
Working Nomads, Greenhouse/Ashby/Lever APAC cross-portal discovery ×6,
HN Who's Hiring).

**MyCareersFuture ×3**: API verified direct zero-token (2026-08-06) —
`POST api.mycareersfuture.gov.sg/v2/search` (see sg-ats-coverage.md "Also
direct"). Only needs a `mycareersfuture.mjs` provider in career-ops; then
these three `search_queries` entries retire under `job_boards`.
