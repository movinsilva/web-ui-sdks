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
            color: brandingTheme?.buttons?.primary?.base?.font?.color,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: `${
              brandingTheme?.inputs?.base?.labels?.font?.color !== ''
                ? brandingTheme?.inputs?.base?.labels?.font?.color
                : brandingTheme?.colors?.text?.primary
            } !important`,
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            background: brandingTheme?.inputs?.base?.background?.backgroundColor,
            borderColor: brandingTheme?.inputs?.base?.border?.borderColor,
            borderRadius: brandingTheme?.inputs?.base?.border?.borderRadius,
            color: brandingTheme?.inputs?.base?.font?.color,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            padding: '0.67857143em 1em',
            borderColor: 'red !important',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background: brandingTheme?.colors?.background?.surface?.main,
            borderColor: brandingTheme?.colors?.outlined?.default ?? '#000000',
            '.OxygenSignInButton-social': {
              backgroundColor: brandingTheme?.buttons.externalConnection.base.background.backgroundColor,
              color: brandingTheme?.buttons.externalConnection.base.font.color,
              borderRadius: brandingTheme?.buttons.externalConnection.base.border.borderRadius,
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderColor: 'red !important',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            color: 'purple',
            borderColor: `${brandingTheme?.colors?.outlined?.default} !important` ?? '#000000',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: brandingTheme?.colors?.text?.primary ?? '#000000',
          },
        },
      },
    },
    customComponents: {
      AppShell: {
        properties: {
          mainBorderTopLeftRadius: '24px',
          navBarTopPosition: '80px',
        },
      },
    },
    shape: {
      borderRadius: 4,
    },
    typography: {
      fontFamily: brandingTheme?.typography.font.fontFamily ?? 'Gilmer, sans-serif',
      h1: {
        fontWeight: 700,
      },
    },
  });
};

export default generateThemeSignIn;
