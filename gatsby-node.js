const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { format } = require("date-fns");

async function createBlogPostPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allSanityPost || {}).edges || [];

  postEdges
    .filter((edge) => !isFuture(new Date(edge.node.publishedAt)))
    .forEach((edge) => {
      const { id, slug = {}, publishedAt } = edge.node;
      const dateSegment = format(new Date(publishedAt), "yyyy/MM");
      const path = `/blog/${dateSegment}/${slug.current}/`;

      createPage({
        path,
        component: require.resolve("./src/templates/blog-post.js"),
        context: { id },
      });
    });
}

async function createLessonPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityLesson(
        filter: {
          slug: { current: { ne: null } }
          book: { slug: { current: { ne: null } } }
        }
      ) {
        edges {
          node {
            id
            slug {
              current
            }
            book {
              slug {
                current
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const lessonEdges = (result.data.allSanityLesson || {}).edges || [];

  lessonEdges.forEach((edge) => {
    const { id, slug = {}, book = {} } = edge.node;
    const path = `/book/${book.slug.current}/${slug.current}/`;

    createPage({
      path,
      component: require.resolve("./src/templates/lesson.js"),
      context: { id },
    });
  });
}

async function createBookPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityBook(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const bookEdges = (result.data.allSanityBook || {}).edges || [];

  bookEdges.forEach((edge) => {
    const { id, slug = {} } = edge.node;
    const path = `/book/${slug.current}/`;

    createPage({
      path,
      component: require.resolve("./src/templates/book.js"),
      context: { id },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  await createBlogPostPages(graphql, actions);
  await createLessonPages(graphql, actions);
  await createBookPages(graphql, actions);
};
