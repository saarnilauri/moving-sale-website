import React from "react";
import { graphql, Link } from "gatsby";
import { BiBookOpen } from "react-icons/bi";
import useQRCode from "../lib/useQRCode";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import Container from "../components/container";
import SEO from "../components/seo";
import SanityGatsbyImage from "../components/sanityGatsbyImage";
import TextSection from "../components/textSection";

const withQRCode = false;

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

const BookTemplate = (props) => {
  const { data, errors } = props;
  const book = data && data.book;
  const lessons = data && data.lessons;

  const path = `/book/${book.slug.current}/`;
  const bookLink = `https://agc-cm.com${path}`;
  const dataUrl = useQRCode(bookLink);

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
        <main className="">
          <TextSection title={book?.title} color="orange" />

          <div className="border-b-4 border-t-0 border-teal-300">
            <div className="bg-teal-200 p-12 md:p-24 flex justify-center items-center">
              <div className="max-w-md">
                <div className="w-24 h-2 bg-indigo-600 mb-4"></div>

                <h2 className="font-display text-2xl md:text-3xl lg:text-3xl mb-6 text-orange-500">
                  មេរៀនទាំងអស់ដែលមានការណែនាំវីដេអូ
                </h2>
                {book.coverImage && (
                  <SanityGatsbyImage image={book.coverImage} />
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
                      <br /> <span className="text-sm">{bookLink}</span>
                    </p>
                  </>
                )}
                <ul>
                  {lessons.edges.map((lesson) => (
                    <li
                      key={lesson.node.id}
                      className="flex items-center mb-2 gap-2"
                    >
                      <BiBookOpen color="teal" />
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
          </div>
        </main>
      )}
    </Layout>
  );
};

export default BookTemplate;
