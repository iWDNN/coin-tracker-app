import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../components";
import { ICrypto } from "../types";

const Container = styled.div`
  width: 100vw;
  margin-top: 4vh;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const Tabs = styled.ul`
  display: flex;
`;
const Tab = styled.li`
  width: 100px;
  padding: 2px 5px;
  border: 1px solid black;
`;

export default function Results() {
  const CryptoTypes: string[] = ["All", "coin", "token"];
  const { searchId } = useParams();
  const allCrypto: ICrypto[] = useOutletContext();
  const searchResult: ICrypto[] = allCrypto.filter(
    (crypto) =>
      crypto.name.toLowerCase().slice(0, searchId!.length) ===
      searchId!.toLowerCase()
  );
  return (
    <Container>
      <Header />
      <Tabs>
        {CryptoTypes.map((type) => (
          <Tab key={type}>{type}</Tab>
        ))}
      </Tabs>
      <ul>
        {searchResult.map((crypto) => (
          <li key={crypto.id}>
            <span>{crypto.name}</span>
            <span>{crypto.type}</span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
