import { Suspense } from 'react';
import { WeatherContent } from '@/components/WeatherContent';
import { WeatherLoading } from '@/components/WeatherLoading';
import { ErrorPage } from '@/components/ErrorPage';
import { getRandomWeatherData } from '@/lib/services/weather';

// 服务器组件：处理数据获取和页面渲染
export default async function WeatherPage() {
  try {
    // 在服务器端获取随机城市天气数据
    const { location, weather } = await getRandomWeatherData();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              Global Weather
            </h1>
            <p className="text-blue-100 text-lg md:text-xl">
              Discover weather conditions from around the world
            </p>
            <div className="mt-6">
              <a 
                href="/weather"
                className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                🌍 Try OpenWeatherMap Search →
              </a>
            </div>
          </header>
          
          <Suspense fallback={<WeatherLoading />}>
            <WeatherContent location={location} weather={weather} />
          </Suspense>
          
          <footer className="mt-12 text-center text-blue-100">
            <p className="text-sm">
              Powered by{' '}
              <a 
                href="https://open-meteo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                Open-Meteo API
              </a>
            </p>
          </footer>
        </div>
      </div>
    );
  } catch {
    // 错误处理：如果API调用失败，显示错误页面
    return <ErrorPage />;
  }
}
