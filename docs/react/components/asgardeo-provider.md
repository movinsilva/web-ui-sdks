# AsgardeoProvider

The `AsgardeoProvider` is a context provider component provided by the Asgardeo React SDK. It allows you to access the authentication context throughout your application. This context includes user information, authentication state, and methods to handle authentication actions such as sign-in, sign-out, and refresh tokens.

## Usage

First, import the `AsgardeoProvider` from the Asgardeo React SDK:

```ts
import { AsgardeoProvider } from "@asgardeo/auth-react";

<AsgardeoProvider config={config}>
    <App />
</AsgardeoProvider>
```

- To use `AsgardeoProvider`, you need to pass a `config` prop. This prop should be an object of type `UIAuthConfig`, which contains the following properties:

  #### Required Parameters

  - `baseURL`: The base URL of asgardeo.

  - `signInRedirectURL`: The URL where users should be redirected after they sign in. This should be a page in your application.

  - `clientID`: The ID of your application. You get this when you register your application with Asgardeo.

  - `scope`: The scope of the access request. This is a list of scopes separated by spaces. Scopes allow your application to request access only to the resources it needs, and also allow users to control how much access they grant to your application.

  #### Optional Parameters

  - `name`: The name of your application. This is used for application specific branding.

  - `type`: The branding preference for your application. This should be one of the values from the `BrandingPreferenceTypes` enum: "APP", "CUSTOM", or "ORG".

  - `enablePKCE`: A boolean indicating whether to enable Proof Key for Code Exchange (PKCE). This is a security feature that helps prevent interception attacks during the authorization process.
