import React from "react";
import styled from "styled-components";
import { Search } from "../components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  h1 {
    margin-bottom: 1em;
    font-size: 1.2em;
    font-weight: 500;
    letter-spacing: 1px;
    /* text-transform: uppercase; */
  }
`;

export default function Home() {
  return (
    <>
      <Container>
        <Title>
          <h1>Cryptos</h1>
          <Search />
        </Title>
      </Container>
    </>
  );
}
