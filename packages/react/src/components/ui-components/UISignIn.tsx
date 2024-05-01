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

import {Box} from '@oxygen-ui/react';
import clsx from 'clsx';
import {FC, PropsWithChildren} from 'react';
import {RegisterLink, RememberMe, SignInButton, SignInInputField, SignInOptionDivider, SignInRoot, SignInTitle} from './CompoundComponents';
import './ui-sign-in.scss';

const UISignIn: FC<PropsWithChildren> = props => {
  const {children} = props;
  const classes: string = clsx('ui-sign-in', props['className']);

  return <Box className={classes}>{children}</Box>;
};

UISignIn.Title = SignInTitle;
UISignIn.InputField = SignInInputField;
UISignIn.Root = SignInRoot;
UISignIn.Button = SignInButton;
UISignIn.Register = RegisterLink;
UISignIn.RememberMe = RememberMe;
UISignIn.OptionDivider = SignInOptionDivider;

export default UISignIn;