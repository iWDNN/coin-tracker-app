import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { Loading } from "../components";
import Chart from "../components/Chart";
import { ICryptoInfo, ICryptoPrice } from "../types/crypto";

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
  padding: 0.9em;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
const ColorText = styled.span<{ textColor: string }>`
  color: ${(props) => props.textColor};
  font-weight: 600;
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
        <Loading />
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
              <span>{priceData?.quotes.USD.price.toFixed(2)} USD</span>
            </OverViewItem>
            <OverViewItem>
              <span>beta_value</span>
              <ColorText
                textColor={
                  priceData!.quotes.USD.percent_from_price_ath < 0
                    ? "#F15131"
                    : "#20BF75"
                }
              >
                {priceData?.beta_value}
              </ColorText>
            </OverViewItem>
            <OverViewItem>
              <span>ath_price</span>
              <span>{priceData?.quotes.USD.ath_price.toFixed(2)} USD</span>
              <ColorText
                textColor={
                  priceData!.quotes.USD.percent_from_price_ath < 0
                    ? "#F15131"
                    : "#20BF75"
                }
              >
                {priceData?.quotes.USD.percent_from_price_ath}%
              </ColorText>
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