import React from "react";

const TextBlock = ({ children }) => {
  return (
    <span className="text-base font-sans font-light text-gray-200 leading-7 block mb-7">
      {children}
    </span>
  );
};

export default TextBlock;
