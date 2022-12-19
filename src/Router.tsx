import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { Home, About } from "./screens";

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
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default router;
