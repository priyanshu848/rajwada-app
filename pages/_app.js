import React from "react";
import { wrapper } from "../store";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(MyApp);
