import React, { useRef, Fragment } from "react";
import { ViewIcon } from "./svgIcons";

const ProductItem = ({ images, id, name, price, viewProduct }) => {
  const displayRef = useRef(null);
  const actionRef = useRef(null);
  function handleHover() {
    displayRef.current.children[0].classList.add("hover");
    actionRef.current.classList.add("animate");
  }
  function handleLeave() {
    displayRef.current.children[0].classList.remove("hover");
    actionRef.current.classList.remove("animate");
  }
  return (
    <>
      <div
        className="product"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <div className="image-container" ref={displayRef}>
          {images.map((url, i) => (
            <Fragment key={i}>
              <img src={url} />
            </Fragment>
          ))}
        </div>
        <div className="info">
          <span className="name">{name}</span>
          <span className="price">{price}$</span>
        </div>
        <div
          className="action no-mobile"
          ref={actionRef}
          onClick={() => viewProduct(id)}
        >
          <div className="icon">
            <ViewIcon size={15} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .product {
          position: relative;
          cursor: pointer;
          height: 100%;
          width: 100%;
          align-items: center;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
        .hover {
          opacity: 0;
          transition: 0.2s ease-in-out;
        }

        .image-container {
          position: relative;
          height: 80%;
          width: 100%;
        }

        .image-container img {
          position: absolute;
          top: 0;
          left: 0;
          transition: 0.2s ease-in-out;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .image-container img:nth-of-type(1) {
          z-index: 2;
        }

        .info {
          font-weight: 100;
          width: 100%;
          display: flex;

          justify-content: center;
          flex-direction: column;
        }
        .info span {
          display: block;
          margin: 5px 0;
        }
        .info span.name {
          font-weight: 600;
          font-size: 13px;
          font-style: normal;
          font-family: "Catamaran";
        }
        .info span.price {
          color: #888;
        }

        @media (min-width: 769px) {
          .action {
            top: 80%;
            left: 50%;
            position: absolute;
            transform: translate(-50%, -120%);
            z-index: 2;
            background-color: #fff;
            width: 35px;
            height: 30px;
            display: flex;
            transition: all 0.2s ease-in-out;
            opacity: 0;
            justify-content: center;
            align-items: center;
            border-radius: 2px;
          }
          .action.animate {
            opacity: 1;

            transition: all 0.2s ease-in-out;
          }
        }
      `}</style>
    </>
  );
};

export default ProductItem;
