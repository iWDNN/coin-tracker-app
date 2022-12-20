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
        path: "/reclist",
        element: <RecList />,
      },
      {
        path: "results",
        element: <Results />,
      },
      {
        path: "Crypto",
        element: <Crypto />,
      },
    ],
  },
]);

export default router;
