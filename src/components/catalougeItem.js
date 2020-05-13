import React from "react";
import { ProductItem } from "./productItem";

export const CatalougeItem = ({ products }) => {
  return (
    <div className="catalouge-items">
      {products.items.map((product) => (
        <ProductItem
          key={product.sys.id}
          product={{ ...product.fields, id: product.sys.id }}
        />
      ))}

      <style jsx>{`
        .catalouge-items {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: 350px;
          align-items: center;
          column-gap: 10px;
          row-gap: 20px;
          justify-content: center;
          margin: 20px 0;
        }

        @media (min-width: 769px) {
          .catalouge-items {
            padding: 0;
            gap: 40px 20px;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 500px;
          }
        }
      `}</style>
    </div>
  );
};
