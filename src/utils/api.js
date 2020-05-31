import axios from "axios";

export async function getCart() {
  const {
    data: { data },
  } = await axios.get("/api/cart");

  return data.cart;
}

export async function addCartItem(product) {
  const {
    data: { data },
  } = await axios.post("/api/cart", {
    name: product.name,
    productId: product.id,
    price: product.price,
    qty: 1,
    size: "X",
    img: product.images[1].fields.file.url,
  });
  console.log(data);

  return data.cart;
}

export async function updateCart(product, action) {
  return;
}

export async function emptyCart(product) {
  const {
    data: { data },
  } = await axios.delete("/api/cart");

  return data.cart;
}
