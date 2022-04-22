import React from "react";
import { graphql, Link } from "gatsby";
import { FaFileAlt } from "react-icons/fa";
import useQRCode from "../lib/useQRCode";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import Container from "../components/container";
import SEO from "../components/seo";
import SanityGatsbyImage from "../components/sanityGatsbyImage";
import TextSection from "../components/textSection";

const withQRCode = false;

export const query = graphql`
  query GroupTemplateQuery($id: String!) {
    group: sanityGroup(id: { eq: $id }) {
      id
      title
      slug {
        current
      }
      description
      coverImage {
        asset {
          _id
          gatsbyImageData(
            layout: FIXED
            placeholder: DOMINANT_COLOR
            width: 10
            height: 10
            formats: WEBP
          )
        }
      }
    }
    products: allSanityProduct(
      filter: { group: { id: { eq: $id } } }
      sort: { fields: orderNum, order: ASC }
    ) {
      edges {
        node {
          id
          title
          slug {
            current
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
    <Layout>
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
          <TextSection title={group?.title} color="orange" />

          <div className="border-b-4 border-t-0 border-teal-300">
            <div className="bg-teal-200 p-12 md:p-24 flex justify-center items-center">
              <div className="max-w-md">
                <div className="w-24 h-2 bg-indigo-600 mb-4"></div>

                <h2 className="font-display text-2xl md:text-3xl lg:text-3xl mb-6 text-orange-500">
                  Here are list of products in this group:
                </h2>
                {group.coverImage && (
                  <SanityGatsbyImage image={group.coverImage} />
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
                      <br /> <span className="text-sm">{groupLink}</span>
                    </p>
                  </>
                )}
                <ul>
                  {products.edges.map((product) => (
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
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      )}
    </Layout>
  );
};

export default GroupTemplate;
