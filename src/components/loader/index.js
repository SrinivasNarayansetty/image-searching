import React from 'react';

const LoaderComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Animated Spinner */}
      <div className="relative">
        <div className="w-20 h-20 border-8 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-20 h-20 border-8 border-transparent border-t-pink-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Loading Images
        </h3>
        <p className="text-gray-500 animate-pulse">
          Discovering amazing photos for you...
        </p>
      </div>

      {/* Animated Dots */}
      <div className="flex gap-2 mt-6">
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoaderComponent;