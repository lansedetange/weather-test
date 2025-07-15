"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { LocationData, WeatherApiResponse } from '@/lib/types/weather';
import { getWeatherCodeInfo } from '@/lib/data/weather-codes';
import { event as gtag_event } from '@/lib/gtag';

interface WeatherContentProps {
  location: LocationData;
  weather: WeatherApiResponse;
}

// 客户端组件：处理用户交互和动态内容
export function WeatherContent({ location, weather }: WeatherContentProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [animatedTemp, setAnimatedTemp] = useState(0);
  
  // GSAP动画引用
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const tempRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const detailCardsRef = useRef<HTMLDivElement>(null);
  const forecastRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // 处理刷新按钮点击
  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Google Analytics事件追踪
    gtag_event({
      action: 'click',
      category: 'Weather',
      label: 'Random City Refresh',
    });
    
    // 按钮点击动画
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }
    
    // 重新加载页面以获取新的随机城市天气
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };
  
  // 格式化温度显示
  const formatTemperature = (temp: number) => {
    return `${Math.round(temp)}°C`;
  };
  
  // 格式化风速显示
  const formatWindSpeed = (speed: number) => {
    return `${Math.round(speed)} km/h`;
  };
  
  // 格式化湿度显示
  const formatHumidity = (humidity: number) => {
    return `${Math.round(humidity)}%`;
  };
  
  // 获取当前天气信息
  const currentWeather = weather.current;
  const weatherInfo = currentWeather ? getWeatherCodeInfo(currentWeather.weather_code) : null;
  
  // 获取今日预报（第一个元素）
  const todayForecast = weather.daily ? {
    max: weather.daily.temperature_2m_max[0],
    min: weather.daily.temperature_2m_min[0],
    sunrise: weather.daily.sunrise[0],
    sunset: weather.daily.sunset[0],
  } : null;
  
  // GSAP页面加载动画
  useEffect(() => {
    if (!containerRef.current || !currentWeather) return;
    
    const ctx = gsap.context(() => {
      // 设置初始状态
      gsap.set([titleRef.current, mainCardRef.current], {
        y: 50,
        opacity: 0
      });
      
      gsap.set(detailCardsRef.current?.children || [], {
        y: 30,
        opacity: 0,
        scale: 0.9
      });
      
      gsap.set(forecastRef.current?.children || [], {
        y: 20,
        opacity: 0,
        scale: 0.95
      });
      
      gsap.set(buttonRef.current, {
        y: 20,
        opacity: 0
      });
      
      // 创建时间线动画
      const tl = gsap.timeline();
      
      // 标题动画
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      });
      
      // 主卡片动画
      tl.to(mainCardRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.7");
      
      // 详细卡片交错动画
      tl.to(detailCardsRef.current?.children || [], {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)"
      }, "-=0.8");
      
      // 预报卡片交错动画
      tl.to(forecastRef.current?.children || [], {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out"
      }, "-=0.4");
      
      // 按钮动画
      tl.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.2");
      
      // 温度计数动画
      const targetTemp = Math.round(currentWeather.temperature_2m);
      gsap.to({ val: 0 }, {
        val: targetTemp,
        duration: 2,
        ease: "power2.out",
        onUpdate: function() {
          setAnimatedTemp(Math.round(this.targets()[0].val));
        },
        delay: 0.5
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, [currentWeather]);
  
  // 天气图标浮动动画
  useEffect(() => {
    if (!iconRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(iconRef.current, {
        y: -8,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
      
      // 添加脉冲效果
      gsap.to(iconRef.current, {
        scale: 1.05,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }, iconRef);
    
    return () => ctx.revert();
  }, [weatherInfo]);
  
  // 预报卡片hover动画
  useEffect(() => {
    if (!forecastRef.current) return;
    
    const cards = forecastRef.current.children;
    
    Array.from(cards).forEach((card) => {
      const element = card as HTMLElement;
      
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          y: -5,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, [weather.daily]);
  
  // 按钮脉冲动画
  useEffect(() => {
    if (!buttonRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(buttonRef.current, {
        boxShadow: "0 0 20px rgba(255,255,255,0.3)",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }, buttonRef);
    
    return () => ctx.revert();
  }, []);
  
  if (!currentWeather || !weatherInfo) {
    return (
      <div className="text-center text-white">
        <p>Weather data is not available</p>
      </div>
    );
  }
  
  return (
    <div ref={containerRef} className="max-w-4xl mx-auto">
      {/* 主要天气卡片 */}
      <div ref={mainCardRef} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 text-white mb-6 shadow-xl">
        {/* 位置信息 */}
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {location.name}
          </h2>
          <p className="text-blue-100 text-lg">
            {location.country}
          </p>
          <p className="text-blue-200 text-sm mt-1">
            {location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°
          </p>
        </div>
        
        {/* 当前天气信息 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 主要温度和天气状况 */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <span ref={iconRef} className="text-6xl inline-block">{weatherInfo.icon}</span>
              <div>
                <div ref={tempRef} className="text-5xl md:text-6xl font-bold">
                  {animatedTemp}°C
                </div>
                <div className="text-xl text-blue-100 mt-1">
                  {weatherInfo.description}
                </div>
              </div>
            </div>
            
            <div className="text-lg text-blue-100">
              Feels like {formatTemperature(currentWeather.apparent_temperature)}
            </div>
          </div>
          
          {/* 详细天气数据 */}
          <div ref={detailCardsRef} className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/20 hover:scale-105">
              <div className="text-blue-200 text-sm mb-1">Humidity</div>
              <div className="text-2xl font-semibold">
                {formatHumidity(currentWeather.relative_humidity_2m)}
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/20 hover:scale-105">
              <div className="text-blue-200 text-sm mb-1">Wind Speed</div>
              <div className="text-2xl font-semibold">
                {formatWindSpeed(currentWeather.wind_speed_10m)}
              </div>
            </div>
            
            {todayForecast && (
              <>
                <div className="bg-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <div className="text-blue-200 text-sm mb-1">High / Low</div>
                  <div className="text-2xl font-semibold">
                    {formatTemperature(todayForecast.max)} / {formatTemperature(todayForecast.min)}
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                  <div className="text-blue-200 text-sm mb-1">Sunrise</div>
                  <div className="text-lg font-semibold">
                    {new Date(todayForecast.sunrise).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* 7天预报（简化版，只显示前4天） */}
        {weather.daily && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">7-Day Forecast</h3>
            <div ref={forecastRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {weather.daily.time.slice(1, 5).map((date, index) => {
                const actualIndex = index + 1;
                const dayWeatherCode = weather.daily!.weather_code[actualIndex];
                const dayWeatherInfo = getWeatherCodeInfo(dayWeatherCode);
                const maxTemp = weather.daily!.temperature_2m_max[actualIndex];
                const minTemp = weather.daily!.temperature_2m_min[actualIndex];
                
                return (
                  <div key={date} className="bg-white/10 rounded-lg p-4 text-center cursor-pointer transition-all duration-300">
                    <div className="text-blue-200 text-sm mb-2">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-3xl mb-2">{dayWeatherInfo.icon}</div>
                    <div className="font-semibold">
                      {formatTemperature(maxTemp)}
                    </div>
                    <div className="text-blue-200 text-sm">
                      {formatTemperature(minTemp)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* 刷新按钮 */}
        <div className="text-center">
          <button
            ref={buttonRef}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`
              bg-white/20 hover:bg-white/30 disabled:bg-white/10
              text-white font-semibold py-3 px-8 rounded-lg
              transition-all duration-300 transform hover:scale-105
              disabled:scale-100 disabled:cursor-not-allowed
              ${isRefreshing ? 'opacity-50' : ''}
            `}
          >
            {isRefreshing ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Loading...
              </span>
            ) : (
              '🎲 Try Another City'
            )}
          </button>
        </div>
      </div>
      
      {/* API信息 */}
      <div className="text-center text-blue-100 text-sm">
        <p>
          Last updated: {new Date(currentWeather.time).toLocaleString()} •{' '}
          Data from Open-Meteo API
        </p>
      </div>
    </div>
  );
} 