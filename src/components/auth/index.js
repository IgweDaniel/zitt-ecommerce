import React, { useState } from "react";

import { Register } from "./register";
import { Login } from "./login";
import { KeyHoleIcon } from "../svgIcons";

export default () => {
  const [activeForm, setActiveForm] = useState("login");
  return (
    <>
      <div className="auth">
        <div className="auth-inner">
          <div className="header">
            <div className="header-inner">
              <span
                onClick={() => setActiveForm("login")}
                className={`${activeForm == "login" ? "active" : ""}`}
              >
                login
              </span>

              <span
                className={`${activeForm == "register" ? "active" : ""}`}
                onClick={() => setActiveForm("register")}
              >
                register
              </span>
              {/* <span
                className={`${activeForm == "reset" ? "active" : ""}`}
                onClick={() => setActiveForm("reset")}
              >
                forgot password
              </span> */}
            </div>
          </div>
          {activeForm == "login" ? <Login /> : <Register />}
        </div>
      </div>
      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth {
          width: 80%;
          max-width: 800px;

          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 800px;
        }
        .auth-inner {
          width: 100%;
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 300px;
          border: 2px solid var(--themeColor);
        }
        .header-inner span {
          /* border-bottom: 2px solid var(--themeColor);
          border-bottom: 2px solid #ebebeb; */
          flex: 1;
          display: inline-block;
          font-size: 20px;
          font-variant: small-caps;
          padding: 5px;
          text-align: center;
          color: var(--themeColor);
          font-weight: bold;
          font-family: "Catamaran", sans-serif;
          cursor: pointer;
        }
        .header-inner span.active {
          background-color: #000;
          background-color: var(--themeColor);

          color: #fff;
        }
      `}</style>
    </>
  );
};
