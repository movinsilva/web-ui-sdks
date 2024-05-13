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

import {Branding, ThemeConfig} from '@asgardeo/js-ui-core';
import {extendTheme, Theme} from '@oxygen-ui/react';

interface GenerateThemeProps {
  branding: Branding;
}

const generateThemeSignIn: ({branding}: GenerateThemeProps) => Theme = ({branding}: GenerateThemeProps) => {
  const mode: string = branding?.preference?.theme?.activeTheme.toLowerCase() ?? 'light';
  const brandingTheme: ThemeConfig = branding?.preference?.theme[mode.toUpperCase()];

  return extendTheme({
    colorSchemes: {
      dark: {
        brand: {
          logo: {
            main: brandingTheme?.images?.myAccountLogo?.imgURL ?? `../assets/asgardeo-logo.svg`,
          },
        },
        palette: {
          customComponents: {
            AppShell: {
              Main: {
                background: brandingTheme?.colors?.background?.body?.main ?? 'var(--oxygen-palette-background-paper)',
              },
              MainWrapper: {
                background:
                  brandingTheme?.colors?.background?.surface?.dark ?? 'var(--oxygen-palette-background-paper)',
              },
            },
            Navbar: {
              background: brandingTheme?.colors?.background?.surface?.dark ?? 'var(--oxygen-palette-background-paper)',
            },
          },
          gradients: {
            primary: {
              stop1: '#EB4F63',
              stop2: '#FA7B3F',
            },
          },
          primary: {
            main: brandingTheme?.colors?.primary?.main ?? '#ff7300',
          },
        },
      },
      light: {
        brand: {
          logo: {
            main: brandingTheme?.images?.myAccountLogo?.imgURL ?? `../assets/asgardeo-logo.svg`,
          },
        },
        palette: {
          customComponents: {
            AppShell: {
              Main: {
                background: brandingTheme?.colors?.background?.body?.main ?? '#FAF9F8',
              },
              MainWrapper: {
                background: brandingTheme?.colors?.background?.surface?.dark ?? '#F6F4F2',
              },
            },
            Navbar: {
              background: brandingTheme?.colors?.background?.surface?.dark ?? '#F6F4F2',
            },
          },
          gradients: {
            primary: {
              stop1: brandingTheme?.colors?.primary?.main ?? '#EB4F63',
              stop2: brandingTheme?.colors?.primary?.main ?? '#FA7B3F',
            },
          },
          primary: {
            main: brandingTheme?.colors?.primary?.main ?? '#ff7300',
          },
        },
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: brandingTheme?.buttons?.primary?.base?.border?.borderRadius,
            color: 'white',
          },
        },
      },
    },
  });
};

export default generateThemeSignIn;
