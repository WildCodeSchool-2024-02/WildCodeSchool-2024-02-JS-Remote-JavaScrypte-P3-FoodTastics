import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage/HomePage";
import ConnectionPage from "./pages/ConnectionPage/ConnectionPage";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import IngredientPage from "./pages/IngredientPage/IngredientPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import App from "./App";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";
import LogOutPage from "./pages/LogOutPage/LogOutPage";
import AdminUsersPage from "./pages/DashboardPage/AdminUsersPage/AdminUsersPage";
import ModifUserPage from "./pages/DashboardPage/ModifUserPage/ModifUserPage";
import AdminRecipesPage from "./pages/DashboardPage/AdminRecipesPage/AdminRecipesPage";
/* import ModifRecipePage from "./pages/DashboardPage/ModifRecipePage/ModifRecipePage"; */

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
        path: "details/:id",
        element: <RecipeDetails />,
        loader: ({ params }) => fetch(`${express}/api/recipe/${params.id}`),
      },
      {
        path: "/connexion",
        element: <ConnectionPage />,
      },
      {
        path: "/deconnexion",
        element: <LogOutPage />,
      },
      {
        path: "/ajout-recette",
        element: <AddRecipePage />,
        loader: () => fetch(`${express}/api/ingredient`),
      },
      {
        path: "/ingredient",
        element: <IngredientPage />,
      },
      {
        path: "/dashboard/:id",
        element: <DashboardPage />,
        loader: ({ params }) => fetch(`${express}/api/user/${params.id}`),
      },
      {
        path: "/admin/users",
        element: <AdminUsersPage />,
        loader: () => fetch(`${express}/api/user`),
      },
      {
        path: "/admin/users/modif/:id",
        element: <ModifUserPage />,
        loader: ({ params }) => fetch(`${express}/api/user/${params.id}`),
      },

      {
        path: "/admin/recipes",
        element: <AdminRecipesPage />,
        loader: () => fetch(`${express}/api/recipe`),
      },

      /* {
        path: "/admin/recipes/modif/:id",
        element: <ModifRecipePage />,
        loader: ({ params }) => fetch(`${express}/api/recipe/${params.id}`),
      },  */
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
