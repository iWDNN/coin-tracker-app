import React from "react";
import { useQuery } from "react-query";
import { Link, Outlet } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { fetchCoinsPrice } from "../api";
import { Loading } from "../components";
import { ICryptoPrice } from "../types/crypto";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  background-color: #e7e7e7;
`;
const TypesScreen = styled.div`
  flex-grow: 1;
`;
const Tabs = styled.ul`
  width: 150px;
  display: flex;
  flex-direction: column;
  h1 {
    padding: 0.85em 1em;
    font-weight: 500;
  }
`;
const Tab = styled.li<{ isActive?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1.1em;
  transition: all 0.2s ease-in-out all;
  background-color: ${(props) => (props.isActive ? "#eee" : "none")};
  box-shadow: 0 0 0 1px rgba(150, 150, 150, 0.1) inset;
  span {
    font-size: 0.8em;
    font-weight: 500;
    letter-spacing: 1px;
  }
`;

export default function Types() {
  const cryptoTypes: string[] = ["rank", "price", "volume"];
  const { isLoading, data: allCryptoPrice } = useQuery<ICryptoPrice[]>(
    "allCryptoPrice",
    fetchCoinsPrice
  );
  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Tabs>
            <h1>Types</h1>
            {cryptoTypes.map((type) => (
              <Link key={uuid()} to={`${type}`}>
                <Tab>
                  <span>{type}</span>
                </Tab>
              </Link>
            ))}
          </Tabs>
          <TypesScreen>
            <Outlet context={allCryptoPrice} />
          </TypesScreen>
        </>
      )}
    </Container>
  );
}
