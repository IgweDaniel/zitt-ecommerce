import { Layout } from "../components/layout.js";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import Context from "../store/context.js";
import { CartItem } from "../components";
import { emptyCart, updateCart } from "../utils/cartActions.js";
import { CartBannerIcon } from "../components/svgIcons.js";

import { FiRefreshCw } from "react-icons/fi";
import { RiShoppingCartLine } from "react-icons/ri";

export default () => {
  const {
    globalDispatch,
    globalState: { cart },
  } = useContext(Context);

  const [pendingCart, setPendingCart] = useState(cart);

  function prepareUpdate(itemId, qty) {
    let updateCart;
    if (!pendingCart) updateCart = { ...cart };
    else updateCart = { ...pendingCart };

    const item = updateCart.items.find((item) => item.id == itemId);
    updateCart.size -= item.qty;
    updateCart.subTotal -= item.price * item.qty;
    item.qty = qty;
    updateCart.size += qty;
    updateCart.subTotal += item.price * qty;
    setPendingCart(updateCart);
  }
  useEffect(() => {
    setPendingCart(cart);
  }, [cart]);

  function update() {
    updateCart(pendingCart).then((cart) =>
      globalDispatch({ type: "SETCART", payload: cart })
    );
  }

  return (
    <Layout>
      <div className="banner">
        {/* <CartBannerIcon size={40} /> */}
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
                          prepareUpdate={prepareUpdate}
                          key={item.id}
                          item={item}
                        />
                      ))}
                    </tbody>
                  </table>
                  <div className="actions">
                    <div className="update-button" onClick={() => update()}>
                      <span className="icon">
                        <FiRefreshCw size={20} color="#000" />
                      </span>
                      <span className="label">Update</span>
                    </div>
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
                    <Link href="/checkout">
                      <button className="checkout">checkout</button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-cart">
                <RiShoppingCartLine size={80} />
                <h2>No items in Cart</h2>
                <Link href="/shop/[category]" as="/shop/all">
                  <button>back to shop</button>
                </Link>
              </div>
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

        .empty-cart {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
          align-content: center;
        }
        .cart-total-header {
          display: flex;
          align-items: center;
        }
        .cart-total-header,
        thead tr {
          height: 50px;
          font-family: "Catamaran";
          text-transform: uppercase;
          font-variant: small-caps;
          border-bottom: 2px solid #e0e0e0;
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
        .update-button {
          cursor: pointer;
          font-family: "Catamaran";
          font-variant: small-caps;
          font-size: 18px;
          height: 40px;
          text-transform: lowercase;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 130px;
          border: 2px solid #000;
          padding: 5px;
        }
        .update-button .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20%;
        }

        .update-button .label {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80%;
          text-align: center;
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
            border-right: 2px solid #e0e0e0;
            padding-right: 20px;
          }
          .cart-total {
            padding: 0 10px;
            width: 30%;
            min-height: 300px;
          }
          .cart-total {
            position: sticky;
            top: 100px;
          }

          .actions {
            display: flex;
            justify-content: flex-end;
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
