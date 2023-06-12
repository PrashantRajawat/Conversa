import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import theme from "@chakra-ui/theme";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ChatProvider from "./Context/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
    <BrowserRouter>
    <ChatProvider>
    <ChakraProvider theme={theme} >
      <App />
    </ChakraProvider>
    </ChatProvider>
    </BrowserRouter>

);
