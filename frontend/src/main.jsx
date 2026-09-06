import React from "react";

import ReactDOM
  from "react-dom/client";

import {
  BrowserRouter
} from "react-router-dom";

import App
  from "./App";

import "./index.css";

import "./components/dashboard/dashboard.css";

import {
  AuthProvider
} from "./context/AuthContext";

import {
  NotificationProvider
} from "./context/NotificationContext";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter
      basename={import.meta.env.PROD ? import.meta.env.BASE_URL : "/"}
    >

      <AuthProvider>

        <NotificationProvider>

          <App />

        </NotificationProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);