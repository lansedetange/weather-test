# Weather App - Dual Weather APIs

一个基于Next.js 15和TypeScript构建的综合天气应用，集成了Open Meteo API和OpenWeatherMap API，提供全面的天气信息服务。

## 功能特性

### 🌍 随机天气展示 (Open Meteo API)
- **随机城市天气展示** - 从全球15个热门城市中随机选择一个展示天气
- **实时天气数据** - 使用免费的Open Meteo API获取准确的天气信息
- **一键刷新** - 点击按钮即可获取新的随机城市天气

### 🔍 城市搜索天气 (OpenWeatherMap API)  
- **全球城市搜索** - 搜索世界上任何城市的天气信息
- **实时数据更新** - 使用OpenWeatherMap API获取最新天气数据
- **5天天气预报** - 显示未来5天的详细天气预报
- **丰富的天气信息** - 温度、湿度、风速、气压、能见度等

### 🎨 用户体验
- **响应式设计** - 完美适配移动端和桌面端
- **现代化技术栈** - Next.js 15 + TypeScript + Tailwind CSS
- **优美的UI设计** - 渐变背景、毛玻璃效果、动画过渡
- **智能错误处理** - 友好的错误提示和重试机制

## 技术架构

### 前端技术栈
- **Next.js 15** - React框架，使用App Router
- **TypeScript** - 类型安全的JavaScript
- **Tailwind CSS** - 实用程序优先的CSS框架
- **React 18** - 用户界面库

### 服务器组件与客户端组件分离
- **服务器组件** (`app/page.tsx`, `app/weather/page.tsx`) - 处理数据获取和SEO metadata
- **客户端组件** (`components/*Content.tsx`) - 处理用户交互和动态内容
- **加载组件** (`components/*Loading.tsx`) - 骨架屏加载状态
- **错误组件** (`components/*Error.tsx`) - 错误处理界面

### 数据层
- **天气服务** (`lib/services/`) - API调用封装
- **类型定义** (`lib/types/`) - TypeScript接口定义
- **城市数据** (`lib/data/locations.ts`) - 全球15个城市的坐标和时区信息
- **天气代码** (`lib/data/*-codes.ts`) - 天气代码映射表

## 开发环境设置

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 运行。

### 页面路由
- `/` - 主页（Open Meteo API随机天气）
- `/weather` - OpenWeatherMap城市搜索页面

### 项目结构
```
weather-test/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局组件（服务器组件）
│   ├── page.tsx           # 主页面（服务器组件）
│   ├── weather/           # OpenWeatherMap页面
│   │   └── page.tsx       # 天气搜索页面（服务器组件）
│   └── globals.css        # 全局样式
├── components/            # React组件
│   ├── WeatherContent.tsx    # Open Meteo天气内容组件（客户端组件）
│   ├── OpenWeatherContent.tsx # OpenWeatherMap内容组件（客户端组件）
│   ├── *Loading.tsx       # 加载状态组件
│   └── *Error.tsx         # 错误页面组件（客户端组件）
├── lib/                   # 业务逻辑库
│   ├── types/             # TypeScript类型定义
│   │   ├── weather.ts     # Open Meteo API类型
│   │   └── openweather.ts # OpenWeatherMap API类型
│   ├── services/          # API服务
│   │   ├── weather.ts     # Open Meteo服务
│   │   └── openweather.ts # OpenWeatherMap服务
│   └── data/              # 静态数据
│       ├── locations.ts   # 城市坐标数据
│       ├── weather-codes.ts      # WMO天气代码
│       └── openweather-icons.ts  # OpenWeatherMap图标
└── public/                # 静态资源
```

## API集成

### Open Meteo API (主页 `/`)
- **API地址**: https://api.open-meteo.com/v1/forecast
- **无需API Key** - 免费使用
- **获取数据**: 当前天气、24小时预报、7天预报
- **包含信息**: 温度、湿度、风速、天气状况、日出日落等

### OpenWeatherMap API (天气搜索页 `/weather`)
- **API地址**: https://api.openweathermap.org/data/2.5/weather
- **需要API Key** - 免费套餐1000次/天
- **获取数据**: 当前天气、5天预报、城市搜索
- **包含信息**: 详细天气数据、气压、能见度、精确坐标等
- **API Key**: 已集成用户提供的密钥 `e0deeb26d16b94799bd340173dfcb26e`

## 支持的城市

Open Meteo API随机从以下15个全球城市中选择：
- 东京 (日本)
- 纽约 (美国)
- 伦敦 (英国)
- 巴黎 (法国)
- 悉尼 (澳大利亚)
- 柏林 (德国)
- 新加坡 (新加坡)
- 迪拜 (阿联酋)
- 圣保罗 (巴西)
- 孟买 (印度)
- 北京 (中国)
- 洛杉矶 (美国)
- 开罗 (埃及)
- 莫斯科 (俄罗斯)
- 温哥华 (加拿大)

OpenWeatherMap API支持全球任意城市搜索。

## 开发规范

### 代码风格
- 使用TypeScript进行类型检查
- 遵循ESLint代码规范
- 组件使用函数式编程
- 中文注释，英文网页文案

### Git提交规范
- 每次功能更新都提交到master分支
- 使用中文描述具体改动
- 更新README.md记录变更

### 性能优化
- 最小化"use client"使用
- 服务器组件优先
- 响应式设计
- 图片优化和懒加载

## 更新日志

### v1.1.0 (2025-01-25)
- ✅ 新增OpenWeatherMap API天气页面 `/weather`
- ✅ 集成用户提供的API Key
- ✅ 实现城市搜索功能
- ✅ 添加5天天气预报展示
- ✅ 完善天气图标映射系统
- ✅ 支持实时城市天气查询
- ✅ 优化错误处理和加载状态

### v1.0.0 (2025-01-25)
- ✅ 初始版本发布
- ✅ 实现随机城市天气展示功能
- ✅ 集成Open Meteo API
- ✅ 完成响应式UI设计
- ✅ 添加7天天气预报
- ✅ 实现服务器组件和客户端组件分离架构
- ✅ 添加加载状态和错误处理
- ✅ 完善TypeScript类型定义

## 部署

### 使用Vercel部署
```bash
npm run build
```

### 环境要求
- Node.js 18+
- Next.js 14+
- 支持服务器端渲染的托管平台

## 许可证

MIT License

## 致谢

- [Open-Meteo](https://open-meteo.com/) - 提供免费的天气API
- [OpenWeatherMap](https://openweathermap.org/) - 提供专业的天气API服务
- [Next.js](https://nextjs.org/) - React开发框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
