"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function OpenWeatherHeader() {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    if (!headerRef.current) return;
    
    const ctx = gsap.context(() => {
      // 设置初始状态
      gsap.set([titleRef.current, subtitleRef.current], {
        y: 40,
        opacity: 0,
        scale: 0.9
      });
      
      // 创建主时间线
      const mainTl = gsap.timeline();
      
      // 标题动画 - 放大缩小的弹性效果
      mainTl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.7)"
      });
      
      // 副标题动画 - 打字机效果风格
      mainTl.to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=1");
      
      // 持续的彩虹文字效果
      gsap.to(titleRef.current, {
        backgroundPosition: "200% center",
        duration: 4,
        ease: "none",
        repeat: -1,
        delay: 2
      });
      
      // 标题的微妙浮动效果
      gsap.to(titleRef.current, {
        y: -3,
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 3
      });
      
    }, headerRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <header ref={headerRef} className="text-center mb-8 relative">
      <h1 
        ref={titleRef}
        className="text-4xl md:text-6xl font-bold text-white mb-2 relative"
        style={{
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        OpenWeatherMap
      </h1>
      
      <p 
        ref={subtitleRef}
        className="text-purple-100 text-lg md:text-xl mb-6"
      >
        Real-time weather data with city search
      </p>
      
      {/* 装饰性的背景粒子 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-200/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-200/30 rounded-full animate-bounce"></div>
      </div>
    </header>
  );
} 