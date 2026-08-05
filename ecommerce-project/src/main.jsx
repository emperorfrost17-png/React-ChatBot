import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter is a component from the React Router library used to enable routing in a React application*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
