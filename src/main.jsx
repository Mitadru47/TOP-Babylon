import "./styles/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import Feed from "./components/Feed.jsx";
import Login from "./components/Login.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([

  {

    path: "/login",
    element: <Login />

  },

  {

    path: "/",
    element: <Feed />

  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>   
    <RouterProvider router={router}/>
    
  </React.StrictMode>
);