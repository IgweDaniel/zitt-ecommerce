import React, { useState } from "react";
import Head from "next/head";

import Router from "next/router";
import NProgress from "nprogress";

import NavBar from "./navBar";
import { useViewport } from "../hooks";

import { FaTwitter, FaPinterest, FaFacebookSquare } from "react-icons/fa";

import { AiFillInstagram } from "react-icons/ai";
import Modal from "./modal";
import Cart from "./quickCart";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Layout = ({ page = "Home", ...props }) => {
  const { width } = useViewport();
  const [cartOpen, setCartOpen] = useState(false);

  const breakpoint = 769;

  function handleCartState() {
    setCartOpen((state) => !state);
  }
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
        <Cart />
      </Modal>
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
        @font-face {
          font-family: NeueEinstellung;
          src: url("/Nue.woff");
        }

        .no-mobile {
          display: none;
        }

        @media (min-width: 400px) and (max-width: 768px) {
          body {
            color: initial;
          }
          .no-desktop {
            display: none;
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
          background-color: #000;
          color: #fff;
          border: none;
          box-shadow: none;
          height: 40px;
          font-family: "Catamaran";
          padding: 0 12px;
          margin: 10px 0;
          font-size: 15px;
          font-variant: small-caps;
          cursor: pointer;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
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

export default Layout;
