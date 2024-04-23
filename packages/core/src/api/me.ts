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

import {AuthClient} from '../auth-client';
import AsgardeoUIException from '../exception';
import {MeAPIResponse} from '../models/me-api-response';

const me = async (): Promise<MeAPIResponse> => {
  let baseUrl: string;
  let accessToken: string;
  try {
    baseUrl = (await AuthClient.getInstance().getDataLayer().getConfigData()).baseUrl;
    accessToken = await AuthClient.getInstance().getAccessToken();
  } catch (error) {
    throw new AsgardeoUIException('JS_UI_CORE-ME-M-NF', 'Failed in getting the base URL and access token', error.stack);
  }

  if (!accessToken) {
    throw new AsgardeoUIException('JS_UI_CORE-ME-M-IV', 'Access token is null');
  }

  const headers: Headers = new Headers();
  headers.append('Authorization', `Bearer ${accessToken}`);
  headers.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = {
    headers,
    method: 'GET',
  };
  let response: Response;
  try {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    response = await fetch(new Request(`${baseUrl}/scim2/Me`, requestOptions));
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
  } catch (error) {
    throw new AsgardeoUIException('JS_UI_CORE-ME-M-NE', 'Me API call failed', error);
  }
  if (response.ok) {
    return (await response.json()) as MeAPIResponse;
  }
  throw new AsgardeoUIException('JS_UI_CORE-ME-M-HE', 'Me response is not OK');
};

export default me;
