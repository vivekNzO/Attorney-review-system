import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./store/AuthContext.jsx";
import ContextProvider from "./store/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
);
