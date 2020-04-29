import React, { useState } from "react";

// import { categories, shopcategories } from "../fakedata";
import { CircleIcon, CircleDotIcon } from "./svgIcons";
import { Range } from "rc-slider";
import Link from "next/link";

const sizes = [
  {
    label: "ALL",
    name: "all",
  },
  {
    label: "XS",
    name: "xs",
  },
  {
    label: "S",
    name: "s",
  },
  {
    label: "M",
    name: "m",
  },
  {
    label: "L",
    name: "l",
  },
  {
    label: "XL",
    name: "xl",
  },
];

const Filter = ({
  price: activePrice,
  category: activeCategory,
  size: activeSize,
  updateSizeFilter,
  updatePriceFilter,
  availableCategories: shopcategories,
}) => {
  const [price, setPrice] = useState(null);

  return (
    <div className="filter">
      <div className="filter-section category">
        <h5 className="title">Product Categories</h5>
        <ul>
          {shopcategories.map((category, i) => (
            <li key={i}>
              <span className="icon">
                {activeCategory == category.name ? (
                  <CircleDotIcon fill="#f57e60" size={13} />
                ) : (
                  <CircleIcon size={13} />
                )}
              </span>
              <Link href={`/shop/${category.name}`}>
                <span className="category-name">{category.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="filter-section price">
        <h5 className="title">Filter by Price</h5>
        <div className="price-slider ">
          <Range
            max={150}
            allowCross={false}
            trackStyle={[{ backgroundColor: "#f57e60" }]}
            handleStyle={[
              { borderColor: "#f57e60" },
              { borderColor: "#f57e60" },
            ]}
            onChange={(price) => setPrice(price)}
            value={price == null ? activePrice : price}
            onAfterChange={updatePriceFilter}
          />
        </div>
        <span className="price-text">
          $
          {price == null
            ? activePrice[0] + "-" + activePrice[1]
            : price[0] + "-" + price[1]}
        </span>
      </div>

      <div className="filter-section sizes">
        <h5 className="title">Filter by size</h5>
        <ul>
          {sizes.map((size, i) => (
            <li
              className={`${activeSize == size.name ? "size-active" : ""}`}
              key={i}
              onClick={() => updateSizeFilter(size.name)}
            >
              {size.label}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .filter {
          width: 100%;
          height: 100%;
        }
        .filter-section {
          width: 70%;
          border-bottom: 0.5px solid #eee;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          margin: 0 auto;
          justify-content: center;
        }
        .filter-section .title {
          margin: 10px 0;
          text-transform: uppercase;
        }
        .price-slider {
          width: 100%;
        }
        .filter-section.category {
          padding: 20px 0;
        }

        .filter-section.category ul li {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .filter-section.category ul li .category-name {
          margin: 5px 5px;
          font-family: "Catamaran";

          font-weight: bold;
          font-variant: small-caps;
        }
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .filter-section.sizes ul {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          flex-basis: 50px;
        }
        .filter-section.sizes ul li {
          cursor: pointer;
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

        .filter-section.price .price-text {
          font-family: "Catamaran";
          color: #888;
          display: block;
          margin: 10px 0;
        }

        .size-active {
          background-color: #f57e60;
          color: #fff;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default Filter;
