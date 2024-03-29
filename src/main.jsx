import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <App />
      <Analytics mode="production"/>
    </BrowserRouter>
  </ThemeProvider>
);
