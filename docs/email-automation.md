# Email Automation Setup

This guide explains how to set up automated follow-up emails for the CiberPME waitlist.

## How it Works

1. **Immediate Welcome Email**: When someone joins the waitlist via `/api/waitlist`, they immediately receive a welcome email.

2. **Scheduled Follow-up Emails**: The system automatically sends follow-up emails based on the `delay_hours` configured in the `email_sequences` table.

3. **Email Templates**: All email content is stored in the database (`email_sequences` table) and can be managed via the `/api/admin/seed-emails` endpoint.

## Current Email Sequences

### Waitlist Welcome (Immediate)
- **Sequence**: `waitlist_welcome`
- **Delay**: 0 hours (immediate)
- **Content**: Welcome message with position in queue, referral code, and security tip

### Waitlist Follow-up (7 days later)
- **Sequence**: `waitlist_followup` 
- **Delay**: 168 hours (7 days)
- **Content**: Security check-up checklist and recommended tools

## Environment Variables Required

```bash
# Email sending (Resend)
RESEND_API_KEY=re_xxxxx
SENDING_DOMAIN=yourdomain.com  # Optional, defaults to resend.dev

# Database
DATABASE_URL=postgresql://...

# Admin API access
ADMIN_API_TOKEN=your_secret_token_here

# Application URL (for referral links)
NEXT_PUBLIC_URL=https://ciberpme.vercel.app
```

## Manual Testing

### Check what emails are ready to send (dry run):
```bash
npm run send-emails:dry-run
```

### Send scheduled emails manually:
```bash
npm run send-emails
```

### View current email sequences:
```bash
curl -H "Authorization: Bearer $ADMIN_API_TOKEN" \
  https://ciberpme.vercel.app/api/admin/seed-emails
```

## Automation Setup

### Option 1: Vercel Cron (Recommended)

Create `vercel.json` in your project root:

```json
{
  "crons": [
    {
      "path": "/api/admin/send-scheduled-emails",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

This runs every 6 hours. You'll need to modify the API route to handle cron requests without authentication for Vercel Cron.

### Option 2: External Cron Service

Set up a cron job on your server or use a service like cron-job.org:

```bash
# Run every hour
0 * * * * /usr/bin/curl -X POST \
  -H "Authorization: Bearer $ADMIN_API_TOKEN" \
  https://ciberpme.vercel.app/api/admin/send-scheduled-emails
```

### Option 3: GitHub Actions

Create `.github/workflows/send-emails.yml`:

```yaml
name: Send Scheduled Emails
on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:  # Allow manual trigger

jobs:
  send-emails:
    runs-on: ubuntu-latest
    steps:
      - name: Send scheduled emails
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.ADMIN_API_TOKEN }}" \
            https://ciberpme.vercel.app/api/admin/send-scheduled-emails
```

## Email Template Management

Email templates are stored in the database and can be updated via:

1. **Seed new templates**: `npm run seed-emails`
2. **Direct database updates**: Modify the `email_sequences` table
3. **API updates**: Use the admin seed-emails endpoint

### Template Variables

The following variables are automatically replaced in email templates:

- `{{NAME}}` - Subscriber's name (or "there" if not provided)
- `{{POSITION}}` - Position in waitlist queue  
- `{{REFERRAL_CODE}}` - Subscriber's unique referral code
- `{{REFERRAL_LINK}}` - Full referral URL with code

## Monitoring

### Email Logs
All sent emails are logged in the `email_log` table:

```sql
SELECT * FROM email_log ORDER BY created_at DESC LIMIT 10;
```

### Send Statistics
View send counts per sequence:

```sql
SELECT sequence, step, send_count, open_count, click_count 
FROM email_sequences 
WHERE is_active = true;
```

### Bounce/Delivery Tracking
Email delivery status is tracked via Resend webhooks (if configured).

## Troubleshooting

### No emails being sent
1. Check environment variables are set correctly
2. Verify Resend API key is valid
3. Run dry-run to see if candidates are found: `npm run send-emails:dry-run`
4. Check email_log table for error details

### Duplicate emails
The system prevents duplicates by checking the `email_log` table. If someone has already received a specific sequence/step, they won't receive it again.

### Template errors
If email templates contain invalid variables or HTML, the send will fail. Check the email_sequences table for proper template syntax.