import { useState } from "react";
import { withRouter } from "next/router";
import Error from "next/error";
import Link from "next/link";

import { useInfiniteQuery } from "react-query";
import { client } from "../../utils/contentful";

import { FiFilter, FiChevronDown } from "react-icons/fi";
import {
  Modal,
  Filter,
  Spinner,
  Layout,
  ProductSet,
  MutedInfo,
} from "../../components";

import { ShopBannerIcon } from "../../components/svgIcons.js";
import { useOnScreen, useUpdateEffect } from "../../hooks/index.js";

import { useFilter } from "../../hooks/useFilter";

const DEFAULT_PRICE = [9, 180];
const DEFAULT_CATEGORY = "all";
const DEFAULT_SIZE = "all";
const PRODUCT_LIMIT = 8;

const Shop = ({ router, availableCategories, errorCode }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const {
    updatePrice,
    updateSize,
    category,
    minprice,
    maxprice,
    size,
  } = useFilter(router, {
    DEFAULT_PRICE,
    DEFAULT_SIZE,
  });

  const loader = React.useRef(null);
  const isOnScreen = useOnScreen(loader, "25px");
  const [filterOpen, setfilterOpen] = useState(false);
  const handleFilterState = () => setfilterOpen((state) => !state);

  async function fetchProducts(key, offset = 0) {
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
  const {
    status,
    data,
    isFetchingMore,
    fetchMore,
    canFetchMore = false,
    error,
    refetch,
  } = useInfiniteQuery(
    `${category}${maxprice}${minprice}${size}`,
    fetchProducts,
    {
      getFetchMore: (lastGroup, allGroups) => {
        if (lastGroup.skip + lastGroup.limit < lastGroup.total)
          return lastGroup.skip + lastGroup.limit;
        else return false;
      },
    }
  );

  useUpdateEffect(() => {
    if (isOnScreen && canFetchMore) {
      fetchMore();
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
                      <Link
                        href={`/shop/[category]`}
                        as={`/shop/${category.name}`}
                      >
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
          <div className="catalouge">
            {status === "loading" ? (
              <Spinner />
            ) : status == "error" ? (
              error.name == "TypeError" ? (
                <MutedInfo text="sorry! no products in this category" />
              ) : (
                <>
                  <MutedInfo text="error loading products" />
                  <button style={{ width: "100%" }} onClick={() => refetch()}>
                    reload
                  </button>
                </>
              )
            ) : (
              data.map((group, i) => {
                return <ProductSet key={i} products={group} />;
              })
            )}

            <div>{isFetchingMore ? <Spinner /> : null}</div>
            <div className="loader" ref={loader}></div>
          </div>
          <div className="footer">
            {!canFetchMore && data.length > 0 ? (
              <h4 className="content">NO MORE ITEMS AVAILABLE.</h4>
            ) : null}
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
    // category = await client.getEntries({
    //   content_type: "category",
    // });
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
  // console.log(categories);

  const dummyArray = [
    { name: "suits", label: "suits", id: "1J54MzPaAb2HeGFMoYKM3H" },
    { name: "jackets", label: "jackets", id: "6hvU3wDSkI7OBYhjav9bAg" },
    { name: "trouser", label: "trouser", id: "1mpNZF0mN8kwa5awI9bl47" },
    {
      name: "accesories",
      label: "accesories",
      id: "5hVkqQli5ZLOpX2b6Amk4h",
    },
    { name: "hoodies", label: "hoodies", id: "6Ijuj0CSUHa0eVMFJ022tp" },
    { name: "summer", label: "summer", id: "7hDNDzs8ucWbH7oObQ1eTN" },
    { label: "all categories", name: "all", id: "" },
  ];

  // return {
  //   props: { errorCode, availableCategories: categories.reverse() }, // will be passed to the page component as props
  // };
  return {
    props: { errorCode, availableCategories: dummyArray.reverse() }, // will be passed to the page component as props
  };
}
export default withRouter(Shop);
