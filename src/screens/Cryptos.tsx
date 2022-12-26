import React from "react";
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { Signal, Search } from "../components";
import { ICrypto } from "../types/crypto";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
`;
const ResultList = styled.ul`
  width: 50%;
  border-radius: 10px;
`;
const ResultItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eee;
  padding: 10px 15px;
  font-size: 0.9em;
  transition: all 0.1s ease-in-out;
  &:hover {
    box-shadow: 0 0 0 1px #dbdbdb inset;
  }
  img {
    width: 20px;
  }

  & > div:nth-child(1) {
    width: 5%;
  }
  & > div:nth-child(2) {
    width: 5%;
  }
  & > div:nth-child(3) {
    width: 10%;
    font-size: 0.9em;
    font-weight: 300;
  }
  & > div:nth-child(4) {
    width: 45%;
  }
  & > div:nth-child(5) {
    width: 5%;
    color: #858585;
    letter-spacing: 1px;
    font-size: 0.9em;
    font-weight: 500;
  }
  & > div:nth-child(6) {
    width: 5%;
  }
`;
const InfoScreen = styled.div`
  width: 50%;
`;
// new | img | symbol | name | type | active

export default function Cryptos() {
  const { tabId } = useParams();
  const searchResult: ICrypto[] = useOutletContext();
  const result =
    tabId === "all"
      ? searchResult
      : searchResult?.filter((crypto) => crypto.type === tabId);
  return (
    <Container>
      <ResultList>
        <Header>
          <Search small />
        </Header>
        {result?.map((crypto) => (
          <Link key={crypto.id} to={`${crypto.id}`}>
            <ResultItem>
              <Signal color={crypto.is_new ? "#fce700" : "transparent"} />
              <div>
                <img
                  src={`https://coinicons-api.vercel.app/api/icon/${crypto.symbol.toLowerCase()}`}
                  // src={`https://static.coinpaprika.com/coin/${crypto.id}/logo.png`}
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
          </Link>
        ))}
      </ResultList>
      <InfoScreen>
        <Outlet />
      </InfoScreen>
    </Container>
  );
}
