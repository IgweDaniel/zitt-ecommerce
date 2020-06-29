import { Layout } from "../components/layout.js";

import Link from "next/link";
import { CheckoutBannerIcon, UserIcon } from "../components/svgIcons.js";
import { Input, CheckBox } from "../components/input.js";
import { useContext, useState } from "react";
import Context from "../store/context.js";

const Checkout = () => {
  const {
    globalDispatch,
    globalState: { cart },
  } = useContext(Context);
  const [show, setshow] = useState(false);
  return (
    <Layout>
      <main>
        <div className="banner">
          {/* <CheckoutBannerIcon size={70} /> */}
          <h1>Checkout</h1>
        </div>
        <div className={`checkout-info ${show ? "show" : ""}`}>
          <div className="text">
            <UserIcon size={20} /> Returning customer?
            <span
              className="button-link"
              onClick={() => setshow((show) => !show)}
            >
              LOGIN HERE
            </span>
          </div>
          {show && (
            <div className="auth-form">
              <Input type="text" placeholder="email" name="email" />
              <Input type="password" placeholder="password" name="password" />
              <CheckBox label="remember me" />
              <div className="action">
                <button>login</button>
                <h5 className="link">forgot password?</h5>
              </div>
            </div>
          )}
        </div>
        <div className="content">
          <div className="billing-form">
            <h2>Billing Details</h2>

            <div className="input-group">
              <div className="input">
                <Input type="text" placeholder="first name" name="firstname" />
              </div>

              <div className="input">
                <Input type="text" placeholder="last name" name="lastname" />
              </div>
            </div>
            <div className="input">
              <Input type="text" placeholder="email" name="email" />
            </div>
            <div className="input">
              <Input type="text" placeholder="address" name="address" />
            </div>
            <div className="input-group">
              <div className="input">
                <Input type="text" placeholder="street" name="street" />
              </div>

              <div className="input">
                <Input type="text" placeholder="town" name="town" />
              </div>
            </div>

            <div className="input">
              <Input type="text" placeholder="zip" name="zip" />
            </div>

            <CheckBox label="create a customer account" />
            <div className="input">
              <Input
                type="text-area"
                placeholder="order notes"
                multiline
                name="email"
              />
            </div>

            <br />
          </div>

          {cart && (
            <div className="cart-total">
              <h4 className="cart-total-header">cart totals</h4>
              <div className="cart-totals-inner">
                <div className="products">
                  {cart.items.map((item) => {
                    return (
                      <div className="product-item" key={item.id}>
                        <span className="name">
                          {item.name}- {item.size}
                        </span>
                        <span className="price">
                          {item.qty} x ${item.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <span>SubTotal:</span> <span>${cart.subTotal}</span>
                </div>
                <div>
                  <span>Shipping:</span> <span>not available</span>
                </div>
                <div>
                  <span>Total:</span> <span>${cart.subTotal}</span>
                </div>
                <div className="actions">
                  <button className="checkout">Place order</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <style jsx global>{``}</style>
      <style jsx>{`
        main {
          width: 90%;

          margin: auto;
        }
        .banner {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          margin: 40px 0;
        }
        .banner h1 {
          font-size: 38px;
        }
        .checkout-info {
          max-width: 500px;
          margin: 0 auto;
          overflow: hidden;
          height: 50px;
          transition: all 0.5s ease-in-out;
        }
        .show {
          height: 300px;
          transition: all 0.5s ease-in-out;
        }
        .text {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 15px 0;
        }
        .button-link {
          margin: 0 5px;
          color: #ef8e74;
          cursor: pointer;
        }
        .content {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .billing-form {
          width: 100%;
        }
        .billing-form h2 {
          font-family: "Catamaran";
          text-transform: uppercase;
          font-variant: small-caps;
          text-align: center;
        }
        .input {
          margin: 12px 0;
        }
        .input-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .input-group .input {
          width: 48%;
        }
        .cart-total-header {
          display: flex;
          align-items: center;
        }
        .cart-total-header {
          height: 50px;
          font-family: "Catamaran";
          text-transform: uppercase;
          font-variant: small-caps;
          border-bottom: 2px solid #e0e0e0;
        }

        .cart-total {
          width: 100%;
          min-height: 300px;
        }
        .cart-totals-inner {
          position: relative;
          width: 100%;
          height: 100%;
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
        .products {
          margin: 20px 0;
        }

        .products span {
          display: block;
        }
        .products .name {
          font-size: 14px;
          color: #888;
        }
        .products .price {
        }

        .actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        button.checkout {
          width: 100%;
          background-color: #43aa8b;
        }
        @media (min-width: 769px) {
          .banner h1 {
            font-size: 60px;
          }

          .content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-direction: row;
          }
          .billing-form {
            width: 66%;
          }
          .billing-form h2 {
            text-align: left;
          }
          .cart-total {
            padding: 20px 20px;
            width: 30%;
            background-color: #fdfdfd;
            border: 1px dashed #ccc;
          }
          .cart-totals-inner {
            height: 100%;
            padding: 0 10px;
          }

          .actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-self: flex-end;
            width: 100%;
            /* position: absolute;
            bottom: 80px; */
          }
        }
      `}</style>
    </Layout>
  );
};

export default Checkout;
