# CLAUDE.md

## What this repo is

`career-ops-sg` is the **Singapore ATS coverage expansion** for the
[career-ops](https://github.com/santifer/career-ops) skill (repo owner:
santifer/career-ops). It does NOT run the career-ops pipeline itself — it
produces the verified ATS knowledge that gets configured upstream.

- **The deliverable is `sg-ats-coverage.md`**: every SG/APAC employer tracked
  by career-ops, its ATS vendor, the provider module that serves it, and
  verified live status. Every row under **Direct** is a company the skill can
  scan end-to-end; the **Gap** sections are the expansion targets.
- The coverage doc is consumed by the skill via a **copy-paste prompt** (see
  README, "Using this repo with the career-ops skill"): the user runs it inside
  the career-ops install, and the skill turns the Direct table into
  `portals.yml` `tracked_companies`. So rows must stay machine-parseable —
  one company per row, exact board URLs, provider = module name without `.mjs`.
- The scan scripts (`scan.mjs`, `scan-ats-full.mjs`, `scan-interamt.mjs`) are
  reference copies from career-ops. Note: **`providers/` is NOT in this repo**
  — importing scan.mjs or scan-ats-full.mjs fails here because they import
  `./providers/*`. `scan-interamt.mjs` is standalone (Playwright only).
  `mycareersfuture.mjs` is a **provider module** (career-ops contract
  `{id, detect, fetch}`), also fully standalone — test it with
  `node mycareersfuture.mjs --dry-run`; it becomes live once copied into the
  career-ops `providers/` dir.

## The one rule: verify, then commit

Never hand-guess a board slug or tenant into the coverage map — a wrong slug
fails silently and looks like zero openings. Every Direct row must be verified:

1. Fetch the careers page (`curl -sL` with a browser UA) → grep for ATS
   markers (myworkdayjobs, sapsf/successfactors, icims, smartrecruiters,
   greenhouse, ashbyhq, lever.co, radancy, workable, avature, phenom…).
   SPAs show nothing — a JS shell with no markers means "unknown", not "direct".
2. Probe the vendor API with the candidate slug, then **verify company
   identity** — never trust a 200:
   - SmartRecruiters `/postings` 200s on ANY slug (not a hit signal — check
     `/v1/companies/<id>` instead). Live pattern for identity proof (Grab,
     2026-08-06): a branded site that links to `jobs.smartrecruiters.com/<Id>/`
     for its apply buttons is SR-backed; confirm by matching posting IDs
     between the site's own RSS feed and `/v1/companies/<Id>/postings`
   - Lever `/v0/postings/<slug>` can return *another company's* postings
   - Greenhouse `/v1/boards/<slug>` returns the board `name`
3. Confirm a real job count from a live endpoint, then record it with the
   exact endpoint so the provider can be configured upstream.

## SuccessFactors gotchas (learned live)

- Raw `*.sapsf.com` instances answer **403 (WAF)** from this network.
- **The branded careers domain often proxies the CSB API through its own
  host** — always probe `https://<branded-domain>/services/recruiting/v1/jobs`
  before declaring a board WAF-blocked. CPF Board is the live example:
  `career44.sapsf.com/services/recruiting/v1/jobs` 403s,
  `careers.cpf.gov.sg/services/recruiting/v1/jobs` returns 200 from plain
  curl (no cookies, no CSRF token).
- The proxy is not always open: SGX's branded host answers **401 auth-gated**
  (`careers.sgx.com/services/recruiting/v1/jobs` → 401; CPF's → 200). When the
  CSB API is gated, fall back to the **J2W server-rendered search page**:
  `GET /search/?q=&sortColumn=referencedate&sortDirection=desc&startrow=<0,10,20…>`
  returns the jobs in plain HTML (`/job/<Location>-<slug>/<reqid>/` links,
  pagination via `startrow`), and detail pages carry a `Posted` meta date —
  no WAF can block the page the applicant reads (SGX, 2026-08-06: 25 postings).
- Three API variants: **CSB** (`POST /services/recruiting/v1/jobs` — Standard
  Chartered, CPF Board), **RMK** (`GET /tile-search-results/`), and **J2W**
  (server-rendered search page — SGX).
- Workday gotcha: a tenant may 500 on every site name on one instance while
  the real board lives on another instance (`visa.wd5` vs `visa.wd1`).

## Conventions

- Coverage doc provenance line states the verification date; per-row "verified
  state" notes the job count seen at verify time.
- The websearch-fallback backlog lives in **TODO.md** (per-company next
  steps); the coverage doc keeps a short pointer to it. Roadmap order in
  sg-ats-coverage.md = priority order for resolving Websearch → Direct.
- Scanners that need special handling (WAF, JS-only, no REST API) follow the
  `scan-interamt.mjs` pattern: self-contained script, dry-run by default,
  title/location filters from `portals.yml`.
- Zero-token is the design goal: direct API calls, no LLM for fetching.

## Common tasks

- **Probe a new company**: follow the verify steps above, then update
  `sg-ats-coverage.md` (Direct table + vendor matrix + gotchas if you learned
  something new).
- **Resolve a roadmap item**: Carousell (SmartRecruiters behind WordPress
  proxy), GIC/Temasek/OCBC/UOB (likely Workday — need a tenant URL).
- **Run a scanner**: `node scan-interamt.mjs --dry-run` etc. — see each
  script's header. `scan.mjs` needs the career-ops `providers/` layer, which
  is not in this repo.
