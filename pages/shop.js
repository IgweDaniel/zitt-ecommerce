import Layout from "../components/layout.js";
import Router, { useRouter } from "next/router";
import Link from "next/link";

import { products, categories } from "../fakedata.js";
import ProductItem from "../components/productItem.js";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import Modal from "../components/modal.js";
import Filter from "../components/filter.js";
import { useState, useEffect } from "react";
import { ShopBannerIcon } from "../components/svgIcons.js";
import { useUpdateEffect } from "../hooks/index.js";

const DEFAULT_PRICE = [20, 40];
const DEFAULT_CATEGORY = "all";
const DEFAULT_SIZE = "all";
const Shop = () => {
  const router = useRouter();
  const query = router.query;

  const [filterOpen, setfilterOpen] = useState(false);
  const [price, setPrice] = useState(DEFAULT_PRICE);

  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [size, setSize] = useState(DEFAULT_SIZE);

  const updatePrice = (price) => setPrice(price);
  const updateSize = (size) => setSize(size);
  const updateCategory = (category) => setCategory(category);

  function handleFilterState() {
    setfilterOpen((state) => !state);
  }

  function updateShop() {
    const query = { minprice: price[0], maxprice: price[1], category, size };
    if (price[0] == DEFAULT_PRICE[0] && price[1] == DEFAULT_PRICE[1]) {
      delete query["maxprice"];
      delete query["minprice"];
    }
    if (category.toLocaleLowerCase() == DEFAULT_CATEGORY)
      delete query["category"];
    if (size.toLocaleUpperCase() == DEFAULT_SIZE) delete query["size"];

    // Router.push({
    //   pathname: "/shop",
    //   query,
    // });
    router.push("/shop/", undefined, { shallow: true });
  }
  useEffect(() => {
    updateShop();
  }, [price]);

  useEffect(() => {
    updateShop();
  }, [category]);

  useEffect(() => {
    updateShop();
  }, [size]);

  return (
    <Layout>
      <main>
        <Modal open={filterOpen} closeModal={handleFilterState}>
          <Filter
            price={price}
            size={size}
            category={category}
            updateSize={updateSize}
            updateCategory={updateCategory}
            updatePrice={updatePrice}
          />
        </Modal>

        <div className="banner">
          <div className="icon">
            <ShopBannerIcon size={75} />
          </div>
          <ul className="shop-links">
            <li>
              <Link href="/store/summer">
                <a>#SUMMER</a>
              </Link>
            </li>

            <li>
              <Link href="/store/jackets">
                <a>JACKETS</a>
              </Link>
            </li>
            <li>HOODIES</li>
            <li>TROUSER</li>
            <li>ACCESORIES</li>
            <li>SHOES</li>
          </ul>
        </div>

        <section>
          <div className="meta">
            <div className="action" onClick={handleFilterState}>
              <span className="icon">
                <FiFilter size={20} />
              </span>
              <h6>FILTER</h6>
            </div>
            <div className="info  no-mobile">
              <h6>HOME / THE SHOP</h6>
            </div>
            <div className="action dropdown">
              <h6>SORT BY LASTEST</h6>
              <span className="icon">
                <FiChevronDown size={20} />
              </span>
            </div>
          </div>
          <div className="products">
            {products.map((product) => (
              <div className="item" key={product.id}>
                <ProductItem {...product} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <style jsx global>{``}</style>
      <style jsx>{`
        main {
        }
        .banner {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .banner h1 {
          font-size: 41px;
        }
        .banner ul {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .banner ul li {
          text-align: center;
          flex-basis: 40px;
          font-size: 14px;
          margin: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #eee;
        }
        section {
          padding: 0 10px;
          margin: 50px auto;
        }
        .products {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 10px;
          justify-content: center;
        }
        .products .item {
          height: 250px;
        }
        section .meta {
          height: 70px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
        }
        section .meta .action {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        section .meta .action .icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dropdown {
          justify-self: right;
        }
        @media (min-width: 769px) {
          .banner h1 {
            font-size: 72.611px;
          }

          section {
            width: 90%;
            margin: 50px auto;
          }

          .products {
            padding: 0;
            gap: 20px;
            grid-template-columns: repeat(4, 1fr);
          }
          .products .item {
            height: 350px;
          }
          section .meta {
            align-items: center;
            grid-template-columns: 80px 1fr 200px;
          }
          section .meta .info {
            display: block;
            color: #767676;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Shop;
