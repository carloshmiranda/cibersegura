# IndexNow Automation Setup

This document explains how to set up automatic IndexNow submissions after each deployment with new content.

## Architecture

The system uses Vercel Deploy Hooks to automatically submit new and updated URLs to IndexNow after each successful deployment:

```
Vercel Deploy → Deploy Hook → /api/deploy-hook → /api/indexnow-deploy → IndexNow API
```

## Current Implementation

### 1. Deploy Hook Endpoint (`/api/deploy-hook`)
- Receives webhook calls from Vercel after successful deployments
- Includes basic security checks (User-Agent and optional secret token)
- Calls the IndexNow deployment endpoint

### 2. IndexNow Deploy Endpoint (`/api/indexnow-deploy`)
- Analyzes current content vs. last submission
- Identifies new or updated blog posts since last run
- Submits only new/updated URLs to IndexNow API
- Also pings Bing sitemap for additional coverage

### 3. State Management
- Tracks last submission timestamp and submitted URLs
- Currently uses environment variables (can be enhanced with database storage)
- Prevents duplicate submissions of unchanged content

## Setup Instructions

### 1. Vercel Deploy Hook Configuration

1. Go to your Vercel project settings
2. Navigate to "Git" → "Deploy Hooks"
3. Create a new deploy hook with:
   - **Name**: `IndexNow Auto Submission`
   - **Branch**: `main`
   - **URL**: `https://ciberpme.vercel.app/api/deploy-hook`

### 2. Optional Security Enhancement

For additional security, set up a secret token:

1. Add environment variable in Vercel:
   ```
   DEPLOY_HOOK_SECRET=your-secure-random-token-here
   ```

2. Configure your deploy hook to include the Authorization header:
   ```
   Authorization: Bearer your-secure-random-token-here
   ```

### 3. Manual Testing

Test the system manually:

```bash
# Check current status
curl https://ciberpme.vercel.app/api/indexnow-deploy

# Trigger manual submission
curl -X POST https://ciberpme.vercel.app/api/indexnow-deploy

# Test deploy hook
curl -X POST https://ciberpme.vercel.app/api/deploy-hook \
  -H "Content-Type: application/json" \
  -H "User-Agent: vercel"
```

## How It Works

### New Content Detection

The system detects new content by:

1. **New Posts**: Published after the last submission timestamp
2. **Updated Posts**: Modified (`updatedAt`) after the last submission
3. **Missing URLs**: URLs not in the previous submission list

### Submission Logic

- **First Run**: Submits all URLs (homepage, blog listing, FAQ, all posts)
- **Subsequent Runs**: Only submits new or updated content
- **Deduplication**: Removes duplicate URLs before submission
- **Error Handling**: Continues even if Bing ping fails

### IndexNow API Integration

- Uses the official IndexNow API at `api.indexnow.org`
- Includes proper User-Agent headers for identification
- Validates IndexNow key file accessibility
- Provides detailed logging for debugging

## Benefits

1. **Automatic**: No manual intervention required
2. **Efficient**: Only submits new/changed content
3. **Fast**: Search engines index new content immediately
4. **Reliable**: Built-in error handling and logging
5. **Secure**: Optional authentication for webhook calls

## Monitoring

### Logs
Check Vercel function logs for:
- Deploy hook triggers
- IndexNow submission results
- Error messages and debugging info

### Status Endpoint
Monitor system status:
```bash
curl https://ciberpme.vercel.app/api/indexnow-deploy
```

Returns information about:
- Last submission details
- Current content statistics
- What would be submitted next

## Alternative Setup Methods

### 1. NPM Scripts (Manual/CI)
```bash
npm run indexnow:auto
```

### 2. Direct API Call (Scheduled)
Set up a cron job or scheduled task to call:
```bash
curl -X POST https://ciberpme.vercel.app/api/indexnow-deploy
```

### 3. GitHub Actions (If Workflow Permissions Available)
A GitHub workflow can be created to trigger after pushes to main, but this requires workflow write permissions.

## Troubleshooting

### Common Issues

1. **Deploy Hook Not Triggering**
   - Verify the hook URL in Vercel settings
   - Check User-Agent requirements in logs

2. **IndexNow Submissions Failing**
   - Verify IndexNow key file is accessible
   - Check API rate limits (max 200 URLs per submission)

3. **State Not Persisting**
   - Consider upgrading to database storage for production
   - Currently relies on environment variables

### Debug Steps

1. Check deploy hook health:
   ```bash
   curl https://ciberpme.vercel.app/api/deploy-hook
   ```

2. Check IndexNow status:
   ```bash
   curl https://ciberpme.vercel.app/api/indexnow-deploy
   ```

3. Review Vercel function logs for error details

## Future Enhancements

1. **Database Storage**: Replace env var state with proper database storage
2. **Analytics**: Track submission success rates and timing
3. **Batch Processing**: Handle large content updates more efficiently
4. **Webhook Verification**: Add cryptographic verification for Vercel webhooks
5. **Multi-Search Engine**: Add support for other search engine submission APIs

## Related Files

- `/src/app/api/deploy-hook/route.ts` - Vercel deploy hook handler
- `/src/app/api/indexnow-deploy/route.ts` - IndexNow submission logic
- `/src/app/api/indexnow-submit/route.ts` - Bulk submission endpoint
- `/scripts/indexnow-incremental.js` - Standalone script version
- `/public/fc431a309850fb7ff6682a95bee49ba3.txt` - IndexNow key file