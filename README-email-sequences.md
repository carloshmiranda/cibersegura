# Email Sequences for CiberPME Newsletter

This implementation adds comprehensive email sequences for the CiberPME newsletter system.

## Overview

The waitlist system was already functional, but email sequences were missing from the database. This update adds:

1. **Welcome Email** - Sent immediately when users join the waitlist
2. **Follow-up Email** - Security check-up sent after 7 days
3. **Newsletter Template** - Template for weekly newsletters (manual sending)

## Features

- 🇵🇹 **Portuguese content** tailored for SME cybersecurity
- 📧 **Professional HTML emails** with responsive design
- 🔄 **Automated sequences** with configurable delays
- 📊 **Template variables** for personalization
- 🛡️ **Security-focused content** aligned with blog themes

## Email Sequences

### 1. Waitlist Welcome (`waitlist_welcome`)
- **Trigger**: Immediate after signup
- **Content**: Welcome message, position in queue, referral code
- **Variables**: `{{NAME}}`, `{{POSITION}}`, `{{REFERRAL_CODE}}`, `{{REFERRAL_LINK}}`

### 2. Security Check-up (`waitlist_followup`) 
- **Trigger**: 7 days after signup
- **Content**: Security assessment checklist for SMEs
- **Variables**: `{{NAME}}`

### 3. Weekly Newsletter (`weekly_newsletter`)
- **Trigger**: Manual (template only)
- **Content**: Threat alerts, tips, articles, tool recommendations
- **Variables**: `{{WEEK_DATE}}`, `{{EDITION_NUMBER}}`, `{{THREAT_DESCRIPTION}}`, etc.

## Setup

### 1. Database Setup
The email sequences require the existing `email_sequences` table (already in `schema.sql`).

### 2. Seed Email Templates
Use either method:

**Option A: NPM Script**
```bash
npm run seed-emails
```

**Option B: API Endpoint**
```bash
curl -X POST https://ciberpme.vercel.app/api/admin/seed-emails \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 3. Environment Variables
Required in `.env.local` or Vercel environment:

```env
DATABASE_URL=postgresql://...
RESEND_API_KEY=re_...
SENDING_DOMAIN=your-domain.com
ADMIN_API_TOKEN=secure-random-token
```

## Integration

The waitlist API (`/api/waitlist`) automatically:
1. Looks up the welcome email template from `email_sequences`
2. Replaces variables with user data
3. Sends via Resend
4. Logs delivery in `email_log`

## Content Strategy

All emails follow CiberPME's content guidelines:
- **Industry-specific**: Cybersecurity focus for Portuguese SMEs
- **Actionable**: Practical tips and concrete next steps  
- **Educational**: Links to blog articles and resources
- **Professional**: Corporate-appropriate tone and design
- **Compliant**: GDPR-friendly with unsubscribe options

## Testing

Test email delivery:
1. Join waitlist via newsletter form
2. Check email delivery and formatting
3. Verify variable replacement
4. Test referral links and CTAs

## Future Enhancements

- Additional sequence steps (day 14, day 30)
- A/B test variants for subject lines
- Dynamic content based on user segments
- Automated newsletter scheduling
- Email analytics dashboard