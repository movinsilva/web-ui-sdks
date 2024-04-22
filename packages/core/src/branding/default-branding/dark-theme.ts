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

import {ThemeConfigInterface} from 'src/models/branding-api-response';

const DARK_THEME: ThemeConfigInterface = {
  buttons: {
    externalConnection: {
      base: {
        background: {
          backgroundColor: '#FFFFFF',
        },
        border: {
          borderRadius: '4px',
        },
        font: {
          color: '#000000de',
        },
      },
    },
    primary: {
      base: {
        border: {
          borderRadius: '4px',
        },
        font: {
          color: '#ffffffe6',
        },
      },
    },
    secondary: {
      base: {
        border: {
          borderRadius: '4px',
        },
        font: {
          color: '#000000de',
        },
      },
    },
  },
  colors: {
    alerts: {
      error: {
        contrastText: '',
        dark: '',
        inverted: '',
        light: '',
        main: '#ffd8d8',
      },
      info: {
        contrastText: '',
        dark: '',
        inverted: '',
        light: '',
        main: '#eff7fd',
      },
      neutral: {
        contrastText: '',
        dark: '',
        inverted: '',
        light: '',
        main: '#f8f8f9',
      },
      warning: {
        contrastText: '',
        dark: '',
        inverted: '',
        light: '',
        main: '#fff6e7',
      },
    },
    background: {
      body: {
        contrastText: '',
        dark: '',
        inverted: '',
        light: '',
        main: '#fbfbfb',
      },
      surface: {
        contrastText: '',
        dark: '#F6F4F2',
        inverted: '#212a32',
        light: '#f9fafb',
        main: '#ffffff',
      },
    },
    illustrations: {
      accent1: {
        contrastText: '',
        dark: '',
        inverted: '',
        light: '',
        main: '#3865B5',
      },
      accent2: {
        contrastText: '',
        dark: '',
        inverted: '',
        light: '',
        main: '#19BECE',
      },
      accent3: {
        contrastText: '',
        dark: '',
        inverted: '',
        light: '',
        main: '#FFFFFF',
      },
      primary: {
        contrastText: '',
        dark: '',
        inverted: '',
        light: '',
        main: '#FF7300',
      },
      secondary: {
        contrastText: '',
        dark: '',
        inverted: '',
        light: '',
        main: '#E0E1E2',
      },
    },
    outlined: {
      default: '#dadce0',
    },
    primary: {
      contrastText: '',
      dark: '',
      inverted: '',
      light: '',
      main: '#FF7300',
    },
    secondary: {
      contrastText: '',
      dark: '',
      inverted: '',
      light: '',
      main: '#E0E1E2',
    },
    text: {
      primary: '#000000de',
      secondary: '#00000066',
    },
  },
  footer: {
    border: {
      borderColor: '',
    },
    font: {
      color: '',
    },
  },
  images: {
    favicon: {
      imgURL: undefined,
    },
    logo: {
      altText: undefined,
      imgURL: undefined,
    },
    myAccountLogo: {
      altText: undefined,
      imgURL: undefined,
      title: 'Account',
    },
  },
  inputs: {
    base: {
      background: {
        backgroundColor: '#FFFFFF',
      },
      border: {
        borderColor: '',
        borderRadius: '4px',
      },
      font: {
        color: '',
      },
      labels: {
        font: {
          color: '',
        },
      },
    },
  },
  loginBox: {
    background: {
      backgroundColor: '',
    },
    border: {
      borderColor: '',
      borderRadius: '12px',
      borderWidth: '1px',
    },
    font: {
      color: '',
    },
  },
  loginPage: {
    background: {
      backgroundColor: '',
    },
    font: {
      color: '',
    },
  },
  typography: {
    font: {
      fontFamily: 'Gilmer',
    },
    heading: {
      font: {
        color: '',
      },
    },
  },
};

export default DARK_THEME;
