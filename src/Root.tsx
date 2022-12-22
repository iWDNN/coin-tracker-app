import React from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { fetchCoins } from "./api";
import { Loading } from "./components";
import { ICrypto } from "./types/crypto";

export default function Root() {
  const { isLoading, data: allCrypto } = useQuery<ICrypto[]>(
    "allcoins",
    fetchCoins
  );
  return <>{isLoading ? <Loading /> : <Outlet context={allCrypto} />}</>;
}
