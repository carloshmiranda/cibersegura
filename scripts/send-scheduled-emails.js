#!/usr/bin/env node

/**
 * Email automation script for CiberPME
 *
 * This script triggers the automated sending of scheduled follow-up emails.
 * Run this regularly (e.g., every hour) via cron or a scheduler like Vercel Cron.
 *
 * Usage:
 *   node scripts/send-scheduled-emails.js
 *   node scripts/send-scheduled-emails.js --dry-run
 *
 * Environment variables required:
 *   - ADMIN_API_TOKEN: Secret token for admin API access
 *   - NEXT_PUBLIC_URL: Base URL of the application
 */

import dotenv from 'dotenv';
import process from 'process';

// Load environment variables
dotenv.config();

const isDryRun = process.argv.includes('--dry-run');
const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
const adminToken = process.env.ADMIN_API_TOKEN;

if (!adminToken) {
  console.error('❌ ADMIN_API_TOKEN environment variable is required');
  process.exit(1);
}

async function sendScheduledEmails() {
  try {
    const endpoint = isDryRun
      ? `${baseUrl}/api/admin/send-scheduled-emails`
      : `${baseUrl}/api/admin/send-scheduled-emails`;

    const method = isDryRun ? 'GET' : 'POST';

    console.log(`🚀 ${isDryRun ? 'Checking' : 'Sending'} scheduled emails...`);

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
      // Dry run results
      console.log(`📊 Found ${data.total_candidates_ready} people ready for scheduled emails`);
      console.log('📋 Email sequences ready to send:');

      for (const seq of data.sequences) {
        if (seq.candidates_ready > 0) {
          console.log(`  • ${seq.sequence} step ${seq.step}: ${seq.candidates_ready} recipients`);
          console.log(`    Subject: "${seq.subject}"`);
          console.log(`    Delay: ${seq.delay_hours} hours | Sent so far: ${seq.send_count}`);
        }
      }

      if (data.total_candidates_ready === 0) {
        console.log('✅ No emails need to be sent right now');
      }
    } else {
      // Actual send results
      console.log(`✅ Successfully sent ${data.total_sent} scheduled emails`);
      console.log(`📊 Processed ${data.sequences_processed} email sequences`);

      if (data.results) {
        for (const result of data.results) {
          if (result.emails_sent > 0) {
            console.log(`  • ${result.sequence} step ${result.step}: ${result.emails_sent}/${result.candidates_found} sent`);
          }
          if (result.errors && result.errors.length > 0) {
            console.log(`    ⚠️  Errors: ${result.errors.length}`);
            result.errors.forEach(error => console.log(`      - ${error}`));
          }
        }
      }
    }

  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Run the script
sendScheduledEmails();