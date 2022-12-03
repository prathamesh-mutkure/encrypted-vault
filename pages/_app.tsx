import "../styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "../store/index";

const theme = createTheme({});

export default function App({ Component, pageProps }: AppProps) {
  const app = initializeApp(firebaseConfig);

  return (
    <SessionProvider session={pageProps?.session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Anti-Cheat Exam App</title>
            <meta name="author" content="Prathamesh Mutkure" />
          </Head>
          <Component {...pageProps} />
          {/* <ToastContainer position="bottom-center" theme="light" /> */}
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
