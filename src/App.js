import React from "react";
import { SocketProvider } from "./context/SocketContext";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <SocketProvider>
      <Home />
    </SocketProvider>
  );
};
