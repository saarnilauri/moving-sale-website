import React from "react";
import { Link, graphql } from "gatsby";
import { FaFolder } from "react-icons/fa";

import GraphQLErrorList from "../components/graphql-error-list";
import useQRCode from "../lib/useQRCode";
import Container from "../components/container";
import SEO from "../components/seo";
import YouTubePlayer from "../components/youtubePlayer";
import PortableText from "../components/portableText";
import TextSection from "../components/textSection";
import SanityGatsbyImage from "../components/sanityGatsbyImage";

//If you want to draw the QR code for the product set the withQRCode var to true
const withQRCode = false;

export const query = graphql`
  query ProductTemplateQuery($id: String!) {
    product: sanityProduct(id: { eq: $id }) {
      id
      title
      slug {
        current
      }
      group {
        title
        slug {
          current
        }
      }
      price
      ebayPrice
      categories {
        title
      }
      mainImage {
        asset {
          _id
          gatsbyImageData(
            placeholder: DOMINANT_COLOR
            layout: FIXED
            width: 500
            formats: WEBP
          )
        }
      }
      videos {
        _key
        url
        type
        caption
        _rawText(resolveReferences: { maxDepth: 5 })
      }
      _rawBody(resolveReferences: { maxDepth: 5 })
    }
  }
`;

// _rawBody(resolveReferences: { maxDepth: 5 })

const ProductTemplate = (props) => {
  const { data, errors } = props;
  const product = data && data.product;
  let videoTypeTitles = {
    music: "See it on video",
    instruction: "See it on video",
  };
  let currentVideoType = "";
  let printVideoTypeTitle = false;

  const groupPath = `/group/${product.group.slug.current}`;
  const path = `/${groupPath}/${product.slug.current}`;
  const productLink = `http://www.saarnimovingsale.com/${path}`;
  const dataUrl = useQRCode(productLink);

  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {product && (
        <SEO
          title={product.title || "Untitled"}
          //image={post.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {product && (
        <>
          <main className="">
            <TextSection title={product?.title} color="green" />
            <div className="container mx-auto flex items-stretch flex-col md:flex-row">
              <div className="p-5 bg-teal-200">
                <div className="flex items-center gap-2 mb-5">
                  <Link to={groupPath} className="hover:no-underline">
                    <FaFolder fontSize="2.5em" />
                    <h1 className="text-xl text-indigo-500 mb-0">
                      {product.group.title}
                    </h1>
                  </Link>
                </div>
                <h2 className="text-lg text-orange-500">{product?.title}</h2>
                {product._rawBody && <PortableText blocks={product._rawBody} />}
                {product.categories.map((category) => (
                  <span
                    key={category.id}
                    className="inline-block px-2 py-1 mr-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs"
                  >
                    {category.title}
                  </span>
                ))}

                <div>
                  <div className="tag my-5">$&nbsp;{product.price}</div>
                </div>

                {product.ebayPrice && (
                  <div className="text-gray-500 text-sm">
                    Price on ebay:&nbsp;$&nbsp;{product.ebayPrice}
                  </div>
                )}

                {withQRCode && (
                  <>
                    <img
                      src={dataUrl}
                      alt="Link QR-code"
                      width="100"
                      height="100"
                    />
                    <p className="my-2">
                      Link:
                      <br /> <span className="text-sm">{productLink}</span>
                    </p>
                  </>
                )}
              </div>
              <div className="block w-full bg-orange-200 p-5">
                <SanityGatsbyImage
                  node={product.mainImage}
                  className="inset-0 h-full w-full"
                />

                {product.videos.length > 0 && (
                  <div className="my-5">
                    <div className="w-16 h-2 bg-indigo-600 mb-4"></div>
                    <h1 className="text-4xl text-indigo-500">វីដេអូ</h1>
                    {product.videos.map((video) => {
                      printVideoTypeTitle = false;

                      if (currentVideoType !== video.type) {
                        currentVideoType = video.type;
                        printVideoTypeTitle = true;
                      }

                      return (
                        <div className="my-5" key={video._key}>
                          {printVideoTypeTitle && (
                            <h2 className="text-2xl font-bold text-orange-500 my-6">
                              {videoTypeTitles[currentVideoType]}
                            </h2>
                          )}
                          {video.caption && (
                            <h3 className="text-xl font-bold text-green-500 mb-4">
                              {video.caption}
                            </h3>
                          )}
                          {video._rawText && (
                            <PortableText blocks={video._rawText} />
                          )}
                          <YouTubePlayer url={video.url} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ProductTemplate;
