/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

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
  ],
}
