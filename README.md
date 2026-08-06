# career-ops-sg

Singapore ATS coverage expansion for the [career-ops](https://github.com/santifer/career-ops) skill.

## Goal

**Move Singapore/APAC employers from "websearch fallback" to "direct, zero-token
scanning"** in career-ops. career-ops scans job boards through provider modules
(`providers/*.mjs`) — one per ATS vendor (Greenhouse, Workday, Lever, Ashby,
SuccessFactors, …). The vendor layer exists; the gap is at the **company level**:
knowing which tenant/slug/endpoint each Singapore employer actually runs on.

This repo is that knowledge base, in one place:

- **`sg-ats-coverage.md`** — the coverage map: every tracked SG/APAC employer,
  its ATS vendor, the career-ops provider that serves it, and verified live
  status. "Direct" rows scan end-to-end today; the **Gap** sections are the
  expansion targets.
- **Scan scripts** — working reference implementations for boards that need
  special handling (Playwright-driven, WAF-blocked, or unusual ATS setups),
  copied from career-ops so they can be developed and verified here.

## Contents

| File | Purpose |
|---|---|
| `sg-ats-coverage.md` | **The deliverable** — SG ATS coverage map, verification method, vendor matrix, expansion roadmap |
| `scan.mjs`, `scan-ats-full.mjs` | career-ops scanners (reference copies; require the career-ops `providers/` layer to run) |
| `scan-interamt.mjs` | Playwright-driven scanner for Interamt.de (Wicket — no REST API); the pattern for WAF'd/JS-only boards |

## How a company moves to Direct

1. Fetch the careers page, grep for ATS vendor markers (`myworkdayjobs`,
   `sapsf`, `icims`, `greenhouse`, …).
2. Probe the vendor's public API with the candidate tenant/slug.
3. **Verify identity** — never trust a 200 alone (SmartRecruiters `/postings`
   200s on any slug; Lever can return another company's postings).
4. Confirm end-to-end: the board returns a real job count.
5. Record the verified entry in `sg-ats-coverage.md` (Direct table + matrix),
   with the exact endpoint so the provider can be configured upstream.

Rule of thumb: **verify, then commit.** A wrong slug fails silently and looks
like zero openings — never hand-guess a board into the coverage map.

## Current state (2026-08-06)

- **30 companies direct** across 10 ATS vendors — incl. **CPF Board**
  (SuccessFactors CSB, added 2026-08-06: 23 postings, API reachable zero-token
  via `careers.cpf.gov.sg/services/recruiting/v1/jobs` despite the raw
  sapsf.com instance being WAF-blocked).
- **28 companies** on websearch fallback — the roadmap in
  `sg-ats-coverage.md` is the priority order to resolve next.

## Using this repo with the career-ops skill

The workflow: this repo holds the verified facts; you hand them to the skill
with a prompt, and the skill configures its own `portals.yml` from them.

### 1. Install career-ops next to this repo

```sh
cd ~/Projects
npx @santifer/career-ops init      # clones the skill into ./career-ops, installs deps
cd career-ops
npm run doctor                     # validates prerequisites
```

Layout — both repos side by side, so the prompt can reference this repo by
relative path:

```
~/Projects/
├── career-ops-sg/     # this repo (coverage knowledge)
└── career-ops/        # the skill (scanner + providers)
```

### 2. Configure portals.yml from the coverage map

In the `career-ops` directory, give your AI CLI this prompt (adjust the path if
the repos live elsewhere):

```text
I want to scan Singapore companies directly with your providers.
Read ../career-ops-sg/sg-ats-coverage.md — the Singapore ATS coverage map.

From the "Direct ATS" table, add every company to portals.yml
`tracked_companies`, following the schema in templates/portals.example.yml:
- name = the company name column
- careers_url = the Board URL column
- provider = the "career-ops provider" column, as the module name without
  the .mjs suffix (e.g. workday, greenhouse, successfactors)
Also add Jobstreet Singapore (from the "Also direct" note) under
`job_boards` with siteKey: SG-Main.
Keep my existing title_filter / location_filter untouched.
Then list how many companies you configured, and run a dry-run scan
(`node scan.mjs --dry-run`) so we can confirm real job counts before saving.
```

The skill maps each row to a working board URL — no hand-guessing of tenants
or slugs, because every Direct row was verified before being committed here.

### 3. Run scans

```sh
node scan.mjs --verify   # scan portals; Playwright-drops expired postings
/career-ops scan         # same, via the skill's slash command
/career-ops pipeline     # evaluate new offers
```

`scan-interamt.mjs` in this repo is a standalone example of a Playwright-only
scanner — the pattern to copy when a board has no API and the vendor isn't
covered by a provider module yet.

### 4. Feed verified findings back

When a scan uncovers a new Singapore board, or you resolve a company from the
Websearch fallback table, verify it (see "How a company moves to Direct") and
**commit the updated row to `sg-ats-coverage.md`**. The career-ops install runs
from ephemeral containers — nothing persists uncommitted, and the prompt in
step 2 is only as good as this repo's coverage map.

Also run a scanner here for special-handling boards:

```sh
node scan-interamt.mjs --dry-run   # see each script's header for flags
```
