"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function AnimatedHeader() {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    if (!headerRef.current) return;
    
    const ctx = gsap.context(() => {
      // 设置初始状态
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
        y: 30,
        opacity: 0
      });
      
      // 创建主时间线
      const mainTl = gsap.timeline();
      
      // 标题动画 - 从上方滑入并带有弹性效果
      mainTl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      });
      
      // 副标题动画 - 稍微延迟的渐入
      mainTl.to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, "-=0.7");
      
      // 按钮动画 - 从下方弹出
      mainTl.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.3)"
      }, "-=0.5");
      
      // 标题文字的微妙脉冲动画
      gsap.to(titleRef.current, {
        textShadow: "0 0 20px rgba(255,255,255,0.3)",
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2
      });
      
    }, headerRef);
    
    return () => ctx.revert();
  }, []);
  
  // 按钮hover动画
  useEffect(() => {
    if (!buttonRef.current) return;
    
    const button = buttonRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <header ref={headerRef} className="text-center mb-8">
      <h1 
        ref={titleRef}
        className="text-4xl md:text-6xl font-bold text-white mb-2 relative"
      >
        <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
          Global Weather
        </span>
      </h1>
      
      <p 
        ref={subtitleRef}
        className="text-blue-100 text-lg md:text-xl mb-6"
      >
        Discover weather conditions from around the world
      </p>
      
      <div className="mt-6">
        <a 
          ref={buttonRef}
          href="/weather"
          className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
        >
          <span className="flex items-center gap-2">
            🌍 Try OpenWeatherMap Search →
          </span>
        </a>
      </div>
      
      {/* 装饰性的浮动元素 */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 opacity-20">
        <div className="w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      </div>
    </header>
  );
} 