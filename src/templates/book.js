import React from "react";
import { graphql, Link } from "gatsby";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import Container from "../components/container";
import SEO from "../components/seo";
import H1 from "../components/h1";
import SanityGatsbyImage from "../components/sanityGatsbyImage";

export const query = graphql`
  query BookTemplateQuery($id: String!) {
    book: sanityBook(id: { eq: $id }) {
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
    lessons: allSanityLesson(
      filter: { book: { id: { eq: $id } } }
      sort: { fields: slug___current, order: ASC }
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

const BookTemplate = (props) => {
  const { data, errors } = props;
  const book = data && data.book;
  const lessons = data && data.lessons;
  const path = `/book/${book.slug.current}/`;
  const bookLink = `https://agc-cm.com${path}`;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {book && (
        <SEO
          title={book.title || "Untitled"}
          //image={post.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {book && (
        <main className="container mx-auto">
          <div className="flex items-stretch flex-col md:flex-row">
            <div className="p-5">
              <H1>{book?.title}</H1>
              <p>{book.description}</p>
              <p>Link: {bookLink}</p>
            </div>
            <div className="block w-full">
              <p>Info</p>
              {book.coverImage && <SanityGatsbyImage image={book.coverImage} />}
              <ul>
                {lessons.edges.map((lesson) => (
                  <li key={lesson.node.id}>
                    <Link
                      to={`/book/${book.slug.current}/${lesson.node.slug.current}`}
                    >
                      {lesson.node.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      )}
    </Layout>
  );
};

export default BookTemplate;
