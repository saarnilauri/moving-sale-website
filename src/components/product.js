import React from "react";
import { Link } from "gatsby";
import PortableText from "./portableText";
import SanityGatsbyImage from "./sanityGatsbyImage";

const debug = false;

const Product = ({ product, group }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-4">
      <Link
        to={`/group/${group.slug.current}/${product.slug.current}`}
        className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden hover:no-underline"
      >
        <div className="relative pb-48 overflow-hidden">
          <SanityGatsbyImage
            node={product.mainImage}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          {product.categories.map((category) => (
            <span
              key={category.id}
              className="inline-block px-2 py-1 mr-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs"
            >
              {category.title}
            </span>
          ))}

          <h2 className="mt-2 mb-2  font-bold">{product.title}</h2>
          <p className="text-sm">
            <PortableText blocks={product._rawBody} />
          </p>
          <div className="tag my-5">$&nbsp;{product.price}</div>
        </div>
        {debug && <pre>{JSON.stringify(product, null, 2)}</pre>}
      </Link>
    </div>
  );
};

export default Product;
