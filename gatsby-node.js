  
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pages = await graphql(`
  {
   allPrismicProject {
      nodes {
        uid
      }
    }
  }
  `)

  const template = path.resolve("src/templates/project.jsx")
  pages.data.allPrismicProject.nodes.forEach(edge => {
    createPage({
      path: `/projects/${edge.uid}`,
      component: template,
      context: {
        uid: edge.uid,
      },
    })
  })
}