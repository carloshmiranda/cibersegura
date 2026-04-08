# Smart Internal Linking System

## Overview

The Smart Internal Linking System automatically analyzes CiberPME blog content and suggests strategic internal links between related posts to improve SEO, user engagement, and content discoverability.

## Features

### 🤖 Automated Analysis
- **Content similarity detection** based on cybersecurity keywords and topics
- **Category-based relevance** scoring for related posts
- **Smart anchor text** suggestions using domain-specific terminology
- **Confidence scoring** to prioritize high-value linking opportunities

### 🎯 SEO Benefits
- **Improved internal link structure** for better search engine crawling
- **Enhanced topic clustering** around cybersecurity themes
- **Better content discoverability** through strategic cross-references
- **Increased page authority** distribution across related content

### 📊 Analytics & Reporting
- **Comprehensive analysis** of all blog posts
- **Link opportunity identification** with confidence scores
- **Existing link tracking** to avoid duplicate suggestions
- **Keyword density analysis** for content optimization

## How It Works

### 1. Content Analysis
The system analyzes blog posts using Portuguese cybersecurity terminology:

```javascript
// Key categories analyzed:
- Threats: ransomware, phishing, malware, DDoS
- Best Practices: passwords, backup, updates, firewall
- Tools: VPN, certificates, monitoring
- Legislation: RGPD, NIS2, DPO
- Business: PME, collaboration, clients
```

### 2. Similarity Scoring
Posts are compared based on:
- **Keyword overlap** (shared cybersecurity terms)
- **Category relationships** (same/related topics)
- **Content relevance** (contextual similarity)
- **Existing links** (to avoid duplication)

### 3. Link Suggestions
For each potential link, the system provides:
- **Source and target posts** with slugs
- **Recommended anchor text** (domain-relevant terms)
- **Context sentence** where the link would appear
- **Confidence score** (0-100%) based on relevance
- **Link type** (exact match, keyword match, topic match)

## Usage

### Command Line Analysis

```bash
# Analyze all posts
npm run analyze-links

# Show statistics overview
npm run analyze-links:stats

# Analyze specific post
npm run analyze-links -- --post nis2-cadeia-fornecimento-pme
```

### Admin Interface

Visit `/admin/internal-linking` to access the interactive admin panel:

1. **Authenticate** with admin token (`ADMIN_API_TOKEN`)
2. **Review suggestions** with confidence scores and context
3. **Select links** to apply to posts
4. **Preview changes** before implementation
5. **Apply modifications** (currently simulation mode)

### API Endpoints

#### GET `/api/admin/internal-linking`
Generates linking analysis for all posts.

**Headers:**
```
Authorization: Bearer {ADMIN_API_TOKEN}
```

**Response:**
```json
{
  "ok": true,
  "data": [
    {
      "sourcePost": { "slug": "...", "title": "..." },
      "suggestions": [
        {
          "targetPost": "nis2-registo-passo-passo",
          "anchorText": "registo NIS2",
          "contextSentence": "Para cumprir com a diretiva, é essencial conhecer o processo de registo NIS2.",
          "confidence": 0.85,
          "type": "keyword_match"
        }
      ],
      "keywordDensity": { "nis2": 5, "rgpd": 2 },
      "existingLinks": ["outro-artigo"]
    }
  ],
  "meta": {
    "total_posts": 15,
    "posts_with_suggestions": 8,
    "total_suggestions": 23,
    "high_confidence_suggestions": 12
  }
}
```

#### POST `/api/admin/internal-linking/apply`
Applies selected suggestions to a post.

**Headers:**
```
Authorization: Bearer {ADMIN_API_TOKEN}
Content-Type: application/json
```

**Body:**
```json
{
  "post_slug": "nis2-cadeia-fornecimento-pme",
  "suggestions": [
    {
      "targetPost": "nis2-registo-passo-passo",
      "anchorText": "registo NIS2",
      "contextSentence": "Para cumprir com a diretiva, é essencial conhecer o processo de registo NIS2."
    }
  ]
}
```

## Configuration

### Environment Variables
```bash
ADMIN_API_TOKEN=your-secret-token  # Required for admin access
```

### Keywords Customization
Edit `src/lib/internal-linking.ts` to modify the `CYBERSECURITY_KEYWORDS` object for different terminology or add new categories.

```javascript
const CYBERSECURITY_KEYWORDS = {
  'new_category': ['termo1', 'termo2', 'termo alternativo'],
  // ... existing categories
};
```

## Best Practices

### 1. Content Quality
- **Review suggestions** manually before applying
- **Maintain natural flow** — links should enhance readability
- **Avoid over-linking** — max 3-5 internal links per post
- **Use relevant anchor text** that describes the destination

### 2. SEO Strategy
- **Link to authoritative posts** with comprehensive coverage
- **Create topic clusters** around main cybersecurity themes
- **Update older posts** with links to newer, relevant content
- **Monitor click-through rates** to measure effectiveness

### 3. Maintenance
- **Run analysis monthly** to identify new linking opportunities
- **Review existing links** when updating post content
- **Track broken links** and update as content evolves
- **Analyze performance** using Google Analytics internal link reports

## Technical Implementation

### File Structure
```
src/lib/internal-linking.ts          # Core analysis logic
src/app/api/admin/internal-linking/  # API endpoints
src/app/admin/internal-linking/      # Admin interface
scripts/analyze-internal-linking.js  # CLI tool
```

### Key Functions
- `analyzeInternalLinking()` — Analyzes single post
- `generateInternalLinkingReport()` — Full site analysis
- `applyLinkSuggestion()` — Modifies post content
- `validateSuggestion()` — Checks if suggestion is still valid

## Future Enhancements

### Planned Features
- **Automatic link application** to posts.ts file
- **Link performance tracking** with analytics integration
- **Content gap analysis** to identify missing topic coverage
- **Multi-language support** for international expansion
- **Integration with CMS** for real-time suggestions

### Advanced Analytics
- **Link effectiveness scoring** based on user behavior
- **Topic authority mapping** across all content
- **Competitive analysis** against other cybersecurity blogs
- **Content optimization recommendations** beyond linking

## Support

For issues or questions about the internal linking system:
1. Check the CLI output for detailed analysis
2. Review the admin interface for visual feedback
3. Verify `ADMIN_API_TOKEN` configuration
4. Test with a single post before running full analysis

The system is designed to be conservative with suggestions — higher confidence thresholds ensure quality over quantity in linking recommendations.