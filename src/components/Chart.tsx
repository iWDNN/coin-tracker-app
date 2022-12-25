import dayjs from "dayjs";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";
import { ICryptoHistory } from "../types/crypto";

interface ChartProps {
  coinId: string;
}
const Container = styled.div`
  width: 100%;
`;

export default function Chart({ coinId }: ChartProps) {
  const [error, setError] = useState(false);
  const { isLoading, data, isError } = useQuery<ICryptoHistory[], Error>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
  );
  if (isError) {
    return <h2>Data was not found</h2>;
  }
  return (
    <Container>
      {isLoading ? (
        <h2>Chart Loading...</h2>
      ) : (
        <>
          <ReactApexChart
            type="candlestick"
            series={[
              {
                name: "crypto",
                data: data!.map((price: ICryptoHistory) => {
                  return {
                    x: new Date(price.time_close),
                    y: [price.open, price.high, price.low, price.close],
                  };
                }),
              },
            ]}
            options={{
              chart: {
                // height: 200,
                type: "candlestick",
              },
              title: {
                text: coinId.toUpperCase(),
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
              xaxis: {
                type: "category",
                labels: {
                  formatter: function (val) {
                    return dayjs(val).format("MMM DD HH:mm");
                  },
                },
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
            }}
          />
        </>
      )}
    </Container>
  );
}