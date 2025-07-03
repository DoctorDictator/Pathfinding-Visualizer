import React from "react";

const Image = ({ src, alt, width, height, className, inlineSvg }) => {
  // If inlineSvg is provided, render it directly
  if (inlineSvg) {
    return (
      <div
        className={className}
        style={{ width, height }}
        dangerouslySetInnerHTML={{ __html: inlineSvg }}
      />
    );
  }

  // Otherwise, render as an <img> tag
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Image;
