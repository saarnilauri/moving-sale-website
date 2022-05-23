import React from "react";
import { graphql } from "gatsby";
import useQRCode from "../lib/useQRCode";
import GraphQLErrorList from "../components/graphql-error-list";
import Container from "../components/container";
import SEO from "../components/seo";
import Hero from "../components/hero";
import ProductCard from "../components/product-card";

const withQRCode = false;

export const query = graphql`
  query GroupTemplateQuery($id: String!) {
    group: sanityGroup(id: { eq: $id }) {
      id
      title
      slug {
        current
      }
      salePercentage
      description
      coverImage {
        asset {
          _id
          gatsbyImageData(
            placeholder: DOMINANT_COLOR
            layout: FULL_WIDTH
            width: 2850
            formats: WEBP
          )
        }
      }
    }
    products: allSanityProduct(
      filter: { group: { id: { eq: $id } } }
      sort: { fields: [sold, orderNum], order: ASC }
    ) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          price
          salePrice
          sold
          categories {
            title
            id
          }
          created: _createdAt(fromNow:true)
          _rawBody(resolveReferences: { maxDepth: 5 })
          mainImage {
            asset {
              _id
              gatsbyImageData(
                placeholder: DOMINANT_COLOR
                layout: FULL_WIDTH
                width: 500
                formats: WEBP
              )
            }
          }
        }
      }
    }
  }
`;

// _rawBody(resolveReferences: { maxDepth: 5 })

const GroupTemplate = (props) => {
  const { data, errors } = props;
  const group = data && data.group;
  const products = data && data.products;

  const path = `/group/${group.slug.current}/`;
  const groupLink = `https://agc-cm.com${path}`;
  const dataUrl = useQRCode(groupLink);

  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {group && (
        <SEO
          title={group.title || "Untitled"}
          //image={post.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {group && (
        <main className="">
          <Hero title={group.title} img={group.coverImage} color="orange" />
          <div className="border-b-4 border-t-0 border-teal-300">
            <div className="bg-teal-200 p-12 md:p-4 flex justify-center items-center">
              <div className="max-w-2xl">
                <div className="w-36 h-2 bg-indigo-600 mb-4"></div>

                <h2 className="font-display text-2xl md:text-3xl lg:text-3xl mb-6 text-orange-500">
                  Here are list of products in this group
                </h2>

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
                      <br /> <span className="text-sm">{groupLink}</span>
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="antialiased text-gray-900 font-sans p-6 bg-indigo-300">
              <div className="container mx-auto">
                <div className="flex flex-wrap -mx-4">
                  {products.edges.map((product) => (
                    <ProductCard
                      key={product.node.id}
                      product={product.node}
                      group={group}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

/*

<li
                      key={product.node.id}
                      className="flex items-center mb-2 gap-2"
                    >
                      <FaFileAlt color="teal" />
                      <Link
                        to={`/group/${group.slug.current}/${product.node.slug.current}`}
                      >
                        {product.node.title}
                      </Link>
                    </li>
                    */

export default GroupTemplate;
