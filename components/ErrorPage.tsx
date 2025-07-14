"use client";

// 错误页面客户端组件
export function ErrorPage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-red-500 to-red-600 flex items-center justify-center">
      <div className="text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">Weather Unavailable</h1>
        <p className="text-red-100 mb-6">
          Sorry, we couldn't fetch weather data at the moment.
        </p>
        <button 
          onClick={handleRetry}
          className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
} 