import React from "react";
import { BagIcon } from "./svgIcons";

export const QuickCart = () => {
  return (
    <>
      <div className="empty cart">
        <div className="icon">
          <BagIcon size={35} />
        </div>

        <h5>CART IS EMPTY</h5>

        <p>Check out all the available products and buy some in the shop</p>
        <button className="close-cart">go shopping</button>
      </div>

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
      `}</style>
    </>
  );
};
