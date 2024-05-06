import { Customization, ThemeConfigInterface } from "@asgardeo/js-ui-core";
import { extendTheme, InputLabel, Theme } from "@oxygen-ui/react";

interface generateThemeProps {
    customization: Customization;
}

const generateTheme: ({customization}: generateThemeProps) => Theme = ({customization}) => {
    const mode: string = customization?.preference?.theme?.activeTheme.toLowerCase() ?? "light";
    const brandingTheme: ThemeConfigInterface = customization?.preference?.theme[mode.toUpperCase()];

    return extendTheme({
        colorSchemes: {
            dark: {
                // brand: {
                //     logo: {
                //         main: brandingTheme?.images?.myAccountLogo?.imgURL 
                //             ?? `${process.env.PUBLIC_URL}/assets/brands/asgardeo/images/asgardeo-logo-inverted.svg`
                //     }
                // },
                palette: {
                    customComponents: {
                        AppShell: {
                            Main: {
                                background:
                                    brandingTheme?.colors?.background?.body?.main ??
                                    "var(--oxygen-palette-background-paper)"
                            },
                            MainWrapper: {
                                background:
                                    brandingTheme?.colors?.background?.surface?.dark ??
                                    "var(--oxygen-palette-background-paper)"
                            }
                        },
                        Navbar: {
                            background:
                                brandingTheme?.colors?.background?.surface?.dark ??
                                "var(--oxygen-palette-background-paper)"
                        }
                    },
                    gradients: {
                        primary: {
                            stop1: "#EB4F63",
                            stop2: "#FA7B3F"
                        }
                    },
                    primary: {
                        main: brandingTheme?.colors?.primary?.main ?? "#ff7300"
                    }
                }
            },
            light: {
                // brand: {
                //     logo: {
                //         main: brandingTheme?.images?.myAccountLogo?.imgURL
                //             ?? `${process.env.PUBLIC_URL}/assets/brands/asgardeo/images/asgardeo-logo.svg`
                //     }
                // },
                palette: {
                    customComponents: {
                        AppShell: {
                            Main: {
                                background: brandingTheme?.colors?.background?.body?.main ?? "#FAF9F8"
                            },
                            MainWrapper: {
                                background: brandingTheme?.colors?.background?.surface?.dark ?? "#F6F4F2"
                            }
                        },
                        Navbar: {
                            background: brandingTheme?.colors?.background?.surface?.dark ?? "#F6F4F2"
                        }
                    },
                    gradients: {
                        primary: {
                            stop1: brandingTheme?.colors?.primary?.main ?? "#EB4F63",
                            stop2: brandingTheme?.colors?.primary?.main ??"#FA7B3F"
                        }
                    },
                    primary: {
                        main: brandingTheme?.colors?.primary?.main ?? "#ff7300"
                    }
                }
            }
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: brandingTheme?.colors?.background?.surface?.dark ?? "#F6F4F2",
                        borderBottom: "none"
                    }
                }
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        borderRight: "none",
                        boxShadow: "none"
                    }
                }
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        borderRadius: "8px",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)"
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    input: {
                        padding: "0.67857143em 1em",
                    },
                }
            },
        },
        customComponents: {
            AppShell: {
                properties: {
                    mainBorderTopLeftRadius: "24px",
                    navBarTopPosition: "80px"
                }
            }
        },
        shape: {
            borderRadius: 4
        },
        typography: {
            fontFamily: brandingTheme?.typography.font.fontFamily ?? "Gilmer, sans-serif",
            h1: {
                fontWeight: 700
            }
        }
    });
        
}

export default generateTheme;