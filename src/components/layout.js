import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";

import NProgress from "nprogress";

import { useViewport } from "../hooks";

import { FaTwitter, FaPinterest, FaFacebookSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

import { NavBar } from "./navBar";
import { Modal } from "./modal";
import { QuickCart } from "./quickCart";
import Context from "../store/context";
import { ProductView } from "../components";
import { getCart } from "../utils/api";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export const Layout = ({ page = "Home", ...props }) => {
  const { width } = useViewport();
  const [cartOpen, setCartOpen] = useState(false);
  const {
    globalState: { product },
    globalDispatch,
  } = useContext(Context);

  const breakpoint = 769;

  function handleCartState() {
    setCartOpen((state) => !state);
  }

  const closeProduct = () =>
    globalDispatch({
      type: "UNSETPRODUCT",
    });
  useEffect(() => {
    document.body.style.overflowY = "auto";
    getCart().then((cart) =>
      globalDispatch({ type: "SETCART", payload: cart })
    );
  }, []);

  const NAV_HEIGHT = breakpoint > width ? 50 : 85;
  return (
    <>
      <Head>
        <title>Zitt | {page}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
          integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
          crossOrigin="anonymous"
        />

        <link rel="stylesheet" type="text/css" href="/rc-slider.css" />
      </Head>

      <NavBar height={NAV_HEIGHT} events={{ cart: handleCartState }} />
      <div className="container" style={{ marginTop: NAV_HEIGHT + 40 }}>
        <div>{props.children}</div>
      </div>
      <Modal position="right" open={cartOpen} closeModal={handleCartState}>
        <QuickCart fetch={cartOpen} />
      </Modal>
      <ProductView productEl={product} reset={closeProduct} />
      <footer>
        <ul className="social-icons">
          <li>
            <FaFacebookSquare />
          </li>
          <li>
            <FaPinterest />
          </li>
          <li>
            <FaTwitter />
          </li>
          <li>
            <AiFillInstagram />
          </li>
        </ul>
        <p>&copy; Zitt Stores 2020</p>
      </footer>
      <style jsx global>{`
        :root {
          --themeColor: #30292f;
        }
        @font-face {
          font-family: NeueEinstellung;
          src: url("/Nue.woff");
        }

        .no-mobile {
          display: none;
        }

        .stack {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        @media (min-width: 400px) and (max-width: 768px) {
          body {
            color: initial;
          }
          .no-desktop {
            display: none !important;
          }
        }

        @media (min-width: 769px) {
          .no-desktop {
            display: none;
          }
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: NeueEinstellung, sans-serif;
        }
        li {
          list-style: none;
        }

        a {
          text-decoration: none;
          color: inherit;
        }
        button {
          background-color: #ef8e74;
          background-color: var(--themeColor);
          color: #fff;
          border: none;
          box-shadow: none;
          height: 40px;
          min-width: 150px;
          padding: 0 12px;
          margin: 10px 0;
          font-size: 15px;
          cursor: pointer;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: capitalize;
          font-family: "Catamaran";
          font-weight: bold;
          //box-shadow: -1px 3px 13px -2px rgba(0, 0, 0, 0.2);
          // font-variant: small-caps;
          //border-radius: 3px;
        }
        button:active {
          background-color: #0c0409 !important;
          transition: all 0.2s ease-in;
        }

        button:hover {
          background-color: #453e44;
          transition: all 0.2s ease-in;
        }
        .icon {
          align-items: center;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }

        footer {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 2rem;
        }

        footer ul {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        footer ul li {
          flex: 1;
          margin: 20px 20px;
          font-size: 1.5rem;
        }
      `}</style>
    </>
  );
};
