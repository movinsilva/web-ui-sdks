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

import facebook from '../../../../assets/social-logins/facebook.svg';
import github from '../../../../assets/social-logins/github.svg';
import google from '../../../../assets/social-logins/google.svg';
import microsoft from '../../../../assets/social-logins/microsoft.svg';
import emailSolid from '../../../../assets/email-solid.svg';
import SignInButton from '../../../oxygen-auth-components/SignInButton/SignInButton';


const images: {[key: string]: string} = {
  Facebook: facebook,
  Github: github,
  Google: google,
  Microsoft: microsoft,
  "Email OTP": emailSolid,
};

const LoginOptionsBox = ({socialName, idp, handleOnClick}): JSX.Element => (
  

  <SignInButton
  social 
  startIcon={
      <img 
          className="social-login-img" 
          src={images[socialName]} alt={socialName} 
      />
  }
  onClick={handleOnClick}
>
Sign In with {idp}
  </SignInButton>

  
);

export default LoginOptionsBox;
