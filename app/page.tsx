import { Suspense } from 'react';
import { WeatherContent } from '@/components/WeatherContent';
import { WeatherLoading } from '@/components/WeatherLoading';
import { ErrorPage } from '@/components/ErrorPage';
import { getRandomWeatherData } from '@/lib/services/weather';
import { AnimatedHeader } from '@/components/AnimatedHeader';

// 服务器组件：处理数据获取和页面渲染
export default async function WeatherPage() {
  try {
    // 在服务器端获取随机城市天气数据
    const { location, weather } = await getRandomWeatherData();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
        <div className="container mx-auto px-4 py-8">
          <AnimatedHeader />
          
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
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return <ErrorPage />;
  }
}
