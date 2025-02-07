import "./styles/styles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import Feed from "./components/Feed.jsx";
import Login from "./components/Login.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>   
    
    <Login />
    {/* <Feed /> */}
    
  </React.StrictMode>
);