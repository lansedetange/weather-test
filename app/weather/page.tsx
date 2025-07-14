import { Suspense } from 'react';
import { OpenWeatherContent } from '@/components/OpenWeatherContent';
import { OpenWeatherLoading } from '@/components/OpenWeatherLoading';
import { OpenWeatherError } from '@/components/OpenWeatherError';
import { getWeatherByCity } from '@/lib/services/openweather';

// 默认展示的城市
const DEFAULT_CITY = 'London';

// 服务器组件：使用OpenWeatherMap API获取天气数据
export default async function OpenWeatherPage() {
  try {
    // 在服务器端获取伦敦的天气数据作为默认展示
    const weatherData = await getWeatherByCity(DEFAULT_CITY, 'metric');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              OpenWeatherMap
            </h1>
            <p className="text-purple-100 text-lg md:text-xl">
              Real-time weather data with city search
            </p>
          </header>
          
          <Suspense fallback={<OpenWeatherLoading />}>
            <OpenWeatherContent initialData={weatherData} />
          </Suspense>
          
          <footer className="mt-12 text-center text-purple-100">
            <p className="text-sm">
              Powered by{' '}
              <a 
                href="https://openweathermap.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                OpenWeatherMap API
              </a>
              {' '}• Search for any city worldwide
            </p>
          </footer>
        </div>
      </div>
    );
  } catch (error) {
    // 错误处理：如果API调用失败，显示错误页面
    console.error('Failed to load initial weather data:', error);
    return <OpenWeatherError />;
  }
} 