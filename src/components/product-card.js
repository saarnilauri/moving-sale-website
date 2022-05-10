import React from "react";
import { Link } from "gatsby";
import PortableText from "./portableText";
import SanityGatsbyImage from "./sanityGatsbyImage";

const debug = false;

const ProductCard = ({ product, group }) => {
  const soldStyle = product.sold ? "saturate-0 " : "";
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-4   flex-1>">
      <Link
        to={`/group/${group.slug.current}/${product.slug.current}`}
        className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden hover:no-underline"
      >
        <div className="relative overflow-hidden">
          <SanityGatsbyImage
            node={product.mainImage}
            className={`${soldStyle}h-full w-full object-cover`}
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
          {product._rawBody && (
            <p className="text-sm">
              <PortableText blocks={product._rawBody} />
            </p>
          )}
          <div>
            {!product.sold && (
              <div className="tag my-5">$&nbsp;{product.price}</div>
            )}
            {product.sold && (
              <div className="tag-sold my-5">Sold!</div>
            )}
          </div>
        </div>
        {debug && <pre>{JSON.stringify(product, null, 2)}</pre>}
      </Link>
    </div>
  );
};

export default ProductCard;