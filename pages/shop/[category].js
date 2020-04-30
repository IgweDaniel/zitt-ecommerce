import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import Error from "next/error";
import Link from "next/link";

import useSWR, { useSWRPages } from "swr";
import * as contentful from "contentful";

import { FiFilter, FiChevronDown } from "react-icons/fi";

import {
  Modal,
  Filter,
  QuickProduct,
  Spinner,
  Layout,
  CatalougeItem,
  MutedInfo,
} from "../../components";

import { ShopBannerIcon } from "../../components/svgIcons.js";
import { useUpdateEffect, useOnScreen } from "../../hooks/index.js";

const DEFAULT_PRICE = [9, 180];
const DEFAULT_CATEGORY = "all";
const DEFAULT_SIZE = "all";
const PRODUCT_LIMIT = 8;
const client = contentful.createClient({
  space: process.env.contentfulSpaceId,
  accessToken: process.env.contentfulAccessToken,
});

const Shop = ({ router, availableCategories, errorCode }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
  const {
    query: {
      category = DEFAULT_CATEGORY,
      minprice = DEFAULT_PRICE[0],
      maxprice = DEFAULT_PRICE[1],
      size = DEFAULT_SIZE,
    },
  } = router;

  const [filterOpen, setfilterOpen] = useState(false);

  const [filterprice, setFilterPrice] = useState(DEFAULT_PRICE),
    [filtersize, setFilterSize] = useState(DEFAULT_SIZE),
    updatePrice = (price) => setFilterPrice(price),
    updateSize = (size) => setFilterSize(size);

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

  const loader = React.useRef(null);
  const isOnScreen = useOnScreen(loader, "40px");

  async function fetchProducts(offset) {
    const { id } =
      category == DEFAULT_CATEGORY
        ? ""
        : availableCategories.find((cat) => cat.name == category);
    let obj = { "fields.sizes[in]": size };
    if (size == DEFAULT_SIZE) delete obj["fields.sizes[in]"];
    const entries = await client.getEntries({
      limit: PRODUCT_LIMIT,
      links_to_entry: id,
      skip: offset,
      "fields.price[lte]": maxprice,
      content_type: "product",
      "fields.price[gte]": minprice,
      ...obj,
      include: 2,
    });
    return entries;
  }
  const { pages, isReachingEnd, loadMore } = useSWRPages(
    "product/2",
    ({ offset, withSWR }) => {
      const { data, error } = withSWR(
        useSWR("products" + offset, async () => fetchProducts(offset || 0))
      );

      if (error) {
        const message =
          error.name == "TypeError" ? (
            <MutedInfo text="sorry! no products in this category" />
          ) : (
            <MutedInfo text="Error loading products" />
          );
        return message;
      }
      if (!data) return <Spinner />;
      if (data.items.length == 0) return null;

      return <CatalougeItem products={data} viewProduct={viewProduct} />;
    },
    (SWR, index) => {
      if (index * PRODUCT_LIMIT >= SWR.data.total) return null;
      return (index + 1) * PRODUCT_LIMIT;
    },
    []
  );

  useEffect(() => {
    if (isOnScreen) {
      loadMore();
    }
  }, [isOnScreen]);

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
            availableCategories={availableCategories}
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
          {category == DEFAULT_CATEGORY ? (
            <>
              <div className="icon">
                <ShopBannerIcon size={75} />
              </div>
              <ul className="shop-links">
                {availableCategories.map((category) =>
                  category.name !== DEFAULT_CATEGORY ? (
                    <li key={category.id}>
                      <Link href={`/shop/${category.name}`}>
                        <a>{category.label.toUpperCase()}</a>
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </>
          ) : (
            <h1 className="banner-title">{category}</h1>
          )}
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
              <h6>HOME / THE SHOP/ {category.toUpperCase()}</h6>
            </div>
            <div className="action dropdown">
              <h6>SORT BY LASTEST</h6>
              <span className="icon">
                <FiChevronDown size={20} />
              </span>
            </div>
          </div>
          <div className="catalouge">{pages}</div>
          <div className="footer">
            {isReachingEnd ? (
              <h4 className="content">NO MORE ITEMS AVAILABLE.</h4>
            ) : (
              <div className="loader" ref={loader}></div>
            )}
          </div>
        </section>
      </main>

      <style jsx>{`
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
          flex-basis: 30px;
          font-size: 14px;
          margin: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #eee;
          transition: all 0.3s ease-in-out;
        }

        .banner ul li:hover {
          color: #ef8e74;
          border-bottom: none;
          transition: all 0.3s ease-in-out;
        }

        .banner-title {
          text-transform: capitalize;
          font-family: "Catamaran";
        }
        section {
          padding: 0 10px;
          margin: 20px auto;
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

        section .footer {
          display: flex;
          justify-content: center;
        }

        section .footer .content {
          text-align: center;
          width: 100%;
          height: 40px;
          margin: 20px 0;
          font-family: "Catamaran";
          text-transform: capitalize;
          color: #888;
        }
        .dropdown {
          justify-self: right;
        }
        @media (min-width: 769px) {
          .banner h1 {
            font-size: 50.611px;
          }

          section {
            width: 90%;
            margin: 50px auto;
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

export async function getServerSideProps(context) {
  let category,
    errorCode = null;

  try {
    category = await client.getEntries({
      content_type: "category",
    });
  } catch (error) {
    errorCode = 500;
    console.log("error", error);
  }

  const categories = category
    ? category.items.map((item) => {
        return {
          name: item.fields.name,
          label: item.fields.name,
          id: item.sys.id,
        };
      })
    : [];
  categories.push({ label: "all categories", name: "all", id: "" });

  return {
    props: { errorCode, availableCategories: categories.reverse() }, // will be passed to the page component as props
  };
}
export default withRouter(Shop);
