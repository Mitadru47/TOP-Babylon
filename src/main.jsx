import "./styles/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

import Feed from "./components/Feed.jsx";

import UserDetail from "./components/UserDetail.jsx";
import PostDetail from "./components/PostDetail.jsx";

const router = createBrowserRouter([

  {
    
    path: "/signup",
    element: <Signup />
  
  },

  {

    path: "/login",
    element: <Login />

  },

  {

    path: "/",
    element: <Feed />

  },

  {

    path: "/users/:userid",
    element: <UserDetail />

  },

  {

    path: "/posts/:postid",
    element: <PostDetail />

  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>   
    <RouterProvider router={router}/>
    
  </React.StrictMode>
);