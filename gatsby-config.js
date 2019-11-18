require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `William Martinsson - Freelancing developer from Göteborg.`,
    description: `Hey, I'm William Martinsson. I'm a creator of websites, apps, and digital products. Sometimes I develop them other times I design them but usually, I do both. Currently freelancing from my home in the middle of Sweden.`,
    author: `@William Martinsson`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-37970043-2",
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `williammartinsson`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
