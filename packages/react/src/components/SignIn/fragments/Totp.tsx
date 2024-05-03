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
import i18next from 'i18next';
import {useState, useEffect} from 'react';
import {Trans} from 'react-i18next';
import {i18nAddResources} from '../../../customization/i18n';
import {useBrandingPreference} from '../../BrandingPreferenceProvider/branding-preference-context';
import UISignIn from '../../ui-components/UISignIn';

interface TotpProps {
  authenticatorId: string;
  customization?: Customization;
  handleAuthenticate: Function;
}

const Totp = ({customization, authenticatorId, handleAuthenticate}: TotpProps): FC => {
  const brandingProps: Customization = useBrandingPreference();
  console.log('totp rendering');

  const [isTextLoading, setIsTextLoading] = useState<boolean>();
  const [totp, setTotp] = useState<string>(); // Initialize a state variable for the TOTP

  useEffect(() => {
    console.log('totp from outside: ', totp);
  }, [totp]);

  useEffect(() => {
    i18nAddResources({
      brandingProps,
      componentProps: customization,
      screen: ScreenType.TOTP,
    }).then(() => {
      console.log('i18next.getResource: ', i18next.getResource('en', 'ns', 'totp.totp.heading'));
      setIsTextLoading(false);
    });
  }, [brandingProps, customization]);

  return (
    <UISignIn.Root>
      <UISignIn.Title>
        <Trans i18nKey={keys.totp.heading} />
      </UISignIn.Title>

      <UISignIn.Title subtitle>
        <Trans i18nKey={keys.totp.enter.verification.code.got.by.device} />
      </UISignIn.Title>

      <UISignIn.PINInput length={6} onPinChange={setTotp} />

      <UISignIn.Button
        color="primary"
        variant="contained"
        className="oxygen-sign-in-cta"
        type="submit"
        fullWidth
        onClick={() => handleAuthenticate({totp}, authenticatorId)}
      >
        <Trans i18nKey={keys.totp.continue} />
      </UISignIn.Button>
      <UISignIn.Title subtitle>
        <Trans i18nKey={keys.totp.enroll.message1} />
        <br />
        <Trans i18nKey={keys.totp.enroll.message2} />
      </UISignIn.Title>
    </UISignIn.Root>
  );
};

export default Totp;
