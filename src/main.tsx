import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider, http, createStorage } from "wagmi";
import { sepolia } from "wagmi/chains";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

import HomePage from "./HomePage";
import App from "./App";
import Trips from "./Trips";
import SuccessPage from "./SuccessPage";

const projectId = "b59e5f85e046d4449303db40b05b5ed5";

const config = getDefaultConfig({
  appName: "Sustainable Travel dApp",
  projectId: projectId,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  ssr: false,
  storage: createStorage({
    storage: localStorage,
  }),
});

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element with id "root" not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <WagmiProvider config={config} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/app/:slug?" element={<App />} />
              <Route path="/app/trips" element={<Trips />} />
              <Route path="/app/success" element={<SuccessPage />} />
            </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
