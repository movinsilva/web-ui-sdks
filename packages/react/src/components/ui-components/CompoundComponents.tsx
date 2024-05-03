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

import {Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Link, Paper, TextField, Typography} from '@oxygen-ui/react';
import clsx from 'clsx';
import {Children, ComponentPropsWithoutRef, ElementRef, FC, ForwardRefExoticComponent, ForwardedRef, forwardRef} from 'react';
import './compound-components.scss';

/******************
 *   SignInRoot   *
 ******************/
type SignInRootElement = ElementRef<typeof Paper>;
type RootProps = ComponentPropsWithoutRef<typeof Paper>;
export interface SignInRootProps extends RootProps {}

const SignInRoot: ForwardRefExoticComponent<SignInRootProps> = forwardRef<SignInRootElement, SignInRootProps>(
  (props: SignInRootProps, forwardedRef: ForwardedRef<unknown>) => {
    const classes: string = clsx('ui-sign-in-paper', props['className']);
    return <Paper className={classes} ref={forwardedRef} variant="outlined" {...props} />;
  },
);


/*******************
 *   SignInTitle   *
 *******************/
type SignInTypographyElement = ElementRef<typeof Typography>;
type TypographyProps = ComponentPropsWithoutRef<typeof Typography>;
export interface SignInTypographyProps extends TypographyProps {
  subtitle?: boolean;
  title?: boolean;
}

const SignInTypography: ForwardRefExoticComponent<SignInTypographyProps> = forwardRef<SignInTypographyElement, SignInTypographyProps>(
  (props: SignInTypographyProps, forwardedRef: ForwardedRef<unknown>) => {
    const {subtitle, title, ...rest} = props;
    const classname = subtitle ? 'ui-sign-in-subtitle' : title ? 'ui-sign-in-title' :  'ui-sign-in-typography'
    const variant = subtitle ? 'subtitle1' : title ? 'h5' : 'body1';
    const classes: string = clsx(classname, props['className']);
    return <Typography className={classes} ref={forwardedRef} align="center" variant={variant} {...rest} />;
  },
);


/************************
 *   SignInInputField   *
 ************************/
type SignInInputFieldElement = ElementRef<typeof TextField>;
export type InputFieldProps = ComponentPropsWithoutRef<typeof TextField>;

const SignInInputField: ForwardRefExoticComponent<InputFieldProps> = forwardRef<SignInInputFieldElement, InputFieldProps>(
  ({className, ...rest}: InputFieldProps, forwardedRef) => {
    const classes: string = clsx('ui-sign-in-input-field', className);
    return <TextField fullWidth required InputLabelProps={{className: 'ui-sign-in-input-field-label'}} className={classes} ref={forwardedRef} {...rest} />;
  },
);


/********************
 *   SignInButton   *
 ********************/
type SignInButtonElement = ElementRef<typeof Button>;
type ButtonProps = ComponentPropsWithoutRef<typeof Button>;
export interface SignInButtonProps extends ButtonProps {
  social?: boolean;
}

const SignInButton: ForwardRefExoticComponent<SignInButtonProps> = forwardRef<SignInButtonElement, SignInButtonProps>(
  (props: SignInButtonProps, forwardedRef) => {
    const {social, className, ...rest} = props;
    const classNameAppended: string = social ? 'ui-sign-in-option-social' : 'ui-sign-in-button';
    const classes: string = clsx(classNameAppended, className);
    return <Button className={classes} ref={forwardedRef} {...rest} />;
  },
);


/********************
 *   RegisterLink   *
 ********************/
export interface RegisterLinkProps {
  signUpUrl: string;
}

const RegisterLink = ({signUpUrl}: RegisterLinkProps) => {
  return (
      <Grid container className="oxygen-sign-in-sign-up-link">
        <Grid>Don&apos;t have an account?</Grid>
        <Grid>
          <Link href={signUpUrl} className="oxygen-sign-in-sign-up-link-action">
            Register
          </Link>
        </Grid>
      </Grid>
  )
}


/******************
 *   RememberMe   *
 ******************/
const RememberMe = () => {
  return  (
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Remember me on this computer" />
      </FormGroup>
  )
}


/***************************
 *   SignInOptionDivider   *
 ***************************/
type SignInOptionDividerElement = ElementRef<typeof Divider>;
type OptionDividerProps = ComponentPropsWithoutRef<typeof Divider>;
export interface SignInOptionDividerProps extends OptionDividerProps {}

const SignInOptionDivider: ForwardRefExoticComponent<SignInOptionDividerProps> = forwardRef<SignInOptionDividerElement, SignInOptionDividerProps>(
  (props: SignInOptionDividerProps, forwardedRef) => {
    const classes: string = clsx('ui-sign-in-option-divider', props['className']);
    return <Divider className={classes} ref={forwardedRef} {...props} />;
  },
);

/*****************
 *   RetryText   *
 *****************/
type RetryTextProps = ComponentPropsWithoutRef<typeof Box>;
export interface SignInRetryTextProps extends RetryTextProps {}
const SignInRetryText:FC = ({children, className, ...rest}: SignInRetryTextProps) => {
  const classes: string = clsx('oxygen-sign-in-retry-text', className );
  return (
      <Box className={classes} {...rest}>
          <Typography className="oxygen-sign-in-error">
            {children}
          </Typography>
      </Box>
  )
}



export {
  SignInRoot,
  SignInTypography,
  SignInInputField,
  SignInButton,
  RegisterLink,
  RememberMe,
  SignInOptionDivider,
  SignInRetryText
};
