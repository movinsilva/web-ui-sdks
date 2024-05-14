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

import {BrandingPreferenceTextProps, ScreenType} from '@asgardeo/js-ui-core';
import {useContext, useEffect, useState} from 'react';
import I18nContext from '../contexts/i18n-context';
import {I18n} from '../models/i18n-context';

export const useTranslations = (
  screen: ScreenType,
  componentLocaleOverride?: string,
  componentTextOverrides?: BrandingPreferenceTextProps,
): {
  isLoading: boolean;
  t: (key: string) => string;
} => {
  const contextValue: I18n = useContext(I18nContext);
  const {text, setTranslations} = contextValue;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTranslations(screen, componentLocaleOverride, componentTextOverrides).then((response: boolean) => {
      setIsLoading(!response);
    });
  }, [componentLocaleOverride, componentTextOverrides, screen, setTranslations]);

  const t = (key: string): string => {
    const parts: string[] = key.split('.');

    const screenKey: string = parts[0];
    const rightPart: string = parts.slice(1).join('.');

    return text[screenKey][rightPart];
  };

  return {isLoading, t};
};
