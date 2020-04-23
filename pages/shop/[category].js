import Layout from "../../components/layout.js";
import Router, { withRouter } from "next/router";
import Link from "next/link";

import { products, categories } from "../../fakedata.js";
import ProductItem from "../../components/productItem.js";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import Modal from "../../components/modal.js";
import Filter from "../../components/filter.js";
import { useState, useEffect } from "react";
import { ShopBannerIcon } from "../../components/svgIcons.js";
import { useUpdateEffect } from "../../hooks/index.js";
import QuickProduct from "../../components/quickProduct.js";

const DEFAULT_PRICE = [20, 40];
const DEFAULT_CATEGORY = "all";
const DEFAULT_SIZE = "all";
const Shop = ({ router }) => {
  const {
    query: {
      category = DEFAULT_CATEGORY,
      minprice = DEFAULT_PRICE[0],
      maxprice = DEFAULT_PRICE[1],
      size = DEFAULT_SIZE,
    },
  } = router;

  const [filterOpen, setfilterOpen] = useState(false);

  const [filterprice, setFilterPrice] = useState(DEFAULT_PRICE);

  const [filtersize, setFilterSize] = useState(DEFAULT_SIZE);

  const updatePrice = (price) => setFilterPrice(price);
  const updateSize = (size) => setFilterSize(size);

  const [productId, setProductID] = useState(null);
  const viewProduct = (id) => setProductID(id),
    closeProduct = () => setProductID(null);

  function handleFilterState() {
    setfilterOpen((state) => !state);
  }

  useUpdateEffect(() => {
    const querystring = `?minprice=${filterprice[0]}&maxprice=${filterprice[1]}&size=${size}`;
    router.push(`/shop/${category}${querystring}`, undefined, {
      shallow: true,
    });
  }, [filterprice]);

  useUpdateEffect(() => {
    const querystring = `?minprice=${minprice}&maxprice=${maxprice}&size=${filtersize}`;
    router.push(`/shop/${category}${querystring}`, undefined, {
      shallow: true,
    });
  }, [filtersize]);

  useEffect(() => {
    if (router.query["category"]) {
      console.log("fetching");
    }
  }, [router.query]);
  return (
    <Layout>
      <main>
        <Modal open={filterOpen} closeModal={handleFilterState}>
          <Filter
            price={[minprice, maxprice]}
            size={size}
            category={category}
            updateSizeFilter={updateSize}
            updatePriceFilter={updatePrice}
          />
        </Modal>

        <Modal
          open={productId ? true : false}
          position="center"
          closeModal={closeProduct}
        >
          <QuickProduct id={productId} />
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
                <ProductItem {...product} viewProduct={viewProduct} />
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

export default withRouter(Shop);
