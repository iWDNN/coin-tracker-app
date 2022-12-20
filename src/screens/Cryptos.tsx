import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { Signal } from "../components";
import { ICrypto } from "../types";

const Container = styled.div`
  width: 100%;
`;

const ResultList = styled.ul``;
const ResultItem = styled.li`
  padding: 10px 15px;

  img {
    width: 20px;
  }
`;
// new | img | symbol | name | type | active
export default function Cryptos() {
  const { tabId } = useParams();
  const searchResult: ICrypto[] = useOutletContext();
  const result =
    tabId === "all"
      ? searchResult
      : searchResult.filter((crypto) => crypto.type === tabId);
  return (
    <Container>
      <ResultList>
        {result.map((crypto) => (
          <ResultItem key={crypto.id}>
            <Signal color={crypto.is_new ? "#fce700" : "#eee"} />
            <img
              src={`https://coinicons-api.vercel.app/api/icon/${crypto.symbol.toLowerCase()}`}
              alt={crypto.name}
            />
            <span>{crypto.symbol}</span>
            <span>{crypto.name}</span>
            <span>{crypto.type}</span>
            <Signal color={crypto.is_active ? "#82CD47" : "#FF4A4A"} />
          </ResultItem>
        ))}
      </ResultList>
    </Container>
  );
}
