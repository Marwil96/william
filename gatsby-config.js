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
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
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
        accessToken: 'MC5YY0ZndUJFQUFDQUFxQVZY.WAPvv70ULhDvv73vv71H77-977-9K--_ve-_ve-_ve-_vRkl77-9ESrvv71277-977-977-9TV5q77-977-9EA',
        schemas: {
         page: require('./src/schemas/blog_post.json'),
       }
      },
    },
  ],
}
