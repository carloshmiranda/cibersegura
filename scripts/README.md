# CiberPME Scripts

## IndexNow Batch Submission

### Overview

The `indexnow-batch.js` script automatically submits all site URLs to the IndexNow API for instant search engine indexing. This ensures new content and updates are quickly discovered by Bing, Yandex, and other IndexNow-compatible search engines.

### Usage

```bash
# Run the IndexNow batch submission
npm run indexnow

# Or run directly with Node.js
node scripts/indexnow-batch.js
```

### What it does

1. **Validates IndexNow key** — Checks that `/indexnow-key.txt` is accessible
2. **Loads all URLs** — Dynamically discovers blog posts from `src/lib/posts.ts`
3. **Submits to IndexNow API** — Sends batch request with all site URLs
4. **Reports status** — Shows success/failure with detailed logging

### URLs submitted

- Homepage (`/`)
- Blog listing (`/blog`)
- Resources page (`/recursos`)
- FAQ page (`/faq`)
- All individual blog posts (`/blog/[slug]`)

**Total:** 16+ URLs (4 static pages + 12+ blog articles)

### Response codes

- `200` — Success: URLs accepted for indexing
- `202` — Success: URLs queued for processing
- `400` — Bad request (check URL format/key)
- `403` — Forbidden (check key validation)
- `429` — Rate limited (try again later)

### Configuration

The script automatically detects:
- **Site URL:** `https://ciberpme.vercel.app` (production) or `SITE_URL` env var
- **IndexNow key:** From `/public/indexnow-key.txt`
- **Blog posts:** Dynamically loaded from `src/lib/posts.ts`

### When to run

- After publishing new blog articles
- After updating existing content
- After major site structure changes
- As part of deployment pipeline
- Manually when needed for re-indexing

### SEO Benefits

- **Instant discovery** — New content indexed within hours, not days
- **Update propagation** — Content changes reflected quickly in search results
- **Competitive advantage** — Faster indexing than waiting for crawler visits
- **Multi-engine support** — Works with Bing, Yandex, Seznam, Naver

### Troubleshooting

**Key validation fails:**
- Ensure `/public/indexnow-key.txt` exists and is accessible
- Verify the key matches the one in the script configuration

**Network errors:**
- Check internet connectivity
- Verify firewall/proxy settings allow HTTPS requests

**Rate limiting:**
- IndexNow has limits on submission frequency
- Wait before retrying if you get 429 responses

### Integration

This script integrates with the site's existing SEO infrastructure:

- **Sitemap:** Generated at `/sitemap.xml` with all URLs and lastmod dates
- **Robots:** Includes `Sitemap:` directive for crawler discovery
- **Search Console:** Bing WMT meta tag positioned in layout for verification

Run `npm run indexnow` after any content updates to ensure optimal search visibility.