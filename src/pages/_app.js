import GlobalStateProvider from "../store/globalStateProvider";

import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const cartId = localStorage.getItem("cart-id");
    return { ...config, headers: { ...config.headers, "x-cart-id": cartId } };
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    localStorage.setItem("cart-id", response.headers["x-cart-id"]);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}
