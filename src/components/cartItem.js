import React, { useState, useContext } from "react";
import { NumberInput } from "./input";
import { TiTimes } from "react-icons/ti";
import Context from "../store/context";
import axios from "axios";
import Link from "next/link";
import { BinIcon } from "./svgIcons";

export const CartItem = ({ item }) => {
  const [qty, setQty] = useState(item.qty);
  const { globalDispatch } = useContext(Context);

  async function deleteItem({ productId, size }) {
    const {
      data: { data },
    } = await axios.delete("/api/cart", {
      data: {
        productId,
        size,
      },
    });

    globalDispatch({ type: "SETCART", payload: data.cart });
  }
  console.log(item);

  return (
    <>
      <tr className="cart-item">
        <td className="delete-icon">
          <TiTimes size={20} />
        </td>
        <td className="product">
          <div className="img-container">
            <img src={`https://${item.img}`} alt="" />
          </div>
          <div className="content">
            <h4>{item.name}</h4>
            <div>Size-{item.size}</div>
          </div>
        </td>
        <td className="price">
          <span className="no-desktop">Price</span>${item.price}
        </td>
        <td>
          <NumberInput value={qty} onChange={setQty} />
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
          height: 140px;
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
        }
        .product {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          height: 200px;
          margin: 0px;
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
          margin: 0 20px;
        }
        .price {
          color: #888;
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
