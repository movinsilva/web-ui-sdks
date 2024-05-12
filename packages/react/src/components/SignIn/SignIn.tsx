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
  Authenticator,
  Branding,
  FlowStatus,
  Metadata,
  UIAuthClient,
  authenticate,
  authorize,
} from '@asgardeo/js-ui-core';
import {CircularProgress} from '@oxygen-ui/react';
import {FC, ReactElement, useContext, useEffect, useState} from 'react';
import BasicAuth from './fragments/BasicAuth';
import LoginOptionsBox from './fragments/LoginOptionsBox';
import AsgardeoContext from '../../contexts/asgardeo-context';
import {useAuthentication} from '../../hooks/use-authentication';
import {useBrandingPreference} from '../../hooks/use-branding-preference';
import {useConfig} from '../../hooks/use-config';
import AuthContext from '../../models/auth-context';
import SignInProps from '../../models/sign-in-props';
import {SignIn as UISignIn} from '../../oxygen-ui-react-auth-components';
import SPACryptoUtils from '../../utils/crypto-utils';

const SignIn: FC<SignInProps> = (props: SignInProps) => {
  const {branding} = props;
  const [authResponse, setAuthResponse] = useState<AuthApiResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [Alert, setAlert] = useState<string>();
  const [showSelfSignUp, setShowSelfSignUp] = useState(true);

  const {isAuthenticated} = useAuthentication();

  const authContext: AuthContext | undefined = useContext(AsgardeoContext);

  const {config} = useConfig();

  useEffect(() => {
    authorize()
      .then((response: AuthApiResponse) => {
        console.log('Authorization called with result:', response);
        setAuthResponse(response);
        setIsLoading(false);
      })
      .catch(error => {
        setAlert(error.message);
        setIsLoading(false);
        throw new AsgardeoUIException('REACT_UI-SIGN_IN-SI-SE01', 'Authorization failed', error.stack);
      });

    /* Loading text resources */
    // i18nAddResources({
    //   brandingProps: customization,
    //   screen: ScreenType.Common,
    // });
  }, []);

  /**
   * Handles the generalized authentication process.
   * @param {any} authParams - The authentication parameters.
   */
  const handleAuthenticate = async (authParams: any, authenticatorId: string): Promise<void> => {
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

      // TODO: Move this to core: and take from i18n
      setAlert('Retry');
    } else {
      setAuthResponse(resp);
      setShowSelfSignUp(false);
    }
    setIsLoading(false);
  };

  const getAuthenticationInfo = async (authenticatorId: string): Promise<void> => {
    if (authResponse === undefined) {
      throw new AsgardeoUIException('REACT_UI-SIGN_IN-GAI-IV03', 'Auth response is undefined.');
    }

    setIsLoading(true);

    const resp: AuthApiResponse = await authenticate({
      flowId: authResponse.flowId,
      selectedAuthenticator: {
        authenticatorId,
      },
    });
    console.log('Authenticate response:', resp);

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
          handleAuthenticate({code, state}, resp.nextStep.authenticators[0].authenticatorId);
        }

        /**
         * Remove the event listener
         */
        window.removeEventListener('message', messageEventHandler);
      });
    } else if (metaData.promptType === 'USER_PROMPT') {
      setAuthResponse(resp);
    }
    setIsLoading(false);
  };

  const renderLoginOptions = (authenticators: Authenticator[]): ReactElement[] => {
    const LoginOptions: ReactElement[] = [];

    authenticators.forEach((authenticator: Authenticator) => {
      LoginOptions.push(
        <LoginOptionsBox
          socialName={authenticator.authenticator}
          idp={authenticator.idp}
          handleOnClick={() => getAuthenticationInfo(authenticator.authenticatorId)}
          key={authenticator.authenticatorId}
        />,
      );
    });

    return LoginOptions;
  };

  const renderSignIn = () => {
    const {authenticators} = authResponse.nextStep;
    let SignInCore: JSX.Element = <div />;

    if (authenticators) {
      let usernamePassword: boolean = false;
      let isMultipleAuthenticators: boolean = false;
      let usernamePasswordID: string = '';

      if (authenticators.length > 1) {
        isMultipleAuthenticators = true;
      }

      authenticators.forEach((authenticator: Authenticator) => {
        if (authenticator.authenticator === 'Username & Password') {
          usernamePassword = true;
          usernamePasswordID = authenticator.authenticatorId;
          SignInCore = (
            <BasicAuth
              brandingProp={branding}
              authenticatorId={authenticator.authenticatorId}
              handleAuthenticate={handleAuthenticate}
              showSelfSignUp={showSelfSignUp}
              isAlert={Alert}
              renderLoginOptions={renderLoginOptions(
                authenticators.filter(auth => auth.authenticatorId !== usernamePasswordID),
              )}
            />
          );
        }
      });

      if (authenticators.length === 1) {
        console.log('authenticators: ', authenticators[0].authenticator);
        if (authenticators[0].authenticator === 'TOTP') {
          console.log('TOTP authenticator found');
          SignInCore = (
            <Totp
              customization={branding}
              authenticatorId={authenticators[0].authenticatorId}
              handleAuthenticate={handleAuthenticate}
            />
          );
        } else if (
          new SPACryptoUtils()
            .base64URLDecode(authResponse.nextStep.authenticators[0].authenticatorId)
            .split(':')[0] === 'email-otp-authenticator'
        ) {
          console.log('email otp authenticator found');
          SignInCore = <EmailOtp />;
        }
      }
    }

    const cryptoUtils = new SPACryptoUtils();
    const decodedAuthenticator = cryptoUtils.base64URLDecode(authResponse.nextStep.authenticators[0].authenticatorId);
    console.log(
      'decodedAuthenticator: ',
      new SPACryptoUtils().base64URLDecode(authResponse.nextStep.authenticators[0].authenticatorId).split(':')[0] ===
        'email-otp-authenticator',
    );

    if (authResponse?.flowStatus !== FlowStatus.SuccessCompleted && !isAuthenticated) {
      return SignInCore;
    }

    if (authResponse?.flowStatus === FlowStatus.SuccessCompleted || isAuthenticated) {
      return <div style={{backgroundColor: 'white', padding: '1rem'}}>Successfully Authenticated</div>;
    }

    return <div>??????????????????????????????????</div>;
  };

  const renderSignInComponent = () => {
    const brandingPreference: Branding = useBrandingPreference();
    const imgUrl = brandingPreference?.preference?.theme?.LIGHT?.images?.logo?.imgURL;
    return (
      <UISignIn>
        <UISignIn.Image src={imgUrl} />
        {authResponse?.flowStatus !== FlowStatus.SuccessCompleted && !isAuthenticated && renderSignIn({authResponse})}
        {(authResponse?.flowStatus === FlowStatus.SuccessCompleted || isAuthenticated) && (
          <div style={{backgroundColor: 'white', padding: '1rem'}}>Successfully Authenticated</div>
        )}
      </UISignIn>
    );
  };

  return (
    <>
      <div />
      {isLoading ? (
        <div className="circular-progress-holder">
          <CircularProgress className="circular-progress" />
        </div>
      ) : Alert ? (
        // TODO: Style this
        <div>
          <h1>Alert</h1>
          <p>{Alert}</p>
        </div>
      ) : (
        renderSignInComponent({authResponse})
      )}
    </>
  );
};

export default SignIn;
