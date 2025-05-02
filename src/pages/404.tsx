import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        It might have been removed, or the URL might be incorrect.
      </p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-[#2E8B57] text-white rounded-md hover:bg-[#256F3A] transition-colors"
      >
        Go back to Home
      </a>
    </div>
  );
}

export default NotFound;
