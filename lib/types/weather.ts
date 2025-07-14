// Open Meteo API 响应数据类型定义

// 当前天气数据接口
interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
}

// 每小时天气数据接口
interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  weather_code: number[];
  wind_speed_10m: number[];
}

// 每日天气数据接口
interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
}

// Open Meteo API 完整响应接口
interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  current?: CurrentWeather;
  hourly?: HourlyWeather;
  daily?: DailyWeather;
  current_units?: Record<string, string>;
  hourly_units?: Record<string, string>;
  daily_units?: Record<string, string>;
}

// 城市位置数据接口
interface LocationData {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

// 天气代码映射接口
interface WeatherCodeInfo {
  code: number;
  description: string;
  icon: string;
}

// 导出所有接口
export type {
  CurrentWeather,
  HourlyWeather,
  DailyWeather,
  WeatherApiResponse,
  LocationData,
  WeatherCodeInfo,
}; 