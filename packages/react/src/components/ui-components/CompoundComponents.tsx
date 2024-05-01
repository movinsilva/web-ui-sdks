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

import {Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Link, Paper, TextField, Typography} from '@oxygen-ui/react';
import clsx from 'clsx';
import {ComponentPropsWithoutRef, ElementRef, ForwardRefExoticComponent, ForwardedRef, forwardRef} from 'react';
import './compound-components.scss';

/******************
 *   SignInRoot   *
 ******************/
type SignInRootElement = ElementRef<typeof Paper>;
type RootProps = ComponentPropsWithoutRef<typeof Paper>;
interface SignInRootProps extends RootProps {}

const SignInRoot: ForwardRefExoticComponent<SignInRootProps> = forwardRef<SignInRootElement, SignInRootProps>(
  (props: SignInRootProps, forwardedRef: ForwardedRef<unknown>) => {
    const classes: string = clsx('ui-sign-in-paper', props['className']);
    return <Paper className={classes} ref={forwardedRef} variant="outlined" {...props} />;
  },
);


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
    const variant = subtitle ? 'subtitle1' : 'h5';
    const classes: string = clsx(classname, props['className']);
    return <Typography className={classes} ref={forwardedRef} align="center" variant={variant} {...rest} />;
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

/********************
 *   SignInButton   *
 ********************/
type SignInButtonElement = ElementRef<typeof Button>;
type ButtonProps = ComponentPropsWithoutRef<typeof Button>;
interface SignInButtonProps extends ButtonProps {
  social?: boolean;
}

const SignInButton: ForwardRefExoticComponent<SignInButtonProps> = forwardRef<SignInButtonElement, SignInButtonProps>(
  (props: SignInButtonProps, forwardedRef) => {
    const className: string = props.social ? 'ui-sign-in-option-social' : 'ui-sign-in-button';
    const classes: string = clsx(className, props['className']);
    return <Button className={classes} ref={forwardedRef} {...props} />;
  },
);

const RegisterLink = ({signUpUrl}) => {
  return <Grid container className="oxygen-sign-in-sign-up-link">
  <Grid>Don&apos;t have an account?</Grid>
  <Grid>
    <Link href={signUpUrl} className="oxygen-sign-in-sign-up-link-action">
      Sign up
    </Link>
  </Grid>
</Grid>
}

const RememberMe = () => {
  return <FormGroup>
     <FormControlLabel control={<Checkbox />} label="Remember me on this computer" />
  </FormGroup>
}

type SignInOptionDividerElement = ElementRef<typeof Divider>;
type OptionDividerProps = ComponentPropsWithoutRef<typeof Divider>;
interface SignInOptionDividerProps extends OptionDividerProps {}

const SignInOptionDivider: ForwardRefExoticComponent<SignInOptionDividerProps> = forwardRef<SignInOptionDividerElement, SignInOptionDividerProps>(
  (props: SignInOptionDividerProps, forwardedRef) => {
    const classes: string = clsx('ui-sign-in-option-divider', props['className']);
    return <Divider className={classes} ref={forwardedRef} {...props} />;
  },
);

export {SignInRoot, SignInTitle, SignInInputField, SignInButton, RegisterLink, RememberMe, SignInOptionDivider};
