import React from "react";
import Image from "next/image";

const ComposedImage = ({ image }) => (
  <div className="w-full relative [&>img]:rounded-lg mb-6 lg:mb-10">
    <Image
      src={image}
      alt="mockup 1"
      layout="intrinsic"
      objectFit="contain"
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
    />
  </div>
);

export default ComposedImage;
