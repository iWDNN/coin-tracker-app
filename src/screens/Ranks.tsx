import React from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ICrypto } from "../types/crypto";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
`;
const CryptoCt = styled.div`
  background-color: black;
`;
const Title = styled.div`
  display: flex;
  padding: 0.9em;
  background-color: #e7e7e7;
  img {
    width: 1em;
    height: 1em;
    margin-right: 1em;
  }
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
  }
`;

export default function Ranks() {
  const cryptos = useOutletContext<ICrypto[]>();
  const topRankName = cryptos.slice(0, 3).map((crypto) => crypto.id);
  console.log(topRankName);
  return (
    <Container>
      <CryptoCt>
        <Title>
          <h1>BTC / USD</h1>
        </Title>
      </CryptoCt>
      <CryptoCt />
      <CryptoCt />
    </Container>
  );
}
