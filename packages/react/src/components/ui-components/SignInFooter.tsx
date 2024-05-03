import { FC, ReactElement } from "react";

/**
 * Product Footer Component.
 *
 * @param props - Props injected to the component.
 *
 * @returns Product footer component.
 */
const Footer: FC = (): ReactElement => {
    const brandingProps: Customization = useBrandingPreference();
    const localizationLanguage: string = brandingProps?.locale ?? 'en-US';
  
    console.log('textPreference', localizationLanguage);
    const [brandingTextPreference, setBrandingTextPreference] = React.useState<BrandingTextPreference>();
  
    useEffect(() => {
      try {
        if (brandingProps) {
          brandingText(
            localizationLanguage,
            brandingProps?.name ?? 'carbon.super',
            'common',
            brandingProps?.type ?? 'ORG',
          ).then((response: BrandingTextResponse) => {
            setBrandingTextPreference(response?.preference);
          });
        }
      } catch (error) {
        throw new AsgardeoUIException('REACT_UI-FOOTER-SE01', 'Error in fetching branding text', error);
      }
    }, [brandingProps]);
  
    return !brandingTextPreference ? (
      <div />
    ) : (
      <div data-componentid={componentId} className="footer">
        <div className="ui container fluid">
          <div className="ui text menu">
            <div className="left menu">
              <div className="powered-by-logo">
                <div>
                  {brandingTextPreference.text.copyright &&
                  brandingTextPreference.text.copyright.includes('{{currentYear}}')
                    ? brandingTextPreference.text.copyright.replace(
                        '{{currentYear}}',
                        new Date().getFullYear().toString(),
                      )
                    : brandingTextPreference?.text.copyright}
                </div>
              </div>
            </div>
            <div className="right menu">
              {!isEmpty(brandingProps?.preference?.urls?.privacyPolicyURL) && (
                <a
                  id="privacy-policy"
                  className="item"
                  href={brandingProps?.preference?.urls?.privacyPolicyURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="login-page-privacy-policy-link"
                >
                  {brandingTextPreference ? brandingTextPreference.text['privacy.policy'] : ''}
                </a>
              )}
              {!isEmpty(brandingProps?.preference?.urls?.termsOfUseURL) && (
                <a
                  id="terms-of-service"
                  className="item"
                  href={brandingProps?.preference?.urls?.termsOfUseURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="login-page-privacy-policy-link"
                >
                  {brandingTextPreference ? brandingTextPreference.text['terms.of.service'] : ''}
                </a>
              )}
              {!isEmpty(brandingProps?.preference?.urls?.termsOfUseURL) && (
                <a
                  id="terms-of-service"
                  className="item"
                  href={brandingProps?.preference?.urls?.termsOfUseURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="login-page-privacy-policy-link"
                >
                  {localizationLanguage}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  /**
   * Default props for the component.
   */
  Footer.defaultProps = {
    'data-componentid': 'login-screen-skeleton-product-footer',
  };
  
  export default Footer;
  