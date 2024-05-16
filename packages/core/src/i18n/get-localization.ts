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

import {AuthClientConfig} from '@asgardeo/auth-js';
import merge from 'lodash.merge';
import {TextObject} from './screens/model';
import getBrandingPreferenceText from '../api/get-branding-preference-text';
import {AuthClient} from '../auth-client';
import {UIAuthConfig} from '../models/auth-config';
import {BrandingPreferenceTypes} from '../models/branding-api-response';
import {BrandingPreferenceTextAPIResponse} from '../models/branding-text-api-response';
import GetLocalizationProps from '../models/get-localization-props';

/**
 * Fetch and merge branding properties.
 *
 * @param {BrandingProps} props - Branding properties.
 * @returns {Promise<Customization>} A promise that resolves with the merged branding properties.
 */
const getLocalization = async (props: GetLocalizationProps): Promise<TextObject> => {
  const {componentTextOverrides, locale, providerTextOverrides, screen} = props;

  const module: TextObject = await import(`./screens/${screen}/${locale}.ts`);

  let textFromConsoleBranding: BrandingPreferenceTextAPIResponse;

  const configData: AuthClientConfig<UIAuthConfig> = await AuthClient.getInstance().getDataLayer().getConfigData();

  const DEFAULT_NAME: string = 'carbon.super';

  try {
    if (configData.enableConsoleTextBranding ?? true) {
      textFromConsoleBranding = await getBrandingPreferenceText({
        locale,
        name: configData.name ?? DEFAULT_NAME,
        screen,
        type: configData.type ?? BrandingPreferenceTypes.Org,
      });
    }
  } catch (error) {
    /**
     * If the branding from the console cannot be fetched, proceed with the default branding.
     */
  }

  /**
   * Merge text objects according to the priority
   */
  const mergedText: TextObject = await merge(
    /**
     * PRIORITY 04: Default stored branding text
     */
    module[screen] ?? {},
    /**
     * PRIORITY 03: Text from console branding
     */
    textFromConsoleBranding?.preference?.text ?? {},
    /**
     * PRIORITY 02: Text from provider customization
     */
    providerTextOverrides?.[locale]?.[screen] ?? {},
    /**
     * PRIORITY 01: Text from component customization
     */
    componentTextOverrides?.[locale]?.[screen] ?? {},
  );

  return mergedText;
};

export default getLocalization;
