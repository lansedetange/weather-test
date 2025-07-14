import type { WeatherIcon } from '../types/openweather';

// OpenWeatherMap 天气图标映射表
export const WEATHER_ICONS: Record<string, WeatherIcon> = {
  // 晴天
  "01d": {
    code: "01d",
    description: "Clear sky (day)",
    emoji: "☀️",
    dayIcon: "☀️",
    nightIcon: "🌙",
  },
  "01n": {
    code: "01n", 
    description: "Clear sky (night)",
    emoji: "🌙",
    dayIcon: "☀️",
    nightIcon: "🌙",
  },
  
  // 少云
  "02d": {
    code: "02d",
    description: "Few clouds (day)",
    emoji: "🌤️",
    dayIcon: "🌤️",
    nightIcon: "☁️",
  },
  "02n": {
    code: "02n",
    description: "Few clouds (night)",
    emoji: "☁️",
    dayIcon: "🌤️",
    nightIcon: "☁️",
  },
  
  // 分散云
  "03d": {
    code: "03d",
    description: "Scattered clouds",
    emoji: "⛅",
    dayIcon: "⛅",
    nightIcon: "⛅",
  },
  "03n": {
    code: "03n",
    description: "Scattered clouds",
    emoji: "⛅",
    dayIcon: "⛅",
    nightIcon: "⛅",
  },
  
  // 密云
  "04d": {
    code: "04d",
    description: "Broken clouds",
    emoji: "☁️",
    dayIcon: "☁️",
    nightIcon: "☁️",
  },
  "04n": {
    code: "04n",
    description: "Broken clouds",
    emoji: "☁️",
    dayIcon: "☁️",
    nightIcon: "☁️",
  },
  
  // 阵雨
  "09d": {
    code: "09d",
    description: "Shower rain",
    emoji: "🌦️",
    dayIcon: "🌦️",
    nightIcon: "🌧️",
  },
  "09n": {
    code: "09n",
    description: "Shower rain",
    emoji: "🌧️",
    dayIcon: "🌦️",
    nightIcon: "🌧️",
  },
  
  // 雨
  "10d": {
    code: "10d",
    description: "Rain (day)",
    emoji: "🌧️",
    dayIcon: "🌧️",
    nightIcon: "🌧️",
  },
  "10n": {
    code: "10n",
    description: "Rain (night)",
    emoji: "🌧️",
    dayIcon: "🌧️",
    nightIcon: "🌧️",
  },
  
  // 雷暴
  "11d": {
    code: "11d",
    description: "Thunderstorm",
    emoji: "⛈️",
    dayIcon: "⛈️",
    nightIcon: "⛈️",
  },
  "11n": {
    code: "11n",
    description: "Thunderstorm",
    emoji: "⛈️",
    dayIcon: "⛈️",
    nightIcon: "⛈️",
  },
  
  // 雪
  "13d": {
    code: "13d",
    description: "Snow",
    emoji: "❄️",
    dayIcon: "❄️",
    nightIcon: "❄️",
  },
  "13n": {
    code: "13n",
    description: "Snow",
    emoji: "❄️",
    dayIcon: "❄️",
    nightIcon: "❄️",
  },
  
  // 雾
  "50d": {
    code: "50d",
    description: "Mist",
    emoji: "🌫️",
    dayIcon: "🌫️",
    nightIcon: "🌫️",
  },
  "50n": {
    code: "50n",
    description: "Mist",
    emoji: "🌫️",
    dayIcon: "🌫️",
    nightIcon: "🌫️",
  },
};

// 根据天气图标代码获取图标信息
export function getWeatherIcon(iconCode: string): WeatherIcon {
  return WEATHER_ICONS[iconCode] || {
    code: iconCode,
    description: "Unknown weather",
    emoji: "❓",
    dayIcon: "❓",
    nightIcon: "❓",
  };
}

// 根据天气主要类型获取合适的emoji
export function getWeatherEmojiByMain(main: string): string {
  const mainType = main.toLowerCase();
  
  switch (mainType) {
    case 'clear':
      return '☀️';
    case 'clouds':
      return '☁️';
    case 'rain':
      return '🌧️';
    case 'drizzle':
      return '🌦️';
    case 'thunderstorm':
      return '⛈️';
    case 'snow':
      return '❄️';
    case 'mist':
    case 'fog':
    case 'haze':
      return '🌫️';
    case 'smoke':
      return '💨';
    case 'dust':
    case 'sand':
      return '🌪️';
    default:
      return '🌤️';
  }
} 