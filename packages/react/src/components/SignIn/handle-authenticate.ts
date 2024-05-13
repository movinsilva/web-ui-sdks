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

import {
  AsgardeoUIException,
  AuthApiResponse,
  AuthClient,
  FlowStatus,
  Metadata,
  UIAuthClient,
  UIAuthConfig,
  authenticate,
} from '@asgardeo/js-ui-core';
import AuthContext from '../../models/auth-context';

/**
 * Handles the generalized authentication process.
 * @param {any} authParams - The authentication parameters.
 */

interface HandleAuthenticateProps {
  authContext: AuthContext | undefined;
  authParams?: any;
  authResponse: AuthApiResponse;
  authenticatorId: string;
  config: UIAuthConfig;
  setAlert: (value: string) => void;
  setAuthResponse: (value: AuthApiResponse) => void;
  setIsLoading: (value: boolean) => void;
  setShowSelfSignUp: (value: boolean) => void;
}

const handleAuthenticate = async (props: HandleAuthenticateProps): Promise<void> => {
  const {
    authenticatorId,
    authParams,
    authResponse,
    setIsLoading,
    config,
    setAuthResponse,
    authContext,
    setAlert,
    setShowSelfSignUp,
  } = props;

  if (authResponse === undefined) {
    throw new AsgardeoUIException('REACT_UI-SIGN_IN-HA-IV02', 'Auth response is undefined.');
  }

  setIsLoading(true);

  const resp: AuthApiResponse = await authenticate({
    flowId: authResponse.flowId,
    selectedAuthenticator: {
      authenticatorId,
      params: authParams,
    },
  });
  console.log('Authenticate response:', resp);

  if (!authParams) {
    const metaData: Metadata = resp.nextStep.authenticators[0].metadata;
    if (metaData.promptType === 'REDIRECTION_PROMPT') {
      window.open(
        metaData.additionalData?.redirectUrl,
        resp.nextStep.authenticators[0].authenticator,
        'width=500,height=600',
      );

      /**
       * Add an event listener to the window to capture the message from the popup
       */
      window.addEventListener('message', function messageEventHandler(event: MessageEvent) {
        /**
         * Check the origin of the message to ensure it's from the popup window
         */
        if (event.origin !== config.signInRedirectURL) return;

        const {code, state} = event.data;

        if (code && state) {
          handleAuthenticate({
            authContext,
            authParams: {code, state},
            authResponse,
            authenticatorId: resp.nextStep.authenticators[0].authenticatorId,
            config,
            setAlert,
            setAuthResponse,
            setIsLoading,
            setShowSelfSignUp,
          });
        }

        /**
         * Remove the event listener
         */
        window.removeEventListener('message', messageEventHandler);
      });
    } else if (metaData.promptType === 'USER_PROMPT') {
      setAuthResponse(resp);
    }
  }
  // when the authentication is successful, generate the token
  else if (resp.flowStatus === FlowStatus.SuccessCompleted && resp.authData) {
    console.log('successful authentication');
    setAuthResponse(resp);

    const authInstance: UIAuthClient = AuthClient.getInstance();
    const state: string = (await authInstance.getDataLayer().getTemporaryDataParameter('state')).toString();

    await authInstance.requestAccessToken(resp.authData.code, resp.authData.session_state, state);

    authContext.setAuthentication();
  } else if (resp.flowStatus === FlowStatus.FailIncomplete) {
    setAuthResponse({
      ...resp,
      nextStep: authResponse.nextStep,
    });

    // TODO: Move this to core: and take from i18n
    setAlert('Retry');
  } else {
    setAuthResponse(resp);
    setShowSelfSignUp(false);
  }

  setIsLoading(false);
};

export default handleAuthenticate;
