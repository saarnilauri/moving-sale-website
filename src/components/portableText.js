import React from "react";
import clientConfig from "../../client-config";
import BasePortableText from "@sanity/block-content-to-react";
import serializers from "./serializers";

const PortableText = ({ blocks }) => {
  if (!blocks) return null;

  return (
    <BasePortableText
      blocks={blocks}
      serializers={serializers}
      //imageOptions={{w: 100, h: 100, fit: 'max'}}
      {...clientConfig.sanity}
    />
  );
};

export default PortableText;
