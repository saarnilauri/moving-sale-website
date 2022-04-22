import React from "react";
import { graphql } from "gatsby";

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Hero from "../components/hero";
import TextSection from "../components/textSection";
import ImageSection from "../components/imageSection";
import { getTwColorName } from "../lib/helpers";

export const query = graphql`
  fragment SiteLogo on SanitySiteConfig {
    logo {
      alt
      asset {
        _id
        gatsbyImageData(placeholder: BLURRED, layout: FIXED, width: 150)
      }
    }
  }

  query pageContent($id: String!) {
    site: sanitySiteConfig(_id: { eq: "global-config" }) {
      title
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
      }
    }
    route: sanityRoute(id: { eq: $id }) {
      id
      page {
        title
        description
        content {
          ... on SanityHero {
            _key
            _type
            heading
            ctas {
              link
              title
            }
            _rawTagline(resolveReferences: { maxDepth: 5 })
            color {
              title
            }
            backgroundImage {
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
          ... on SanityImageSection {
            _key
            _type
            heading
            cta {
              title
              link
            }
            color {
              title
            }
            _rawText(resolveReferences: { maxDepth: 5 })
            image {
              alt
              asset {
                _id
                gatsbyImageData(
                  placeholder: BLURRED
                  layout: FULL_WIDTH
                  width: 2850
                  formats: WEBP
                )
              }
            }
          }
          ... on SanityTextSection {
            _key
            heading
            color {
              title
            }
            _rawText(resolveReferences: { maxDepth: 5 })
          }
        }
      }
    }
  }
`;

// markup

const PageTemplate = (props) => {
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
        description={data.route.page?.description}
        keywords={data.route.page?.keywords}
        image={data.route.page?.openGraphImage}
      />
      <>
        <main>
          {data.route.page.content.map((content) => {
            return (
              <div key={content._key}>
                {content._type === "hero" && (
                  <Hero
                    title={content.heading}
                    img={content.backgroundImage}
                    text={content._rawTagline}
                    color={getTwColorName(content.color?.title)}
                  />
                )}
                {!content._type && (
                  <TextSection
                    title={content.heading}
                    text={content._rawText}
                    color={getTwColorName(content.color?.title)}
                  />
                )}
                {content._type === "imageSection" && (
                  <ImageSection
                    title={content.heading}
                    img={content.image}
                    cta={content.cta}
                    text={content._rawText}
                    color={getTwColorName(content.color?.title)}
                  />
                )}
              </div>
            );
          })}
          {debug && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </main>
      </>
    </Layout>
  );
};

export default PageTemplate;
