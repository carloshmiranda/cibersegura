export default function Loading() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-4xl mx-auto px-6 py-12 animate-pulse">
        <div className="h-8 w-24 bg-bg-subtle rounded mb-4" />
        <div className="h-5 w-64 bg-bg-subtle rounded mb-10" />
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-6 rounded-xl border border-border">
              <div className="h-4 w-20 bg-bg-subtle rounded mb-3" />
              <div className="h-5 w-3/4 bg-bg-subtle rounded mb-2" />
              <div className="h-4 w-full bg-bg-subtle rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
