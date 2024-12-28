import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "./components/ui/toaster";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <StrictMode>
        <App />
        <Toaster />
      </StrictMode>
    </BrowserRouter>
    </PersistGate>
  </Provider>
);
