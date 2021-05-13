require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const clientConfig = require("./client-config");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  siteMetadata: {
    title: "AGC CM Website",
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
