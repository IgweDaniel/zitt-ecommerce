import React, { useEffect } from "react";
import { useUpdateEffect } from "./useUpdateEffect";
import { Router } from "next/router";

export const useFilter = (router, { DEFAULT_SIZE, DEFAULT_PRICE }) => {
  const {
    query: {
      category = DEFAULT_CATEGORY,
      minprice = DEFAULT_PRICE[0],
      maxprice = DEFAULT_PRICE[1],
      size = DEFAULT_SIZE,
    },
  } = router;

  const [filterprice, setFilterPrice] = React.useState(DEFAULT_PRICE),
    [filtersize, setFilterSize] = React.useState(DEFAULT_SIZE),
    updatePrice = (price) => setFilterPrice(price),
    updateSize = (size) => setFilterSize(size);

  useUpdateEffect(() => {
    const querystring = `?minprice=${filterprice[0]}&maxprice=${filterprice[1]}&size=${size}`;
    router.push(
      `/shop/[category]${querystring}`,
      `/shop/${category}${querystring}`,
      {
        shallow: true,
      }
    );
  }, [filterprice]);

  useEffect(() => {
    updateSize(DEFAULT_SIZE);
  }, [category]);

  useUpdateEffect(() => {
    const querystring = `?minprice=${minprice}&maxprice=${maxprice}&size=${filtersize}`;
    router.push(
      `/shop/[category]${querystring}`,
      `/shop/${category}${querystring}`,
      {
        shallow: true,
      }
    );
  }, [filtersize]);

  return {
    category,
    minprice,
    maxprice,
    size,
    updatePrice,
    updateSize,
  };
};
