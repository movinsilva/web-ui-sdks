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
import {CircularProgress, ThemeProvider} from '@oxygen-ui/react';
import {FC, ReactElement, useContext, useEffect, useState} from 'react';
import BasicAuth from './fragments/BasicAuth';
import LoginOptionsBox from './fragments/LoginOptionsBox';
import Totp from './fragments/Totp';
import {default as handleAuthenticateFunction} from './handle-authenticate';
import AsgardeoContext from '../../contexts/asgardeo-context';
import {useAuthentication} from '../../hooks/use-authentication';
import {useBrandingPreference} from '../../hooks/use-branding-preference';
import {useConfig} from '../../hooks/use-config';
import AuthContext from '../../models/auth-context';
import SignInProps from '../../models/sign-in-props';
import {SignIn as UISignIn} from '../../oxygen-ui-react-auth-components';
import SPACryptoUtils from '../../utils/crypto-utils';
import generateThemeSignIn from '../../theme/generate-theme-sign-in';

const SignIn: FC<SignInProps> = (props: SignInProps) => {
  const {branding} = props;
  const [authResponse, setAuthResponse] = useState<AuthApiResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [Alert, setAlert] = useState<string>();
  const [showSelfSignUp, setShowSelfSignUp] = useState(true);

  const {isAuthenticated} = useAuthentication();

  const authContext: AuthContext | undefined = useContext(AsgardeoContext);

  const {config} = useConfig();

  const brandingPreference: Branding = useBrandingPreference();

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
  const handleAuthenticate = async (authenticatorId: string, authParams?: any): Promise<void> => {
    handleAuthenticateFunction({
      authContext,
      authParams,
      authResponse,
      authenticatorId,
      config,
      setAlert,
      setAuthResponse,
      setIsLoading,
      setShowSelfSignUp,
    });
  };

  const renderLoginOptions = (authenticators: Authenticator[]): ReactElement[] => {
    const LoginOptions: ReactElement[] = [];

    authenticators.forEach((authenticator: Authenticator) => {
      LoginOptions.push(
        <LoginOptionsBox
          socialName={authenticator.authenticator}
          idp={authenticator.idp}
          handleOnClick={() => handleAuthenticate(authenticator.authenticatorId)}
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

    if (authResponse?.flowStatus !== FlowStatus.SuccessCompleted && !isAuthenticated) {
      return SignInCore;
    }

    if (authResponse?.flowStatus === FlowStatus.SuccessCompleted || isAuthenticated) {
      return <div style={{backgroundColor: 'white', padding: '1rem'}}>Successfully Authenticated</div>;
    }

    return <div>??????????????????????????????????</div>;
  };

  const renderSignInComponent = () => {
    const imgUrl: string = brandingPreference?.preference?.theme?.LIGHT?.images?.logo?.imgURL;
    return (
      <ThemeProvider theme={generateThemeSignIn({branding: brandingPreference})}>
        <UISignIn>
          <UISignIn.Image src={imgUrl} />
          {authResponse?.flowStatus !== FlowStatus.SuccessCompleted && !isAuthenticated && renderSignIn()}
          {(authResponse?.flowStatus === FlowStatus.SuccessCompleted || isAuthenticated) && (
            <div style={{backgroundColor: 'white', padding: '1rem'}}>Successfully Authenticated</div>
          )}
          <UISignIn.Footer />
        </UISignIn>
      </ThemeProvider>
    );
  };

  if (isLoading) {
    return (
      <div className="circular-progress-holder">
        <CircularProgress className="circular-progress" />
      </div>
    );
  }
  if (Alert) {
    return (
      <div>
        <h1>Alert</h1>
        <p>{Alert}</p>
      </div>
    );
  }

  return <>{renderSignInComponent()}</>;
};

export default SignIn;
