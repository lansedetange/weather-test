"use client";

import { useState } from 'react';
import type { LocationData, WeatherApiResponse } from '@/lib/types/weather';
import { getWeatherCodeInfo } from '@/lib/data/weather-codes';

interface WeatherContentProps {
  location: LocationData;
  weather: WeatherApiResponse;
}

// 客户端组件：处理用户交互和动态内容
export function WeatherContent({ location, weather }: WeatherContentProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // 处理刷新按钮点击
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // 重新加载页面以获取新的随机城市天气
    window.location.reload();
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
  
  if (!currentWeather || !weatherInfo) {
    return (
      <div className="text-center text-white">
        <p>Weather data is not available</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* 主要天气卡片 */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 text-white mb-6">
        {/* 位置信息 */}
        <div className="text-center mb-8">
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
              <span className="text-6xl">{weatherInfo.icon}</span>
              <div>
                <div className="text-5xl md:text-6xl font-bold">
                  {formatTemperature(currentWeather.temperature_2m)}
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
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-blue-200 text-sm mb-1">Humidity</div>
              <div className="text-2xl font-semibold">
                {formatHumidity(currentWeather.relative_humidity_2m)}
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-blue-200 text-sm mb-1">Wind Speed</div>
              <div className="text-2xl font-semibold">
                {formatWindSpeed(currentWeather.wind_speed_10m)}
              </div>
            </div>
            
            {todayForecast && (
              <>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-blue-200 text-sm mb-1">High / Low</div>
                  <div className="text-2xl font-semibold">
                    {formatTemperature(todayForecast.max)} / {formatTemperature(todayForecast.min)}
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {weather.daily.time.slice(1, 5).map((date, index) => {
                const actualIndex = index + 1;
                const dayWeatherCode = weather.daily!.weather_code[actualIndex];
                const dayWeatherInfo = getWeatherCodeInfo(dayWeatherCode);
                const maxTemp = weather.daily!.temperature_2m_max[actualIndex];
                const minTemp = weather.daily!.temperature_2m_min[actualIndex];
                
                return (
                  <div key={date} className="bg-white/10 rounded-lg p-4 text-center">
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
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`
              bg-white/20 hover:bg-white/30 disabled:bg-white/10
              text-white font-semibold py-3 px-8 rounded-lg
              transition-all duration-200 transform hover:scale-105
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