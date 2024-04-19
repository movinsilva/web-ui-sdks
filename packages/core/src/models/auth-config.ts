/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import {AsgardeoAuthClient, AuthClientConfig} from '@asgardeo/auth-js';

interface AuthClientConfigExtension {
  /* If enabled, the branding from the console will be used. Default value is true */
  enableConsoleBranding?: boolean;
  /* If enabled, the text branding from the console will be used for the text. Default value is true */
  enableConsoleTextBranding?: boolean;
  /* Language code of the locale. */
  locale?: string;
  name?: string;
  type?: string;
}

export type UIAuthConfig<T = {}> = AuthClientConfig<AuthClientConfigExtension & T>;

export type UIAuthClient<T = {}> = AsgardeoAuthClient<AuthClientConfigExtension & T>;
