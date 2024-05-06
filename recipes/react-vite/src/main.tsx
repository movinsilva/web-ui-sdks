import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AsgardeoProvider, UIAuthConfig } from '@asgardeo/react-ui'

const config: UIAuthConfig = {
  baseUrl: "https://localhost:9443",
  clientID: "b1uRjwpqydvxjGR42Y6BnIdQMRMa",
  scope: ["openid", "internal_login", "profile"],
  signInRedirectURL: "https://localhost:5173",
  enableConsoleTextBranding: true,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AsgardeoProvider config={config}>
      <App />
    </AsgardeoProvider>
  </React.StrictMode>,
)
