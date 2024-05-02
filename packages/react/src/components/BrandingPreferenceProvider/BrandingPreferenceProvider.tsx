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

import {BrandingPreferenceThemeInterface, Customization, getBranding} from '@asgardeo/js-ui-core';
import {ThemeProvider} from '@oxygen-ui/react';
import {FC, PropsWithChildren, useEffect, useMemo, useState} from 'react';
import {BrandingPreferenceContext} from './branding-preference-context';
import {i18nInitialize} from '../../customization/i18n';
import generateTheme from '../../customization/theme';
import getThemeSkeleton from '../../customization/theme-skeleton';

interface BrandingPreferenceProviderProps {
  customization?: Customization;
}

const BrandingPreferenceProvider: FC<PropsWithChildren<BrandingPreferenceProviderProps>> = ({
  children,
  customization,
}: PropsWithChildren<BrandingPreferenceProviderProps>) => {
  const [brandingPreference, setBrandingPreference] = useState<Customization>(undefined);

  useEffect(() => {
    getBranding({customization}).then((response: Customization) => {
      setBrandingPreference(response);
      i18nInitialize(response.locale);
    });
  }, [customization]);

  const theme: string | undefined = useMemo(() => {
    if (brandingPreference?.preference?.theme) {
      // TODO: Fix the type of the theme
      return getThemeSkeleton(brandingPreference?.preference?.theme as BrandingPreferenceThemeInterface);
    }
    return undefined;
  }, [brandingPreference?.preference?.theme]);

  const injectBrandingCSSSkeleton: any = (): React.ReactNode => {
    if (!brandingPreference?.preference?.theme) {
      return null;
    }

    return <style type="text/css">{theme}</style>;
  };

  return (
    <BrandingPreferenceContext.Provider value={brandingPreference}>
      {console.log('brandingPreference: ', brandingPreference, '\ntheme: ', theme)}
      {injectBrandingCSSSkeleton()}
      <ThemeProvider theme={generateTheme({customization: brandingPreference})}>{children}</ThemeProvider>
    </BrandingPreferenceContext.Provider>
  );
};

export default BrandingPreferenceProvider;
