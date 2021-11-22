var plugins = [{
      name: 'gatsby-plugin-google-fonts',
      plugin: require('C:/Users/Willi/web/william/node_modules/gatsby-plugin-google-fonts/gatsby-ssr'),
      options: {"plugins":[],"fonts":["Manrope:400,500, 600,800","Fraunces:500"]},
    },{
      name: 'gatsby-plugin-simple-analytics',
      plugin: require('C:/Users/Willi/web/william/node_modules/gatsby-plugin-simple-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackPageViews":true},
    },{
      name: 'gatsby-plugin-styled-components',
      plugin: require('C:/Users/Willi/web/william/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[],"displayName":true,"fileName":true,"minify":true,"namespace":"","transpileTemplateLiterals":true,"topLevelImportPaths":[],"pure":false},
    },{
      name: 'gatsby-plugin-transition-link',
      plugin: require('C:/Users/Willi/web/william/node_modules/gatsby-plugin-transition-link/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-sitemap',
      plugin: require('C:/Users/Willi/web/william/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[],"output":"/sitemap.xml","createLinkInHead":true},
    },{
      name: 'gatsby-plugin-image',
      plugin: require('C:/Users/Willi/web/william/node_modules/gatsby-plugin-image/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-source-prismic',
      plugin: require('C:/Users/Willi/web/william/node_modules/gatsby-source-prismic/gatsby-ssr'),
      options: {"plugins":[],"repositoryName":"williammartinsson","accessToken":"MC5YY0ZndUJFQUFDQUFxQVZY.WAPvv70ULhDvv73vv71H77-977-9K--_ve-_ve-_ve-_vRkl77-9ESrvv71277-977-977-9TV5q77-977-9EA","schemas":{"project":{"Main":{"uid":{"type":"UID","config":{"label":"slug"}},"order":{"type":"Number","config":{"label":"order","placeholder":"1"}},"project_name":{"type":"StructuredText","config":{"single":"heading3","label":"Project Name"}},"title":{"type":"StructuredText","config":{"single":"heading1, heading2, heading3, heading4, heading5, heading6","label":"title"}},"role":{"type":"StructuredText","config":{"single":"heading4, heading5, heading6","label":"role","placeholder":"co-owner"}},"category":{"type":"StructuredText","config":{"single":"heading6","label":"Category","placeholder":"Frontend Development"}},"link_to_website":{"type":"Link","config":{"allowTargetBlank":true,"label":"Link to website"}},"project_introduction":{"type":"StructuredText","config":{"single":"heading6","label":"project Introduction","placeholder":"People study for two reasons. Firstly for learning and getting knowledge about a subject that they are passionate about. The second reason and maybe the primary one is to get a career in something you like."}},"thumbnail_image":{"type":"Image","config":{"constraint":{},"thumbnails":[],"label":"Thumbnail Image"}},"hero_image":{"type":"Image","config":{"constraint":{},"thumbnails":[],"label":"Hero Image"}},"summary":{"type":"Group","config":{"fields":{"summary_title":{"type":"StructuredText","config":{"single":"heading5, heading6","label":"Summary title","placeholder":"Role"}},"summary_value":{"type":"StructuredText","config":{"multi":"paragraph, hyperlink","allowTargetBlank":true,"label":"Summary value","placeholder":"Akademiska Hus"}}},"label":"summary"}},"project_content":{"type":"StructuredText","config":{"multi":"paragraph, preformatted, heading1, heading2, heading3, heading4, heading5, heading6, strong, em, hyperlink, image, embed, list-item, o-list-item, o-list-item","allowTargetBlank":true,"label":"Project content"}},"body":{"type":"Slices","fieldset":"Slice zone","config":{"labels":{"full_width_image":[],"split_images":[],"rich_text":[],"quote1":[],"quote":[]},"choices":{"full_width_image":{"type":"Slice","fieldset":"Full Width Image","description":"Full width image","icon":"broken_image","display":"list","non-repeat":{"image":{"type":"Image","config":{"constraint":{},"thumbnails":[],"label":"Image"}}},"repeat":{}},"split_images":{"type":"Slice","fieldset":"Split Images","description":"Split images in two","icon":"call_split","display":"list","non-repeat":{"left_image":{"type":"Image","config":{"constraint":{},"thumbnails":[],"label":"Left Image"}},"right_image":{"type":"Image","config":{"constraint":{},"thumbnails":[],"label":"Right Image"}}},"repeat":{}},"rich_text":{"type":"Slice","fieldset":"Rich Text","description":"Rich Text","icon":"texture","display":"list","non-repeat":{"text":{"type":"StructuredText","config":{"multi":"paragraph, preformatted, heading1, heading2, heading3, heading4, heading5, heading6, strong, em, hyperlink, image, embed, list-item, o-list-item, rtl","label":"text"}}},"repeat":{}},"quote":{"type":"Slice","fieldset":"Quote","description":"A short quote","icon":"add_alert","non-repeat":{"quote":{"type":"StructuredText","config":{"single":"em","label":"Quote","placeholder":"Your quote"}},"author":{"type":"StructuredText","config":{"multi":"paragraph","label":"Name of the author","placeholder":"John Doe"}}},"repeat":{},"display":"list"},"quote1":{"type":"Slice","fieldset":"Testimonial","description":"Testimonial of client","icon":"call","non-repeat":{"quote":{"type":"StructuredText","config":{"single":"em","label":"Quote","placeholder":"Your quote"}},"author":{"type":"StructuredText","config":{"multi":"paragraph","label":"Name of the author","placeholder":"John Doe"}}},"repeat":{},"display":"list"}}}}}}}},
    },{
      name: 'gatsby-plugin-manifest',
      plugin: require('C:/Users/Willi/web/william/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"/","background_color":"#303030","theme_color":"#303030","display":"minimal-ui","icon":"src/images/favicon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"c1add2d5c35f8eac20d416729c735830"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    try {
      const result = plugin.plugin[api](args, plugin.options)
      if (result && argTransform) {
        args = argTransform({ args, result })
      }
      return result
    } catch (e) {
      if (plugin.name !== `default-site-plugin`) {
        // default-site-plugin is user code and will print proper stack trace,
        // so no point in annotating error message pointing out which plugin is root of the problem
        e.message += ` (from plugin: ${plugin.name})`
      }

      throw e
    }
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
