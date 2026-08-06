# TODO — Websearch fallback → Direct

The 27 SG/APAC companies that still scan via websearch fallback
(`scan_query`) instead of a zero-token ATS provider. Each row records what
was tried and why the board isn't direct yet — the "Known ATS / why not
direct" column IS the next step. When a company gets resolved, move it to
the Direct table in `sg-ats-coverage.md` (verify-then-commit) and remove
it here.

Priority order for tackling these: the **Expansion roadmap** section in
`sg-ats-coverage.md`.

| Company | Known ATS / why not direct |
|---|---|
| Sea Group | careers SPA; no vendor markers; SR slugs verified absent |
| Shopee | JS shell (3.5 KB); no markers; gh/ashby/lever/SR slugs absent |
| GoTo Group | careers SPA; no markers |
| Traveloka | careers SPA; no markers |
| Carousell | **SmartRecruiters-backed** (WordPress `api.php` proxy) but private company id — public SR API 404s |
| Ninja Van | no markers; lever `ninjavan` slug is a *different* company (FMCG sales) — false positive excluded |
| Atlassian | careers SPA; gh/ashby/lever slugs absent |
| Canva | JS shell; no markers; slugs absent |
| Aspire | SPA; no markers |
| StashAway | SPA; no markers |
| Endowus | SPA; no markers |
| Wise | SPA; footer "SmartRecruiters Attrax" link is a privacy/legal reference, not the ATS |
| Revolut | 873 KB SPA; no markers |
| Hudson River Trading | Greenhouse board exists but is **talent-community only** (campus listings); real board is custom ATS |
| DRW | no markers; gh `drw`/`drwgroup` absent |
| Citadel Securities | JS shell; gh `citadel` (0 postings)/`citadelsec`/`citadelsecurities` absent |
| FactSet | `careers.factset.com` **DNS-unresolvable** from this network — ATS unknown |
| Bloomberg | small page, no markers — custom recruiting system |
| LSEG | `careers.lseg.com` **DNS-unresolvable** from this network — ATS unknown |
| OCBC | no markers; slugs absent |
| UOB | no markers; slugs absent |
| GIC | SPA; no markers; likely Workday but tenant not derivable from a name |
| Temasek | 388-byte JS shell |
| MAS | no markers; gh `mas` = **Midwest Applied Solutions** (wrong company) — false positive excluded |
| Fullerton Fund Management | no markers |
| NBIM | no markers |
| NETS | no markers; SR slugs absent |

Also websearch: the boards in `search_queries` (MyCareersFuture ×3, LinkedIn ×3,
Nodeflair ×2, Tech in Asia, Glints, RemoteOK, Remotive ×2, WeWorkRemotely ×2,
Himalayas, Working Nomads, Greenhouse/Ashby/Lever APAC cross-portal discovery ×6,
HN Who's Hiring).
