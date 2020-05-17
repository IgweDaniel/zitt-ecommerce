import React, { useState, useContext } from "react";
import { NumberInput } from "./input";
import { TiTimesOutline } from "react-icons/ti";
import Context from "../store/context";
import axios from "axios";
import Link from "next/link";

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

  return (
    <>
      <div className="cart-item">
        <div className="item-info">
          <div className="image-wrapper">
            <Link href="/product/[id]" as={`/product/${item.productId}`}>
              <img src={`https://${item.img}`} alt="" />
            </Link>
          </div>
          <div className="content">
            <div>
              <h3 className="name">{item.name}</h3>
              <div className="item-size">
                <span>SIZE-</span>
                <span className="size">{item.size}</span>
              </div>
            </div>
            <span className="price">${item.price}</span>
          </div>
        </div>
        <div className="item-form">
          <NumberInput
            min={1}
            max={10}
            value={qty}
            onChange={(val) => setQty(val)}
          />
        </div>
        <div className="item-total">
          <span className="no-desktop">SUBTOTAL-</span>
          <span className="price">${item.qty * item.price}</span>
        </div>
        <div
          className="delete-icon"
          onClick={() =>
            deleteItem({ productId: item.productId, size: item.size })
          }
        >
          <TiTimesOutline size={24} />
        </div>
      </div>
      <style jsx>{`
        .cart-item {
          display: grid;
          position: relative;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr repeat(2, 50px);
          margin: 20px 0;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .item-info,
        .item-form,
        .item-total,
        .delete-icon {
          display: flex;
          align-items: center;
        }
        .item-info {
          height: 100%;
          width: 100%;
        }
        .item-info .content {
          flex: 2;
          margin: 0 20px;
        }
        .item-info .content .name {
          font-family: "Catamaran";
          font-size: 1.2rem;
        }
        .item-info .image-wrapper {
          flex: 1;
          cursor: pointer;
          height: 100%;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .delete-icon {
          right: 0;
          position: absolute;
          cursor: pointer;
          top: 50px;
        }
        .item-total {
          display: flex;
          align-items: center;
        }
        .item-total span {
          font-family: "Catamaran";
          display: block;
        }
        .item-size span {
          font-family: "Catamaran";
          margin: 10px 0;
        }
        .size {
          text-transform: uppercase;
        }
        .cart-item img {
          object-fit: cover;
          object-position: center;
          height: 100%;
          width: 100%;
        }
        @media (min-width: 769px) {
          .cart-item {
            display: grid;
            grid-template-columns: 1fr 250px 120px 100px;
            grid-template-rows: 150px;
            justify-content: center;
            height: 170px;
            margin: 20px 0;

            border-bottom: none;
          }

          .delete-icon {
            cursor: pointer;
          }

          .item-info,
          .item-form,
          .item-total,
          .delete-icon {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};
