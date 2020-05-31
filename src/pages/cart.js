import { Layout } from "../components/layout.js";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import Context from "../store/context.js";
import { CartItem } from "../components";
import { getCart, emptyCart } from "../utils/api.js";
import { BagIcon, CartBannerIcon } from "../components/svgIcons.js";

export default () => {
  const {
    globalDispatch,
    globalState: { cart },
  } = useContext(Context);

  useEffect(() => {
    getCart().then((cart) =>
      globalDispatch({ type: "SETCART", payload: cart })
    );
  }, []);

  function clearCart() {
    emptyCart().then((cart) =>
      globalDispatch({ type: "SETCART", payload: cart })
    );
  }
  console.log(cart);
  return (
    <Layout>
      <div className="banner">
        <CartBannerIcon size={40} />
        <h1>Shopping Cart</h1>
      </div>
      <main>
        {cart && (
          <>
            {cart.size != 0 ? (
              <div className="wrapper">
                <div className="cart-items">
                  <table>
                    <thead className="no-mobile">
                      <tr>
                        <td>Product</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>SubTotal</td>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.items.map((item) => (
                        <CartItem
                          key={`${item.productId}${item.size}`}
                          item={item}
                        />
                      ))}
                    </tbody>
                  </table>
                  <div className="actions">
                    <button onClick={clearCart}>clear cart</button>
                    <Link href="/shop/[category]" as="/shop/all">
                      <button>back to shop</button>
                    </Link>
                  </div>
                </div>
                <div className="cart-total">
                  <h4 className="cart-total-header">cart totals</h4>
                  <div className="cart-totals-inner">
                    <div>
                      <span>SubTotal:</span> <span>${cart.subTotal}</span>
                    </div>
                    <div>
                      <span>Shipping:</span> <span>not available</span>
                    </div>
                    <div>
                      <span>Total:</span> <span>${cart.subTotal}</span>
                    </div>
                    <button className="checkout">checkout</button>
                  </div>
                </div>
              </div>
            ) : (
              <h1>No items in Cart</h1>
            )}
          </>
        )}
      </main>

      <style jsx>{`
        .banner {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin: 80px 0;
        }
        .banner h1 {
          font-size: 38px;
        }
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        main h1 {
          text-align: center;
        }

        main {
          margin: 50px 0;
        }
        .wrapper {
          margin: 30px auto;
        }
        table {
          width: 100%;
          height: 100%;
        }
        thead tr {
          display: grid;
          grid-template-columns: 1fr 100px 100px 100px;
        }
        .cart-total-header,
        thead tr {
          height: 50px;
          font-family: "Catamaran";
          text-transform: uppercase;
          font-variant: small-caps;
          border-bottom: 2px solid #888;
        }

        .cart-total {
          position: sticky;
          top: 100px;
        }
        .cart-items {
          width: 100%;
          padding: 0 10px;
          margin-bottom: 20px;
        }
        .cart-total {
          padding: 0 10px;
          width: 100%;
          min-height: 300px;
        }
        .cart-totals-inner {
          width: 100%;
        }
        .cart-total span {
          font-family: "Catamaran";
          text-transform: uppercase;
          font-variant: small-caps;
        }
        .cart-total span:first-of-type {
          font-weight: bold;
        }
        .cart-total button {
          width: 100%;
          box-shadow: none;
        }
        .actions {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        .cart-total button.checkout {
          background-color: #43aa8b;
        }
        .actions button {
          margin: 3px 0;
          width: 100%;
        }
        @media (min-width: 769px) {
          .banner h1 {
            font-size: 60px;
          }
          thead {
            display: block;
          }
          .wrapper {
            margin: 30px auto;
            width: 90%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .cart-items {
            width: 68%;
            border-right: 2px solid #888;
            padding-right: 20px;
          }
          .cart-total {
            padding: 0 10px;
            width: 30%;
            min-height: 300px;
          }

          .cart-total {
            position: static;
            top: 100px;
          }
          .actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: row;
          }
          .actions button {
            width: initial;
          }
        }
      `}</style>
    </Layout>
  );
};
