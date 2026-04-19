"use client";

import { useEffect, useState } from "react";

export function SocialProof() {
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWaitlistCount() {
      try {
        const response = await fetch('/api/waitlist-count');
        if (response.ok) {
          const data = await response.json();
          setWaitlistCount(data.waitlistCount || 0);
        }
      } catch (error) {
        console.error('Failed to fetch waitlist count:', error);
        setWaitlistCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchWaitlistCount();
  }, []);

  // Don't render anything while loading or if count is 0
  if (loading || !waitlistCount || waitlistCount === 0) {
    return null;
  }

  return (
    <section className="bg-bg-subtle py-12">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-text-secondary text-sm">
          Juntaram-se {waitlistCount > 1 ? <strong>{waitlistCount}</strong> : <strong>{waitlistCount}</strong>} {waitlistCount === 1 ? "empresa" : "empresas"} à nossa newsletter de cibersegurança
        </p>
      </div>
    </section>
  );
}