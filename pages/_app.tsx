import "../styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";

export default function App({ Component, pageProps }: AppProps) {
  const app = initializeApp(firebaseConfig);

  return <Component {...pageProps} />;
}
