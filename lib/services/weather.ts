import type { WeatherApiResponse, LocationData } from '../types/weather';

// Open Meteo API 基础URL
const OPENMETEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// 构建API查询参数的接口
interface WeatherParams {
  latitude: number;
  longitude: number;
  timezone: string;
  current?: string[];
  hourly?: string[];
  daily?: string[];
}

// 构建查询URL的函数
function buildWeatherApiUrl(params: WeatherParams): string {
  const searchParams = new URLSearchParams();
  
  // 基础参数
  searchParams.append('latitude', params.latitude.toString());
  searchParams.append('longitude', params.longitude.toString());
  searchParams.append('timezone', params.timezone);
  
  // 当前天气参数
  if (params.current && params.current.length > 0) {
    searchParams.append('current', params.current.join(','));
  }
  
  // 小时预报参数
  if (params.hourly && params.hourly.length > 0) {
    searchParams.append('hourly', params.hourly.join(','));
  }
  
  // 日预报参数
  if (params.daily && params.daily.length > 0) {
    searchParams.append('daily', params.daily.join(','));
  }
  
  return `${OPENMETEO_BASE_URL}?${searchParams.toString()}`;
}

// 获取指定位置的天气数据
export async function getWeatherData(location: LocationData): Promise<WeatherApiResponse> {
  const params: WeatherParams = {
    latitude: location.latitude,
    longitude: location.longitude,
    timezone: location.timezone,
    // 请求当前天气数据
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m'
    ],
    // 请求24小时预报数据
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'weather_code',
      'wind_speed_10m'
    ],
    // 请求7天预报数据
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'sunset'
    ]
  };

  const url = buildWeatherApiUrl(params);
  
  try {
    // 调用Open Meteo API
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data: WeatherApiResponse = await response.json();
    
    // 验证返回的数据是否包含必要字段
    if (!data.latitude || !data.longitude) {
      throw new Error('Invalid weather data received from API');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
}

// 获取随机位置的天气数据（用于首页展示）
export async function getRandomWeatherData(): Promise<{ location: LocationData; weather: WeatherApiResponse }> {
  // 动态导入避免服务器端加载问题
  const { getRandomLocation } = await import('../data/locations');
  
  const location = getRandomLocation();
  const weather = await getWeatherData(location);
  
  return { location, weather };
} 