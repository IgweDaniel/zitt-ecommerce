import React, { useEffect, useRef } from "react";
import Link from "next/link";

import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { HeartIcon, CartIcon, UserIcon, SearchIcon } from "./svgIcons";

//-2px 2px 81px -27px rgba(0,0,0,.29)

const NavBar = ({ color = "#fff", height, events, ...props }) => {
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
  const ICON_SIZE = 20;
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
            <Link href="/shop">
              <a>SHOP</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>BLOG</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>FAQ</a>
            </Link>
          </li>
        </ul>

        <ul className="actions">
          {/* <li>
            <HeartIcon size={ICON_SIZE} />
          </li> */}
          <li onClick={events.cart}>
            <CartIcon size={ICON_SIZE} />
          </li>

          <li>
            <UserIcon size={ICON_SIZE} />
          </li>

          <li>
            <SearchIcon size={ICON_SIZE} />
          </li>
          <li className="no-desktop">
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
        }

        @media (min-width: 769px) {
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
            width: 300px;
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
            font-size: 14px;

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

export default NavBar;
