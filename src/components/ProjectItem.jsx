import React from "react"
import styled from "styled-components"

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 1rem);
  margin-bottom: 12rem;

  &:nth-child(odd) {
    margin-right: 1rem;
  }

  &:nth-child(even) {
    margin-left: 1rem;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-child(3n) {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }

  div {
    height: 48.9rem;
    margin-bottom: 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 0.6rem;
    transition: all ease 350ms;

    h3 {
      position: absolute;
      font-size: 8rem;
      font-weight: 400;
      /* border-bottom: 3px solid white; */
      color: #ffffff;
      opacity: 0;
      transition: all ease 350ms;
    }

    img {
      object-fit: cover;
      transition: all ease 350ms;
      height: 100%;
      width: 100%;
    }
  }

  span {
    color: #7d7b76;
    font-size: 1.6rem;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }

  h2 {
    font-size: 2.4rem;
    color: #333;
    font-weight: 500;
    margin: 0;

    strong {
      font-size: 2.4rem;
      color: #333;
      font-weight: 500;
      text-decoration: underline;
    }
  }

  h2,
  span {
    transition: opacity 450ms ease;
  }

  &:hover {
    cursor: pointer;

    div {
      border-radius: 6.4rem;
    }

    img {
      filter: brightness(0.7);
      transform: scale(1.05);
    }

    h3 {
      opacity: 1;
    }

    h2,
    span {
      opacity: 0.7;
    }
  }
`

const ProjectItem = ({ image, tags, title, name, fullWidth }) => (
  <ItemWrapper>
    <div>
      <img src={image} alt={`${name} - ${title}`} />
      <h3>Select Project</h3>
    </div>
    <span>{tags}</span>
    <h2>
      {" "}
      <strong>{name}</strong> — {title}
    </h2>
  </ItemWrapper>
)

export default ProjectItem
