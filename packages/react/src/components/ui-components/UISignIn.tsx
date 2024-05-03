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
import {FC, ForwardRefExoticComponent, PropsWithChildren, ReactNode} from 'react';
import {InputFieldProps, RegisterLink, RegisterLinkProps, RememberMe, SignInButton, SignInButtonProps, SignInInputField, SignInOptionDivider, SignInOptionDividerProps, SignInRetryText, SignInRetryTextProps, SignInRoot, SignInRootProps, SignInTitle, SignInTitleProps} from './CompoundComponents';
import './ui-sign-in.scss';
import PinInput from './PINInputField';

interface UISignInProps extends PropsWithChildren {
}

const UISignIn: FC<UISignInProps> & {
  Title?: ForwardRefExoticComponent<SignInTitleProps>,
  InputField?: ForwardRefExoticComponent<InputFieldProps>;
  Root?: ForwardRefExoticComponent<SignInRootProps>;
  Button?: ForwardRefExoticComponent<SignInButtonProps>;
  Register?: FC<RegisterLinkProps>;
  RememberMe?: FC;
  OptionDivider?: ForwardRefExoticComponent<SignInOptionDividerProps>;
  RetryText?: FC<SignInRetryTextProps>;
  PINInput?: FC;
} = props => {
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
UISignIn.RetryText = SignInRetryText;
UISignIn.PINInput = PinInput;

export default UISignIn;
