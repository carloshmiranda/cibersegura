import React from 'react';

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

export function renderMarkdown(elements: MarkdownElement[]): React.ReactElement[] {
  return elements.map((element, index) => {
    switch (element.type) {
      case 'heading':
        if (element.level === 2) {
          return (
            <h2 key={index} className="text-xl font-bold text-brand mt-8 mb-4 first:mt-0 font-display text-balance">
              {element.content}
            </h2>
          );
        }
        if (element.level === 3) {
          return (
            <h3 key={index} className="text-lg font-bold text-brand mt-6 mb-3 first:mt-0 font-display">
              {element.content}
            </h3>
          );
        }
        return (
          <div key={index} className="text-text-secondary">
            {element.content}
          </div>
        );

      case 'list':
        return (
          <ul key={index} className="list-disc list-inside space-y-1 text-text-secondary ml-4">
            {element.items?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );

      case 'paragraph':
        return (
          <p key={index} className="text-text-secondary leading-relaxed">
            {element.content}
          </p>
        );

      default:
        return (
          <div key={index} className="text-text-secondary">
            {element.content}
          </div>
        );
    }
  });
}