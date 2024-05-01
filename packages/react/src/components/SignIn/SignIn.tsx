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

import {Button, SignIn as OSI} from '@oxygen-ui/react';
import UISignIn from '../ui-components/UISignIn';

const SignIn: FC = props => {
  const {customization} = props;

  return (
    <>
      <UISignIn>
        <UISignIn.Root>
          <UISignIn.Title>Sign In</UISignIn.Title>
          {/* <UISignIn.Title subtitle>Sign in to your account</UISignIn.Title> */}
          <UISignIn.InputField fullWidth placeholder="Username" label="Username" />
          <UISignIn.InputField placeholder="Enter your password" label="Password" type="password" />
          <UISignIn.RememberMe />
          <UISignIn.Button color="primary" variant="contained" type="submit" fullWidth>
            Sign In
          </UISignIn.Button>
          <UISignIn.OptionDivider> OR</UISignIn.OptionDivider>
          <UISignIn.Button social fullWidth type="button" variant="contained">
            Sign In With Google
          </UISignIn.Button>
          <UISignIn.Register signUpUrl="/register" />
        </UISignIn.Root>
      </UISignIn>
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
