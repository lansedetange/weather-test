// 加载中的占位符组件
export function WeatherLoading() {
  return (
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white">
      {/* 位置信息骨架屏 */}
      <div className="text-center mb-8">
        <div className="h-8 bg-white/20 rounded-lg mb-2 w-48 mx-auto animate-pulse"></div>
        <div className="h-6 bg-white/15 rounded-lg w-32 mx-auto animate-pulse"></div>
      </div>
      
      {/* 当前天气骨架屏 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="h-12 bg-white/20 rounded-lg mb-4 w-3/4 animate-pulse"></div>
          <div className="h-20 bg-white/15 rounded-lg w-32 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-white/15 rounded-lg animate-pulse"></div>
          <div className="h-6 bg-white/15 rounded-lg animate-pulse"></div>
          <div className="h-6 bg-white/15 rounded-lg animate-pulse"></div>
        </div>
      </div>
      
      {/* 预报信息骨架屏 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white/10 rounded-lg p-4">
            <div className="h-4 bg-white/15 rounded mb-2 animate-pulse"></div>
            <div className="h-8 bg-white/20 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-white/15 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <div className="h-6 bg-white/15 rounded-lg w-48 mx-auto animate-pulse"></div>
      </div>
    </div>
  );
} 