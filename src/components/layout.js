/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
// import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import Footer from "./footer"

const Layout = ({ children, modifier }) => {
  return (
    <>
      <Header siteTitle={'YO'} />
      <div className={`layout ${modifier}`}>
        <main>{children}</main>    
      </div>
      <Footer />
    </>
  )
}

export default Layout