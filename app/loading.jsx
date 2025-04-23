import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Loading Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-transparent border-gray-300 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-t-black rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-sm font-medium text-gray-600">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LoadingScreen;
