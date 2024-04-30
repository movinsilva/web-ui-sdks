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

import {TextField, Typography} from '@oxygen-ui/react';
import clsx from 'clsx';
import {ComponentPropsWithoutRef, ElementRef, ForwardRefExoticComponent, ForwardedRef, forwardRef} from 'react';
import './compound-components.scss';

/*******************
 *   SignInTitle   *
 *******************/
type SignInTitleElement = ElementRef<typeof Typography>;
type TitleProps = ComponentPropsWithoutRef<typeof Typography>;
interface SignInTitleProps extends TitleProps {
  subtitle?: boolean;
}

const SignInTitle: ForwardRefExoticComponent<SignInTitleProps> = forwardRef<SignInTitleElement, SignInTitleProps>(
  (props: SignInTitleProps, forwardedRef: ForwardedRef<unknown>) => {
    const {subtitle, ...rest} = props;
    const classname = subtitle ? 'ui-sign-in-subtitle' : 'ui-sign-in-title';
    const classes: string = clsx(classname, props['className']);
    return <Typography className={classes} ref={forwardedRef} {...rest} />;
  },
);


/************************
 *   SignInInputField   *
 ************************/
type SignInInputFieldElement = ElementRef<typeof TextField>;
type InputFieldProps = ComponentPropsWithoutRef<typeof TextField>;

const SignInInputField: ForwardRefExoticComponent<InputFieldProps> = forwardRef<SignInInputFieldElement, InputFieldProps>(
  (props: InputFieldProps, forwardedRef) => {
    const classes: string = clsx('ui-sign-in-input-field', props['className']);
    return <TextField fullWidth required className={classes} ref={forwardedRef} {...props} />;
  },
);

export {SignInTitle, SignInInputField};
