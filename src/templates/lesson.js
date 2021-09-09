import React from "react";
import { graphql } from "gatsby";
import { BiBook } from "react-icons/bi";
import GraphQLErrorList from "../components/graphql-error-list";
import Layout from "../containers/layout";
import useQRCode from "../lib/useQRCode";
import Container from "../components/container";
import SEO from "../components/seo";
import YouTubePlayer from "../components/youtubePlayer";
import PortableText from "../components/portableText";
import TextSection from "../components/textSection";

export const query = graphql`
  query LessonTemplateQuery($id: String!) {
    lesson: sanityLesson(id: { eq: $id }) {
      id
      title
      slug {
        current
      }
      book {
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

const LessonTemplate = (props) => {
  const { data, errors } = props;
  const lesson = data && data.lesson;
  let videoTypeTitles = {
    music: "វីដេអូអំពីចម្រៀងនិងកាយវិការ",
    instruction: "វីដេអូអំពីសេចក្ដីណែនាំសកម្មភាព",
  };
  let currentVideoType = "";
  let printVideoTypeTitle = false;

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
        <main className="">
          <TextSection title={lesson?.title} color="green" />
          <div className="container mx-auto flex items-stretch flex-col md:flex-row">
            <div className="p-5 bg-teal-200">
              <div className="flex items-center gap-2 mb-5">
                <BiBook fontSize="2.5em" />
                <h1 className="text-xl text-indigo-500 mb-0">
                  {lesson.book.title}
                </h1>
              </div>
              <h2 className="text-lg text-orange-500">{lesson?.title}</h2>
              {lesson._rawBody && <PortableText blocks={lesson._rawBody} />}

              <img src={dataUrl} alt="Link QR-code" width="100" height="100" />
              <p className="my-2">
                Link:
                <br /> <span className="text-sm">{lessonLink}</span>
              </p>
            </div>
            <div className="block w-full bg-orange-200 p-5">
              {lesson.videos.length > 0 && (
                <div className="my-5">
                  <div className="w-16 h-2 bg-indigo-600 mb-4"></div>
                  <h1 className="text-4xl text-indigo-500">វីដេអូ</h1>
                  {lesson.videos.map((video) => {
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

export default LessonTemplate;
