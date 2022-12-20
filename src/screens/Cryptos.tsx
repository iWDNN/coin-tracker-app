import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { Signal } from "../components";
import { ICrypto } from "../types";

const Container = styled.div`
  width: 100%;
`;

const ResultList = styled.ul`
  border-radius: 10px;
  border-right: 6px solid #fff;
`;
const ResultItem = styled.li`
  background-color: #e7e7e7;
  padding: 10px 15px;
  font-size: 0.9em;
  transition: all 0.5s ease-in-out;
  &:hover {
    border-top: 1px solid #c6c4c4;
    border-bottom: 1px solid #c6c4c4;
  }
  img {
    width: 20px;
  }

  & > div:nth-child(1) {
    width: 10%;
  }
  & > div:nth-child(2) {
    width: 15%;
  }
  & > div:nth-child(3) {
    width: 15%;
    font-size: 0.9em;
    font-weight: 300;
  }
  & > div:nth-child(4) {
    width: 35%;
  }
  & > div:nth-child(5) {
    width: 15%;
    color: #858585;
    letter-spacing: 1px;
    font-size: 0.9em;
    font-weight: 500;
  }
  & > div:nth-child(6) {
    width: 10%;
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
            <Signal color={crypto.is_new ? "#fce700" : "transparent"} />
            <div>
              <img
                src={`https://coinicons-api.vercel.app/api/icon/${crypto.symbol.toLowerCase()}`}
                alt={crypto.name}
              />
            </div>
            <div>
              <span>{crypto.symbol}</span>
            </div>
            <div>
              <span>{crypto.name}</span>
            </div>
            <div>
              <span>{crypto.type}</span>
            </div>
            <Signal color={crypto.is_active ? "#82CD47" : "#FF4A4A"} />
          </ResultItem>
        ))}
      </ResultList>
    </Container>
  );
}
