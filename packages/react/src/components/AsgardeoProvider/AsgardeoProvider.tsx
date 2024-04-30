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

import {AuthClient, CryptoUtils, MeAPIResponse, Store, UIAuthClient, UIAuthConfig, me} from '@asgardeo/js-ui-core';
import {FC, PropsWithChildren, useCallback, useEffect, useMemo, useState} from 'react';
import SPACryptoUtils from 'src/utils/crypto-utils';
import SessionStore from 'src/utils/session-store';
import {AsgardeoContext, AuthContext} from './asgardeo-context';

interface AsgardeProviderProps {
  config: UIAuthConfig;
  store: Store;
}

const AsgardeoProvider: FC<PropsWithChildren<AsgardeProviderProps>> = (
  props: PropsWithChildren<AsgardeProviderProps>,
) => {
  const {children, config, store} = props;

  const [accessToken, setAccessToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [user, setUser] = useState<MeAPIResponse>();

  const storeInstance: Store = store || new SessionStore();

  const spaUtils: CryptoUtils = new SPACryptoUtils();

  const authClient: UIAuthClient = AuthClient.getInstance(config, storeInstance, spaUtils);

  /**
   * Sets the authentication status and access token.
   */
  const setAuthentication: () => void = useCallback((): void => {
    authClient.isAuthenticated().then((isAuth: boolean) => {
      // Update the state only if the value has changed
      if (isAuth !== isAuthenticated) {
        setIsAuthenticated(isAuth);
      }
    });

    authClient.getAccessToken().then((accessTokenFromClient: any) => {
      if (accessTokenFromClient) {
        setAccessToken(accessTokenFromClient);

        me().then((response: MeAPIResponse) => {
          setUser(response);
        });
      }
    });
  }, [authClient, isAuthenticated]);

  useEffect(() => {
    setAuthentication();

    // This script is added so that the popup window can send the code and state to the parent window
    const url: URL = new URL(window.location.href);
    if (url.searchParams.has('code') && url.searchParams.has('state')) {
      const code: string | null = url.searchParams.get('code');
      const state: string | null = url.searchParams.get('state');

      // Send the 'code' and 'state' to the parent window and close the current window (popup)
      window.opener.postMessage({code, state}, config.signInRedirectURL);
      window.close();
    }
  }, [config.signInRedirectURL, setAuthentication]);

  const value: AuthContext = useMemo(
    () => ({
      accessToken,
      config,
      isAuthenticated,
      setAuthentication,
      user,
    }),
    [accessToken, config, isAuthenticated, setAuthentication, user],
  );

  return <AsgardeoContext.Provider value={value}>{children}</AsgardeoContext.Provider>;
};

export default AsgardeoProvider;
