import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components";

export default function Root() {
  return (
    <>
      <h1>Root</h1>
      <Header />
      <Outlet />
    </>
  );
}
