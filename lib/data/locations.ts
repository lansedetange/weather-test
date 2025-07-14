import type { LocationData } from '../types/weather';

// 全球热门城市数据库，用于随机展示天气
export const RANDOM_LOCATIONS: LocationData[] = [
  {
    name: "Tokyo",
    country: "Japan",
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: "Asia/Tokyo",
  },
  {
    name: "New York",
    country: "United States",
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: "America/New_York",
  },
  {
    name: "London",
    country: "United Kingdom",
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: "Europe/London",
  },
  {
    name: "Paris",
    country: "France",
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: "Europe/Paris",
  },
  {
    name: "Sydney",
    country: "Australia",
    latitude: -33.8688,
    longitude: 151.2093,
    timezone: "Australia/Sydney",
  },
  {
    name: "Berlin",
    country: "Germany",
    latitude: 52.5200,
    longitude: 13.4050,
    timezone: "Europe/Berlin",
  },
  {
    name: "Singapore",
    country: "Singapore",
    latitude: 1.3521,
    longitude: 103.8198,
    timezone: "Asia/Singapore",
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    latitude: 25.2048,
    longitude: 55.2708,
    timezone: "Asia/Dubai",
  },
  {
    name: "São Paulo",
    country: "Brazil",
    latitude: -23.5505,
    longitude: -46.6333,
    timezone: "America/Sao_Paulo",
  },
  {
    name: "Mumbai",
    country: "India",
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: "Asia/Kolkata",
  },
  {
    name: "Beijing",
    country: "China",
    latitude: 39.9042,
    longitude: 116.4074,
    timezone: "Asia/Shanghai",
  },
  {
    name: "Los Angeles",
    country: "United States",
    latitude: 34.0522,
    longitude: -118.2437,
    timezone: "America/Los_Angeles",
  },
  {
    name: "Cairo",
    country: "Egypt",
    latitude: 30.0444,
    longitude: 31.2357,
    timezone: "Africa/Cairo",
  },
  {
    name: "Moscow",
    country: "Russia",
    latitude: 55.7558,
    longitude: 37.6173,
    timezone: "Europe/Moscow",
  },
  {
    name: "Vancouver",
    country: "Canada",
    latitude: 49.2827,
    longitude: -123.1207,
    timezone: "America/Vancouver",
  },
];

// 获取随机城市的函数
export function getRandomLocation(): LocationData {
  const randomIndex = Math.floor(Math.random() * RANDOM_LOCATIONS.length);
  return RANDOM_LOCATIONS[randomIndex];
} 