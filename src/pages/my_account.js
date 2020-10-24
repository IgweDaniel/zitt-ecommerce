import React from "react";
import { Layout } from "../components/";
import AuthForm from "../components/auth";
import { Dashboard } from "../components/dashboard";

export default () => {
  const user = null;
  return (
    <>
      <main>{user ? <Dashboard /> : <AuthForm />}</main>
      <style jsx>{`
        main {
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};
