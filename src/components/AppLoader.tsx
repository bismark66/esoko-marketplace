import React from "react";

const AppLoader = () => {
  return (
    <div className="relative w-20 h-[50px]">
      <span className="absolute top-0 text-[0.8rem] text-[#C8B6FF] animate-loader-text">
        loading
      </span>
      <span className="absolute bottom-0 h-4 w-4 bg-[#9A79FF] rounded-full animate-loader-bar before:absolute before:inset-0 before:bg-[#D1C2FF] before:rounded-full before:content-[''] before:animate-loader-bar-inner" />
    </div>
  );
};

export default AppLoader;
