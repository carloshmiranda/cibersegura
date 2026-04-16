# Affiliate Click Tracking

This document explains the affiliate click tracking system implemented in CiberPME.

## Overview

The affiliate tracking system monitors user clicks on affiliate links and records analytics data for performance measurement.

## Components

### AffiliateCTABanner Component
Location: `src/components/affiliate-cta-banner.tsx`

Features:
- Displays affiliate tools with tracking
- Adds UTM parameters automatically
- Records click events asynchronously
- Debug logging in development mode

### API Endpoints

#### POST /api/affiliate/click
Records affiliate click events to the database.

**Request Body:**
```json
{
  "article_slug": "string (optional)",
  "cta_position": "string",
  "link_id": "string",
  "destination_url": "string"
}
```

#### GET/POST /api/affiliate/test-click
Test endpoint for debugging click tracking.

- GET: Returns recent clicks and today's count
- POST: Creates a test click for verification

### Database Table

```sql
CREATE TABLE affiliate_clicks (
  id              TEXT PRIMARY KEY,
  date            DATE NOT NULL DEFAULT CURRENT_DATE,
  article_slug    TEXT,
  cta_position    TEXT,
  referrer        TEXT,
  link_id         TEXT NOT NULL,
  destination_url TEXT,
  source_path     TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## UTM Parameter Format

All affiliate links include these UTM parameters:
- `utm_source`: ciberpme.pt
- `utm_medium`: affiliate
- `utm_campaign`: nis2-recommendations
- `utm_content`: {tool-name}-{position}
- `utm_term`: {source-identifier}

## Testing

### Manual Testing
1. Visit `/affiliate-test` page in development
2. Open browser developer tools
3. Click on affiliate tools
4. Check console logs for tracking events

### Automated Testing
Run the test script:
```bash
npm run test-affiliate
```

### API Testing
Create test click:
```bash
curl -X POST http://localhost:3000/api/affiliate/test-click
```

Check recent clicks:
```bash
curl http://localhost:3000/api/affiliate/test-click
```

## Debugging

### Development Mode
In development, the component logs detailed information:
- UTM parameter construction
- Click tracking success/failure
- Error messages for failed requests

### Common Issues

1. **No clicks recorded**: Check browser console for JavaScript errors
2. **UTM parameters missing**: Verify URL construction in console logs
3. **Database errors**: Check environment variables and database connectivity

### Debug Logs
All debug information is logged to the browser console when `NODE_ENV === 'development'`.

## Performance

- Uses `fetch` with `keepalive: true` for reliable tracking
- Minimal delay (50ms) to ensure tracking completes
- Graceful error handling to prevent UX disruption
- Non-blocking click tracking

## Analytics

View affiliate click statistics via `/api/stats`:
```bash
curl http://localhost:3000/api/stats
```

Returns:
```json
{
  "ok": true,
  "date": "2026-04-16",
  "views": 618,
  "pricing_clicks": 0,
  "affiliate_clicks": 5
}
```