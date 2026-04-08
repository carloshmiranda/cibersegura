#!/usr/bin/env node

/**
 * Internal Linking Analysis CLI
 *
 * Generates internal linking suggestions for CiberPME blog posts
 * and displays them in a readable format.
 *
 * Usage:
 *   node scripts/analyze-internal-linking.js
 *   node scripts/analyze-internal-linking.js --post nis2-cadeia-fornecimento-pme
 *   node scripts/analyze-internal-linking.js --stats
 */

import { generateInternalLinkingReport, analyzeInternalLinking } from '../src/lib/internal-linking.ts';
import { getPostBySlug } from '../src/lib/posts.ts';

const args = process.argv.slice(2);
const postSlug = args[args.indexOf('--post') + 1] || null;
const showStats = args.includes('--stats');

function formatConfidence(confidence) {
  const percentage = Math.round(confidence * 100);
  if (percentage >= 70) return `🟢 ${percentage}%`;
  if (percentage >= 50) return `🟡 ${percentage}%`;
  return `🔴 ${percentage}%`;
}

function formatType(type) {
  const types = {
    'exact_match': '🎯 Exact',
    'keyword_match': '🔑 Keyword',
    'topic_match': '📝 Topic',
    'category_related': '🏷️ Category'
  };
  return types[type] || type;
}

function displayPostAnalysis(analysis) {
  console.log(`\n📄 ${analysis.sourcePost.title}`);
  console.log(`📂 Category: ${analysis.sourcePost.categoryLabel}`);
  console.log(`🔗 Existing links: ${analysis.existingLinks.length}`);
  console.log(`🎯 Keywords found: ${Object.keys(analysis.keywordDensity).join(', ')}`);

  if (analysis.suggestions.length === 0) {
    console.log('✅ No linking suggestions (well-linked or no matches)');
    return;
  }

  console.log(`\n💡 ${analysis.suggestions.length} Suggestions:`);
  console.log('─'.repeat(80));

  analysis.suggestions.forEach((suggestion, index) => {
    console.log(`\n${index + 1}. ${formatConfidence(suggestion.confidence)} ${formatType(suggestion.type)}`);
    console.log(`   Target: ${suggestion.targetPost}`);
    console.log(`   Anchor: "${suggestion.anchorText}"`);
    console.log(`   Context: "${suggestion.contextSentence.slice(0, 100)}${suggestion.contextSentence.length > 100 ? '...' : ''}"`);
  });
}

function displayStats(report) {
  const totalPosts = report.length;
  const postsWithSuggestions = report.filter(analysis => analysis.suggestions.length > 0).length;
  const totalSuggestions = report.reduce((sum, analysis) => sum + analysis.suggestions.length, 0);
  const highConfidenceSuggestions = report.reduce((sum, analysis) =>
    sum + analysis.suggestions.filter(s => s.confidence > 0.7).length, 0
  );
  const avgSuggestionsPerPost = totalSuggestions / Math.max(postsWithSuggestions, 1);

  // Top keywords across all posts
  const allKeywords = {};
  report.forEach(analysis => {
    Object.entries(analysis.keywordDensity).forEach(([keyword, density]) => {
      allKeywords[keyword] = (allKeywords[keyword] || 0) + density;
    });
  });

  const topKeywords = Object.entries(allKeywords)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([keyword, density]) => `${keyword} (${density})`);

  console.log('\n📊 INTERNAL LINKING ANALYSIS REPORT');
  console.log('═'.repeat(50));
  console.log(`📄 Total Posts: ${totalPosts}`);
  console.log(`💡 Posts with Suggestions: ${postsWithSuggestions} (${Math.round(postsWithSuggestions / totalPosts * 100)}%)`);
  console.log(`🔗 Total Suggestions: ${totalSuggestions}`);
  console.log(`🎯 High Confidence (>70%): ${highConfidenceSuggestions}`);
  console.log(`📊 Average Suggestions/Post: ${avgSuggestionsPerPost.toFixed(1)}`);
  console.log(`\n🔑 Top Keywords:`);
  topKeywords.forEach(keyword => console.log(`   • ${keyword}`));

  // Distribution by confidence
  const confidenceRanges = { high: 0, medium: 0, low: 0 };
  report.forEach(analysis => {
    analysis.suggestions.forEach(suggestion => {
      if (suggestion.confidence > 0.7) confidenceRanges.high++;
      else if (suggestion.confidence > 0.5) confidenceRanges.medium++;
      else confidenceRanges.low++;
    });
  });

  console.log('\n📈 Confidence Distribution:');
  console.log(`   🟢 High (>70%): ${confidenceRanges.high}`);
  console.log(`   🟡 Medium (50-70%): ${confidenceRanges.medium}`);
  console.log(`   🔴 Low (<50%): ${confidenceRanges.low}`);
}

async function main() {
  try {
    console.log('🔍 Analyzing internal linking opportunities...\n');

    if (postSlug) {
      // Analyze specific post
      const post = getPostBySlug(postSlug);
      if (!post) {
        console.error(`❌ Post not found: ${postSlug}`);
        process.exit(1);
      }

      const analysis = analyzeInternalLinking(post);
      displayPostAnalysis(analysis);
    } else {
      // Analyze all posts
      const report = generateInternalLinkingReport();

      if (showStats) {
        displayStats(report);
      } else {
        report
          .filter(analysis => analysis.suggestions.length > 0)
          .forEach(analysis => displayPostAnalysis(analysis));

        if (report.filter(analysis => analysis.suggestions.length > 0).length === 0) {
          console.log('✅ No internal linking suggestions found.');
          console.log('All posts appear to have good internal linking structure!');
        }

        console.log(`\n📊 Run with --stats flag for summary statistics.`);
      }
    }

    console.log(`\n✨ Analysis complete! Run the admin interface at /admin/internal-linking for interactive review.`);

  } catch (error) {
    console.error('❌ Error running internal linking analysis:', error);
    process.exit(1);
  }
}

main();