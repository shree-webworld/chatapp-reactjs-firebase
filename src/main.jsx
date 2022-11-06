import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import './index.css'
import {AuthProvider} from "./context/AuthProvider";
import {ChatProvider} from "./context/ChatProvider";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
     <AuthProvider>
      <ChatProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
     </ChatProvider>
    </AuthProvider>
  </BrowserRouter>
)
