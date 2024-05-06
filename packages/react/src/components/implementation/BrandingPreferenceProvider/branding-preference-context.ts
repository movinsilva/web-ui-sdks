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

import {Customization} from '@asgardeo/js-ui-core';
import {Context, createContext, useContext} from 'react';

export const BrandingPreferenceContext: Context<Customization> = createContext<Customization>(undefined);

/**
 * Hook to access the branding preferences from the context.
 *
 * @returns {BrandingPreferenceContextProps} The branding preferences from the context.
 */
export function useBrandingPreference(): Customization {
    const context: Customization = useContext(BrandingPreferenceContext);
  
    if (!context) {
      throw new Error('useBrandingPreference must be used within a BrandingPreferenceProvider');
    }
  
    return context;
  }
  