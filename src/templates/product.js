import React from "react";
import { graphql } from "gatsby";
import { FaFolder } from "react-icons/fa";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import useQRCode from "../lib/useQRCode";
import Container from "../components/container";
import SEO from "../components/seo";
import YouTubePlayer from "../components/youtubePlayer";
import PortableText from "../components/portableText";
import TextSection from "../components/textSection";
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
    music: "វីដេអូអំពីចម្រៀងនិងកាយវិការ",
    instruction: "វីដេអូអំពីសេចក្ដីណែនាំសកម្មភាព",
  };
  let currentVideoType = "";
  let printVideoTypeTitle = false;

  const path = `/group/${product.group.slug.current}/${product.slug.current}/`;
  const productLink = `https://agc-cm.com${path}`;
  const dataUrl = useQRCode(productLink);

  return (
    <Layout>
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
        <main className="">
          <TextSection title={product?.title} color="green" />
          <div className="container mx-auto flex items-stretch flex-col md:flex-row">
            <div className="p-5 bg-teal-200">
              <div className="flex items-center gap-2 mb-5">
                <FaFolder fontSize="2.5em" />
                <h1 className="text-xl text-indigo-500 mb-0">
                  {product.group.title}
                </h1>
              </div>
              <h2 className="text-lg text-orange-500">{product?.title}</h2>
              {product._rawBody && <PortableText blocks={product._rawBody} />}

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
      )}
    </Layout>
  );
};

export default ProductTemplate;
