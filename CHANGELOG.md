# Changelog — sg-ats-coverage.md

Batch-by-batch history of how the Direct table in `sg-ats-coverage.md` grew,
kept for the gotchas each batch surfaced. Still-open companies and untried
candidates live in `TODO.md`, not here.

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

**Resolved 2026-08-07 (batch 3 — bank cluster probe)**: RHB Bank (Workday
`rhb.wd102`, 368 postings/9 SG), Citi (Radancy tenant 287, 3,425 postings —
same provider as BlackRock), HSBC (**new vendor: Eightfold**, 68 SG postings
via `hsbc.eightfold.ai/api/apply/v2/jobs`), CIMB (**new vendor: Oracle
Recruiting Cloud**, 509 postings on site CX_1 of 11), JPMorgan Chase (Oracle
Recruiting Cloud, 7,482 postings on site CX_1001), ANZ (SuccessFactors J2W,
same `career10.successfactors.com` RMK instance as GIC/NETS, `q=Singapore`
narrows to 5). Two still open from this batch:
- **Maybank** — `maybankjobs.com` is a 14.5 KB JS shell, no ATS markers in
  the initial HTML; needs a headless-browser scan to find the real API.
- **Deutsche Bank** — `careers.db.com/professionals/search-roles/` is fully
  client-rendered (92 KB, zero markers, no discoverable API path in the raw
  HTML); same treatment needed.

Both Eightfold and Oracle Recruiting Cloud are now **new vendor gaps** (like
NBIM/Webcruiter) — the API shape is confirmed live and simple (plain JSON,
no auth), so a provider module is a reasonable next step before probing more
banks, since Oracle Recruiting Cloud alone would already cover 2 companies
(CIMB, JPMorgan) with more large banks (e.g. Citi uses a different vendor,
but other global banks commonly run Oracle Recruiting Cloud or Eightfold too).

**Resolved 2026-08-07 (batch 4 — user-supplied URLs)**: Shopee (**new
vendor: WorkAtSea**, Sea Group's own custom ATS — `careers.shopee.sg` is a JS
shell that only revealed its real API host, `ats.workatsea.com`, via a
captured browser network trace, not curl+grep; 2,638 postings across all Sea
Group markets, SG-only slice not yet isolated) and Wise (**resolves the
2026-08-06 "public SR API not directly accessible" note** — the SmartRecruiters
Attrax front end at `wise.jobs/jobs?options=320&page=1` is itself
server-rendered HTML, no API needed; `options=320` = Singapore filter, 30
postings). Lesson from Shopee: when curl+grep finds a JS shell with truly
zero markers, a headless-browser network capture (Playwright) is now a
standard fallback step, not just a documented "would need" — it took one
`browser_navigate` + `browser_network_requests` call to find the API.

Rule of thumb: never hand-guess a board slug into `portals.yml` — a wrong slug fails
silently and looks like zero openings. Verify, then commit (career-search runs from
ephemeral containers; nothing persists uncommitted).
