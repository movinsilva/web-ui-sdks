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

import {Branding, BrandingProps, ScreenType, TextObject, getLocalization} from '@asgardeo/js-ui-core';
import {CircularProgress} from '@oxygen-ui/react';
import {useState, useEffect, ReactElement} from 'react';
import {useBrandingPreference} from '../../../hooks/use-branding-preference';
import {SignIn as UISignIn} from '../../../oxygen-ui-react-auth-components';

interface TotpProps {
  authenticatorId: string;
  brandingProps?: BrandingProps;
  handleAuthenticate: Function;
}

const Totp = ({brandingProps, authenticatorId, handleAuthenticate}: TotpProps): ReactElement => {
  const branding: Branding = useBrandingPreference();
  console.log('totp rendering');

  const [isTextLoading, setIsTextLoading] = useState<boolean>(true);
  const [text, setText] = useState<TextObject>();
  const [totp, setTotp] = useState<string>(); // Initialize a state variable for the TOTP

  useEffect(() => {
    getLocalization({
      componentCustomization: brandingProps,
      providerCustomization: branding,
      screen: ScreenType.TOTP,
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
      <UISignIn.Typography title>{text['totp.heading']}</UISignIn.Typography>

      <UISignIn.Typography subtitle>{text['enter.verification.code.got.by.device']}</UISignIn.Typography>

      <UISignIn.PinInput length={6} onPinChange={setTotp} />

      <UISignIn.Button
        color="primary"
        variant="contained"
        className="oxygen-sign-in-cta"
        type="submit"
        fullWidth
        onClick={() => handleAuthenticate(authenticatorId, {token: totp})}
      >
        totp.continue
      </UISignIn.Button>
      <UISignIn.Typography subtitle>
        totp.enroll.message1
        <br />
        totp.enroll.message2
      </UISignIn.Typography>
      <UISignIn.Link href="./somewhere">totp.enroll.message2</UISignIn.Link>
    </UISignIn.Paper>
  );
};

export default Totp;
