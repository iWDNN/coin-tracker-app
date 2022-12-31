import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { ICryptoPrice } from "../types/crypto";
import ColorText from "./ColorText";
import TypeChart from "./TypeChart";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
`;
const List = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 10px;
  background-color: #eee;
  overflow: scroll;
  @media screen and (max-width: 750px) {
    display: flex;
    flex-direction: column;
    height: 95vh;
  }
`;
const Item = styled.li`
  height: 10vh;
  display: grid;
  grid-template-columns: 1fr 2fr 5fr 5fr;
  margin: 1em;
  padding: 0.7em;
  border-radius: 7px;
  background-color: #e6e6e6;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.01), 0 5px 10px rgba(0, 0, 0, 0.06);
  @media screen and (max-width: 750px) {
    width: 90%;
  }
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
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.8em;
    font-weight: 500;
    text-align: right;
    color: #2d2d2d;
    h1 {
      margin-bottom: 8px;
    }
    div {
      display: flex;
      justify-content: flex-end;
      margin-top: 5px;
      font-size: 0.8em;
      h2 {
        font-size: 0.9em;
        margin-left: 5px;
      }
    }
    h2 {
      margin-top: 5px;
      font-size: 0.8em;
    }
  }
`;
export default function TypeList() {
  const { tabId } = useParams();
  const allCryptoPrice: ICryptoPrice[] = useOutletContext();
  let typeResults: ICryptoPrice[] | null =
    tabId === "rank"
      ? allCryptoPrice.slice(0, 21)
      : tabId === "price"
      ? [...allCryptoPrice]
          .sort((a, b) => b.quotes.USD.price - a.quotes.USD.price)
          .slice(0, 21)
      : tabId === "volume"
      ? [...allCryptoPrice]
          .sort((a, b) => b.quotes.USD.volume_24h - a.quotes.USD.volume_24h)
          .slice(0, 21)
      : null;
  return (
    <Container>
      <List>
        {typeResults?.map((crypto, i) => (
          <Item key={crypto.id}>
            <div>{i + 1}</div>
            <div>
              <img
                src={`https://coinicons-api.vercel.app/api/icon/${crypto?.symbol.toLowerCase()}`}
                alt={crypto?.name}
              />
            </div>
            <div>
              <h1>{crypto?.name}</h1>
              <h2>{crypto?.symbol}</h2>
            </div>
            <div>
              <ColorText
                color={
                  crypto
                    ? crypto.quotes.USD.percent_change_15m < 0
                      ? "#F15131"
                      : "#20BF75"
                    : "black"
                }
                text={"$" + crypto?.quotes.USD.price.toFixed(2)}
              />
              <div>
                <h2>{crypto?.quotes.USD.percent_change_24h + "%"}d</h2>
                <h2>{crypto?.quotes.USD.percent_change_1h + "%"}h</h2>
              </div>
              <h2>
                $
                {crypto?.quotes.USD.volume_24h
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h2>
            </div>
          </Item>
        ))}
      </List>
    </Container>
  );
}
