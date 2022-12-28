import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { Home, Results, Ranks } from "./screens";
import { CryptoInfo, Cryptos } from "./components";

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
        path: "results/:searchId",
        element: <Results />,
        children: [
          {
            path: "tabs/:tabId",
            element: <Cryptos />,
            children: [
              {
                path: ":coinId",
                element: <CryptoInfo />,
              },
            ],
          },
        ],
      },
      {
        path: "ranks",
        element: <Ranks />,
      },
      // {
      //   path: "crypto-info/:coinId",
      //   element: <CryptoInfo />,
      // },
    ],
  },
]);

export default router;
