import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import Script from "next/script";
import PropTypes from "prop-types";
import * as React from "react";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import LayoutCheck from "../components/LayoutCheck";
import { store } from "../store/store";
import "../styles/globals.css";
import createEmotionCache from "../utils/createEmotionCache";
import theme from "../utils/theme";
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <LayoutCheck>
            <Layout>
            {/* <Script src={`http://paypal.com/sdk/js?client-id=${env.}&currency=USD`}></Script> */}
              <Component {...pageProps} />
            </Layout>
          </LayoutCheck>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
