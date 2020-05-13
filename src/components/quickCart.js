import React, { useContext, useEffect, useState } from "react";
import { BagIcon, BinIcon } from "./svgIcons";
import Context from "../store/context";
import axios from "axios";

export const QuickCart = ({ fetch }) => {
  const { globalDispatch } = useContext(Context);
  const [cart, setCart] = useState(null);

  async function fetchCart() {
    const {
      data: { data },
    } = await axios.get("/api/cart");
    setCart(data.cart);
  }

  async function deleteItem({ productId, size }) {
    const {
      data: { data },
    } = await axios.delete("/api/cart", {
      data: {
        productId,
        size,
      },
    });

    setCart(data.cart);
    globalDispatch({ type: "CARTMAPUPDATE", payload: data.cart.map });
  }
  useEffect(() => {
    if (fetch) fetchCart();
  }, [fetch]);
  return (
    <>
      {cart && cart.items.length > 0 ? (
        <div className="cart full">
          <div className="cart-items">
            {cart.items.map((item) => {
              return (
                <div className="item" key={`${item.productId}${item.size}`}>
                  <span
                    className="icon remove-item"
                    onClick={() => deleteItem(item)}
                  >
                    <BinIcon size={20} />
                  </span>
                  <div className="item-image">
                    <img src={`https://${item.img}`} alt="" />
                  </div>
                  <div className="item-info">
                    <span>
                      {item.name}- {item.size}
                    </span>
                    <span>
                      {item.qty} x ${item.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="total">Total: ${cart.subTotal}</div>
          <button>view cart</button>
          <button className="checkout">checkout</button>
        </div>
      ) : (
        <div className="empty cart">
          <div className="icon">
            <BagIcon size={20} />
          </div>
          <h5>CART IS EMPTY</h5>

          <p>Check out all the available products and buy some in the shop</p>
          <button className="close-cart">go shopping</button>
        </div>
      )}

      <style jsx>{`
        .cart.empty {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
        }
        .cart.empty .icon {
          margin: 20px 0;
        }
        .cart.empty p {
          width: 80%;
          margin: 10px 0;
          font-family: "Catamaran";
        }

        .cart.full {
          display: flex;
          align-items: center;
          height: 100%;
          flex-direction: column;
        }

        .cart.full button {
          width: 90%;
          margin: 0 auto 10px;
          padding: 10px 0;
        }
        .cart.full .total {
          font-family: "Catamaran";
          text-transform: lowercase;
          font-variant: small-caps;
          margin: 0 auto 10px;
          font-weight: bold;
        }
        .cart.full button.checkout {
          background-color: #43aa8b;
        }

        .cart-items {
          width: 80%;
          margin: 40px auto;
        }

        .item {
          position: relative;
          height: 150px;
          margin: 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 0 20px;
          border-bottom: 2px solid #eee;
        }

        .remove-item {
          right: 0;
          top: 50%;
          cursor: pointer;
          position: absolute;
        }
        .remove-item:hover svg {
          fill: red !important;
          background-color: red;
        }
        .item-info {
          width: 60%;
          padding: 10px;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
        .item-info span {
          margin: 5px 0;
          font-family: "Catamaran";
          text-transform: lowercase;
          font-variant: small-caps;
          font-weight: bold;
        }
        .item-image {
          height: 100%;
          width: 40%;
        }

        .item-image img {
          height: 100%;
          width: 100%;

          image-rendering: crisp-edges;
          object-fit: cover;
          object-position: center;
        }
      `}</style>
    </>
  );
};
