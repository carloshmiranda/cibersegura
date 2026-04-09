"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
        setIsExpired(false);
      } else {
        setIsExpired(true);
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    updateCountdown(); // Update immediately
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="text-center">
        <div className="text-error font-bold text-lg">
          Prazo expirado
        </div>
        <div className="text-error/80 text-sm mt-1">
          O prazo para registo no CNCS terminou
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
      <div className="text-center">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-warning-text/10">
          <div className="text-2xl font-bold text-warning-text">
            {timeRemaining.days.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-warning-text/80 uppercase tracking-wide font-medium">
            Dias
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-warning-text/10">
          <div className="text-2xl font-bold text-warning-text">
            {timeRemaining.hours.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-warning-text/80 uppercase tracking-wide font-medium">
            Horas
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-warning-text/10">
          <div className="text-2xl font-bold text-warning-text">
            {timeRemaining.minutes.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-warning-text/80 uppercase tracking-wide font-medium">
            Min
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-warning-text/10">
          <div className="text-2xl font-bold text-warning-text">
            {timeRemaining.seconds.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-warning-text/80 uppercase tracking-wide font-medium">
            Seg
          </div>
        </div>
      </div>
    </div>
  );
}