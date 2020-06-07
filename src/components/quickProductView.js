import React, { useEffect, useState } from "react";
import { TimelineLite, Power2, CSSPlugin } from "gsap";
gsap.registerPlugin(CSSPlugin);
import ProductCarousel from "./ProductCarousel";

export const QuickProductView = ({
  productEl: { coords, url, inview, product, el },
  reset,
}) => {
  let backdrop = null,
    container = null,
    imgSection = null,
    contentSection = null,
    width = null;
  const [show, setShow] = useState(false);
  function reverse(e) {
    const tl = new TimelineLite();
    setShow(false);
    tl.to(contentSection, { opacity: 0, duration: 0 })
      .to(backdrop, { display: "none", duration: 0 })
      .to(imgSection, { width: "100%" }, "-=0.5")
      .to(container, { width: 400 })
      .to(container, {
        transform: "translateX(0)",
        left: coords.x + "px",
        top: coords.y + "px",
        width: coords.width + "px",
        height: coords.height + "px",
      })
      .to(backdrop, { opacity: 0 }, "-=1")
      .to(el, { opacity: 1, duration: 0 })
      .to(container, { opacity: 0, duration: 0 })
      .to(container, { display: "none" }, "-=0.5")
      .then(() => {
        document.body.style.overflowY = "scroll";
        reset();
      });
  }

  useEffect(() => {
    const tl = new TimelineLite();

    if (coords.x != 0 && coords.y != 0) {
      document.body.style.overflowY = "hidden";
      tl.to(container, { opacity: 1, display: "flex", duration: 0 })
        .to(container, {
          width: 400,
          top: "10%",
          height: "80vh",
          transform: "translateX(-50%)",
          left: "50%",
          duration: 0.5,
        })
        .to(backdrop, { display: "block", opacity: 0.4 }, "-=0.5")
        .to(imgSection, { width: 400 }, "-=1.4")
        .to(container, { width: 800, duration: 0.6 })
        .to(contentSection, { display: "flex" })
        .to(contentSection, { opacity: 1, ease: Power2.easeIn }, "-=0.6")
        .then(() => setShow(true));
    }
  }, [coords]);

  return (
    <>
      <div
        onClick={reverse}
        className="backdrop"
        ref={(el) => (backdrop = el)}
      ></div>
      <div
        className="quick-products"
        ref={(el) => (container = el)}
        style={{
          display: "none",
          opacity: 1,
          position: "fixed",
          top: `${coords.y}px`,
          left: `${coords.x}px`,
          height: `${coords.height}px`,
          width: `${coords.width}px`,
          zIndex: "30",
        }}
      >
        <section className="img-wrapper" ref={(el) => (imgSection = el)}>
          {show ? (
            <ProductCarousel inview={inview} renderThumbs={false}>
              {product &&
                product.images.map((img, index) => (
                  <img
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      height: "100%",
                      width: "100%",
                    }}
                    key={index}
                    src={`https://${img.fields.file.url}`}
                  />
                ))}
            </ProductCarousel>
          ) : (
            <img
              style={{
                objectFit: "cover",
                objectPosition: "center",
                height: "100%",
                width: "100%",
              }}
              src={`${url}`}
            />
          )}
        </section>

        <section className="content" ref={(el) => (contentSection = el)}>
          {product && (
            <div className="wrapper">
              <h2 className="name">{product.name}</h2>
              <h3 className="price">${product.price}</h3>
              <div className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </div>
              {product.sizes.includes("none") ? null : (
                <div className="available-sizes">
                  <h6>AVAILABLE SIZES</h6>
                  <ul>
                    {product.sizes.map((size, i) => (
                      <li key={i}>{size}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <button className="item-add">add to cart</button>
        </section>
      </div>
      <style jsx>{`
        .backdrop {
          position: fixed;
          display: none;
          top: 0;
          opacity: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #000;
          z-index: 20;
        }
        .quick-products {
          background-color: #fff;
          display: flex;
          margin: auto;
          align-items: center;
          height: 400px;
        }

        .quick-products section.img-wrapper {
          flex-shrink: 0;
          width: 100%;
          height: 100%;
          transition: all 500ms;
        }
        .quick-products .content {
          display: none;
          opacity: 0;
          height: 100%;
          flex-shrink: 0;
          position: relative;
          display: none;
          width: 50%;
          padding: 10px;
          transition: width 600ms;
        }

        img {
          object-fit: cover;
          object-position: center;
          height: 100%;
          width: 100%;
        }

        .available-sizes {
          margin: 20px 0;
        }
        .available-sizes ul {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          flex-basis: 50px;
        }
        .available-sizes li {
          margin: 10px 5px 0 0;
          border: 0.5px solid #888;
          font-family: "Catamaran";
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-variant: small-caps;
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
          bottom: 0;
          width: 95%;
        }

        .wrapper {
          width: 65%;
          margin: 40px auto;
        }
        .product-carousel {
          display: none;
          height: 100%;
        }

        .item-add {
          background-color: #43aa8b;
        }
      `}</style>
    </>
  );
};
