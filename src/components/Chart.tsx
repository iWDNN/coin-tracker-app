import React from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import { ICryptoHistory } from "../types/crypto";
import Loading from "./Loading";

interface ChartProps {
  coinId: string;
}
const Container = styled.div`
  width: 100%;
`;
const ChartError = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function Chart({ coinId }: ChartProps) {
  const { isLoading, data, isError } = useQuery<ICryptoHistory[], Error>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId!)
  );
  if (isError) {
    return <ChartError>Data was not found</ChartError>;
  }
  return (
    <Container>
      {isLoading ? (
        <ChartError>
          <Loading />
        </ChartError>
      ) : (
        <>
          <ReactApexChart
            type="candlestick"
            series={[
              {
                name: "crypto",
                data: data!.map((price: ICryptoHistory) => {
                  return {
                    x: new Date(price.time_close * 1000),
                    y: [price.open, price.high, price.low, price.close],
                  };
                }),
              },
            ]}
            options={{
              chart: {
                height: 200,
                type: "candlestick",
              },
              title: {
                text: `${new Date(
                  data![0].time_close * 1000
                ).toLocaleDateString()} - per minutes`,
                align: "left",
              },
              annotations: {
                xaxis: [
                  {
                    x: "Oct 06 14:00",
                    borderColor: "#00E396",
                    label: {
                      borderColor: "#00E396",
                      style: {
                        fontSize: "12px",
                        color: "#fff",
                        background: "#00E396",
                      },
                      orientation: "horizontal",
                      offsetY: 7,
                      text: "Annotation Test",
                    },
                  },
                ],
              },
              tooltip: {
                enabled: true,
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
              xaxis: {
                labels: {
                  show: false,
                },
              },
            }}
          />
        </>
      )}
    </Container>
  );
}
