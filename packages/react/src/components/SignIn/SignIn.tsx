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

import {AsgardeoUIException, AuthApiResponse, AuthClient, Authenticator, Customization, FlowStatus, ScreenType, UIAuthClient, authenticate, authorize} from '@asgardeo/js-ui-core';
import {Button, CircularProgress, SignIn as OSI} from '@oxygen-ui/react';
import {FC, ReactElement, useContext, useEffect, useState} from 'react';
import UISignIn from '../ui-components/UISignIn';
import './sign-in.scss';
import { i18nAddResources } from '../../customization/i18n';
import SPACryptoUtils from '../../utils/crypto-utils';
import { ConnectionManagementConstants } from '../../constants/connection-constants';
import BasicAuth from './fragments/BasicAuth';
import { AsgardeoContext, AuthContext } from '../AsgardeoProvider/asgardeo-context';
import LoginOptionsBox from './fragments/LoginOptionsBox';

interface SignInProps {
  customization: Customization;
}

const SignIn: FC = ({customization}: SignInProps) => {
  const [authResponse, setAuthResponse] = useState<AuthApiResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [isRetry, setIsRetry] = useState(false);
  const [showSelfSignUp, setShowSelfSignUp] = useState(true);

  const authContext: AuthContext | undefined = useContext(AsgardeoContext);

  useEffect(() => {
    authorize()
      .then((response: AuthApiResponse) => {
        console.log('Authorization called with result:', response);
        setAuthResponse(response);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Authorization failed');
        setIsLoading(false);
        throw new AsgardeoUIException('Authorization failed', error);
      });

    /* Loading text resources */
    i18nAddResources({
      brandingProps: customization,
      screen: ScreenType.Common
    });
  }, []);


 /**
   * Handles the generalized authentication process.
   * @param {any} authParams - The authentication parameters.
   */
 const handleAuthenticate = async (authParams: any, authenticatorId: string): Promise<void> => {
  if (authResponse === undefined) {
    throw new AsgardeoUIException('REACT_UI-SIGNIN-HA', 'Auth response is undefined.');
  }
  setIsLoading(true);
  const resp: AuthApiResponse = await authenticate({
    selectedAuthenticator: {
      authenticatorId: authenticatorId,
      params: authParams,
    },
    flowId: authResponse.flowId,
  });
  console.log('Authenticate response:', resp);

  // when the authentication is successful, generate the token
  if (resp.flowStatus === FlowStatus.SuccessCompleted && resp.authData) {
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
    setIsRetry(true);
  } else {
    setAuthResponse(resp);
    setShowSelfSignUp(false);
  }
  setIsLoading(false);
};


const renderLoginOptions = (authenticators: Authenticator[]): ReactElement[] => {

  const LoginOptions: ReactElement[] = [];
    {authenticators.forEach((authenticator: Authenticator) => {
        LoginOptions.push(<LoginOptionsBox socialName={authenticator.authenticator}/>)
    })}

    return LoginOptions;
  
}

  interface RenderSignInProps {
    authResponse: AuthApiResponse;
  }
  const renderSignIn = ({authResponse}: RenderSignInProps) => {
    const authenticators = authResponse.nextStep.authenticators;
    let SignInCore: JSX.Element = <div />;

    if (authenticators) {
      let usernamePassword: boolean = false;
      let isMultipleAuthenticators: boolean = false;
      let usernamePasswordID: string = '';

      if (authenticators.length > 1) {
        isMultipleAuthenticators = true;
      }

      authenticators.forEach((authenticator: Authenticator) => {
        if (authenticator.authenticatorId.includes(ConnectionManagementConstants.BASIC_AUTHENTICATOR_ID)) {

          usernamePassword = true;
          usernamePasswordID = authenticator.authenticatorId;
          SignInCore = 
              <BasicAuth 
                  customization={customization}
                  authenticatorId={authenticator.authenticatorId} 
                  handleAuthenticate={handleAuthenticate} 
                  showSelfSignUp={showSelfSignUp}
                  isRetry={isRetry}
                  renderLoginOptions={renderLoginOptions(authenticators.filter((auth) => auth.authenticatorId !== usernamePasswordID))}
              />
        }
      });
    }

    const cryptoUtils = new SPACryptoUtils();
    const decodedAuthenticator = cryptoUtils.base64URLDecode(authResponse.nextStep.authenticators[0].authenticatorId);
    console.log('decodedAuthenticator: ', decodedAuthenticator)

    return (
    <UISignIn>
      {SignInCore}
    </UISignIn>)
  }

  return (
    <>
      {isLoading ? (
        <div className="circular-progress-holder">
          <CircularProgress className="circular-progress" />
        </div>
      ) : error ? (
        // TODO: Style this
        <div>
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      ) : renderSignIn({authResponse})}
      <OSI
        sx={{marginTop: '5rem'}}
        signInOptions={
          <Button className="oxygen-sign-in-option-social google" fullWidth type="button" variant="contained">
            Sign In With Google
          </Button>
        }
      />
    </>
  );
};

export default SignIn;
