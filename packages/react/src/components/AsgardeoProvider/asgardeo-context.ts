/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import {MeAPIResponse, UIAuthConfig, signOut as signOutApi} from '@asgardeo/js-ui-core';
import {Context, createContext, useContext} from 'react';

export interface AuthContext {
  accessToken: string;
  config: UIAuthConfig;
  customizationOptions?: any;
  isAuthenticated: boolean | undefined;
  setAuthentication: () => void;
  user: MeAPIResponse;
}

export const AsgardeoContext: Context<AuthContext> = createContext<AuthContext>(undefined);

interface UseAuthenticationResponse {
  accessToken: string;
  isAuthenticated: Promise<boolean> | boolean;
  signOut: () => void;
  user: MeAPIResponse;
}

export const useAuthentication = (): UseAuthenticationResponse => {
  const contextValue: AuthContext = useContext(AsgardeoContext);

  const {user, isAuthenticated, accessToken} = contextValue;

  const signOut: () => void = () => {
    signOutApi();
  };

  return {accessToken, isAuthenticated, signOut, user};
};
