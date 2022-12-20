import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function Header() {
  return (
    <Container>
      <Link to="/">
        <i className="fa-solid fa-house" />
      </Link>
      <Search small />
    </Container>
  );
}
