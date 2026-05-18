import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

import useProducts from "../hooks/useProducts";

import API from "../services/api";

function Products() {
  const {
    products,
    loading,
    error,
    fetchProducts,
  } = useProducts();

  const [search, setSearch] = useState("");

  // delete product
  async function handleDelete(id) {
    await API.delete(`/products/${id}`);

    fetchProducts();
  }

  // update product
  async function handleUpdate(id) {
    await API.patch(`/products/${id}`, {
      price: 1500,
    });

    fetchProducts();
  }

  // filter products
  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ padding: "1rem", width: "100%" }}>
          <h1>Products</h1>

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          {loading && <p>Loading...</p>}

          {error && <p>{error}</p>}

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </main>
      </div>
    </>
  );
}

export default Products;