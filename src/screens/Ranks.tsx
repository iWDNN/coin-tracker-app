import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinsPrice } from "../api";
import { Loading } from "../components";
import { ICryptoPrice } from "../types/crypto";

const Container = styled.div`
  width: 100%;
  background-color: #eee;
`;
const CryptoCt = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const List = styled.ul`
  max-width: 1080px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px;
  background-color: #eee;
`;
const Item = styled.li`
  height: 7vh;
  display: grid;
  grid-template-columns: 1fr 2fr 5fr 5fr;
  margin: 1em;
  padding: 0.7em;
  border-radius: 5px;
  background-color: #e6e6e6;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.01), 0 5px 10px rgba(0, 0, 0, 0.06);
  div:nth-child(1) {
    margin-right: 10px;
    font-weight: 500;
    place-self: center;
  }
  div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
    }
  }
  div:nth-child(3) {
    font-size: 0.8em;
    margin: 0 2em 0 1em;
    h1 {
      margin-bottom: 5px;
      font-weight: 500;
    }
    h2 {
      font-size: 0.9em;
    }
  }
  div:nth-child(4) {
    font-size: 0.8em;
    font-weight: 500;
    text-align: right;
    h1 {
      margin-bottom: 8px;
    }
    div {
      display: flex;
      justify-content: flex-end;
      font-size: 0.8em;
      h2 {
        font-size: 0.9em;
        margin-left: 5px;
      }
    }
  }
`;
export default function Ranks() {
  const { isLoading, data } = useQuery<ICryptoPrice[]>(
    "allCryptoPrice",
    fetchCoinsPrice
  );

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <CryptoCt>
          <List>
            {data?.slice(0, 27).map((crypto) => (
              <Item key={crypto.id}>
                <div>{crypto?.rank}</div>
                <div>
                  <img
                    src={`https://coinicons-api.vercel.app/api/icon/${crypto?.symbol.toLowerCase()}`}
                  />
                </div>
                <div>
                  <h1>{crypto?.name}</h1>
                  <h2>{crypto?.symbol}</h2>
                </div>
                <div>
                  <h1>${crypto?.quotes.USD.price.toFixed(2)}</h1>
                  <div>
                    <h2>{crypto?.quotes.USD.percent_change_24h}% /d</h2>
                    <h2>{crypto?.quotes.USD.percent_change_1h}% /h</h2>
                  </div>
                </div>
              </Item>
            ))}
          </List>
        </CryptoCt>
      )}
    </Container>
  );
}
