import React from "react";
import { Input, CheckBox } from "../input";

export const Register = () => {
  return (
    <div className="form-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.email.value);
          console.log(e.target.password.value);
        }}
      >
        <Input type="text" placeholder="email" name="email" />
        <Input type="password" placeholder="password" name="password" />
        <Input
          type="confirmpassword"
          placeholder="confirmpassword"
          name="confirmpassword"
        />

        <CheckBox label="remember me" />
        <div className="action">
          <button>create account</button>
        </div>
      </form>
      <style jsx>{`
        .form-wrapper {
          width: 100%;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;

          margin: auto;
        }
        form {
          width: 100%;
          margin: 30px 0 0;
          display: flex;
          background: transparent;
          justify-content: center;
          flex-direction: column;
        }

        form button {
          width: 50px;
          width: 100%;
        }
        .action {
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
        .action .link {
          //margin-left: auto;
          font-variant: small-caps;
          cursor: pointer;
          font-weight: bold;
          font-size: 18px;
          font-family: "Catamaran";
        }
      `}</style>
    </div>
  );
};
