import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: orange;
  ul {
    display: flex;
    li {
      padding: 5px;
    }
  }
`;
export default function Header() {
  return (
    <Container>
      <ul>
        <li>
          <Link to={`/`}>home</Link>
        </li>
        <li>
          <Link to={`/reclist`}>list</Link>
        </li>
      </ul>
    </Container>
  );
}
