import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

const SanityGatsbyImage = ({ node }) => {
  if (!node || !node.asset || !node.asset._id) {
    return null;
  }

  return <GatsbyImage image={node.asset.gatsbyImageData} alt={node.alt} />;
};

export default SanityGatsbyImage;
