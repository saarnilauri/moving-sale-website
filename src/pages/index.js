import React from "react";
import { graphql } from "gatsby";

import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import SanityGatsbyImage from "../components/sanityGatsbyImage";

export const query = graphql`
  fragment SiteLogo on SanitySiteConfig {
    logo {
      alt
      asset {
        _id
        gatsbyImageData(
          fit: FILLMAX
          placeholder: BLURRED
          aspectRatio: 1
          layout: FIXED
          width: 100
        )
      }
    }
  }
  query SiteConfig {
    site: sanitySiteConfig(_id: { eq: "global-config" }) {
      title
      ...SiteLogo
      frontpage {
        title
        description
        keywords
        openGraphImage {
          crop {
            _key
            _type
            top
            bottom
            left
            right
          }
          hotspot {
            _key
            _type
            x
            y
            height
            width
          }
          asset {
            _id
          }
        }
        content {
          ... on SanityHero {
            _key
            _type
            heading
            ctas {
              link
              title
            }
            backgroundImage {
              asset {
                url
              }
              crop {
                bottom
                left
                right
                top
              }
              hotspot {
                height
                width
                x
                y
              }
            }
          }
          ... on SanityImageSection {
            _key
            _type
            heading
            cta {
              title
              link
            }
            image {
              alt
              asset {
                url
              }
              crop {
                bottom
                left
                right
                top
              }
              hotspot {
                height
                width
                x
                y
              }
            }
          }
          ... on SanityTextSection {
            _key
            heading
            _rawText(resolveReferences: { maxDepth: 5 })
          }
        }
      }
    }
  }
`;

// markup

const IndexPage = (props) => {
  const { data, errors } = props;
  const debug = false;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO
        title={data.site?.title}
        description={data.site.frontpage?.description}
        keywords={data.site.frontpage?.keywords}
        image={data.site.frontpage?.openGraphImage}
      />
      <Container>
        <main>
          <div className="flex align-middle justify-start items-center">
            <div>
              <SanityGatsbyImage node={data.site.logo} />
            </div>
            <div>
              <h1 className="text-3xl text-green-500 m-4">{data.site.title}</h1>
            </div>
          </div>
          {debug && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </main>
      </Container>
    </Layout>
  );
};

export default IndexPage;
