#!/usr/bin/env node

/**
 * Weekly newsletter automation script for CiberPME
 *
 * This script sends the automated weekly newsletter to all active subscribers.
 * Should be run weekly (e.g., every Monday at 9 AM) via cron or a scheduler.
 *
 * Usage:
 *   node scripts/send-weekly-newsletter.js
 *   node scripts/send-weekly-newsletter.js --dry-run
 *
 * Environment variables required:
 *   - ADMIN_API_TOKEN: Secret token for admin API access
 *   - NEXT_PUBLIC_URL: Base URL of the application
 *   - RESEND_API_KEY: For sending emails (configured in env)
 */

import process from 'process';

const isDryRun = process.argv.includes('--dry-run');
const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
const adminToken = process.env.ADMIN_API_TOKEN;

if (!adminToken) {
  console.error('❌ ADMIN_API_TOKEN environment variable is required');
  process.exit(1);
}

async function sendWeeklyNewsletter() {
  try {
    console.log(`📧 ${isDryRun ? 'Previewing' : 'Sending'} weekly newsletter...`);

    const endpoint = `${baseUrl}/api/admin/send-weekly-newsletter`;
    const method = isDryRun ? 'GET' : 'POST';

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!data.ok) {
      console.error('❌ API Error:', data.error);
      process.exit(1);
    }

    if (isDryRun) {
      // Preview mode
      console.log(`📊 Newsletter Preview`);
      console.log(`   Subscribers: ${data.total_subscribers}`);
      console.log(`   Week: ${data.newsletter_data.week}`);
      console.log(`   Edition: #${data.newsletter_data.edition}`);
      console.log(`   Recent articles: ${data.newsletter_data.articles.length}`);

      console.log('\n📋 Content Preview:');
      console.log(`   Threat: ${data.newsletter_data.threat.substring(0, 100)}...`);
      console.log(`   Tips: ${data.newsletter_data.tips.substring(0, 100)}...`);
      console.log(`   Tool: ${data.newsletter_data.tool.substring(0, 100)}...`);

      if (data.newsletter_data.articles.length > 0) {
        console.log('\n📄 Recent Articles:');
        data.newsletter_data.articles.forEach((article, i) => {
          console.log(`   ${i + 1}. ${article.title} (${article.category}, ${article.reading_time} min)`);
        });
      }

      console.log('\n✅ Newsletter ready to send! Remove --dry-run to send to subscribers.');

    } else {
      // Actual send mode
      console.log(`✅ Newsletter sent successfully!`);
      console.log(`   📤 Sent to: ${data.sent}/${data.total_subscribers} subscribers`);
      console.log(`   📅 Edition: #${data.newsletter_data.edition} (${data.newsletter_data.week})`);
      console.log(`   📄 Articles included: ${data.newsletter_data.articles_count}`);

      if (data.errors && data.errors.length > 0) {
        console.log(`\n⚠️  Errors (${data.errors.length}):`);
        data.errors.forEach(error => {
          console.log(`   • ${error}`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Newsletter script failed:', error.message);
    process.exit(1);
  }
}

// Main execution
console.log('🚀 CiberPME Weekly Newsletter Script');
console.log(`   Mode: ${isDryRun ? 'DRY RUN (preview only)' : 'SEND (actual emails)'}`);
console.log(`   Target: ${baseUrl}`);
console.log('');

sendWeeklyNewsletter();