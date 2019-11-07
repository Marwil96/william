const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-project-jsx": hot(preferDefault(require("/Users/williammartinsson/web/william/src/templates/project.jsx"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/williammartinsson/web/william/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/williammartinsson/web/william/src/pages/404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/williammartinsson/web/william/src/pages/index.js"))),
  "component---src-pages-projects-js": hot(preferDefault(require("/Users/williammartinsson/web/william/src/pages/projects.js")))
}

