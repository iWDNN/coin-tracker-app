import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
`;
export default function Header() {
  return (
    <Container>
      <Link to={`/`}>home</Link>
      <Link to={`/about`}>about</Link>
    </Container>
  );
}
