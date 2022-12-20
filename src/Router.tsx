import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { Home, Crypto, Results, RecList } from "./screens";

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
        path: "/rec-list",
        element: <RecList />,
      },
      {
        path: "results/:searchId",
        element: <Results />,
      },
      {
        path: "crypto",
        element: <Crypto />,
      },
    ],
  },
]);

export default router;
