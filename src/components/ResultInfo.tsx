import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { Loading, ColorText } from "../components";
import Chart from "../components/Chart";
import { BOOK_MARK_ID } from "../data";
import { ICryptoInfo, ICryptoPrice } from "../types/crypto";
import { addNumberComma } from "../utils";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid rgba(150, 150, 150, 0.1);
  background-color: #eee;
`;

const Mark = styled.div`
  margin-right: 7px;
  cursor: pointer;
  i {
    color: rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
  }
  &:hover {
    i {
      color: #edd501;
      text-shadow: 0 0 0 2px #121212 inset;
    }
  }
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

const OverView = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9em;
  font-size: 0.9em;
  p {
    font-weight: 300;
    line-height: 1.4;
  }
`;
const OverViewItem = styled.li`
  width: 22%;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  font-size: 0.9em;
  text-align: center;
  background-color: #e6e6e6;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.01), 0 5px 10px rgba(0, 0, 0, 0.06);
  span {
    display: block;
    margin-bottom: 5px;
  }
  span:nth-child(1) {
    text-transform: uppercase;
    font-weight: 500;
  }
`;

export default function ResultInfo() {
  const { coinId } = useParams();
  const {
    isLoading: infoLoading,
    data: infoData,
    isError: infoError,
  } = useQuery<ICryptoInfo>(["info", coinId], () => fetchCoinInfo(coinId!));
  const {
    isLoading: priceLoading,
    data: priceData,
    isError: priceError,
  } = useQuery<ICryptoPrice>(["price", coinId], () => fetchCoinPrice(coinId!));

  const onClickBookMark = (priceData: ICryptoPrice) => {
    console.log("onClickBookMark start");
    const prevLSData = JSON.parse(localStorage.getItem(BOOK_MARK_ID) as any);
    localStorage.setItem(
      BOOK_MARK_ID,
      JSON.stringify([...prevLSData, priceData])
    );
  };

  if (infoError || priceError) {
    return <h1>Data was not found</h1>;
  }

  return (
    <Container>
      {infoLoading && priceLoading ? (
        <Loading />
      ) : (
        <>
          <Title>
            <Mark onClick={() => onClickBookMark(priceData!)}>
              <i className="fa-solid fa-star"></i>
            </Mark>
            <h1>{infoData?.symbol} / USD</h1>
          </Title>
          <Chart coinId={coinId!} />
          <OverView>
            <OverViewItem>
              <span>rank</span>
              <span>{priceData?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>price</span>
              <span>{priceData?.quotes.USD.price.toFixed(2)} USD</span>
            </OverViewItem>
            <OverViewItem>
              <span>volume_24h</span>
              <span>${addNumberComma(priceData!.quotes.USD.volume_24h)}</span>
            </OverViewItem>
            <OverViewItem>
              <span>ath_price</span>
              <span>{priceData?.quotes.USD.ath_price.toFixed(2)} USD</span>
              <ColorText
                color={
                  priceData
                    ? priceData.quotes.USD.percent_from_price_ath < 0
                      ? "#F15131"
                      : "#20BF75"
                    : "black"
                }
                text={priceData?.quotes.USD.percent_from_price_ath + "%"}
              />
            </OverViewItem>
          </OverView>
          <OverView>
            <p>{infoData?.description}</p>
          </OverView>
        </>
      )}
    </Container>
  );
}
