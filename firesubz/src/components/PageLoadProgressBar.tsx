"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

// Optional: Configure NProgress (e.g., disable spinner)
// NProgress.configure({ showSpinner: false });

export function PageLoadProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done(); // Ensure progress bar finishes on initial load/navigation
  }, [pathname, searchParams]);

  // No need to listen to router events manually in App Router >= 13.4
  // Next.js handles showing NProgress during navigation automatically
  // if configured correctly via useEffect dependency change.

  // If using older Next.js versions or needing manual control:
  /*
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // Using Next Navigation Events (newer method if needed)
    // Note: These might not be exposed directly for simple use cases.
    // Relying on pathname/searchParams change is often sufficient.

    // Fallback to older router events if necessary
    // import Router from 'next/router';
    // Router.events.on('routeChangeStart', handleStart);
    // Router.events.on('routeChangeComplete', handleStop);
    // Router.events.on('routeChangeError', handleStop);

    return () => {
      // Router.events.off('routeChangeStart', handleStart);
      // Router.events.off('routeChangeComplete', handleStop);
      // Router.events.off('routeChangeError', handleStop);
    };
  }, []);
  */

  // This component doesn't render anything itself
  return null;
}
