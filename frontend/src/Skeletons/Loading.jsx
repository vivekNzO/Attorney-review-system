import React from "react";
import { BiLoader } from "react-icons/bi";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen  p-24 w-full bg-linear-to-r  from-[#0E121A] to-[#2D2D2F] text-white'">
      <BiLoader className="text-5xl text-blue-500 animate-spin mb-4" />
      <h2 className="text-xl font-semibold text-white">Loading...</h2>
    </div>
  );
};

export default Loading;
