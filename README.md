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

## Usage

```sh
# Run a scanner (see each file's header for flags)
node scan-interamt.mjs --dry-run
```

The full career-ops pipeline (`node scan.mjs`, `/career-ops`) runs from the
upstream skill's repo, configured via `portals.yml` — this repo produces the
verified facts that go into that configuration.
