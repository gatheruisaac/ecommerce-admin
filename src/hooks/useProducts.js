import { useEffect, useState } from "react";
import API from "../services/api";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await API.get("/products");

      setProducts(response.data);

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");

      setLoading(false);
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
  };
}

export default useProducts;