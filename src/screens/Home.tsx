import React from "react";
import styled from "styled-components";
import { PopUp, Search } from "../components";
import { popUpData } from "../data";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  h2 {
    margin: 5px;
  }
  i {
    font-weight: 0.8em;
  }
`;
export default function Home() {
  return (
    <>
      <Container>
        <Title>
          <h2>Cryptos</h2>
          <PopUp {...popUpData} />
        </Title>
        <Search />
      </Container>
    </>
  );
}
