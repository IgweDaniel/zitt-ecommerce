import React from "react";

const initialProduct = {
  coords: { x: 0, y: 0, height: 0, width: 0 },
  url: "",
  inview: false,
  product: null,
  el: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { isLoggedIn: true };
    case "LOGOUT":
      return { isLoggedIn: false };
    case "CARTUPDATE":
      const newState = {
        ...state,
        cart: [...state.cart, action.payload],
      };
      const cart = localStorage.getItem("cart");
      if (cart) {
        const data = JSON.parse(cart);
        localStorage.setItem("cart", JSON.stringify([...newState.cart]));
      } else localStorage.setItem("cart", JSON.stringify(newState.cart));

      return newState;
    case "CARTMAPUPDATE":
      return { ...state, cartMap: action.payload };
    case "SETPRODUCT":
      return { ...state, product: action.payload };
    case "UNSETPRODUCT":
      return {
        ...state,
        product: {
          ...initialProduct,
        },
      };
    default:
      return state;
  }
};

const initialState = {
  customer: null,
  cart: [],
  cartMap: [],
  product: {
    ...initialProduct,
  },
};

const useGlobalState = () => {
  const [globalState, globalDispatch] = React.useReducer(reducer, initialState);
  return { globalDispatch, globalState };
};

export default useGlobalState;
