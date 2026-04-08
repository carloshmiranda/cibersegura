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