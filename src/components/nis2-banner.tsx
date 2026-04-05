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
  const isPast = new Date() > targetDate;

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

  if (isPast) {
    return (
      <div role="alert" aria-label="Alerta de conformidade NIS2"
        className="w-full border-l-4 border-warning bg-warning-bg text-warning-text">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <span className="font-bold text-sm">NIS2 já está em vigor em Portugal.</span>
              <span className="text-sm"> Verifique se a sua empresa está em conformidade.</span>
            </div>
            <Link href="/blog/nis2-portugal-guia-pme"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-warning hover:opacity-90 rounded-lg transition-colors flex-shrink-0">
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

  return (
    <div role="alert" aria-label="Alerta de conformidade NIS2" className="w-full border-l-4 border-warning bg-warning-bg text-warning-text">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <span className="font-bold text-sm">
                URGENTE: NIS2 entra em vigor em {timeLeft.days} dias
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              A nova diretiva de ciberseguranca da UE obriga PMEs a cumprir novos requisitos.
              Faltam apenas <strong className="tabular-nums">{timeLeft.days} dias, {timeLeft.hours}h e {timeLeft.minutes}min</strong> para a entrada em vigor.
            </p>
          </div>
          <Link
            href="/blog/nis2-portugal-guia-pme"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-warning hover:bg-yellow-700 rounded-lg transition-colors"
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