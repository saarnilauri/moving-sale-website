import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";
import clientConfig from "../../client-config";

export const Figure = ({ node }) => {
  if (!node || !node.asset || !node.asset._id) {
    return null;
  }
  const gatsbyImageData = getGatsbyImageData(
    node,
    { maxWidth: 675 },
    clientConfig.sanity
  );
  const link = node.link;

  return (
    <figure>
      {link && (
        <a href={link.href} target="_blank" rel="noreferrer">
          <GatsbyImage image={gatsbyImageData} alt={node.alt} />{" "}
        </a>
      )}
      {!link && <GatsbyImage image={gatsbyImageData} alt={node.alt} />}
      <figcaption>{node.caption}</figcaption>
    </figure>
  );
};
