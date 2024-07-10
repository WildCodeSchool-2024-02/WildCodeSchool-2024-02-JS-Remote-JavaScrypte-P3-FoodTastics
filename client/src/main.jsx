import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage/HomePage";
import ConnectionPage from "./pages/ConnectionPage/ConnectionPage";
import IngredientPage from "./pages/IngredientPage/IngredientPage";

import App from "./App";

const express = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: () => fetch(`${express}/api/recipe-label`),
      },
      {
        path: "/connexion",
        element: <ConnectionPage />,
      },
      {
        path: "/ingredient",
        element: <IngredientPage />,
      },
      {
        path: "*",
        element: <h1>Page not found</h1>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
