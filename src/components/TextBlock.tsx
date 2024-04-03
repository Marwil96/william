import React from "react";

const TextBlock = ({ children }) => {
  return (
    <span className="text-base font-system font-light [&>strong>a]:font-title [&>strong>a]:underline [&>strong>a]:italic [&>a]:font-title [&>a]:underline [&>a]:italic [&>strong]:font-title [&>strong]:italic [&>strong]:font-normal text-gray-200 leading-normal lg:leading-7 block mb-7">
      {children}
    </span>
  );
};

export default TextBlock;
