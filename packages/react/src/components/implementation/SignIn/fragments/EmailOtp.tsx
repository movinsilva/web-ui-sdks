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

import {Authenticator, Customization, ScreenType} from '@asgardeo/js-ui-core';
import {CircularProgress} from '@oxygen-ui/react';
import i18next from 'i18next';
import {ReactElement, useEffect, useState} from 'react';
import {i18nAddResources} from '../../../../customization/i18n';
import UISignIn from '../../../ui-auth-components/UISignIn';
import {useBrandingPreference} from '../../BrandingPreferenceProvider/branding-preference-context';

interface EmailOtpProps {
  authenticator?: Authenticator;
  customization?: Customization;
}

const EmailOtp = ({customization, authenticator}: EmailOtpProps): ReactElement => {
  const brandingProps: Customization = useBrandingPreference();
  const [otp, setOtp] = useState<string>();
  const [isTextLoading, setIsTextLoading] = useState<boolean>();

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

  if (isTextLoading) {
    return (
      <div className="circular-progress-holder">
        <CircularProgress className="circular-progress" />
      </div>
    );
  }

  return (
    <UISignIn.Root>
      <UISignIn.Typography title>OTP Verfication</UISignIn.Typography>

      <UISignIn.InputField
        fullWidth
        autoComplete="off"
        label="Enter the code sent to your email ID"
        name="text"
        value={otp}
        type="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
      />

      <UISignIn.Button fullWidth variant="contained" type="submit" onClick={() => console.log('Verify OTP')}>
        Continue
      </UISignIn.Button>
      <UISignIn.Button
        className="email-otp-resend"
        fullWidth
        onClick={() => console.log('Resend OTP')}
        color="primary"
        variant="contained"
      >
        Resend Code
      </UISignIn.Button>
    </UISignIn.Root>
  );
};

export default EmailOtp;
