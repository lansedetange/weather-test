// OpenWeatherMap 加载中的占位符组件
export function OpenWeatherLoading() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* 搜索框骨架屏 */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
        <div className="h-12 bg-white/20 rounded-lg mb-4 animate-pulse"></div>
        <div className="h-10 bg-white/15 rounded-lg w-32 animate-pulse"></div>
      </div>
      
      {/* 主要天气卡片骨架屏 */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 text-white mb-6">
        {/* 位置信息骨架屏 */}
        <div className="text-center mb-8">
          <div className="h-8 bg-white/20 rounded-lg mb-2 w-48 mx-auto animate-pulse"></div>
          <div className="h-6 bg-white/15 rounded-lg w-32 mx-auto animate-pulse"></div>
        </div>
        
        {/* 当前天气骨架屏 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              <div className="h-16 w-16 bg-white/20 rounded-full animate-pulse"></div>
              <div>
                <div className="h-16 bg-white/20 rounded-lg w-32 mb-2 animate-pulse"></div>
                <div className="h-6 bg-white/15 rounded-lg w-24 animate-pulse"></div>
              </div>
            </div>
            <div className="h-6 bg-white/15 rounded-lg w-40 mx-auto lg:mx-0 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <div className="h-4 bg-white/15 rounded mb-2 animate-pulse"></div>
                <div className="h-8 bg-white/20 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 5天预报骨架屏 */}
        <div className="mb-8">
          <div className="h-6 bg-white/20 rounded-lg w-32 mx-auto mb-4 animate-pulse"></div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
                <div className="h-4 bg-white/15 rounded mb-2 animate-pulse"></div>
                <div className="h-8 w-8 bg-white/20 rounded-full mx-auto mb-2 animate-pulse"></div>
                <div className="h-6 bg-white/20 rounded mb-1 animate-pulse"></div>
                <div className="h-4 bg-white/15 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="h-6 bg-white/15 rounded-lg w-64 mx-auto animate-pulse"></div>
      </div>
    </div>
  );
} 