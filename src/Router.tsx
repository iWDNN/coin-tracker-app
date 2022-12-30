import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import { Home, Results, Types, Bookmark } from "./screens";
import { Loading, ResultInfo, ResultList, TypeList } from "./components";

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
        path: "search/:searchId",
        element: <Results />,
        children: [
          {
            path: ":tabId",
            element: <ResultList />,
            children: [
              {
                path: ":coinId",
                element: <ResultInfo />,
              },
            ],
          },
        ],
      },
      {
        path: "types",
        element: <Types />,
        children: [
          {
            path: ":tabId",
            element: <TypeList />,
          },
        ],
      },
      {
        path: "bookmark",
        element: <Bookmark />,
      },
      {
        path: "test",
        element: <Loading />,
      },
    ],
  },
]);

export default router;
