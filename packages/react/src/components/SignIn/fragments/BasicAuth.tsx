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

import {Branding, BrandingProps, ScreenType, TextObject, getLocalization, keys} from '@asgardeo/js-ui-core';
import {CircularProgress, Grid} from '@oxygen-ui/react';
import {ReactElement, useEffect, useState} from 'react';
import {useBrandingPreference} from '../../../hooks/use-branding-preference';
import {SignIn as UISignIn} from '../../../oxygen-ui-react-auth-components';

interface BasicAuthProps {
  authenticatorId: string;
  brandingProps?: BrandingProps;
  handleAuthenticate: Function;
  isAlert?: string;
  renderLoginOptions?: ReactElement[];
  showSelfSignUp: boolean;
}

const BasicAuth = ({
  handleAuthenticate,
  authenticatorId,
  isAlert,
  brandingProps,
  showSelfSignUp,
  renderLoginOptions,
}: BasicAuthProps): JSX.Element => {
  const [isTextLoading, setIsTextLoading] = useState<boolean>(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState<TextObject>();
  const branding: Branding = useBrandingPreference();

  useEffect(() => {
    getLocalization({
      componentCustomization: brandingProps,
      locale: brandingProps?.locale ?? branding?.locale ?? 'en-US',
      providerCustomization: branding,
      screen: ScreenType.Login,
    }).then((response: TextObject) => {
      console.log('Localization response:', response);
      setText(response);
      setIsTextLoading(false);
    });
  }, [branding, brandingProps]);

  if (isTextLoading) {
    return (
      <div className="circular-progress-holder">
        <CircularProgress className="circular-progress" />
      </div>
    );
  }
  return (
    <UISignIn.Paper>
      <UISignIn.Typography title>{text['login.heading']}</UISignIn.Typography>

      {isAlert && <UISignIn.Alert>{isAlert}</UISignIn.Alert>}

      <UISignIn.TextField
        fullWidth
        autoComplete="off"
        label={text.username}
        name="text"
        value={username}
        placeholder={text['enter.your.username']}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
      />

      <UISignIn.TextField
        fullWidth
        name="password"
        autoComplete="new-password"
        label={text.password}
        type="password"
        value={password}
        placeholder={text['enter.your.password']}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />

      <UISignIn.Button
        color="primary"
        variant="contained"
        type="submit"
        fullWidth
        onClick={() => {
          handleAuthenticate(authenticatorId, {password, username});
          setUsername('');
          setPassword('');
        }}
      >
        {text['login.button']}
      </UISignIn.Button>

      {showSelfSignUp && (
        <Grid container>
          <UISignIn.Typography>Don&apos;t have an account?</UISignIn.Typography>
          <UISignIn.Link href="./register" className="asgardeo-register-link">
            Register
          </UISignIn.Link>
        </Grid>
      )}

      <UISignIn.Divider> OR</UISignIn.Divider>

      {renderLoginOptions}
    </UISignIn.Paper>
  );
};

export default BasicAuth;
