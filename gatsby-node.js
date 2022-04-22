//const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

//const { format } = require("date-fns");
/*
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
*/
async function createProductPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityProduct(
        filter: {
          slug: { current: { ne: null } }
          group: { slug: { current: { ne: null } } }
        }
      ) {
        edges {
          node {
            id
            slug {
              current
            }
            group {
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

  const productEdges = (result.data.allSanityProduct || {}).edges || [];

  productEdges.forEach((edge) => {
    const { id, slug = {}, group = {} } = edge.node;
    const path = `/group/${group.slug.current}/${slug.current}/`;

    createPage({
      path,
      component: require.resolve("./src/templates/product.js"),
      context: { id },
    });
  });
}

async function createGroupPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityGroup(filter: { slug: { current: { ne: null } } }) {
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

  const groupEdges = (result.data.allSanityGroup || {}).edges || [];

  groupEdges.forEach((edge) => {
    const { id, slug = {} } = edge.node;
    const path = `/group/${slug.current}/`;

    createPage({
      path,
      component: require.resolve("./src/templates/group.js"),
      context: { id },
    });
  });
}

async function createPages(graphql, actions) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityRoute(filter: { page: { _id: { ne: null } } }) {
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

  const routeEdges = (result.data.allSanityRoute || {}).edges || [];

  routeEdges.forEach((edge) => {
    const { id, slug = {} } = edge.node;
    const path = `/${slug.current}/`;

    createPage({
      path,
      component: require.resolve("./src/templates/page.js"),
      context: { id },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  await createPages(graphql, actions);
  //await createBlogPostPages(graphql, actions);
  await createProductPages(graphql, actions);
  await createGroupPages(graphql, actions);
};
