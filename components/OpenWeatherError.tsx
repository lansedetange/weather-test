"use client";

// OpenWeatherMap 错误页面客户端组件
export function OpenWeatherError() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-red-500 to-red-600 flex items-center justify-center">
      <div className="text-center text-white px-4">
        <div className="text-6xl mb-4">🌩️</div>
        <h1 className="text-4xl font-bold mb-4">Weather Service Unavailable</h1>
        <p className="text-red-100 mb-6 max-w-md">
          We&apos;re having trouble connecting to the OpenWeatherMap service. 
          Please check your internet connection and try again.
        </p>
        <button 
          onClick={handleRetry}
          className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
        >
          Try Again
        </button>
        <div className="mt-8 text-red-200 text-sm">
          <p>If the problem persists, the API key might need to be updated</p>
        </div>
      </div>
    </div>
  );
} 