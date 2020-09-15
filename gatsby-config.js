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
    title: `William Martinsson`,
    description: `William Martinsson DESC`,
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
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Inter`,
            variants: [`300`, `400`, `500`, `600`, `700`],
          },
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
  ],
}
