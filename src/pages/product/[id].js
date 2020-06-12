import React, { useState, useEffect, useContext } from "react";
import { Layout, Spinner, ProductItem } from "../../components";
import Error from "next/error";
import Select from "react-select";
import { client } from "../../utils/contentful";
import ProductCarousel from "../../components/ProductCarousel";
import { NumberInput } from "../../components/input";

import { addCartItem } from "../../utils/cartActions";
import Context from "../../store/context";

export default function ({ product, errorCode }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  if (!product) return <Spinner />;

  const { globalDispatch } = useContext(Context);

  const {
    sys: { id },
    fields,
  } = product;
  const sizeOptions = fields.sizes.map((size) => ({
    value: size,
    label: size.toUpperCase(),
  }));

  const [currsize, setCurrSize] = useState(sizeOptions[0]);
  const [qty, setQty] = useState(1);
  const [relatedProducts, setrelatedProducts] = useState(null);

  const addToCart = async () => {
    addCartItem({ ...fields, id }, currsize.value, qty).then((cart) =>
      globalDispatch({ type: "SETCART", payload: cart })
    );

    setQty(1);
  };

  async function fetchRelated() {
    const category = fields.category.sys.id;
    const entries = await client.getEntries({
      limit: 4,
      links_to_entry: category,
      content_type: "product",
      include: 2,
    });

    setrelatedProducts(entries.items);
  }
  useEffect(() => {
    fetchRelated();
  }, []);

  return (
    <>
      <Layout>
        <div className="product">
          <section className="product-image">
            <ProductCarousel
              deps={[product.fields.name]}
              renderThumbs={true}
              deps={[product.fields.images[0].fields.file.url]}
            >
              {fields.images.map((img, index) => (
                <img src={`https://${img.fields.file.url}`} key={index} />
              ))}
            </ProductCarousel>
          </section>

          <div className="product-info">
            <div className="product-info-inner">
              <div className="info  no-mobile">
                <h6>
                  HOME / THE SHOP/ {fields.category.fields.name.toUpperCase()}
                </h6>
              </div>
              <h1 className="name">{fields.name}</h1>

              <h2 className="price">${fields.price}</h2>
              <div className="description">
                threm ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>

              {fields.sizes.includes("none") ? null : (
                <div className="available-sizes">
                  <h6>AVAILABLE SIZES</h6>
                  <div className="size-input">
                    <Select
                      blurInputOnSelect={true}
                      autoFocus={false}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: "#eee",
                          primary: "#30292f",
                        },
                      })}
                      instanceId="size-select"
                      value={currsize}
                      onChange={(val) => setCurrSize(val)}
                      options={sizeOptions}
                    />
                  </div>
                </div>
              )}
              <div className="actions">
                <div className="input-wrapper">
                  <NumberInput
                    min={1}
                    max={10}
                    value={qty}
                    onChange={(val) => setQty(val)}
                  />
                </div>
                <button className="item-add" onClick={() => addToCart(product)}>
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="additional-info">
          <h4>ADDITIONAL INFO</h4>
          <div className="additional-info-inner">
            <div>
              <span>Size and Fit</span>
              <span>Lorem ipsum dolor sit amet consectet</span>
            </div>
            <div>
              <span>Care Info</span>
              <span>Dry clean only</span>
            </div>
            <div>
              <span>Size</span>
              <span>
                {fields.sizes.reduce(
                  (acc, el) =>
                    el != "none" ? acc + el.toUpperCase() + "," : "",
                  ""
                )}
              </span>
            </div>
            <div>
              <span>Composition</span>
              <span>Lorem ipsum dolor sit amet, consectetur</span>
            </div>
          </div>
        </div>

        <div className="related-products">
          <h4>RELATED PRODUCTS</h4>
          {relatedProducts ? (
            <div className="related-products-inner">
              {relatedProducts.map((product) => (
                <ProductItem
                  key={product.sys.id}
                  product={{ ...product.fields, id: product.sys.id }}
                />
              ))}
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </Layout>

      <style jsx>{`
        .product-carousel {
          display: flex !important;
        }
        .product {
          margin: auto;
          width: 90%;
          display: flex;
          flex-direction: column;
        }
        .product-image {
          flex: 1;
          width: 100%;
          height: 400px;
        }
        .product-image img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .product-info {
          position: relative;
          width: 100%;
        }

        .product-info-inner {
          position: relative;
          width: 95%;
          margin: 40px auto;
          height: 100%;
        }

        .available-sizes {
          margin: 20px 0;
        }
        .available-sizes h6 {
          font-size: 16px;
        }

        .size-input {
          margin: 20px 0 0;
        }

        .product-info .name {
          margin: 20px 0;
          font-size: 25px;
        }
        .product-info .price {
          margin: 5px 0;

          color: #ef8e74;
        }
        .product-info .description {
          margin: 10px 0;
          line-height: 1.5;
          font-variant: small-caps;
          width: 100%;
          font-size: 18px;
          text-transform: lowercase;
          font-weight: 600;
          font-family: "Catamaran";
        }
        .product-info button {
          margin: 10px 0;
          box-shadow: none;
          border-radius: none;
          width: 65%;
          //  background-color: #43aa8b;
        }
        .actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .actions .input-wrapper {
          width: 20%;
        }
        .additional-info {
          margin: 40px auto;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .additional-info h4 {
          border-bottom: 2px solid #000;
          padding: 10px;
        }
        .additional-info-inner {
          margin: 20px auto;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .additional-info-inner div {
          display: flex;
          justify-content: space-between;
          flex: 1;
          padding: 10px;
          width: 100%;
        }
        .additional-info-inner span {
          font-family: "Catamaran";
          width: 65%;
        }
        .additional-info-inner span:first-of-type {
          text-transform: lowercase;
          font-variant: small-caps;
          font-size: 20px;
          font-weight: bolder;
          width: 30%;
          margin-left: auto;
        }
        .related-products {
          margin: 20px auto;
          width: 95%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .related-products h4 {
          margin: 20px;
        }
        .related-products-inner {
          margin: 20px 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 400px;
          gap: 10px;
          height: 100%;
          width: 100%;
        }
        @media (min-width: 769px) {
          .product {
            justify-content: center;
            flex-direction: row;
            height: 600px;
            width: 80%;
          }
          .related-products {
            margin: 20px auto;
            width: 80%;
          }
          .related-products-inner {
            margin: 20px;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 470px;
            gap: 20px;
          }
          .info {
            display: block;
            color: #767676;
            margin: 0 0 40px;
          }
          .product-image {
            width: 50%;
            height: 80%;
          }
          .product-info {
            height: 100%;
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .product-info-inner {
            width: 75%;
            margin: 0px auto;
          }
          .product-info .name {
            margin: 20px 0;
          }
          .product-info .price {
            margin: 5px 0;
            color: #ef8e74;
          }
          .product-info .description {
            font-size: 18px;
            width: 90%;
          }

          .additional-info-inner span {
            width: 50%;
          }
          .additional-info-inner span:first-of-type {
            width: 50%;
          }

          .additional-info {
            width: 50%;
            max-width: 600px;
          }
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps({ params }) {
  let product = null,
    errorCode = null;

  try {
    product = await client.getEntry(`${params.id}`);
    console.log(product);
  } catch (error) {
    /**
     * CHECK ERROR TYPES.....AND HANDLE ERRORS WELL (connection error, server error e.t.c)
     */
    errorCode = 500;
    console.log("error", error);
  }

  return {
    props: { errorCode, product }, // will be passed to the page component as props
  };
}
