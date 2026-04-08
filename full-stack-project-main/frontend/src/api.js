const BASE_URL = "http://localhost:8080/api";

/* ---------------- USERS ---------------- */

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Invalid login");

  return await res.json();
}

export async function register(user) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Register failed");

  return await res.json();
}

export async function fetchAllUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  return await res.json();
}

/* ---------------- PRODUCTS ---------------- */

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return await res.json();
}

export async function createProduct(farmerId, product) {
  const res = await fetch(
    `${BASE_URL}/products?farmerId=${farmerId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    }
  );

  return await res.json();
}

/* ---------------- ORDERS ---------------- */

export async function fetchOrders() {
  const res = await fetch(`${BASE_URL}/orders`);

  if (!res.ok) throw new Error("Failed to fetch orders");

  return await res.json();
}

export async function createOrder(
  buyerId,
  productId,
  quantity
) {
  const res = await fetch(
    `${BASE_URL}/orders?buyerId=${buyerId}&productId=${productId}&quantity=${quantity}`,
    {
      method: "POST",
    }
  );

  if (!res.ok) throw new Error("Failed to create order");

  return await res.json();
}
