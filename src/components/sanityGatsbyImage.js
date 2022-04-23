import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

const SanityGatsbyImage = ({ node, alt, className }) => {
  if (!node || !node.asset || !node.asset._id) {
    return null;
  }

  let altText = alt ? alt : node.alt;
  altText = altText ? altText : "image";

  return (
    <GatsbyImage
      image={node.asset.gatsbyImageData}
      alt={altText}
      className={className}
    />
  );
};

export default SanityGatsbyImage;
