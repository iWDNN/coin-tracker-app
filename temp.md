import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { Loading, PopUp } from "../components";
import Chart from "../components/Chart";
import { ICryptoInfo, ICryptoPrice } from "../types/crypto";

type RouteParams = {
coinId: string;
};

// const Container = styled.div`//   background-color: #eee;
//`;
const CryptoCt = styled.div`  padding: 1.5em;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  h1 {
    font-weight: 600;
    font-size: 1.4em;
    padding: 1em 0.5em;
    margin-top: 1em;
    background-color: #000000;
    color: #ff8080;
  }`;
const Title = styled.div`  display: flex;
  img {
    width: 40px;
    height: 40px;
    margin-right: 1em;
  }
  div {
    h3 {
      margin-bottom: 5px;
      font-size: 1.1em;
      font-weight: 600;
      letter-spacing: 1px;
    }
    h4 {
      color: rgba(0, 0, 0, 0.6);
      font-size: 0.9em;
      font-weight: 500;
      letter-spacing: 1.5px;
    }
  }`;
const Overview = styled.ul`  display: flex;
  justify-content: space-between;`;
const OverviewItem = styled.li`  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 10px;
  span:first-child {
    font-size: 0.7em;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
  span:last-child {
    font-size: 0.8em;
    font-weight: 400;
  }`;
const Top = styled.div`  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.2); */`;
const Middle = styled.div`  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ul {
    margin: 10px;
    li {
      display: flex;
      span {
        padding: 4px;
      }
      span:first-child {
        background-color: #000;
        color: #fff;
      }
      span:last-child {
        margin-right: 10px;
        background-color: #fff;
        color: #000;
      }
    }
  }`;
const Bottom = styled.div`  ul {
    margin: 10px;
    li {
      display: flex;
      span {
        padding: 4px;
      }
      span:first-child {
        background-color: #000;
        color: #fff;
      }
      span:last-child {
        margin-right: 10px;
        background-color: #fff;
        color: #000;
      }
    }
  }`;

export default function CryptoInfo() {
const { coinId } = useParams<keyof RouteParams>() as RouteParams; // 임시 대처

const { isLoading: infoLoading, data: infoData } = useQuery<ICryptoInfo>(
["info", coinId],
() => fetchCoinInfo(coinId)
);
const { isLoading: priceLoading, data: priceData } = useQuery<ICryptoPrice>(
["price", coinId],
() => fetchCoinPrice(coinId)
);

// console.log("infoData:", infoData, "priceData:", priceData);

return (
<>
{infoLoading && priceLoading ? (
<Loading />
) : (
<CryptoCt>
<Top>
<Title>
<img src={infoData?.logo} alt={infoData?.symbol} />
<div>
<h3>{infoData?.name}</h3>
<h4>{infoData?.symbol}</h4>
</div>
<PopUp text={infoData?.description} />
</Title>
<Overview>
<OverviewItem>
<span>beta_value</span>
<span>{priceData?.beta_value} USD</span>
</OverviewItem>
<OverviewItem>
<span>price</span>
<span>{priceData?.quotes.USD.price.toFixed(2)} USD</span>
</OverviewItem>
<OverviewItem>
<span>circulating_supply</span>
<span>{priceData?.circulating_supply}</span>
</OverviewItem>
<OverviewItem>
<span>max_supply</span>
<span>{priceData?.max_supply}</span>
</OverviewItem>
</Overview>
</Top>
<Middle>
<section>
<h1>CryptoChart</h1>
<Chart coinId={coinId} />
</section>
<section>
<h1>CryptoPrice</h1>
<ul>
<li>
<span>id</span>
<span>{priceData?.id}</span>
</li>
<li>
<span>rank</span>
<span>{priceData?.rank}</span>
</li>
<li>
<span>symbol</span>
<span>{priceData?.symbol}</span>
</li>
<li>
<span>beta_value</span>
<span>{priceData?.beta_value}</span>
</li>
<li>
<span>circulating_supply</span>
<span>{priceData?.circulating_supply}</span>
</li>
<li>
<span>first_data_at</span>
<span>{priceData?.first_data_at}</span>
</li>
<li>
<span>last_updated</span>
<span>{priceData?.last_updated}</span>
</li>
<li>
<span>max_supply</span>
<span>{priceData?.max_supply}</span>
</li>
<li>
<ul>
<li>
<span>ath_date</span>
<span>{priceData?.quotes.USD.ath_date}</span>
</li>
<li>
<span>ath_price</span>
<span>{priceData?.quotes.USD.ath_price}</span>
</li>
<li>
<span>market_cap</span>
<span>{priceData?.quotes.USD.market_cap}</span>
</li>
<li>
<span>market_cap_change_24h</span>
<span>{priceData?.quotes.USD.market_cap_change_24h}</span>
</li>
<li>
<span>percent_change_15m</span>
<span>{priceData?.quotes.USD.percent_change_15m}</span>
</li>
<li>
<span>percent_change_30m</span>
<span>{priceData?.quotes.USD.percent_change_30m}</span>
</li>
<li>
<span>percent_change_1h</span>
<span>{priceData?.quotes.USD.percent_change_1h}</span>
</li>
<li>
<span>percent_change_6h</span>
<span>{priceData?.quotes.USD.percent_change_6h}</span>
</li>
<li>
<span>percent_change_12h</span>
<span>{priceData?.quotes.USD.percent_change_12h}</span>
</li>
<li>
<span>percent_change_7d</span>
<span>{priceData?.quotes.USD.percent_change_7d}</span>
</li>
<li>
<span>percent_change_30d</span>
<span>{priceData?.quotes.USD.percent_change_30d}</span>
</li>
<li>
<span>percent_change_1y</span>
<span>{priceData?.quotes.USD.percent_change_1y}</span>
</li>
<li>
<span>percent_from_price_ath</span>
<span>
{priceData?.quotes.USD.percent_from_price_ath}
</span>
</li>
<li>
<span>price</span>
<span>{priceData?.quotes.USD.price}</span>
</li>
<li>
<span>volume_24h</span>
<span>{priceData?.quotes.USD.volume_24h}</span>
</li>
<li>
<span>volume_24h_change_24h</span>
<span>{priceData?.quotes.USD.volume_24h_change_24h}</span>
</li>
</ul>
</li>
</ul>
</section>
</Middle>
<Bottom>
<h1>CryptoInfo</h1>
<ul>
<li>
<span>id</span>
<span>{infoData?.id}</span>
</li>
<li>
<span>rank</span>
<span>{infoData?.rank}</span>
</li>
<li>
<span>type</span>
<span>{infoData?.type}</span>
</li>
<li>
<span>name</span>
<span>{infoData?.name}</span>
</li>
<li>
<span>is_active</span>
<span>{infoData?.is_active}</span>
</li>
<li>
<span>is_new</span>
<span>{infoData?.is_new}</span>
</li>
<li>
<span>open_source</span>
<span>{infoData?.open_source}</span>
</li>
<li>
<span>hardware_wallet</span>
<span>{infoData?.hardware_wallet}</span>
</li>
<li>
<span>message</span>
<span>{infoData?.message}</span>
</li>
<li>
<span>org_structure</span>
<span>{infoData?.org_structure}</span>
</li>
<li>
<span>started_at</span>
<span>{infoData?.started_at}</span>
</li>
<li>
<span>first_data_at</span>
<span>{infoData?.first_data_at}</span>
</li>
<li>
<span>last_data_at</span>
<span>{infoData?.last_data_at}</span>
</li>
<li>
<span>desc</span>
<span>{infoData?.description}</span>
</li>
<li>
<span>development_status</span>
<span>{infoData?.development_status}</span>
</li>
<li>
<span>team</span>
<ul>
{infoData?.team.map((person) => (
<li key={person.id}>
<span>{person.position}</span>
<span>{person.name}</span>
</li>
))}
</ul>
</li>
<li>
<ul>
{infoData?.tags.map((tag) => (
<li key={tag.id}>
<ul>
<li>
<span>coin_counter</span>
<span>{tag.coin_counter}</span>
</li>
<li>
<span>ico_counter</span>
<span>{tag.ico_counter}</span>
</li>
<li>
<span>name</span>
<span>{tag.name}</span>
</li>
</ul>
</li>
))}
</ul>
</li>
</ul>
</Bottom>
</CryptoCt>
)}
</>
);
}
