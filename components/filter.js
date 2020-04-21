import React, { useState } from "react";

import { categories, shopcategories } from "../fakedata";
import { CircleIcon, CircleDotIcon } from "./svgIcons";
import { Range } from "rc-slider";

const sizes = [
  {
    name: "ALL",
  },
  {
    name: "XS",
  },
  {
    name: "S",
  },
  {
    name: "M",
  },
  {
    name: "L",
  },
  {
    name: "XL",
  },
];

const Filter = ({
  price,
  category: activeCategory,
  size: activeSize,
  updatePrice,
  updateCategory,
  updateSize,
}) => {
  console.log("cat", activeCategory);

  return (
    <div className="filter">
      <div className="filter-section category">
        <h5 className="title">Product Categories</h5>
        <ul>
          {shopcategories.map((cat, i) => (
            <li key={i} onClick={() => updateCategory(cat.name)}>
              <span className="icon">
                {activeCategory.toLowerCase() == cat.name.toLowerCase() ? (
                  <CircleDotIcon fill="#f57e60" size={14} />
                ) : (
                  <CircleIcon size={14} />
                )}
              </span>
              <span className="category-name">{cat.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="filter-section price">
        <h5 className="title">Filter by Price</h5>
        <div className="price-slider ">
          <Range
            allowCross={false}
            trackStyle={[{ backgroundColor: "#f57e60" }]}
            handleStyle={[
              { borderColor: "#f57e60" },
              { borderColor: "#f57e60" },
            ]}
            defaultValue={[0, 20]}
            onAfterChange={updatePrice}
          />
        </div>
        <span className="price-text">
          ${price[0]}-${price[1]}
        </span>
      </div>

      <div className="filter-section sizes">
        <h5 className="title">Filter by size</h5>
        <ul>
          {sizes.map((size, i) => (
            <li
              className={`${
                activeSize.toLowerCase() == size.name.toLowerCase()
                  ? "size-active"
                  : ""
              }`}
              key={i}
              onClick={() => updateSize(size.name)}
            >
              {size.name}
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
          padding: 10px;
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
