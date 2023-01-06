import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ColorText } from "../components";
import { BOOK_MARK_ID } from "../data";
import { ICryptoPrice } from "../types/crypto";
import { addNumberComma } from "../utils";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #e6e6e6;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 1em;
  font-size: 0.75em;
  box-shadow: 0 0 0 1px rgba(150, 150, 150, 0.1) inset;
  background-color: #ecebeb;
  &:first-child {
    background-color: #e7e7e7;
    * {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  div:nth-child(1) {
    width: 3%;
    text-align: center;
  }
  div:nth-child(2) {
    width: 7%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
    }
  }
  div:nth-child(3) {
    width: 15%;
    letter-spacing: 0.02em;
  }
  div:nth-child(4) {
    width: 5%;
    font-size: 0.95em;
    text-align: end;
    span {
      font-weight: 500;
    }
  }
  div:nth-child(5) {
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 0.9em;
    span {
      width: 8%;
      text-align: end;
    }
  }
  div:nth-child(6) {
    width: 15%;
    font-size: 0.95em;
    text-align: end;
    span {
      font-weight: 500;
    }
  }
  div:nth-child(7) {
    width: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      padding: 3px 5px;
      color: white;
      text-align: center;
      border-radius: 5px;
      background-color: #919191;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        color: black;
        background-color: #eee;
      }
    }
  }
`;
export default function Bookmark() {
  const [data, setData] = useState<ICryptoPrice[]>([]);
  const onClickRank = () => {
    setData((prev) => prev.sort((a, b) => a.rank - b.rank));
    console.log(data);
  };
  const onClickDelete = (id: string) => {
    setData((prev) => prev.filter((crypto) => crypto.id !== id));
    localStorage.setItem(
      BOOK_MARK_ID,
      JSON.stringify(data.filter((crypto) => crypto.id !== id))
    );
  };
  useEffect(() => {
    const lSData: ICryptoPrice[] = JSON.parse(
      localStorage.getItem(BOOK_MARK_ID) as any
    );
    setData(lSData);
  }, []);

  return (
    <Container>
      <List>
        <Item>
          <div onClick={onClickRank}>rank</div>
          <div></div>
          <div>name</div>
          <div>price</div>
          <div>
            <span>change_15m</span>
            <span>change_1h</span>
            <span>change_24h</span>
            <span>change_7d</span>
            <span>change_30d</span>
            <span>change_1y</span>
          </div>
          <div>vol_24h</div>
          <div></div>
        </Item>
        {data.map((crypto) => (
          <Item key={crypto.id}>
            <div>{crypto.rank}</div>
            <div>
              <img
                src={`https://coinicons-api.vercel.app/api/icon/${crypto?.symbol.toLowerCase()}`}
                alt={crypto?.name}
              />
            </div>
            <div>{crypto.name}</div>
            <div>
              <span>$ </span>
              {addNumberComma(crypto.quotes.USD.price)}
            </div>
            <div>
              <ColorText
                color={
                  crypto.quotes.USD.percent_change_15m < 0
                    ? "#F15131"
                    : "#20BF75"
                }
                text={crypto.quotes.USD.percent_change_15m + "%"}
              />
              <ColorText
                color={
                  crypto.quotes.USD.percent_change_1h < 0
                    ? "#F15131"
                    : "#20BF75"
                }
                text={crypto.quotes.USD.percent_change_1h + "%"}
              />
              <ColorText
                color={
                  crypto.quotes.USD.percent_change_24h < 0
                    ? "#F15131"
                    : "#20BF75"
                }
                text={crypto.quotes.USD.percent_change_24h + "%"}
              />
              <ColorText
                color={
                  crypto.quotes.USD.percent_change_7d < 0
                    ? "#F15131"
                    : "#20BF75"
                }
                text={crypto.quotes.USD.percent_change_7d + "%"}
              />
              <ColorText
                color={
                  crypto.quotes.USD.percent_change_30d < 0
                    ? "#F15131"
                    : "#20BF75"
                }
                text={crypto.quotes.USD.percent_change_30d + "%"}
              />
              <ColorText
                color={
                  crypto.quotes.USD.percent_change_1y < 0
                    ? "#F15131"
                    : "#20BF75"
                }
                text={crypto.quotes.USD.percent_change_1y + "%"}
              />
            </div>
            <div>
              <span>$ </span>
              {addNumberComma(crypto.quotes.USD.volume_24h)}
            </div>
            <div>
              <span onClick={() => onClickDelete(crypto.id)}>del</span>
            </div>
          </Item>
        ))}
      </List>
    </Container>
  );
}
