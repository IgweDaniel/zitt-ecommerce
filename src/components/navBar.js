import React, { useEffect, useRef, useContext } from "react";
import Link from "next/link";

import { AiOutlineMenu } from "react-icons/ai";
import { CartIcon, UserIcon, SearchIcon } from "./svgIcons";
import Context from "../store/context";

const ICON_SIZE = 20;

export const NavBar = ({ color = "#fff", height, events, ...props }) => {
  const {
    globalState: { cart },
  } = useContext(Context);
  const navBarRef = useRef(null);
  useEffect(() => {
    window.addEventListener("scroll", updateNavBar);
    return () => {
      window.removeEventListener("scroll", updateNavBar);
    };
  }, []);

  function updateNavBar(e) {
    if (e.currentTarget.scrollY > 23)
      navBarRef.current.classList.add("scrolling");
    else navBarRef.current.classList.remove("scrolling");
  }

  return (
    <>
      <nav className="main" ref={navBarRef}>
        <div className="logo">
          <Link href="/index">
            <img src="/logo.webp" alt="logo" />
          </Link>
        </div>

        <ul className="links no-mobile">
          <li>
            <Link href="/index">
              <a>HOME</a>
            </Link>
          </li>
          <li>
            <Link as="/shop/all" href="/shop/[category]">
              <a>SHOP</a>
            </Link>
          </li>
        </ul>

        <ul className="actions">
          <li onClick={events.cart} className="cart-action">
            <CartIcon size={ICON_SIZE} />
            {cart && cart.size != 0 ? (
              <span className="cart-size">{cart.size}</span>
            ) : null}
          </li>

          <li>
            <Link href="/my_account">
              <a>
                <UserIcon size={ICON_SIZE} />
              </a>
            </Link>
          </li>

          <li>
            <SearchIcon size={ICON_SIZE} />
          </li>
          <li className="no-desktop menu-action">
            <AiOutlineMenu size={ICON_SIZE} />
          </li>
        </ul>
      </nav>

      <style jsx>{`
        nav.main {
          width: 100%;
          height: ${height}px;
          padding: 0 4%;
          position: fixed;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
          z-index: 4;
          color: #000;
          background-color: #fff;
        }
        .logo {
        }
        .logo img {
          width: 33px;
          height: 33px;
        }

        .actions {
          justify-self: right;
          grid-column: span 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .actions li {
          list-style: none;
          margin: 0 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .cart-action {
          width: 80px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .cart-size {
          font-family: "Catamaran";
          font-variant: small-caps;

          background: #ef8e74;
          color: #fff;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (min-width: 769px) {
          .actions li.menu-action {
            display: none;
          }
          nav.main {
            grid-template-columns: 1fr repeat(3, 1fr);
            background-color: ${color};
            padding: 0 2rem;
          }
          .scrolling {
            box-shadow: -2px 2px 81px -27px rgba(0, 0, 0, 0.29);
          }
          .logo img {
            width: 50px;
            height: 50px;
          }

          .links {
            justify-self: center;
            width: 150px;
            grid-column: span 2;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .links li {
            flex: 1;
            font-weight: bold;
            text-align: center;
            width: 100%;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .links li a {
            display: block;
            font-family: "Catamaran" !important;
          }

          .actions {
            grid-column: span 1;
            justify-self: right;
          }
        }
      `}</style>
    </>
  );
};
