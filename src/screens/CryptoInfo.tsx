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
            <img src={infoData?.logo} />
            <h1>{infoData?.name}</h1>
          </Title>
          <Chart coinId={coinId!} />
        </>
      )}
    </Container>
  );
}
