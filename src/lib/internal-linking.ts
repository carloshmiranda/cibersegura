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

// Semantic relationships between topics (for topic-related suggestions)
const TOPIC_RELATIONSHIPS: Record<string, string[]> = {
  'ransomware': ['backup', 'antivirus', 'updates', 'colaboradores'],
  'phishing': ['passwords', 'colaboradores', 'antivirus', 'monitorização'],
  'malware': ['antivirus', 'updates', 'firewall', 'backup'],
  'passwords': ['phishing', 'colaboradores', 'vpn', 'rgpd'],
  'backup': ['ransomware', 'vulnerabilidade', 'negócio', 'nis2'],
  'updates': ['vulnerabilidade', 'malware', 'firewall', 'antivirus'],
  'rgpd': ['dpo', 'clientes', 'negócio', 'lei'],
  'nis2': ['lei', 'negócio', 'backup', 'vulnerabilidade'],
  'colaboradores': ['phishing', 'passwords', 'rgpd', 'pme'],
  'pme': ['colaboradores', 'negócio', 'rgpd', 'nis2'],
  'antivirus': ['malware', 'ransomware', 'updates', 'firewall'],
  'firewall': ['vulnerabilidade', 'malware', 'updates', 'monitorização'],
  'vpn': ['passwords', 'certificados', 'pme', 'colaboradores'],
  'certificados': ['vpn', 'rgpd', 'lei', 'negócio'],
  'monitorização': ['vulnerabilidade', 'phishing', 'firewall', 'nis2']
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
 * Calculates enhanced content similarity between two posts
 */
function calculateContentSimilarity(post1: Post, post2: Post): number {
  if (post1.slug === post2.slug) return 0;

  // Extract keywords from different parts with different weights
  const keywords1 = {
    title: extractKeywords(post1.title),
    excerpt: extractKeywords(post1.excerpt),
    content: extractKeywords(post1.content)
  };
  const keywords2 = {
    title: extractKeywords(post2.title),
    excerpt: extractKeywords(post2.excerpt),
    content: extractKeywords(post2.content)
  };

  let similarity = 0;

  // Category bonus (higher value for same category)
  if (post1.category === post2.category) {
    similarity += 0.4;
  }

  // Title similarity (highest weight)
  const titleCommon = Object.keys(keywords1.title).filter(k => keywords2.title[k]);
  if (titleCommon.length > 0) {
    const titleScore = titleCommon.reduce((sum, keyword) => {
      return sum + Math.min(keywords1.title[keyword], keywords2.title[keyword]);
    }, 0);
    similarity += Math.min(titleScore / 3, 0.5); // Higher weight for title matches
  }

  // Excerpt similarity (medium-high weight)
  const excerptCommon = Object.keys(keywords1.excerpt).filter(k => keywords2.excerpt[k]);
  if (excerptCommon.length > 0) {
    const excerptScore = excerptCommon.reduce((sum, keyword) => {
      return sum + Math.min(keywords1.excerpt[keyword], keywords2.excerpt[keyword]);
    }, 0);
    similarity += Math.min(excerptScore / 5, 0.4);
  }

  // Content similarity (lower weight but broader coverage)
  const contentCommon = Object.keys(keywords1.content).filter(k => keywords2.content[k]);
  if (contentCommon.length > 0) {
    const contentScore = contentCommon.reduce((sum, keyword) => {
      return sum + Math.min(keywords1.content[keyword], keywords2.content[keyword]);
    }, 0);
    similarity += Math.min(contentScore / 15, 0.3);
  }

  return Math.min(similarity, 1);
}

/**
 * Calculates enhanced confidence score for a link suggestion
 */
function calculateLinkConfidence(
  sentence: string,
  term: string,
  category: string,
  targetPost: Post,
  targetKeywords: Record<string, number>,
  sentenceIndex: number,
  totalSentences: number
): number {
  let confidence = 0.4; // Base confidence

  // Keyword strength in target post
  const keywordStrength = targetKeywords[category] || 0;
  confidence += Math.min(keywordStrength / 8, 0.3);

  // Title keyword bonus (if the term appears in target post title)
  if (targetPost.title.toLowerCase().includes(term.toLowerCase())) {
    confidence += 0.2;
  }

  // Context quality (sentence length and complexity)
  const sentenceLength = sentence.length;
  if (sentenceLength >= 80 && sentenceLength <= 150) {
    confidence += 0.15; // Optimal length
  } else if (sentenceLength >= 50 && sentenceLength < 200) {
    confidence += 0.1; // Acceptable length
  }

  // Position bonus (earlier in content = more relevant)
  const positionRatio = sentenceIndex / totalSentences;
  if (positionRatio < 0.3) {
    confidence += 0.1; // Early in content
  } else if (positionRatio < 0.7) {
    confidence += 0.05; // Middle of content
  }

  // Term specificity bonus
  if (term.length > 8) {
    confidence += 0.1; // More specific terms
  }

  // Check for supporting context words
  const contextWords = ['importante', 'essencial', 'necessário', 'fundamental', 'crítico', 'deve', 'recomenda'];
  const hasStrongContext = contextWords.some(word => sentence.toLowerCase().includes(word));
  if (hasStrongContext) {
    confidence += 0.1;
  }

  // Recency bonus (newer posts are more relevant)
  const targetDate = new Date(targetPost.publishedAt);
  const daysSincePublished = (Date.now() - targetDate.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSincePublished < 30) {
    confidence += 0.1; // Recent post
  } else if (daysSincePublished < 90) {
    confidence += 0.05; // Moderately recent
  }

  return Math.min(confidence, 1); // Cap at 1.0
}

/**
 * Finds topic-related linking opportunities using semantic relationships
 */
function findSemanticLinkingOpportunities(content: string, sourcePost: Post, targetPost: Post): LinkSuggestion[] {
  const sentences = content.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 30);
  const suggestions: LinkSuggestion[] = [];
  const sourceKeywords = extractKeywords(sourcePost.title + ' ' + sourcePost.excerpt + ' ' + sourcePost.content);
  const targetKeywords = extractKeywords(targetPost.title + ' ' + targetPost.excerpt + ' ' + targetPost.content);

  sentences.forEach((sentence, sentenceIndex) => {
    const normalizedSentence = sentence.toLowerCase();

    // Find semantic relationships between source topics and target topics
    Object.keys(sourceKeywords).forEach(sourceCategory => {
      const relatedTopics = TOPIC_RELATIONSHIPS[sourceCategory] || [];

      relatedTopics.forEach(relatedTopic => {
        if (targetKeywords[relatedTopic]) {
          // Check if this sentence discusses the source topic
          const sourceTerms = CYBERSECURITY_KEYWORDS[sourceCategory as keyof typeof CYBERSECURITY_KEYWORDS] || [];
          const hasSourceContext = sourceTerms.some(term =>
            new RegExp(`\\b${term}\\b`, 'i').test(sentence)
          );

          if (hasSourceContext && sentence.length < 200) {
            // Find the best anchor text for the related topic
            const relatedTerms = CYBERSECURITY_KEYWORDS[relatedTopic as keyof typeof CYBERSECURITY_KEYWORDS] || [];
            const contextualTerm = relatedTerms.find(term =>
              targetPost.title.toLowerCase().includes(term.toLowerCase())
            ) || relatedTerms[0];

            if (contextualTerm) {
              const semanticConfidence = 0.5 +
                (targetKeywords[relatedTopic] / 10) +
                (sourceKeywords[sourceCategory] / 15);

              suggestions.push({
                sourcePost: sourcePost.slug,
                targetPost: targetPost.slug,
                anchorText: contextualTerm,
                contextSentence: sentence,
                confidence: Math.min(semanticConfidence, 0.85),
                type: 'topic_match',
                position: {
                  paragraph: Math.floor(sentenceIndex / 3),
                  sentence: sentenceIndex
                }
              });
            }
          }
        }
      });
    });
  });

  return suggestions
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 2); // Max 2 semantic suggestions per target
}

/**
 * Finds sentences in content that mention specific topics with enhanced scoring
 */
function findLinkingOpportunities(content: string, targetPost: Post): LinkSuggestion[] {
  const sentences = content.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10);
  const suggestions: LinkSuggestion[] = [];
  const targetKeywords = extractKeywords(targetPost.title + ' ' + targetPost.excerpt + ' ' + targetPost.content);
  const totalSentences = sentences.length;

  sentences.forEach((sentence, sentenceIndex) => {
    const normalizedSentence = sentence.toLowerCase();

    // Look for exact keyword matches
    Object.entries(CYBERSECURITY_KEYWORDS).forEach(([category, terms]) => {
      if (targetKeywords[category]) {
        terms.forEach(term => {
          const termRegex = new RegExp(`\\b${term}\\b`, 'i');
          if (termRegex.test(sentence) &&
              !sentence.toLowerCase().includes('artigo') &&
              !sentence.toLowerCase().includes('post') &&
              !sentence.toLowerCase().includes('texto')) {

            // Enhanced filtering for sentence quality
            if (sentence.length > 40 && sentence.length < 250) {
              const confidence = calculateLinkConfidence(
                sentence,
                term,
                category,
                targetPost,
                targetKeywords,
                sentenceIndex,
                totalSentences
              );

              suggestions.push({
                sourcePost: '',
                targetPost: targetPost.slug,
                anchorText: term,
                contextSentence: sentence,
                confidence,
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

    // Lower threshold with better confidence scoring
    if (similarity > 0.25) { // More lenient similarity threshold
      // Keyword-based opportunities
      const keywordOpportunities = findLinkingOpportunities(sourcePost.content, targetPost);

      keywordOpportunities.forEach(opportunity => {
        // Enhanced final confidence calculation
        const finalConfidence = opportunity.confidence * (0.7 + similarity * 0.3);

        suggestions.push({
          ...opportunity,
          sourcePost: sourcePost.slug,
          confidence: Math.min(finalConfidence, 1) // Ensure we don't exceed 1.0
        });
      });

      // Semantic/topic-based opportunities
      const semanticOpportunities = findSemanticLinkingOpportunities(sourcePost.content, sourcePost, targetPost);

      semanticOpportunities.forEach(opportunity => {
        const finalConfidence = opportunity.confidence * (0.8 + similarity * 0.2);

        suggestions.push({
          ...opportunity,
          confidence: Math.min(finalConfidence, 0.95) // Slightly lower cap for semantic
        });
      });
    }
  });

  return {
    sourcePost,
    suggestions: suggestions
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 8), // Increased to 8 suggestions per post with better scoring
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