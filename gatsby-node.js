const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pages = await graphql(`
    {
      prismic {
        allProjects {
          edges {
            node {
              _meta {
                id
                uid
              }
            }
          }
        }
      }
    }
  `)
  const template = path.resolve("src/templates/project.jsx")
  pages.data.prismic.allProjects.edges.forEach(edge => {
    createPage({
      path: `/projects/${edge.node._meta.uid}`,
      component: template,
      context: {
        uid: edge.node._meta.uid,
      },
    })
  })
}