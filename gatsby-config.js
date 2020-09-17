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
    siteUrl: `https://williammartinsson.site`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Inter\:300,400,500,600,700`, // you can also specify font weights and styles
        ],
      },
    },
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: "williammartinsson",
        accessToken:
          "MC5YY0ZndUJFQUFDQUFxQVZY.WAPvv70ULhDvv73vv71H77-977-9K--_ve-_ve-_ve-_vRkl77-9ESrvv71277-977-977-9TV5q77-977-9EA",
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
