import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Cryptos } from "./components";
import Root from "./Root";
import { Home, Results, RecList, CryptoInfo } from "./screens";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "rec-list",
        element: <RecList />,
      },
      {
        path: "results/:searchId",
        element: <Results />,
        children: [
          {
            path: "tabs/:tabId",
            element: <Cryptos />,
          },
        ],
      },
      {
        path: "crypto-info/:coinId",
        element: <CryptoInfo />,
      },
    ],
  },
]);

export default router;
