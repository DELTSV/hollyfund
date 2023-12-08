import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App.tsx';
import {MetaMaskProvider} from "@metamask/sdk-react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MetaMaskProvider
      sdkOptions={{
        checkInstallationImmediately:true,
        dappMetadata: {
          name: "Hollyfund",
          url: window.location.host
        }
      }}
    >
      <App/>
    </MetaMaskProvider>
  </React.StrictMode>,
)
