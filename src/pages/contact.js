import React from "react"
import { breakpoint, variables } from "../mixins/breakpoint"
import { animated, useSpring } from "react-spring"
import Img from "gatsby-image"
import styled from "styled-components"
import Footer from "../components/Footer"
import PageWrapper from "../components/PageWrapper"

const Contact = ({ transitionStatus, location, entry, exit, data }) => {
  return (
    <PageWrapper
      outerWrapperStyle={{ height: "auto" }}
      transitionActive={transitionStatus}
    >
      <h3>Contact</h3>
    </PageWrapper>
  )
}

export default Contact
