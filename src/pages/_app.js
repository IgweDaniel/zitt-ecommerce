import GlobalStateProvider from "../store/globalStateProvider";
import { useEffect, useState } from "react";
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
  async function fetchCart() {
    const {
      data: { data },
    } = await axios.get("http://localhost:4000/api/cart");
  }

  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}

// export async function getServerSideProps(appContext) {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   // const appProps = await App.getInitialProps(appContext);

//   return {
//     props: { cart: [] }, // will be passed to the page component as props
//   };
// }
