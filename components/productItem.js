import React, { useRef, Fragment } from "react";

const ProductItem = ({ images, id, name, price }) => {
  const displayRef = useRef(null);
  function handleHover() {
    displayRef.current.children[0].classList.add("hover");
  }
  function handleLeave() {
    displayRef.current.children[0].classList.remove("hover");
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
          <div className="action">
            <span className="price">{price}$</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product {
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
          width: 70%;
        }
        .info span.price {
          color: #888;
        }
      `}</style>
    </>
  );
};

export default ProductItem;
