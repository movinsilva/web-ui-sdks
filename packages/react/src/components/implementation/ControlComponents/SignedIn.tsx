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

import {FC, PropsWithChildren} from 'react';
import {useAuthentication} from '../AsgardeoProvider/asgardeo-context';

interface SignedPropsInterface {
  fallback?: JSX.Element;
}

const SignedIn: FC<PropsWithChildren<SignedPropsInterface>> = (props: PropsWithChildren<SignedPropsInterface>) => {
  const {fallback, children} = props;
  const {isAuthenticated} = useAuthentication();

  if (isAuthenticated) {
    return <div>{children}</div>;
  }
  return fallback ?? null;
};

export default SignedIn;
