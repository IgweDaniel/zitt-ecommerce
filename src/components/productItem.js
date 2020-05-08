import React, { useRef, Fragment, useContext } from "react";
import { ViewIcon, AddToCart } from "./svgIcons";
import Context from "../store/context";
import axios from "axios";
export const ProductItem = ({ viewProduct, product }) => {
  const {
    globalState: { cartMap },
    globalDispatch,
  } = useContext(Context);

  const addToCart = async () => {
    const {
      data: { data },
    } = await axios.post("http://localhost:4000/api/cart", {
      name: product.name,
      productId: product.id,
      price: product.price,
      qty: 1,
      size: "X",
      img: product.images[1].fields.file.url,
    });

    globalDispatch({ type: "CARTMAPUPDATE", payload: data.cartMap });
  };
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
          {product.images.slice(0, 2).map((image, i) => (
            <Fragment key={i}>
              <img src={`https://${image.fields.file.url}`} />
            </Fragment>
          ))}
        </div>
        <div className="info">
          <span className="name">{product.name}</span>
          <span className="price">{product.price}$</span>
        </div>
        <div className="action no-mobile" ref={actionRef}>
          <div className="icon" onClick={() => viewProduct(product)}>
            <ViewIcon size={15} />
          </div>

          {cartMap.includes(product.id) ? (
            <div className="icon">
              <span>view cart</span>
            </div>
          ) : (
            <div className="icon" onClick={addToCart}>
              <AddToCart size={18} />
            </div>
          )}
          {/* <AddToCart size={18} /> */}
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
          height: 70%;
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
          object-position: top;
        }
        .image-container img:nth-of-type(1) {
          z-index: 2;
        }
        .image-container img:nth-of-type(2) {
          z-index: 1;
        }

        .info {
          height: 30%;
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
          .image-container {
            height: 80%;
          }
          .info {
            height: 20%;
          }
          .action {
            top: 80%;
            left: 50%;
            position: absolute;
            transform: translate(-50%, -120%);
            z-index: 2;
            padding: 0 1rem;
            width: 100%;
            height: 30px;
            display: flex;
            transition: all 0.2s ease-in-out;
            opacity: 0;
            justify-content: space-between;
            align-items: center;
            border-radius: 2px;
          }
          .action .icon {
            width: 20%;
            width: fit-content;
            height: 100%;
            background-color: #fff;

            box-shadow: 0px 9px 20px -1px rgba(0, 0, 0, 0.16);
            padding: 0 10px;
            font-variant: small-caps;
            // max-width: 50px;
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
