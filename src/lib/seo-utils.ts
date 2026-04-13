/**
 * SEO utilities for generating structured data and optimizing content
 */

export interface FAQItem {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

export interface FAQStructuredData {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: FAQItem[];
}

/**
 * Clean markdown formatting from text for structured data
 */
function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')         // Remove bold formatting
    .replace(/\*(.*?)\*/g, '$1')             // Remove italic formatting
    .replace(/`(.*?)`/g, '$1')               // Remove inline code formatting
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/\n\s*\n/g, ' ')                // Replace multiple newlines with space
    .replace(/\s+/g, ' ')                    // Normalize whitespace
    .trim();
}

/**
 * Clean question text by removing heading prefixes and numbering
 */
function cleanQuestion(text: string): string {
  return text
    .replace(/^#+\s*/, '')              // Remove heading prefix (##, ###, etc.)
    .replace(/^\*\*P:\s*/, '')          // Remove **P: prefix
    .replace(/\*\*$/, '')               // Remove trailing **
    .replace(/^\d+\.\s*/, '')           // Remove numbering like "1. "
    .replace(/^[a-zA-Z]\)\s*/, '')      // Remove lettering like "a) "
    .trim();
}

/**
 * Extract FAQ structured data from post content
 */
export function extractFAQStructuredData(content: string): FAQStructuredData | null {
  // Check if content has FAQ sections
  const hasFAQContent = content.includes('Perguntas Frequentes') ||
                        content.includes('## FAQ') ||
                        content.includes('### FAQ') ||
                        /##\s*FAQ[^a-zA-Z]/i.test(content) ||
                        /###\s*FAQ[^a-zA-Z]/i.test(content) ||
                        /Perguntas.*Frequentes/i.test(content);

  if (!hasFAQContent) return null;

  const faqItems: FAQItem[] = [];
  const lines = content.split('\n');
  let currentQuestion = '';
  let currentAnswer = '';
  let inFAQSection = false;
  let collectingAnswer = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Start of FAQ section - comprehensive detection
    if ((line.includes('Perguntas Frequentes') ||
         line.includes('FAQ')) &&
        (line.startsWith('##') || line.startsWith('###'))) {
      inFAQSection = true;
      continue;
    }

    // Question detection (starts with ### or **P:)
    if (inFAQSection && (line.startsWith('### ') || line.match(/^\*\*P:\s*/))) {
      // Save previous Q&A if exists
      if (currentQuestion && currentAnswer) {
        const cleanedQuestion = cleanQuestion(currentQuestion);
        const cleanedAnswer = cleanMarkdown(currentAnswer);

        if (cleanedQuestion && cleanedAnswer) {
          faqItems.push({
            "@type": "Question",
            name: cleanedQuestion,
            acceptedAnswer: {
              "@type": "Answer",
              text: cleanedAnswer
            }
          });
        }
      }

      // Handle different question formats
      if (line.startsWith('### ')) {
        currentQuestion = line;
        currentAnswer = '';
        collectingAnswer = true;
      } else if (line.match(/^\*\*P:\s*/)) {
        // Format: **P: Question** followed by R: Answer on same line
        const parts = line.split(/\*\*.*?R:\s*/);
        if (parts.length === 2) {
          currentQuestion = parts[0].replace(/^\*\*P:\s*/, '').replace(/\*\*$/, '');
          currentAnswer = parts[1];
          collectingAnswer = false; // Single line Q&A format
        } else {
          // Multi-line format starting with **P: Question**
          currentQuestion = line.replace(/^\*\*P:\s*/, '').replace(/\*\*$/, '');
          currentAnswer = '';
          collectingAnswer = true;
        }
      }
      continue;
    }

    // Collect answer content (for multi-line answers)
    if (inFAQSection && collectingAnswer && line && !line.startsWith('##')) {
      // Skip empty lines, pure markdown markers, and answer prefixes
      if (line.length > 0 &&
          line !== '**R:**' &&
          line !== '**Resposta:**' &&
          !line.match(/^\s*\*\*R:\*\*\s*$/) &&
          !line.match(/^\*\*P:\s*/)) { // Don't collect new P: lines as answers

        // Handle answer prefix (R:) and clean basic formatting
        let answerLine = line
          .replace(/^\*\*R:\*\*\s*/, '')
          .replace(/^\*\*Resposta:\*\*\s*/, '')
          .replace(/^\*\*R:\*\*/, '')
          .replace(/^R:\s*/, ''); // Handle standalone R:

        if (answerLine.trim()) {
          currentAnswer += answerLine + '\n';
        }
      }
    }

    // End of FAQ section when hitting another major heading
    if (inFAQSection && line.startsWith('## ') &&
        !line.includes('FAQ') &&
        !line.includes('Perguntas') &&
        !line.includes('Frequentes')) {

      // Save last Q&A before exiting
      if (currentQuestion && currentAnswer) {
        const cleanedQuestion = cleanQuestion(currentQuestion);
        const cleanedAnswer = cleanMarkdown(currentAnswer);

        if (cleanedQuestion && cleanedAnswer) {
          faqItems.push({
            "@type": "Question",
            name: cleanedQuestion,
            acceptedAnswer: {
              "@type": "Answer",
              text: cleanedAnswer
            }
          });
        }
      }
      break;
    }
  }

  // Save final Q&A if we're at the end of content
  if (inFAQSection && currentQuestion && currentAnswer) {
    const cleanedQuestion = cleanQuestion(currentQuestion);
    const cleanedAnswer = cleanMarkdown(currentAnswer);

    if (cleanedQuestion && cleanedAnswer) {
      faqItems.push({
        "@type": "Question",
        name: cleanedQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: cleanedAnswer
        }
      });
    }
  }

  // Only return structured data if we have valid Q&A pairs
  if (faqItems.length > 0 &&
      faqItems.every(item =>
        item.name &&
        item.name.length > 0 &&
        item.acceptedAnswer.text &&
        item.acceptedAnswer.text.length > 10 // Minimum answer length
      )) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems
    };
  }

  return null;
}

/**
 * Validate FAQ structured data for Google Rich Results compliance
 */
export function validateFAQStructuredData(data: FAQStructuredData): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (!data["@context"] || data["@context"] !== "https://schema.org") {
    errors.push("Missing or invalid @context");
  }

  if (!data["@type"] || data["@type"] !== "FAQPage") {
    errors.push("Missing or invalid @type");
  }

  if (!data.mainEntity || !Array.isArray(data.mainEntity)) {
    errors.push("Missing or invalid mainEntity array");
  } else {
    // Validate each FAQ item
    data.mainEntity.forEach((item, index) => {
      if (!item["@type"] || item["@type"] !== "Question") {
        errors.push(`FAQ item ${index + 1}: Missing or invalid @type`);
      }

      if (!item.name || item.name.length < 10) {
        errors.push(`FAQ item ${index + 1}: Question name too short (minimum 10 characters)`);
      }

      if (!item.acceptedAnswer || item.acceptedAnswer["@type"] !== "Answer") {
        errors.push(`FAQ item ${index + 1}: Missing or invalid acceptedAnswer`);
      } else if (!item.acceptedAnswer.text || item.acceptedAnswer.text.length < 20) {
        errors.push(`FAQ item ${index + 1}: Answer text too short (minimum 20 characters)`);
      }

      // Warnings for best practices
      if (item.name && item.name.length > 200) {
        warnings.push(`FAQ item ${index + 1}: Question name is very long (>200 characters)`);
      }

      if (item.acceptedAnswer?.text && item.acceptedAnswer.text.length > 1000) {
        warnings.push(`FAQ item ${index + 1}: Answer text is very long (>1000 characters)`);
      }
    });

    // Check minimum number of FAQs
    if (data.mainEntity.length < 2) {
      warnings.push("Consider adding more FAQ items (minimum 2 recommended for rich results)");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}