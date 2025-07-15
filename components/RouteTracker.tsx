"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview, isGAEnabled } from '@/lib/gtag';

// 路由追踪组件 - 监听页面变化并发送GA页面浏览事件
export function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (isGAEnabled()) {
      pageview(pathname);
    }
  }, [pathname]);

  return null;
} 