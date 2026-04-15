# CiberPME Scripts

## IndexNow Automation

### Automated Deploy Hook (Recommended)

The site now includes **automatic IndexNow submission** after each deployment with new content. This system intelligently detects only new or updated URLs and submits them, saving API quotas and improving efficiency.

**Setup**: See [docs/INDEXNOW_AUTOMATION.md](../docs/INDEXNOW_AUTOMATION.md) for complete configuration guide.

**Benefits:**
- ✅ **Zero manual intervention** — Runs automatically after Vercel deployments
- ✅ **Smart detection** — Only submits new/updated content, not everything
- ✅ **Immediate indexing** — New articles indexed within minutes of going live

### Manual Batch Submission

The `indexnow-batch.js` script provides manual control for submitting **all site URLs** to IndexNow. Use this for initial setup or when you need to resubmit everything.

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

## API Endpoints

### Automated Endpoints

- **`/api/indexnow-deploy`** — Smart submission of new/updated URLs only
- **`/api/deploy-hook`** — Vercel deployment webhook endpoint

### Manual Endpoints  

- **`/api/indexnow-submit`** — Submit all URLs (bulk submission)

### When to use each

**Use automated system for:**
- Regular content publishing workflow
- Immediate indexing of new articles
- Efficient daily operations

**Use manual script for:**
- Initial site setup
- Major site restructuring  
- Emergency resubmission of all content
- Troubleshooting indexing issues

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