import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

const SanityGatsbyImage = ({ node, alt, className }) => {
  if (!node || !node.asset || !node.asset._id) {
    return null;
  }

  return (
    <GatsbyImage
      image={node.asset.gatsbyImageData}
      alt={alt ? alt : node.alt}
      className={className}
    />
  );
};

export default SanityGatsbyImage;
