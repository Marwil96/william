import React from "react"

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
