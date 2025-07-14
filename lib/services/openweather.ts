import type { 
  OpenWeatherResponse, 
  OpenWeatherForecastResponse,
  OpenWeatherParams,
  CitySearchParams,
  GeocodingResponse 
} from '../types/openweather';

// OpenWeatherMap API 基础URL
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEOCODING_BASE_URL = 'https://api.openweathermap.org/geo/1.0';

// 从环境变量获取API密钥
function getApiKey(): string {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    throw new Error(
      'OpenWeatherMap API密钥未配置。请在 .env.local 文件中设置 NEXT_PUBLIC_OPENWEATHER_API_KEY 环境变量。'
    );
  }
  
  return apiKey;
}

// 构建API查询URL的函数
function buildApiUrl(endpoint: string, params: OpenWeatherParams): string {
  const searchParams = new URLSearchParams();
  
  // 添加必需参数
  searchParams.append('lat', params.lat.toString());
  searchParams.append('lon', params.lon.toString());
  searchParams.append('appid', params.appid);
  
  // 添加可选参数
  if (params.units) {
    searchParams.append('units', params.units);
  }
  if (params.lang) {
    searchParams.append('lang', params.lang);
  }
  
  return `${OPENWEATHER_BASE_URL}/${endpoint}?${searchParams.toString()}`;
}

// 构建地理编码API查询URL的函数
function buildGeocodingUrl(endpoint: string, params: CitySearchParams): string {
  const searchParams = new URLSearchParams();
  
  searchParams.append('q', params.q);
  searchParams.append('appid', params.appid);
  
  if (params.limit) {
    searchParams.append('limit', params.limit.toString());
  }
  
  return `${GEOCODING_BASE_URL}/${endpoint}?${searchParams.toString()}`;
}

// 获取当前天气数据
export async function getCurrentWeather(
  lat: number, 
  lon: number, 
  units: 'metric' | 'imperial' | 'standard' = 'metric'
): Promise<OpenWeatherResponse> {
  const params: OpenWeatherParams = {
    lat,
    lon,
    appid: getApiKey(),
    units,
    lang: 'en'
  };

  const url = buildApiUrl('weather', params);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status} ${response.statusText}`);
    }
    
    const data: OpenWeatherResponse = await response.json();
    
    // 验证返回的数据
    if (data.cod !== 200) {
      throw new Error(`Weather data error: ${data.cod}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error('Failed to fetch current weather data. Please try again later.');
  }
}

// 获取5天天气预报
export async function getFiveDayForecast(
  lat: number, 
  lon: number, 
  units: 'metric' | 'imperial' | 'standard' = 'metric'
): Promise<OpenWeatherForecastResponse> {
  const params: OpenWeatherParams = {
    lat,
    lon,
    appid: getApiKey(),
    units,
    lang: 'en'
  };

  const url = buildApiUrl('forecast', params);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status} ${response.statusText}`);
    }
    
    const data: OpenWeatherForecastResponse = await response.json();
    
    // 验证返回的数据
    if (data.cod !== '200') {
      throw new Error(`Forecast data error: ${data.cod}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw new Error('Failed to fetch weather forecast. Please try again later.');
  }
}

// 根据城市名称搜索地理位置
export async function searchCitiesByName(cityName: string, limit: number = 5): Promise<GeocodingResponse[]> {
  const params: CitySearchParams = {
    q: cityName,
    appid: getApiKey(),
    limit
  };

  const url = buildGeocodingUrl('direct', params);
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`);
    }
    
    const data: GeocodingResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching cities:', error);
    throw new Error('Failed to search cities. Please try again later.');
  }
}

// 获取完整的天气信息（当前天气 + 预报）
export async function getCompleteWeatherData(
  lat: number, 
  lon: number, 
  units: 'metric' | 'imperial' | 'standard' = 'metric'
): Promise<{
  current: OpenWeatherResponse;
  forecast: OpenWeatherForecastResponse;
}> {
  try {
    // 并行请求当前天气和预报数据
    const [current, forecast] = await Promise.all([
      getCurrentWeather(lat, lon, units),
      getFiveDayForecast(lat, lon, units)
    ]);
    
    return { current, forecast };
  } catch (error) {
    console.error('Error fetching complete weather data:', error);
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
}

// 根据城市名称获取完整天气数据
export async function getWeatherByCity(
  cityName: string,
  units: 'metric' | 'imperial' | 'standard' = 'metric'
): Promise<{
  location: GeocodingResponse;
  current: OpenWeatherResponse;
  forecast: OpenWeatherForecastResponse;
}> {
  try {
    // 先搜索城市
    const cities = await searchCitiesByName(cityName, 1);
    
    if (cities.length === 0) {
      throw new Error(`City "${cityName}" not found`);
    }
    
    const location = cities[0];
    
    // 获取天气数据
    const { current, forecast } = await getCompleteWeatherData(
      location.lat, 
      location.lon, 
      units
    );
    
    return { location, current, forecast };
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    throw new Error(`Failed to fetch weather for "${cityName}". Please check the city name and try again.`);
  }
} 