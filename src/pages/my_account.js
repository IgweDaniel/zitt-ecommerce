import React from "react";
import { Layout } from "../components/";
import AuthForm from "../components/auth";

export default () => {
  return (
    <Layout>
      <main>
        <AuthForm />
      </main>
      <style jsx>{`
        main {
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </Layout>
  );
};
