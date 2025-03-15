import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";

// Create the root element
const root = createRoot(document.getElementById("root"));

// Render the app
root.render(
  <StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
  </StrictMode>
);