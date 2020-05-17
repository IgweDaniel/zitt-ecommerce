import { Layout } from "../components/layout.js";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import Context from "../store/context.js";
import axios from "axios";
import { CartBannerIcon } from "../components/svgIcons.js";
import { CartItem } from "../components";

export default () => {
  const {
    globalDispatch,
    globalState: { cart },
  } = useContext(Context);
  // const [cart, setCart] = useState(null);

  async function fetchCart() {
    const {
      data: { data },
    } = await axios.get("/api/cart");
    globalDispatch({ type: "SETCART", payload: data.cart });
  }

  useEffect(() => {
    document.body.style.overflowY = "scroll";
    fetchCart();
  }, []);
  return (
    <Layout>
      <div className="banner">
        <div className="icon">
          <CartBannerIcon size={100} />
        </div>
        <h1>Shopping Cart</h1>
      </div>
      <main>
        <div className="wrapper">
          <section className="cart-items">
            {cart &&
              cart.items.map((item) => (
                <CartItem key={`${item.productId}${item.size}`} item={item} />
              ))}
          </section>
          {cart && (
            <section className="cart-totals">
              <div className="cart-totals-inner">
                <div className="meta">
                  <h5>CART TOTALS</h5>
                </div>
                <div className="total">
                  <span>SUBTOTAL</span>
                  <span className="price">${cart.subTotal}</span>
                </div>
                <div className="actions">
                  <button className="danger">clear cart</button>
                  <button className="checkout">checkout</button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <style jsx>{`
        .banner {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .banner h1 {
          font-size: 41px;
          font-family: "Catamaran";
          font-variant: small-caps;
        }
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        main {
          margin: 50px 0;
        }
        .wrapper {
          margin: auto;
          width: 80%;
          max-width: 900px;
        }
        .cart-totals {
          position: relative;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cart-totals-inner {
          height: 100%;
          width: 100%;
        }

        .cart-totals .meta {
          display: flex;
          align-items: center;

          border-bottom: 1px solid #eee;
          height: 40px;
        }
        .total {
          padding: 20px 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .total span {
          display: block;
          margin: 0 5px;
        }
        .total span.price {
          font-size: 20px;
          font-family: "Catamaran";
        }
        .cart-totals button {
          width: 100%;
        }
        .cart-totals button.danger {
          //background: #db3a34;
        }
        .cart-totals button.checkout {
          background-color: #43aa8b;
        }
        .actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
        }
        @media (min-width: 769px) {
          .cart-totals button {
            width: 150px;
          }
          .actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
          }
        }
      `}</style>
    </Layout>
  );
};
