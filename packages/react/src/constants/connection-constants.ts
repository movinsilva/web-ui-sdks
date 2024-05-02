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

export class ConnectionManagementConstants {
  // Known IS Predefined/Protocols authenticator IDs
  public static readonly OIDC_AUTHENTICATOR_ID: string = 'T3BlbklEQ29ubmVjdEF1dGhlbnRpY2F0b3I';

  public static readonly SAML_AUTHENTICATOR_ID: string = 'U0FNTFNTT0F1dGhlbnRpY2F0b3I';

  public static readonly PASSIVE_STS_AUTHENTICATOR_ID: string = 'UGFzc2l2ZVNUU0F1dGhlbnRpY2F0b3I';

  public static readonly ORGANIZATION_ENTERPRISE_AUTHENTICATOR_ID: string = 'T3JnYW5pemF0aW9uQXV0aGVudGljYXRvcg';

  // Known Local Authenticator IDS.
  public static readonly BASIC_AUTHENTICATOR_ID: string = 'QmFzaWNBdXRoZW50aWNhdG9y';

  public static readonly IDENTIFIER_FIRST_AUTHENTICATOR_ID: string = 'SWRlbnRpZmllckV4ZWN1dG9y';

  public static readonly JWT_BASIC_AUTHENTICATOR_ID: string = 'SldUQmFzaWNBdXRoZW50aWNhdG9y';

  public static readonly FIDO_AUTHENTICATOR_ID: string = 'RklET0F1dGhlbnRpY2F0b3I';

  //   public static readonly SMS_OTP_AUTHENTICATOR_ID: string =
  //     authenticatorConfig?.overriddenAuthenticatorIds?.SMS_OTP_AUTHENTICATOR_ID ?? 'U01TT1RQ';

  public static readonly TOTP_AUTHENTICATOR_ID: string = 'dG90cA';

  public static readonly ACTIVE_SESSION_LIMIT_HANDLER_AUTHENTICATOR_ID: string = 'U2Vzc2lvbkV4ZWN1dG9y';

  public static readonly X509_CERTIFICATE_AUTHENTICATOR_ID: string = 'eDUwOUNlcnRpZmljYXRlQXV0aGVudGljYXRvcg';

  public static readonly BASIC_AUTH_AUTHENTICATOR_ID: string = 'QmFzaWNBdXRoUmVxdWVzdFBhdGhBdXRoZW50aWNhdG9y';

  public static readonly OAUTH_BEARER_AUTHENTICATOR_ID: string = 'T0F1dGhSZXF1ZXN0UGF0aEF1dGhlbnRpY2F0b3I';

  public static readonly EMAIL_OTP_AUTHENTICATOR_ID: string = 'ZW1haWwtb3RwLWF1dGhlbnRpY2F0b3I';

  public static readonly LEGACY_EMAIL_OTP_AUTHENTICATOR_ID: string = 'RW1haWxPVFA';

  public static readonly BACKUP_CODE_AUTHENTICATOR_ID: string = 'YmFja3VwLWNvZGUtYXV0aGVudGljYXRvcg';

  public static readonly MAGIC_LINK_AUTHENTICATOR_ID: string = 'TWFnaWNMaW5rQXV0aGVudGljYXRvcg';

  public static readonly GOOGLE_OIDC_AUTHENTICATOR_ID: string = 'R29vZ2xlT0lEQ0F1dGhlbnRpY2F0b3I';

  public static readonly FACEBOOK_AUTHENTICATOR_ID: string = 'RmFjZWJvb2tBdXRoZW50aWNhdG9y';

  public static readonly TWITTER_AUTHENTICATOR_ID: string = 'VHdpdHRlckF1dGhlbnRpY2F0b3I';

  public static readonly GITHUB_AUTHENTICATOR_ID: string = 'R2l0aHViQXV0aGVudGljYXRvcg';

  public static readonly YAHOO_AUTHENTICATOR_ID: string = 'WWFob29PQXV0aDJBdXRoZW50aWNhdG9y';

  public static readonly OFFICE_365_AUTHENTICATOR_ID: string = 'T2ZmaWNlMzY1QXV0aGVudGljYXRvcg';

  public static readonly MS_LIVE_AUTHENTICATOR_ID: string = 'TWljcm9zb2Z0V2luZG93c0xpdmVBdXRoZW50aWNhdG9y';

  public static readonly IWA_KERBEROS_AUTHENTICATOR_ID: string = 'SVdBS2VyYmVyb3NBdXRoZW50aWNhdG9y';

  public static readonly MICROSOFT_AUTHENTICATOR_ID: string = 'T3BlbklEQ29ubmVjdEF1dGhlbnRpY2F0b3I';

  public static readonly APPLE_AUTHENTICATOR_ID: string = 'QXBwbGVPSURDQXV0aGVudGljYXRvcg';

  public static readonly HYPR_AUTHENTICATOR_ID: string = 'SFlQUkF1dGhlbnRpY2F0b3I';

  public static readonly SIWE_AUTHENTICATOR_ID: string = 'T3BlbklEQ29ubmVjdEF1dGhlbnRpY2F0b3I';

  // Known Social/Enterprise authenticator names;
  public static readonly GOOGLE_OIDC_AUTHENTICATOR_NAME: string = 'GoogleOIDCAuthenticator';

  public static readonly FACEBOOK_AUTHENTICATOR_NAME: string = 'FacebookAuthenticator';

  public static readonly GITHUB_AUTHENTICATOR_NAME: string = 'GithubAuthenticator';

  public static readonly YAHOO_AUTHENTICATOR_NAME: string = 'YahooOAuth2Authenticator';

  public static readonly TWITTER_AUTHENTICATOR_NAME: string = 'TwitterAuthenticator';

  public static readonly OFFICE_365_AUTHENTICATOR_NAME: string = 'Office365Authenticator';

  public static readonly MS_LIVE_AUTHENTICATOR_NAME: string = 'MicrosoftWindowsLiveAuthenticator';

  public static readonly IWA_KERBEROS_AUTHENTICATOR_NAME: string = 'IWAKerberosAuthenticator';

  public static readonly MICROSOFT_AUTHENTICATOR_NAME: string = 'MicrosoftAuthenticator';

  public static readonly APPLE_AUTHENTICATOR_NAME: string = 'AppleOIDCAuthenticator';
}
