import React from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { fetchCoins } from "./api";
import { ICrypto } from "./types";

export default function Root() {
  const { isLoading, data: allCrypto } = useQuery<ICrypto[]>("allCrypto", () =>
    fetchCoins()
  );
  return (
    <>{isLoading ? <span>Loading</span> : <Outlet context={allCrypto} />}</>
  );
}
