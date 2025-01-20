import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.jsx";
import { AppKitProvider } from './pages/home/components/AppKitProvider.jsx'; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppKitProvider>
      <RouterProvider router={router} />
    </AppKitProvider>
  </StrictMode>
);
