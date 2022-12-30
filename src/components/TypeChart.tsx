import React from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { ICryptoPrice } from "../types/crypto";

interface ITypeChartProps {
  data: ICryptoPrice[];
}

const Container = styled.div`
  width: 100%;
`;

export default function TypeChart({ data }: ITypeChartProps) {
  return (
    <Container>
      <ReactApexChart
        series={[
          {
            name: "Rank",
            type: "column",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
          },
          {
            name: "Price",
            type: "area",
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
          },
          {
            name: "Volume",
            type: "line",
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
          },
        ]}
        options={{
          chart: {
            type: "line",
            stacked: false,
          },
          stroke: {
            width: [0, 2, 5],
            curve: "smooth",
          },
          plotOptions: {
            bar: {
              columnWidth: "50%",
            },
          },

          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
          labels: [
            "01/01/2003",
            "02/01/2003",
            "03/01/2003",
            "04/01/2003",
            "05/01/2003",
            "06/01/2003",
            "07/01/2003",
            "08/01/2003",
            "09/01/2003",
            "10/01/2003",
            "11/01/2003",
          ],
          markers: {
            size: 0,
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            title: {
              text: "Points",
            },
            min: 0,
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " points";
                }
                return y;
              },
            },
          },
        }}
      />
    </Container>
  );
}
