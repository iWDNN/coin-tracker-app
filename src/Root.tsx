import React from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { Loading, NavBar } from "./components";
import { ICrypto } from "./types/crypto";
import { Helmet } from "react-helmet";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
const View = styled.div`
  width: 100%;
  display: flex;
`;
export default function Root() {
  const { isLoading, data: allCrypto } = useQuery<ICrypto[]>(
    "allcoins",
    fetchCoins
  );
  return (
    <>
      <Helmet>
        <title>Crypto Tracker App</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <NavBar />
          <View>
            <Outlet context={allCrypto} />
          </View>
        </Container>
      )}
    </>
  );
}
