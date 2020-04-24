import Layout from "../components/layout.js";

import { useViewport } from "../hooks/";
import { categories } from "../fakedata.js";
import Link from "next/link";

const Home = () => {
  return (
    <Layout>
      <main>
        <div className="banner">
          <img src="/badge-hello-summer.webp" alt="" />
          <h5>SALES UP TO 75% / FREE SHIPPING & RETURNS</h5>
        </div>

        <div className="showcase">
          {categories.map(({ img, id, name, link }) => (
            <Link href="/shop/[category]" as={link}>
              <div className="showcase-item" key={id}>
                <img src={img} alt="" />
                <span>{name}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="banner">
          <img src="/thank-you.png" alt="" />
        </div>
      </main>

      <style jsx global>{`
        body {
          background: url("/dirt-bg.gif");
        }
      `}</style>
      <style jsx>{`
        main {
          padding: 25px 15px;
        }
        .banner {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .banner img {
          object-fit: contain;
          object-position: center;
          width: 200px;
          height: 200px;
        }
        .banner h6 {
          margin: 20px 0;
        }
        .showcase {
          margin: 50px auto;
          display: grid;
          gap: 20px;
        }
        .showcase .showcase-item {
          position: relative;

          width: 100%;
          height: 100%;
          cursor: pointer;
        }
        .showcase .showcase-item span {
          position: absolute;

          top: 0;
          left: 0;
          z-index: 2;
          background-color: #fff;
          padding: 10px;
          margin: 10px;
          transition: all 0.3s ease-in-out;
        }
        .showcase .showcase-item:hover span {
          background-color: #000;
          color: #fff;
        }
        .showcase .showcase-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        @media (min-width: 769px) {
          .banner img {
            width: 250px;
            height: 250px;
          }

          .showcase {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(3, 270px);
            width: 80%;
          }
          .showcase .showcase-item:nth-child(1) {
            grid-row: span 2;
            grid-column: span 2;
          }

          .showcase .showcase-item:nth-child(2) {
            grid-row: span 2;
          }
          .showcase .showcase-item:nth-child(4) {
            grid-row: span 2;
          }
          .showcase .showcase-item:nth-child(6) {
            grid-column: span 2;
          }

          .showcase .showcase-item:nth-child(8) {
            grid-column: span 2;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Home;
