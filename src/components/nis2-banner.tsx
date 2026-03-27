'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function NIS2Banner() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const [mounted, setMounted] = useState(false);

  // NIS2 enforcement date: April 3, 2026
  const targetDate = new Date('2026-04-03T00:00:00Z');

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every minute
    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div
      className="w-full border-l-4"
      style={{
        backgroundColor: '#fef3c7', // amber-100
        borderLeftColor: '#d97706', // warning color
        color: '#92400e' // amber-800 for text
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-bold text-sm">
                URGENTE: NIS2 entra em vigor em {timeLeft.days} dias
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              A nova diretiva de ciberseguranca da UE obriga PMEs a cumprir novos requisitos.
              Faltam apenas <strong>{timeLeft.days} dias, {timeLeft.hours}h e {timeLeft.minutes}min</strong> para a entrada em vigor.
            </p>
          </div>
          <Link
            href="/blog/nis2-portugal-guia-pme"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors hover:bg-amber-200"
            style={{ backgroundColor: '#d97706', color: '#ffffff' }}
          >
            Guia de Conformidade
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}