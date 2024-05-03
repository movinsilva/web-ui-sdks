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

import merge from 'lodash.merge';
import {TextObject} from './screens/model';
import getBrandingPreferenceText from '../api/branding-preference-text';
import {AuthClient} from '../auth-client';
import {BrandingPreferenceTextAPIResponse} from '../models/branding-text-api-response';
import {Customization} from '../models/customization';
import {ScreenType} from '../models/screen-type';
import { BrandingPreferenceTypes } from 'src/models/branding-api-response';

/**
 * Interface for getLocalization function props.
 */
export interface GetLocalization {
  /**
   * Customiztion prop passed to the component
   */
  componentCustomization?: Customization;
  /**
   * Locale to filter the retrieval of localization.
   */
  locale: string;
  /**
   * Customization prop passed to the provider
   */
  providerCustomization?: Customization;
  /**
   * Screen to filter the retrieval of localization.
   */
  screen: ScreenType;
}

/**
 * Fetch and merge branding properties.
 *
 * @param {BrandingProps} props - Branding properties.
 * @returns {Promise<Customization>} A promise that resolves with the merged branding properties.
 */
const getLocalization = async (props: GetLocalization): Promise<TextObject> => {
  const {componentCustomization, locale, providerCustomization, screen} = props;

  const module: TextObject = await import(`./screens/${screen}/${locale}.ts`);

  let textFromConsoleBranding: BrandingPreferenceTextAPIResponse;

 try {
  if ((await AuthClient.getInstance().getDataLayer().getConfigData()).enableConsoleTextBranding ?? true) {
    textFromConsoleBranding = await getBrandingPreferenceText(
      locale,
      providerCustomization?.name ?? "carbon.super",
      screen,
      providerCustomization?.type ?? BrandingPreferenceTypes.Org,
    );
  }
} catch (error) {
  console.log('Error while fetching text from console branding.', error);
}

  /**
   * Merge text objects according to the priority
   */
  const mergedText: TextObject = merge(
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
    providerCustomization?.preference?.text?.[locale]?.[screen] ?? {},
    /**
     * PRIORITY 01: Text from component customization
     */
    componentCustomization?.preference?.text?.[locale]?.[screen] ?? {},
  );

  return mergedText;
};

export default getLocalization;
