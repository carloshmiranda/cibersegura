import React from 'react';
import InlineAffiliateCTA from '@/components/blog/inline-affiliate-cta';
import { getInlineCtaConfigs, shouldInsertCtaAfterHeading } from './inline-cta-config';

interface MarkdownElement {
  type: 'heading' | 'list' | 'paragraph';
  level?: number;
  content: string;
  items?: string[];
}

export function parseMarkdown(content: string): MarkdownElement[] {
  const lines = content.split('\n');
  const elements: MarkdownElement[] = [];
  let currentList: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push({
        type: 'list',
        content: '',
        items: [...currentList]
      });
      currentList = [];
    }
  };

  const flushParagraph = (paragraphLines: string[]) => {
    if (paragraphLines.length > 0) {
      const content = paragraphLines.join(' ').trim();
      if (content) {
        elements.push({
          type: 'paragraph',
          content
        });
      }
    }
  };

  let paragraphLines: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      // Empty line - flush current paragraph
      flushList();
      flushParagraph(paragraphLines);
      paragraphLines = [];
      continue;
    }

    // Check for headings
    if (trimmedLine.startsWith('## ')) {
      flushList();
      flushParagraph(paragraphLines);
      paragraphLines = [];
      elements.push({
        type: 'heading',
        level: 2,
        content: trimmedLine.substring(3).trim()
      });
      continue;
    }

    if (trimmedLine.startsWith('### ')) {
      flushList();
      flushParagraph(paragraphLines);
      paragraphLines = [];
      elements.push({
        type: 'heading',
        level: 3,
        content: trimmedLine.substring(4).trim()
      });
      continue;
    }

    // Check for list items
    if (trimmedLine.startsWith('- ')) {
      flushParagraph(paragraphLines);
      paragraphLines = [];
      currentList.push(trimmedLine.substring(2).trim());
      continue;
    }

    // Regular paragraph line
    if (currentList.length > 0) {
      flushList();
    }
    paragraphLines.push(trimmedLine);
  }

  // Flush remaining content
  flushList();
  flushParagraph(paragraphLines);

  return elements;
}

export function renderMarkdown(elements: MarkdownElement[], articleSlug?: string): React.ReactElement[] {
  const ctaConfigs = articleSlug ? getInlineCtaConfigs(articleSlug) : [];
  let ctaPosition = 1;
  const renderedElements: React.ReactElement[] = [];

  elements.forEach((element, index) => {
    let mainElement: React.ReactElement;

    switch (element.type) {
      case 'heading':
        if (element.level === 2) {
          mainElement = (
            <h2 key={index} className="text-xl font-bold text-brand mt-8 mb-4 first:mt-0 font-display text-balance">
              {element.content}
            </h2>
          );
        } else if (element.level === 3) {
          mainElement = (
            <h3 key={index} className="text-lg font-bold text-brand mt-6 mb-3 first:mt-0 font-display">
              {element.content}
            </h3>
          );
        } else {
          mainElement = (
            <div key={index} className="text-text-secondary">
              {element.content}
            </div>
          );
        }

        // Add the heading
        renderedElements.push(mainElement);

        // Check if we should inject a CTA after this heading
        if (ctaConfigs.length > 0) {
          const ctaConfig = shouldInsertCtaAfterHeading(element.content, ctaConfigs);
          if (ctaConfig && articleSlug) {
            const ctaElement = (
              <InlineAffiliateCTA
                key={`cta-${index}-${ctaPosition}`}
                tool={ctaConfig.tool}
                contextualCopy={ctaConfig.contextualCopy}
                source={`blog-${articleSlug}-inline`}
                articleSlug={articleSlug}
                position={ctaPosition}
              />
            );
            renderedElements.push(ctaElement);
            ctaPosition++;
          }
        }
        return;

      case 'list':
        mainElement = (
          <ul key={index} className="list-disc list-inside space-y-1 text-text-secondary ml-4">
            {element.items?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
        break;

      case 'paragraph':
        mainElement = (
          <p key={index} className="text-text-secondary leading-relaxed">
            {element.content}
          </p>
        );
        break;

      default:
        mainElement = (
          <div key={index} className="text-text-secondary">
            {element.content}
          </div>
        );
        break;
    }

    // Add non-heading elements
    renderedElements.push(mainElement);
  });

  return renderedElements;
}