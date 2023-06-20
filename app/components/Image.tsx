import React from "react";
import NextImage from "next/image";

type ImageProps = {
  alt: string;
  src: string;
  className?: string;
  sx?: any;
};

function Image({ src, alt, ...others }: ImageProps) {
  const c = "rounded-t-md";
  return (
    <div className="w-full h-full relative block overflow-hidden">
      <NextImage
        alt={alt}
        src={src}
        fill
        style={{
          objectFit: "cover",
        }}
        {...others}
      />
    </div>
  );
}

export default Image;
