import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#4194CB"
        },
        secondary: {
            main: "#4194CB"
        },
        error: {
            main: "#4194CB"
        },
        mode: "light"
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: "Nunito"
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontFamily: "Nunito"
                }
            }
        },
        MuiListSubheader: {
            styleOverrides: {
                root: {
                    fontFamily: "Nunito"
                }
            }
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                    "& .Mui-selected": {
                        backgroundColor: "rgba(23, 96, 118, 0.6) !important",
                        color: "#fcfcfc !important"
                    }
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    "& .MuiChip-label": {
                        fontFamily: "Nunito",
                        color: "#757575"
                    }
                }
            }
        }
    }
});

export default theme;
