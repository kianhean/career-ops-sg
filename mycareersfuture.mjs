#!/usr/bin/env node

/**
 * mycareersfuture.mjs — MyCareersFuture (SG national job board) provider
 *
 * MyCareersFuture is Singapore's national jobs portal — every public SG
 * vacancy gets posted there. The site itself is a React SPA (7 KB shell),
 * so nothing is server-rendered; all search data comes from a public API:
 *
 *   POST https://api.mycareersfuture.gov.sg/v2/search?limit=20&page=0
 *   {"sessionId":"","search":"<query>","postingCompany":[],"sortBy":["new_posting_date"]}
 *
 * Zero-token: verified 2026-08-06 from plain curl — no cookies, no CSRF,
 * no auth header. Response is paginated JSON (`_links.next` carries the
 * next absolute URL, `results[]` holds the postings).
 *
 * Dual role:
 *  - career-ops provider: drop into the skill's providers/ dir — it is
 *    auto-loaded from there (contract: default export with
 *    `id` / `detect(entry)` / `fetch(entry, ctx)`, see scan.mjs header).
 *  - standalone scanner: run it here directly (see Usage) for a quick
 *    sanity check without the career-ops layer.
 *
 * Usage (standalone):
 *   node mycareersfuture.mjs --dry-run                # newest postings, whole board
 *   node mycareersfuture.mjs --dry-run --search "software engineer"
 *   node mycareersfuture.mjs --dry-run --search "devops" --max-pages 3
 *
 * Portals.yml config (career-ops, under job_boards):
 *   - name: MyCareersFuture
 *     careers_url: https://www.mycareersfuture.gov.sg/search
 *     provider: mycareersfuture
 *     # search: "" | "software engineer" | ["devops", "data"]  (optional;
 *     # empty = whole board, newest first — a live national feed)
 */

import { pathToFileURL } from 'url';
import { readFileSync, existsSync } from 'fs';

const API_BASE  = 'https://api.mycareersfuture.gov.sg/v2/search';
const UA        = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const PAGE_SIZE = 20;        // API max is 100; 20 is what the site uses
const MAX_PAGES = 50;        // hard cap per search (1000 postings) — safety valve
const MAX_RETRIES = 2;

// ── API call ─────────────────────────────────────────────────────────

async function postSearch(search, page, { limit = PAGE_SIZE } = {}) {
  const res = await fetch(`${API_BASE}?limit=${limit}&page=${page}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': UA,
    },
    body: JSON.stringify({
      sessionId: '',
      search: search || '',
      postingCompany: [],
      sortBy: ['new_posting_date'],
    }),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`MCF API ${res.status} (search="${search}", page=${page})`);
  return res.json();
}

async function postSearchWithRetry(search, page) {
  let lastErr;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await postSearch(search, page);
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_RETRIES) await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
    }
  }
  throw lastErr;
}

// ── Result → job mapping ─────────────────────────────────────────────

function districtLabel(result) {
  const districts = result.address?.districts;
  if (Array.isArray(districts) && districts.length > 0) {
    return districts.map(d => d.location).filter(Boolean).join('; ');
  }
  return 'Singapore';
}

function toJob(result, fallbackCompany) {
  const metadata = result.metadata || {};
  const company  = result.postedCompany?.name || result.hiringCompany?.name || fallbackCompany;
  const salary   = result.salary;
  const postedAt = metadata.newPostingDate ? Date.parse(metadata.newPostingDate) : undefined;

  const job = {
    title:    result.title,
    url:      metadata.jobDetailsUrl,
    company,
    location: districtLabel(result),
  };
  // Timestamp so scan.mjs's posted-date filtering/early-stop work
  if (Number.isFinite(postedAt)) job.postedAt = postedAt;
  // MCF is the national SG board — salaries are always SGD (Monthly)
  if (salary && (salary.minimum || salary.maximum)) {
    job.salary = {
      min: salary.minimum ?? null,
      max: salary.maximum ?? null,
      currency: 'SGD',
      period: salary.type?.salaryType?.toLowerCase() || 'monthly',
    };
  }
  return job;
}

// ── career-ops provider contract ─────────────────────────────────────

const provider = {
  id: 'mycareersfuture',

  detect(entry) {
    if (/mycareersfuture\.gov\.sg/.test(entry.careers_url || '')) return { url: entry.careers_url };
    return null;
  },

  /**
   * fetch(entry, ctx) — required by scan.mjs.
   * Searches are configured per entry: `search` (string) or `queries`
   * (array of strings); absent/empty means the whole board, newest first.
   * Paginates until a page is exhausted, the page cap is hit, or every
   * posting on a page predates ctx.sinceMs (newest-first ordering makes
   * that a valid early stop). Returns job objects; does NOT filter —
   * scan.mjs's own date/salary filters decide downstream.
   */
  async fetch(entry, ctx = {}) {
    const searches = Array.isArray(entry.queries) ? entry.queries
      : [entry.search || entry.query || ''];
    const sinceMs = Number.isFinite(ctx.sinceMs) ? ctx.sinceMs : null;

    const jobs = [];
    const seen = new Set();

    for (const search of searches) {
      let page = 0;
      while (page < MAX_PAGES) {
        const data = await postSearchWithRetry(search, page);
        const results = Array.isArray(data.results) ? data.results : [];

        // Stop conditions (checked before mapping so we never half-paginate)
        if (results.length === 0) break;
        if (sinceMs) {
          const newestOnPage = results
            .map(r => r.metadata?.newPostingDate)
            .filter(Boolean)
            .sort()
            .pop();
          if (newestOnPage && Date.parse(newestOnPage) < sinceMs) {
            // Everything on later pages is older too — newest-first ordering
            break;
          }
        }

        for (const result of results) {
          if (result.status?.jobStatus && result.status.jobStatus !== 'Open') continue;
          const jobId = result.metadata?.jobPostId;
          if (jobId && seen.has(jobId)) continue;
          if (jobId) seen.add(jobId);
          jobs.push(toJob(result, entry.name));
        }

        page++;
        if (results.length < PAGE_SIZE) break; // last page reached
      }
    }
    return jobs;
  },
};

export default provider;

// ── Standalone CLI (dry-run by default, like scan-interamt.mjs) ──────

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const args = process.argv.slice(2);
  const searchArg = argValue(args, '--search');
  const maxPagesArg = Number(argValue(args, '--max-pages') || 5);

  function argValue(argv, flag) {
    const i = argv.indexOf(flag);
    return i !== -1 ? argv[i + 1] : null;
  }

  async function main() {
    // Reuse the provider config shape from portals.yml if present
    // (job_boards → the entry whose provider is mycareersfuture),
    // else fall back to --search / whole board.
    // js-yaml is optional here: career-ops has it, this repo doesn't —
    // without it we just use --search.
    let entry = { name: 'MyCareersFuture', search: searchArg || '' };
    try {
      const yaml = await import('js-yaml');
      if (existsSync('portals.yml')) {
        const cfg = yaml.load(readFileSync('portals.yml', 'utf-8')) || {};
        const board = (cfg.job_boards || []).find(b => b.provider === 'mycareersfuture');
        if (board) entry = { ...entry, ...board };
      }
    } catch { /* no js-yaml — standalone mode */ }

    console.log(`MyCareersFuture — search: "${entry.search ?? ''}" (showing first ${maxPagesArg * PAGE_SIZE})`);
    const jobs = await provider.fetch(entry, {});
    const shown = jobs.slice(0, maxPagesArg * PAGE_SIZE);

    for (const j of shown) {
      const date = j.postedAt ? new Date(j.postedAt).toISOString().slice(0, 10) : '—';
      const sal  = j.salary ? ` | $${j.salary.min ?? '?'}-${j.salary.max ?? '?'} SGD` : '';
      console.log(`  ${date} | ${j.company} | ${j.title} | ${j.location}${sal}`);
    }
    console.log(`\n${jobs.length} postings fetched (dry run — nothing saved; career-ops writes the files)`);
  }

  main().catch(err => {
    console.error('Fatal:', err.message);
    process.exit(1);
  });
}
