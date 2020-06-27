import React, { useState, useContext, useEffect } from "react";
import { NumberInput } from "./input";
import { TiTimes } from "react-icons/ti";

import Context from "../store/context";
import { removeCartItem } from "../utils/cartActions";
import Link from "next/link";
import { useUpdateEffect } from "../hooks";
import { BinIcon } from "./svgIcons";

export const CartItem = ({ item, prepareUpdate }) => {
  const [qty, setQty] = useState(item.qty);
  const { globalDispatch } = useContext(Context);

  async function deleteItem() {
    removeCartItem(item.id).then((cart) =>
      globalDispatch({ type: "SETCART", payload: cart })
    );
  }
  console.log(item.productId);

  useUpdateEffect(() => {
    prepareUpdate(item.id, qty);
  }, [qty]);

  return (
    <>
      <tr className="cart-item">
        <td className="delete-icon">
          <span onClick={() => deleteItem()}>
            <BinIcon size={15} />
          </span>
        </td>
        <Link href="/product/[id]" as={`/product/${item.productId}`}>
          <td className="product">
            <div className="img-container">
              <img src={`https://${item.img}`} alt="" />
            </div>
            <div className="content">
              <h4>{item.name}</h4>
              <div className="size">Size-{item.size}</div>
            </div>
          </td>
        </Link>
        <td className="price">
          <span className="no-desktop">Price</span>${item.price}
        </td>
        <td>
          <NumberInput min={1} value={qty} onChange={setQty} />
        </td>
        <td>
          <span className="no-desktop">subtotal</span>${item.qty * item.price}
        </td>
      </tr>
      <style jsx>{`
        .cart-item {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;

          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .img-container {
          height: 150px;
          width: 100%;
          max-width: 140px;
          margin-bottom: 5px;
        }
        .img-container img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .delete-icon {
          position: absolute;
          right: 0;
          cursor: pointer;
        }
        .product {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          height: 230px;
          margin: 0px;
          cursor: pointer;
        }
        td {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 0;
        }

        td span {
          font-family: "Catamaran";
          text-transform: uppercase;
          font-variant: small-caps;
          margin: 0 5px;
        }
        .product .content {
          /* flex: 1; */
          text-align: center;
          width: 100%;
          margin: 5px 20px;
          font-family: "Catamaran";
          text-transform: uppercase;
          font-variant: small-caps;
        }
        .size {
          color: #888;
        }
        .price {
          color: #888;
          font-family: "Catamaran";
          font-size: 20px;
          font-weight: bold;
        }
        @media (min-width: 769px) {
          .product {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-direction: row;
            width: 100%;
            height: 100%;
          }
          .delete-icon {
            position: static;
          }
          .img-container {
            height: 100%;
            width: 120px;
            margin-bottom: 0px;
          }
          .product .content {
            /* flex: 1; */
            width: calc(100% - 80px);
            margin: 0 20px;
          }
          .cart-item {
            width: 100%;
            display: grid;
            grid-template-columns: 40px 1fr 89px 130px 90px;
            align-items: center;
            align-content: center;
            grid-auto-rows: 130px;
            height: 150px;
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          td {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
};
