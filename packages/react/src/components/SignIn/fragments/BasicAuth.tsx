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

import {Customization, ScreenType, keys} from '@asgardeo/js-ui-core';
import {CircularProgress} from '@oxygen-ui/react';
import {ReactElement, useEffect, useState} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import LoginOptionsBox from './LoginOptionsBox';
import {i18nAddResources} from '../../../customization/i18n';
import {useBrandingPreference} from '../../BrandingPreferenceProvider/branding-preference-context';
import UISignIn from '../../ui-components/UISignIn';

interface BasicAuthProps {
  authenticatorId: string;
  customization?: Customization;
  handleAuthenticate: Function;
  isRetry?: boolean;
  renderLoginOptions?: ReactElement[];
  showSelfSignUp: boolean;
}

const BasicAuth = ({
  handleAuthenticate,
  authenticatorId,
  isRetry,
  customization,
  showSelfSignUp,
  renderLoginOptions,
}: BasicAuthProps): JSX.Element => {
  const [isTextLoading, setIsTextLoading] = useState<boolean>(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const brandingProps: Customization = useBrandingPreference();

  const {t} = useTranslation();

  useEffect(() => {
    i18nAddResources({
      brandingProps,
      componentProps: customization,
      screen: ScreenType.Login,
    }).then(() => {
      setIsTextLoading(false);
    });
  }, [brandingProps, customization]);

  if (isTextLoading) {
    return (
      <div className="circular-progress-holder">
        <CircularProgress className="circular-progress" />
      </div>
    );
  }
  return (
    <UISignIn.Root>
      <UISignIn.Title>
        <Trans i18nKey={keys.login.login.heading} />
      </UISignIn.Title>

      {isRetry && (
        <UISignIn.RetryText>Login failed! Please check your username and password and try again.</UISignIn.RetryText>
      )}

      <UISignIn.InputField
        fullWidth
        autoComplete="off"
        label={t(keys.login.username)}
        name="text"
        value={username}
        placeholder={t(keys.login.enter.your.username)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
      />

      <UISignIn.InputField
        fullWidth
        name="password"
        autoComplete="new-password"
        label={t(keys.login.password)}
        type="password"
        value={password}
        placeholder={t(keys.login.enter.your.password)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />

      <UISignIn.RememberMe />

      <UISignIn.Button
        color="primary"
        variant="contained"
        type="submit"
        fullWidth
        onClick={() => {
          handleAuthenticate({password, username}, authenticatorId);
          setUsername('');
          setPassword('');
        }}
      >
        {t(keys.login.button)}
      </UISignIn.Button>

      <UISignIn.OptionDivider> OR</UISignIn.OptionDivider>

      {renderLoginOptions}

      {showSelfSignUp && <UISignIn.Register signUpUrl="/register" />}
    </UISignIn.Root>
  );
};

export default BasicAuth;
