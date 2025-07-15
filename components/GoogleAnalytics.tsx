"use client";

import Script from 'next/script';
import { GA_TRACKING_ID } from '@/lib/gtag';

// Google Analytics组件
export function GoogleAnalytics() {
  // 只在生产环境或有GA_TRACKING_ID时启用
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
    </>
  );
} 