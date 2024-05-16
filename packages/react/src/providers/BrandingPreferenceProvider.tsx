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

import {Branding, getBranding} from '@asgardeo/js-ui-core';
import {CircularProgress, ThemeProvider} from '@oxygen-ui/react';
import {FC, PropsWithChildren, useEffect, useState} from 'react';
import BrandingPreferenceContext from '../contexts/branding-preference-context';
import BrandingPreferenceProviderProps from '../models/branding-preference-provider-props';
import generateTheme from '../theme/generate-theme';

/**
 * `BrandingPreferenceProvider` is a component that provides a branding context to all its children.
 * It takes an object of type `BrandingPreferenceProviderProps` as props, which includes the children to render,
 * and a branding object.
 *
 * @param {PropsWithChildren<BrandingPreferenceProviderProps>} props - The properties passed to the component.
 * @param {ReactNode} props.children - The children to render inside the provider.
 * @param {Branding} props.branding - The branding object for the context.
 *
 * @returns {ReactElement} A React element that provides the branding context to all its children.
 */
const BrandingPreferenceProvider: FC<PropsWithChildren<BrandingPreferenceProviderProps>> = (
  props: PropsWithChildren<BrandingPreferenceProviderProps>,
) => {
  const {children, branding} = props;

  const [brandingPreference, setBrandingPreference] = useState<Branding>();

  useEffect(() => {
    getBranding({branding}).then((response: Branding) => {
      setBrandingPreference(response);
    });
  }, [branding]);

  if (brandingPreference === undefined) {
    return (
      <div className="circular-progress-holder">
        <CircularProgress className="circular-progress" />
      </div>
    );
  }

  return (
    <BrandingPreferenceContext.Provider value={brandingPreference}>
      <ThemeProvider theme={generateTheme(brandingPreference?.preference.theme)}>{children}</ThemeProvider>
    </BrandingPreferenceContext.Provider>
  );
};

export default BrandingPreferenceProvider;
