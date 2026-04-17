import type { Author } from "@/lib/posts";

interface AuthorBylineProps {
  author: Author;
  publishedAt: string;
  readingTime: number;
  compact?: boolean;
}

export function AuthorByline({
  author,
  publishedAt,
  readingTime,
  compact = false
}: AuthorBylineProps) {
  return (
    <div className={`flex items-center gap-4 ${compact ? 'text-sm' : 'text-sm'}`}>
      {author.image && (
        <img
          src={author.image}
          alt={author.name}
          className="w-10 h-10 rounded-full object-cover"
          loading="lazy"
        />
      )}
      <div className="flex-1">
        <div className="flex items-center gap-2 text-text-secondary">
          <span className="font-medium text-text">{author.name}</span>
          {author.title && (
            <>
              <span className="text-text-muted">•</span>
              <span className="text-text-muted">{author.title}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 text-text-muted mt-1">
          <time dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString("pt-PT", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <span>•</span>
          <span>{readingTime} min de leitura</span>
        </div>
      </div>
    </div>
  );
}

export function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="p-6 bg-bg-subtle border border-border rounded-lg">
      <div className="flex items-start gap-4">
        {author.image && (
          <img
            src={author.image}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            loading="lazy"
          />
        )}
        <div>
          <h3 className="font-semibold text-text mb-1">{author.name}</h3>
          {author.title && (
            <p className="text-sm text-accent mb-2">{author.title}</p>
          )}
          {author.bio && (
            <p className="text-sm text-text-secondary leading-relaxed">{author.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}