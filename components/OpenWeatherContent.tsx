"use client";

import { useState } from 'react';
import type { 
  OpenWeatherResponse, 
  OpenWeatherForecastResponse,
  GeocodingResponse,
  ForecastItem 
} from '@/lib/types/openweather';
import { getWeatherByCity } from '@/lib/services/openweather';
import { getWeatherIcon } from '@/lib/data/openweather-icons';

interface OpenWeatherContentProps {
  initialData: {
    location: GeocodingResponse;
    current: OpenWeatherResponse;
    forecast: OpenWeatherForecastResponse;
  };
}

// 客户端组件：处理OpenWeatherMap数据展示和用户交互
export function OpenWeatherContent({ initialData }: OpenWeatherContentProps) {
  const [weatherData, setWeatherData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 处理城市搜索
  const handleCitySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherByCity(searchQuery.trim(), 'metric');
      setWeatherData(data);
      setSearchQuery(''); // 清空搜索框
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };
  
  // 格式化温度显示
  const formatTemperature = (temp: number) => {
    return `${Math.round(temp)}°C`;
  };
  
  // 格式化风速显示
  const formatWindSpeed = (speed: number) => {
    return `${Math.round(speed)} m/s`;
  };
  
  // 格式化湿度显示
  const formatHumidity = (humidity: number) => {
    return `${Math.round(humidity)}%`;
  };
  
  // 格式化日期显示
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  // 格式化时间显示
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };
  
  // 获取5天预报的每日数据（选择每天12:00的数据作为代表）
  const getDailyForecast = () => {
    const dailyData: ForecastItem[] = [];
    const processedDates = new Set<string>();
    
    weatherData.forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toDateString();
      
      // 如果这个日期还没有处理过，并且不是今天，就添加到结果中
      if (!processedDates.has(date) && dailyData.length < 5) {
        // 优先选择12:00左右的数据，否则选择第一个可用的数据
        const timeHour = new Date(item.dt * 1000).getHours();
        if (timeHour >= 11 && timeHour <= 13) {
          dailyData.push(item);
          processedDates.add(date);
        } else if (processedDates.size === 0 || !processedDates.has(date)) {
          // 如果没有12:00的数据，就用第一个可用的
          dailyData.push(item);
          processedDates.add(date);
        }
      }
    });
    
    return dailyData.slice(0, 5); // 确保最多5天
  };
  
  const { current, location } = weatherData;
  const weatherInfo = getWeatherIcon(current.weather[0].icon);
  const dailyForecast = getDailyForecast();
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* 城市搜索 */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
        <form onSubmit={handleCitySearch} className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for any city... (e.g., Tokyo, New York, Paris)"
            className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !searchQuery.trim()}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isLoading ? '🔍' : '🔍 Search'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-100">
            {error}
          </div>
        )}
      </div>
      
      {/* 主要天气卡片 */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 text-white mb-6">
        {/* 位置信息 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {current.name}
          </h2>
          <p className="text-purple-100 text-lg">
            {current.sys.country}
          </p>
          <p className="text-purple-200 text-sm mt-1">
            {location.lat.toFixed(2)}°, {location.lon.toFixed(2)}°
          </p>
        </div>
        
        {/* 当前天气信息 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 主要温度和天气状况 */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <span className="text-6xl">{weatherInfo.emoji}</span>
              <div>
                <div className="text-5xl md:text-6xl font-bold">
                  {formatTemperature(current.main.temp)}
                </div>
                <div className="text-xl text-purple-100 mt-1 capitalize">
                  {current.weather[0].description}
                </div>
              </div>
            </div>
            
            <div className="text-lg text-purple-100">
              Feels like {formatTemperature(current.main.feels_like)}
            </div>
          </div>
          
          {/* 详细天气数据 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-purple-200 text-sm mb-1">Humidity</div>
              <div className="text-2xl font-semibold">
                {formatHumidity(current.main.humidity)}
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-purple-200 text-sm mb-1">Wind Speed</div>
              <div className="text-2xl font-semibold">
                {formatWindSpeed(current.wind.speed)}
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-purple-200 text-sm mb-1">Pressure</div>
              <div className="text-2xl font-semibold">
                {current.main.pressure} hPa
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-purple-200 text-sm mb-1">Visibility</div>
              <div className="text-2xl font-semibold">
                {Math.round(current.visibility / 1000)} km
              </div>
            </div>
          </div>
        </div>
        
        {/* 日出日落信息 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-purple-200 text-sm mb-1">🌅 Sunrise</div>
            <div className="text-lg font-semibold">
              {formatTime(current.sys.sunrise)}
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-purple-200 text-sm mb-1">🌇 Sunset</div>
            <div className="text-lg font-semibold">
              {formatTime(current.sys.sunset)}
            </div>
          </div>
        </div>
        
        {/* 5天预报 */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">5-Day Forecast</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {dailyForecast.map((item, index) => {
              const itemWeatherInfo = getWeatherIcon(item.weather[0].icon);
              
              return (
                <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-purple-200 text-sm mb-2">
                    {formatDate(item.dt)}
                  </div>
                  <div className="text-3xl mb-2">{itemWeatherInfo.emoji}</div>
                  <div className="font-semibold">
                    {formatTemperature(item.main.temp)}
                  </div>
                  <div className="text-purple-200 text-sm">
                    {Math.round(item.pop * 100)}% rain
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* API信息 */}
      <div className="text-center text-purple-100 text-sm">
        <p>
          Last updated: {new Date(current.dt * 1000).toLocaleString()} •{' '}
          Data from OpenWeatherMap API
        </p>
      </div>
    </div>
  );
} 