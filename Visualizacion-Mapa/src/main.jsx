import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { InstitucionesContextProvider } from "./context/InstitucionesContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InstitucionesContextProvider>
      <App />
    </InstitucionesContextProvider>
  </StrictMode>
);
