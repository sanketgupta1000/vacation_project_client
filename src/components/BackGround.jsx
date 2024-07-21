import React from "react";

function BackGround({ children, fullScreen }) {
  return (
    <div
      className={` ${
        fullScreen ? "min-h-screen" : "min-h-fit"
      } flex justify-center bg-gradient-to-r from-gray-700 via-black to-blue-800 p-4 pt-5 pb-20`}
    >
      {children}
    </div>
  );
}

export default BackGround;
