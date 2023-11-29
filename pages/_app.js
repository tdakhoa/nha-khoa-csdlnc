import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";

import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import "../styles/globals.css";
import "../styles/index.css";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    useEffect(() => {
        window.history.scrollRestoration = "manual";
    }, []);

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <SnackbarProvider autoHideDuration={2000}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </SnackbarProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired
};
