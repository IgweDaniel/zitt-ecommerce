const cart_obj = {
  items: [],
  map: [],
  size: 0,
  subTotal: 0,
};

const defaultCartState = JSON.stringify(cart_obj);
export async function getCart() {
  const obj_string = localStorage.getItem("zitt_cart") || defaultCartState;
  const cart = JSON.parse(obj_string);
  return cart;
}

export async function addCartItem(product, size, qty = 1) {
  const id = `${size}${product.id}`;
  const obj_string = localStorage.getItem("zitt_cart") || defaultCartState;
  const cart = JSON.parse(obj_string);

  const item = cart.items.find((item) => item.id == id);

  if (item) {
    item.qty += qty;
  } else {
    cart.items.push({
      id,
      name: product.name,
      productId: product.id,
      price: product.price,
      qty,
      size,
      img: product.images[1].fields.file.url,
    });
    cart.map.push(product.id);
  }
  cart.size += qty;
  cart.subTotal += product.price * qty;

  localStorage.setItem("zitt_cart", JSON.stringify(cart));
  return cart;
}

export async function updateCart(cart) {
  localStorage.setItem("zitt_cart", JSON.stringify(cart));
  return cart;
}
export async function emptyCart() {
  localStorage.setItem("zitt_cart", defaultCartState);
  return cart_obj;
}

export async function removeCartItem(itemId) {
  const obj_string = localStorage.getItem("zitt_cart") || defaultCartState;
  const cart = JSON.parse(obj_string);

  const idx = cart.items.findIndex((item) => item.id == itemId);

  const item = cart.items.splice(idx, 1)[0];

  cart.size -= item.qty;
  cart.subTotal -= item.qty * item.price;
  console.log(cart.map);
  const index = cart.map.findIndex((id) => id == item.productId);
  delete cart.map[index];
  localStorage.setItem("zitt_cart", JSON.stringify(cart));
  return cart;
}
