/**
 * Smart Internal Linking System for CiberPME
 *
 * Automatically detects opportunities for internal links between blog posts
 * based on keyword matching, topic relevance, and content analysis.
 */

import { Post, posts } from './posts';

export interface LinkSuggestion {
  sourcePost: string; // slug
  targetPost: string; // slug
  anchorText: string;
  contextSentence: string;
  confidence: number; // 0-1 score
  type: 'exact_match' | 'keyword_match' | 'topic_match' | 'category_related';
  position: {
    paragraph: number;
    sentence: number;
  };
}

export interface InternalLinkAnalysis {
  sourcePost: Post;
  suggestions: LinkSuggestion[];
  keywordDensity: Record<string, number>;
  existingLinks: string[];
}

// Keywords for Portuguese cybersecurity content
const CYBERSECURITY_KEYWORDS = {
  // Threats
  'ransomware': ['ransomware', 'resgate', 'cifra', 'encriptação maliciosa'],
  'phishing': ['phishing', 'engenharia social', 'emails falsos', 'burla digital'],
  'malware': ['malware', 'vírus', 'trojan', 'spyware', 'software malicioso'],
  'ddos': ['ddos', 'ataque distribuído', 'denial of service', 'sobrecarga'],
  'vulnerabilidade': ['vulnerabilidade', 'falha de segurança', 'brecha', 'exploit'],

  // Best Practices
  'passwords': ['passwords', 'palavras-passe', 'credenciais', 'autenticação'],
  'backup': ['backup', 'cópia de segurança', 'redundância', 'recuperação'],
  'updates': ['atualizações', 'patches', 'correções', 'versão'],
  'firewall': ['firewall', 'parede de fogo', 'filtro', 'proteção'],
  'antivirus': ['antivírus', 'proteção', 'deteção', 'quarentena'],

  // Tools
  'vpn': ['vpn', 'virtual private network', 'rede privada', 'túnel seguro'],
  'certificados': ['certificados', 'ssl', 'tls', 'criptografia'],
  'monitorização': ['monitorização', 'logs', 'análise', 'alertas'],

  // Legislation
  'rgpd': ['rgpd', 'gdpr', 'proteção de dados', 'privacidade'],
  'nis2': ['nis2', 'diretiva', 'cibersegurança', 'entidades críticas'],
  'lei': ['lei', 'decreto-lei', 'regulamento', 'conformidade'],
  'dpo': ['dpo', 'encarregado proteção dados', 'responsável dados'],

  // Business
  'pme': ['pme', 'pequenas empresas', 'médias empresas', 'empresário'],
  'negócio': ['negócio', 'empresa', 'organização', 'operações'],
  'colaboradores': ['colaboradores', 'funcionários', 'equipa', 'staff'],
  'clientes': ['clientes', 'consumidores', 'utilizadores', 'dados pessoais']
};

/**
 * Extracts keywords from post content based on cybersecurity terminology
 */
function extractKeywords(content: string): Record<string, number> {
  const keywords: Record<string, number> = {};
  const normalizedContent = content.toLowerCase();

  Object.entries(CYBERSECURITY_KEYWORDS).forEach(([category, terms]) => {
    let totalScore = 0;

    terms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      const matches = normalizedContent.match(regex);
      if (matches) {
        totalScore += matches.length;
      }
    });

    if (totalScore > 0) {
      keywords[category] = totalScore;
    }
  });

  return keywords;
}

/**
 * Calculates content similarity between two posts
 */
function calculateContentSimilarity(post1: Post, post2: Post): number {
  if (post1.slug === post2.slug) return 0;

  const keywords1 = extractKeywords(post1.content + ' ' + post1.title + ' ' + post1.excerpt);
  const keywords2 = extractKeywords(post2.content + ' ' + post2.title + ' ' + post2.excerpt);

  // Category bonus
  let similarity = post1.category === post2.category ? 0.3 : 0;

  // Keyword intersection
  const commonKeywords = Object.keys(keywords1).filter(k => keywords2[k]);
  if (commonKeywords.length > 0) {
    const keywordScore = commonKeywords.reduce((sum, keyword) => {
      return sum + Math.min(keywords1[keyword], keywords2[keyword]);
    }, 0) / 10; // Normalize

    similarity += Math.min(keywordScore, 0.7);
  }

  return Math.min(similarity, 1);
}

/**
 * Finds sentences in content that mention specific topics
 */
function findLinkingOpportunities(content: string, targetPost: Post): LinkSuggestion[] {
  const sentences = content.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10);
  const suggestions: LinkSuggestion[] = [];
  const targetKeywords = extractKeywords(targetPost.title + ' ' + targetPost.excerpt);

  sentences.forEach((sentence, sentenceIndex) => {
    const normalizedSentence = sentence.toLowerCase();

    // Look for exact keyword matches
    Object.entries(CYBERSECURITY_KEYWORDS).forEach(([category, terms]) => {
      if (targetKeywords[category]) {
        terms.forEach(term => {
          const termRegex = new RegExp(`\\b${term}\\b`, 'i');
          if (termRegex.test(sentence) && !sentence.toLowerCase().includes('artigo') && !sentence.toLowerCase().includes('post')) {

            // Avoid linking to concepts that are too generic or already covered in the same post
            if (sentence.length > 50 && sentence.length < 200) {
              suggestions.push({
                sourcePost: '',
                targetPost: targetPost.slug,
                anchorText: term,
                contextSentence: sentence,
                confidence: targetKeywords[category] / 10 + 0.3,
                type: 'keyword_match',
                position: {
                  paragraph: Math.floor(sentenceIndex / 3),
                  sentence: sentenceIndex
                }
              });
            }
          }
        });
      }
    });
  });

  // Deduplicate and limit suggestions
  const uniqueSuggestions = suggestions.filter((suggestion, index, self) =>
    index === self.findIndex(s => s.anchorText === suggestion.anchorText && s.contextSentence === suggestion.contextSentence)
  );

  return uniqueSuggestions
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3); // Max 3 suggestions per target post
}

/**
 * Generates internal linking suggestions for a specific post
 */
export function analyzeInternalLinking(sourcePost: Post): InternalLinkAnalysis {
  const keywordDensity = extractKeywords(sourcePost.content);

  // Find existing internal links in content
  const linkRegex = /\[([^\]]+)\]\(\/blog\/([^)]+)\)/g;
  const existingLinks: string[] = [];
  let match;
  while ((match = linkRegex.exec(sourcePost.content)) !== null) {
    existingLinks.push(match[2]); // Extract slug from link
  }

  const suggestions: LinkSuggestion[] = [];

  // Find potential targets (exclude self and already linked posts)
  const potentialTargets = posts.filter(post =>
    post.slug !== sourcePost.slug &&
    !existingLinks.includes(post.slug)
  );

  potentialTargets.forEach(targetPost => {
    const similarity = calculateContentSimilarity(sourcePost, targetPost);

    if (similarity > 0.4) { // Only consider sufficiently similar posts
      const opportunities = findLinkingOpportunities(sourcePost.content, targetPost);

      opportunities.forEach(opportunity => {
        suggestions.push({
          ...opportunity,
          sourcePost: sourcePost.slug,
          confidence: opportunity.confidence * similarity
        });
      });
    }
  });

  return {
    sourcePost,
    suggestions: suggestions
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5), // Top 5 suggestions per post
    keywordDensity,
    existingLinks
  };
}

/**
 * Generates comprehensive internal linking analysis for all posts
 */
export function generateInternalLinkingReport(): InternalLinkAnalysis[] {
  return posts.map(post => analyzeInternalLinking(post));
}

/**
 * Applies a link suggestion to post content
 */
export function applyLinkSuggestion(content: string, suggestion: LinkSuggestion): string {
  const linkMarkdown = `[${suggestion.anchorText}](/blog/${suggestion.targetPost})`;

  // Replace only the first occurrence of the anchor text in the context sentence
  const sentenceWithLink = suggestion.contextSentence.replace(
    new RegExp(`\\b${suggestion.anchorText}\\b`, 'i'),
    linkMarkdown
  );

  return content.replace(suggestion.contextSentence, sentenceWithLink);
}

/**
 * Validates if a suggestion is still applicable (content hasn't changed)
 */
export function validateSuggestion(currentContent: string, suggestion: LinkSuggestion): boolean {
  return currentContent.includes(suggestion.contextSentence) &&
         !currentContent.includes(`[${suggestion.anchorText}](/blog/${suggestion.targetPost})`);
}

/**
 * File system utilities for modifying posts.ts
 */
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const POSTS_FILE_PATH = join(process.cwd(), 'src/lib/posts.ts');
const BACKUP_DIR = join(process.cwd(), '.backups');

/**
 * Creates a backup of the posts.ts file with timestamp
 */
function createBackup(): string {
  try {
    // Ensure backup directory exists
    if (!existsSync(BACKUP_DIR)) {
      require('fs').mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = join(BACKUP_DIR, `posts-${timestamp}.ts.backup`);
    const currentContent = readFileSync(POSTS_FILE_PATH, 'utf-8');

    writeFileSync(backupPath, currentContent, 'utf-8');
    return backupPath;
  } catch (error) {
    throw new Error(`Failed to create backup: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Reads and parses the current posts.ts file
 */
function readPostsFile(): { content: string; posts: Post[] } {
  try {
    const fileContent = readFileSync(POSTS_FILE_PATH, 'utf-8');

    // Extract posts array from the file (this is a simplified approach)
    // In a real implementation, we might use AST parsing for better reliability
    const postsMatch = fileContent.match(/export const posts: Post\[\] = (\[[\s\S]*?\]);/);

    if (!postsMatch) {
      throw new Error('Could not find posts array in posts.ts file');
    }

    // For now, we'll work with the current in-memory posts array
    // and update the file content manually
    return {
      content: fileContent,
      posts: posts // Use the imported posts array
    };
  } catch (error) {
    throw new Error(`Failed to read posts file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validates that the content doesn't break the file structure
 */
function validateContentStructure(content: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  // Check for unescaped backticks that could break the template literal
  const unescapedBackticks = content.match(/(?<!\\)`/g);
  if (unescapedBackticks && unescapedBackticks.length > 0) {
    issues.push('Content contains unescaped backticks that could break the template literal');
  }

  // Check for ${...} patterns that could be interpreted as template expressions
  const templateExpressions = content.match(/\$\{[^}]*\}/g);
  if (templateExpressions && templateExpressions.length > 0) {
    issues.push('Content contains ${...} patterns that could be interpreted as template expressions');
  }

  // Check that the content is reasonable size (not corrupted)
  if (content.length < 100) {
    issues.push('Content is suspiciously short, possible data loss');
  }

  if (content.length > 100000) {
    issues.push('Content is suspiciously long, possible corruption');
  }

  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * Validates the posts.ts file syntax after modification
 */
function validateFileStructure(fileContent: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  // Check that essential exports exist
  if (!fileContent.includes('export interface Post')) {
    issues.push('Missing Post interface export');
  }

  if (!fileContent.includes('export const posts: Post[]')) {
    issues.push('Missing posts array export');
  }

  if (!fileContent.includes('export const CATEGORIES')) {
    issues.push('Missing CATEGORIES export');
  }

  // Check for balanced braces and brackets
  const openBraces = (fileContent.match(/\{/g) || []).length;
  const closeBraces = (fileContent.match(/\}/g) || []).length;
  if (openBraces !== closeBraces) {
    issues.push(`Unbalanced braces: ${openBraces} open, ${closeBraces} close`);
  }

  const openBrackets = (fileContent.match(/\[/g) || []).length;
  const closeBrackets = (fileContent.match(/\]/g) || []).length;
  if (openBrackets !== closeBrackets) {
    issues.push(`Unbalanced brackets: ${openBrackets} open, ${closeBrackets} close`);
  }

  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * Updates a specific post content in the posts.ts file
 */
function updatePostContent(postSlug: string, newContent: string): void {
  try {
    // Validate the new content first
    const contentValidation = validateContentStructure(newContent);
    if (!contentValidation.valid) {
      throw new Error(`Content validation failed: ${contentValidation.issues.join(', ')}`);
    }

    const { content: fileContent } = readPostsFile();

    // Escape special regex characters in the new content
    const escapedNewContent = newContent
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');

    // Find the post object and replace its content
    // This regex looks for the post with matching slug and captures the content field
    const postRegex = new RegExp(
      `(\\{[\\s\\S]*?slug:\\s*["']${postSlug}["'][\\s\\S]*?content:\\s*\`)([\\s\\S]*?)(\`[\\s\\S]*?\\})`,
      'g'
    );

    const updatedContent = fileContent.replace(postRegex, (match, beforeContent, oldContent, afterContent) => {
      return beforeContent + escapedNewContent + afterContent;
    });

    if (updatedContent === fileContent) {
      throw new Error(`Post with slug "${postSlug}" not found in posts.ts`);
    }

    // Validate file structure before writing
    const fileValidation = validateFileStructure(updatedContent);
    if (!fileValidation.valid) {
      throw new Error(`File structure validation failed: ${fileValidation.issues.join(', ')}`);
    }

    writeFileSync(POSTS_FILE_PATH, updatedContent, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to update post content: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Applies link suggestions to a post and updates the posts.ts file
 */
export function applyLinkSuggestionsToFile(
  postSlug: string,
  suggestions: LinkSuggestion[]
): { backupPath: string; appliedSuggestions: LinkSuggestion[]; failedSuggestions: Array<{ suggestion: LinkSuggestion; reason: string }> } {

  // Create backup first
  const backupPath = createBackup();

  try {
    // Get current post
    const post = posts.find(p => p.slug === postSlug);
    if (!post) {
      throw new Error(`Post with slug "${postSlug}" not found`);
    }

    let modifiedContent = post.content;
    const appliedSuggestions: LinkSuggestion[] = [];
    const failedSuggestions: Array<{ suggestion: LinkSuggestion; reason: string }> = [];

    // Apply each suggestion
    for (const suggestion of suggestions) {
      if (validateSuggestion(modifiedContent, suggestion)) {
        modifiedContent = applyLinkSuggestion(modifiedContent, suggestion);
        appliedSuggestions.push(suggestion);
      } else {
        failedSuggestions.push({
          suggestion,
          reason: 'Content changed or link already exists'
        });
      }
    }

    // Only update file if we applied at least one suggestion
    if (appliedSuggestions.length > 0) {
      updatePostContent(postSlug, modifiedContent);
    }

    return {
      backupPath,
      appliedSuggestions,
      failedSuggestions
    };

  } catch (error) {
    throw new Error(`Failed to apply suggestions to file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}