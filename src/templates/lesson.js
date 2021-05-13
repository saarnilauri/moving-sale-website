import React from "react";
import { graphql } from "gatsby";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import Container from "../components/container";
import SEO from "../components/seo";
import useQRCode from "../lib/useQRCode";
import YouTubePlayer from "../components/youtubePlayer";
import H1 from "../components/h1";
import PortableText from "../components/portableText";

export const query = graphql`
  query LessonTemplateQuery($id: String!) {
    lesson: sanityLesson(id: { eq: $id }) {
      id
      title
      slug {
        current
      }
      book {
        slug {
          current
        }
      }
      videos {
        _key
        url
      }
      _rawBody(resolveReferences: { maxDepth: 5 })
    }
  }
`;

// _rawBody(resolveReferences: { maxDepth: 5 })

const LessonTemplate = (props) => {
  const { data, errors } = props;
  const lesson = data && data.lesson;
  const path = `/book/${lesson.book.slug.current}/${lesson.slug.current}/`;
  const lessonLink = `https://agc-cm.com${path}`;
  const dataUrl = useQRCode(lessonLink);
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {lesson && (
        <SEO
          title={lesson.title || "Untitled"}
          //image={post.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {lesson && (
        <main className="container mx-auto">
          <div className="flex items-stretch flex-col md:flex-row">
            <div className="p-5">
              <H1>{lesson?.title}</H1>
              {lesson._rawBody && <PortableText blocks={lesson._rawBody} />}
              <img src={dataUrl} alt="Link QR-code" width="100" height="100" />
              <p>Link: {lessonLink}</p>
            </div>
            <div className="block w-full">
              {lesson.videos.length > 0 && (
                <div className="my-5">
                  {lesson.videos.map((video) => (
                    <div className="my-5 px-10" key={video._key}>
                      <YouTubePlayer url={video.url} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </Layout>
  );
};

export default LessonTemplate;
