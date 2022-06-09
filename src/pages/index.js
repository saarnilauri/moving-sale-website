import React from "react";
import { graphql } from "gatsby";

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Hero from "../components/hero";
import TextSection from "../components/textSection";
import ImageSection from "../components/imageSection";
import { getTwColorName } from "../lib/helpers";
import GroupCard from "../components/group-card";
import ProductCard from "../components/product-card";

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
  query SiteConfig {
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
    groups: allSanityGroup(sort: { fields: title, order: ASC }) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          coverImage {
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
    promoProducts: allSanityProduct(
      filter: { promo: { eq: true }, sold: { eq: false } }
      limit: 4
      sort: { fields: orderNum, order: ASC }
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
          group {
            title
            salePercentage
            slug {
              current
            }
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

// markup

const IndexPage = (props) => {
  const { data, errors } = props;
  const debug = false;

  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }

  return (
    <>
      <SEO
        title={data.site?.title}
        description={data.site.frontpage?.description}
        keywords={data.site.frontpage?.keywords}
        image={data.site.frontpage?.openGraphImage}
      />
      <>
        <main>
          {data.site.frontpage.content.map((content) => {
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
                    color={getTwColorName(content.color?.title)}
                  />
                )}
              </div>
            );
          })}
          {/**
          <div>
            <TextSection title="Recently added items" color="green" />

            <div className="antialiased text-gray-900 font-sans p-6 bg-indigo-300">
              <div className="container mx-auto">
                <div className="flex flex-wrap -mx-4">
                  {data.promoProducts.edges.map((product) => (
                    <ProductCard
                      key={product.node.id}
                      product={product.node}
                      group={product.node.group}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <TextSection title="Browse by category" color="orange" />
            <div className="antialiased text-gray-900 font-sans p-6">
              <div className="container mx-auto">
                <div className="flex flex-wrap -mx-4">
                  {data.groups.edges.map((group) => (
                    <GroupCard key={group.node.id} group={group.node} />
                  ))}
                </div>
              </div>
            </div>
          </div>
           */}
          {debug && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </main>
      </>
    </>
  );
};

export default IndexPage;
