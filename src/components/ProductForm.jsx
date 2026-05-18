import { useState } from "react";

function ProductForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      name,
      price,
      category,
    });

    setName("");
    setPrice("");
    setCategory("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
      />

      <br />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      />

      <br />

      <button type="submit">
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;