import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { Loading } from "../components";
import Chart from "../components/Chart";
import { ICryptoInfo, ICryptoPrice } from "../types/crypto";

const TempCt = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eee;
  border-left: 1px solid rgba(150, 150, 150, 0.1);
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
`;
const OverViewItem = styled.li`
  text-align: center;
  span {
    display: block;
  }
  span:nth-child(1) {
    text-transform: uppercase;
    font-size: 0.9em;
  }
  span:nth-child(2) {
    font-size: 0.8em;
  }
`;

export default function CryptoInfo() {
  const { coinId } = useParams();
  const { isLoading: infoLoading, data: infoData } = useQuery<ICryptoInfo>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<ICryptoPrice>(
    ["price", coinId],
    () => fetchCoinPrice(coinId!)
  );
  return (
    <Container>
      {infoLoading && priceLoading ? (
        <TempCt>
          <Loading />
        </TempCt>
      ) : (
        <>
          <Title>
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
              <span>{priceData?.quotes.USD.price.toFixed(2)}</span>
            </OverViewItem>
            <OverViewItem>
              <span>ath_price</span>
              <span>{priceData?.quotes.USD.ath_price.toFixed(2)}</span>
              <span>{priceData?.quotes.USD.ath_date}</span>
              <span>{priceData?.quotes.USD.percent_from_price_ath}</span>
            </OverViewItem>
          </OverView>
        </>
      )}
    </Container>
  );
}
