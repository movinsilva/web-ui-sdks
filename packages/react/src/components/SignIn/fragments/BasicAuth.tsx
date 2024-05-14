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

import {BrandingProps, ScreenType, keys} from '@asgardeo/js-ui-core';
import {CircularProgress, Grid} from '@oxygen-ui/react';
import {ReactElement, useEffect, useState} from 'react';
import {useTranslations} from '../../../hooks/use-translations';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {t, isLoading} = useTranslations(ScreenType.Login, brandingProps?.locale, brandingProps?.preference?.text);

  useEffect(() => {
    console.log('is text loading', isLoading);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="circular-progress-holder">
        <CircularProgress className="circular-progress" />
      </div>
    );
  }

  return (
    <UISignIn.Paper>
      <UISignIn.Typography title>{t(keys.login.login.heading)}</UISignIn.Typography>

      {isAlert && <UISignIn.Alert>{isAlert}</UISignIn.Alert>}

      <UISignIn.TextField
        fullWidth
        autoComplete="off"
        label={t(keys.login.username)}
        name="text"
        value={username}
        placeholder={t(keys.login.enter.your.username)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
      />

      <UISignIn.TextField
        fullWidth
        name="password"
        autoComplete="new-password"
        label={t(keys.login.password)}
        type="password"
        value={password}
        placeholder={t(keys.login.enter.your.password)}
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
        {t(keys.login.button)}
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
