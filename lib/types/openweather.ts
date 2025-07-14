// OpenWeatherMap API 响应数据类型定义

// 坐标信息接口
interface Coord {
  lon: number;
  lat: number;
}

// 天气状况接口  
interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// 主要天气数据接口
interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

// 风力信息接口
interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

// 云量信息接口
interface Clouds {
  all: number;
}

// 降雨信息接口
interface Rain {
  "1h"?: number;
  "3h"?: number;
}

// 降雪信息接口
interface Snow {
  "1h"?: number;
  "3h"?: number;
}

// 系统信息接口
interface Sys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

// OpenWeatherMap 当前天气API完整响应接口
interface OpenWeatherResponse {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain?: Rain;
  snow?: Snow;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// 5天预报中的单个预报项接口
interface ForecastItem {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number; // 降水概率
  rain?: Rain;
  snow?: Snow;
  sys: {
    pod: string; // "d" for day, "n" for night
  };
  dt_txt: string;
}

// 5天预报响应接口
interface OpenWeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

// API请求参数接口
interface OpenWeatherParams {
  lat: number;
  lon: number;
  appid: string;
  units?: 'standard' | 'metric' | 'imperial';
  lang?: string;
}

// 城市搜索请求参数接口
interface CitySearchParams {
  q: string;
  appid: string;
  limit?: number;
}

// 地理编码API响应接口（用于城市搜索）
interface GeocodingResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// 天气图标映射接口
interface WeatherIcon {
  code: string;
  description: string;
  emoji: string;
  dayIcon: string;
  nightIcon: string;
}

// 导出所有接口
export type {
  Coord,
  Weather,
  Main,
  Wind,
  Clouds,
  Rain,
  Snow,
  Sys,
  OpenWeatherResponse,
  ForecastItem,
  OpenWeatherForecastResponse,
  OpenWeatherParams,
  CitySearchParams,
  GeocodingResponse,
  WeatherIcon,
}; 