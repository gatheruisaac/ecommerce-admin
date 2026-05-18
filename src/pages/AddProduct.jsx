import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductForm from "../components/ProductForm";

import API from "../services/api";

function AddProduct() {
  const navigate = useNavigate();

  async function handleAddProduct(product) {
    await API.post("/products", product);

    navigate("/products");
  }

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ padding: "1rem" }}>
          <h1>Add Product</h1>

          <ProductForm
            onSubmit={handleAddProduct}
          />
        </main>
      </div>
    </>
  );
}

export default AddProduct;