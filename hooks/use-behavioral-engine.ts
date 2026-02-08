'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export type MonetizationSignal = 
  | 'ScrollDepthReached' 
  | 'TimeOnAssetExceeded' 
  | 'InactivityGap' 
  | 'ReturnSessionDetected' 
  | 'HighPremiumViewed';

interface BehavioralEvent {
  signal: MonetizationSignal;
  context: any;
  timestamp: number;
}

export function useBehavioralEngine() {
  const pathname = usePathname();
  const [activeSignal, setActiveSignal] = useState<BehavioralEvent | null>(null);
  const scrollTracked = useRef<Set<number>>(new Set());
  const startTime = useRef<number>(Date.now());
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const triggerSignal = async (signal: MonetizationSignal, context: any = {}) => {
    const event = { signal, context, timestamp: Date.now() };
    setActiveSignal(event);
    
    // Log to Omni-Intelligence Layer (Prisma/Neon)
    try {
      await fetch('/api/events/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
    } catch (e) {
      console.error("Omni-Intelligence Sync Failed", e);
    }

    resetInactivityTimer();
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      triggerSignal('InactivityGap', { lastPath: pathname });
    }, 15000); // 15 seconds of silence triggers a "Gap"
  };

  useEffect(() => {
    // 1. Scroll Depth Tracking
    const handleScroll = () => {
      const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
      if (scrollPercent > 80 && !scrollTracked.current.has(80)) {
        scrollTracked.current.add(80);
        triggerSignal('ScrollDepthReached', { depth: 80, path: pathname });
      }
    };

    // 2. Time on Asset Tracking
    const timeInterval = setInterval(() => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      if (elapsed > 120 && pathname.includes('/inventory/')) {
        triggerSignal('TimeOnAssetExceeded', { seconds: 120, assetId: pathname.split('/').pop() });
        clearInterval(timeInterval);
      }
    }, 10000);

    window.addEventListener('scroll', handleScroll);
    resetInactivityTimer();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [pathname]);

  return { activeSignal, dismissSignal: () => setActiveSignal(null), triggerSignal };
}
