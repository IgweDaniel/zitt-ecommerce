import React, { useRef } from "react";
import { products } from "../fakedata";
import { useUpdateEffect } from "../hooks";

const QuickProduct = ({ id }) => {
  const product = products.find((prod) => prod.id == id);
  const qpref = useRef(null);
  useUpdateEffect(() => {
    if (id) {
      qpref.current.classList.add("open");
      setTimeout(() => {
        qpref.current.classList.add("animate");
      }, 500);
    }
  }, [id]);

  return product ? (
    <>
      <div className="quick-products" ref={qpref}>
        <div className="preview">
          <img src={product.images[0]} alt="" />
        </div>
        <div className="content">
          <div className="wrapper">
            <h2 className="name">{product.name}</h2>
            <h3 className="price">{product.price}$</h3>
            <div className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
            </div>
          </div>

          <button>add to cart</button>
        </div>
      </div>
      <style jsx>
        {`
          .quick-products.animate {
            width: 100% !important;
            transition: all 0.5s ease-in-out;
          }
          .quick-products.open .content {
            display: block !important;
          }
          .quick-products.animate .content {
            opacity: 1;
            transition: opacity 0.5s ease-in-out 0.5s;
          }
          .quick-products {
            height: 80%;
            width: 400px;
            overflow: hidden;
            display: flex;
            align-items: center;
            background-color: #fff;
            border: 0.5px solid #eee;
            flex-shrink: 0;
            transition: all 0.5s ease-in-out;
          }

          .preview {
            flex: 1;
            flex-shrink: 0;
            width: 30%;
            height: 100%;
            min-width: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .preview img {
            height: 95%;
            width: 95%;
            object-fit: cover;
            object-position: center;
          }

          .content {
            flex: 1;
            flex-shrink: 0;
            height: 100%;
            width: 50%;
            position: relative;
            padding: 10px;
            display: none;
            opacity: 0;
            transition: opacity 0.5s ease-in-out 0.5s;
          }
          .content .name {
            margin: 20px 0;
          }
          .content .price {
            margin: 5px 0;
            color: #ef8e74;
          }
          .content .description {
            margin: 10px 0;
            font-family: "Catamaran";

            line-height: 1.5;
            font-variant: small-caps;
          }
          .content button {
            position: absolute;
            bottom: 0 !important;
            width: 95% !important;
            background-color: #ef8e74 !important;
          }
          .wrapper {
            width: 65%;
            margin: 40px auto;
          }
        `}
      </style>
    </>
  ) : null;
};

export default QuickProduct;
