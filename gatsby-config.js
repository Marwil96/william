/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

 require("dotenv").config({
   path: `.env`,
 })

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `William Martinsson | Digital Designer`,
    description: `William Martinsson`,
    author: `@William Martinsson`,
    siteUrl: `https://williammartinsson.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Available options and their defaults:
        base64Width: 20,
        forceBase64Format: ``, // valid formats: png,jpg,webp
        stripMetadata: true,
        defaultQuality: 100,
        background: "#E96E1F",
      },
    },
    {
      resolve: "gatsby-plugin-simple-analytics",
      options: {
        trackPageViews: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: "williammartinsson",
        accessToken: `${process.env.API_KEY}`,
        htmlSerializer: ({ node, key, value }) => (
          type,
          element,
          content,
          children
        ) => {
          // Your HTML serializer
        },
        shouldDownloadImage: ({ node, key, value }) => {
          // Return true to download the image or false to skip.
          return true
        },
        linkResolver: ({ node, key, value }) => doc => {
          // Your link resolver
        },
        schemas: {
          project: require("./src/schemas/project.json"),
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#303030`,
        theme_color: `#303030`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
