import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"

const Products = () => {
  // State to store all products from the backend
  const [products, setProducts] = useState([])

  // State for search input
  const [searchTerm, setSearchTerm] = useState("")

  // State for form inputs when adding a new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })

  // Fetch products when component loads
  useEffect(() => {
    fetchProducts()
  }, [])

  // Function to fetch all products
  const fetchProducts = () => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error))
  }

  // Handle form input changes
  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    })
  }

  // Add new product
  const handleAddProduct = (e) => {
    e.preventDefault()

    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newProduct,
        price: Number(newProduct.price),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data])

        // Reset form after adding product
        setNewProduct({
          name: "",
          price: "",
          image: "",
        })
      })
      .catch((error) => console.error("Error adding product:", error))
  }

  // Delete product
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedProducts = products.filter(
          (product) => product.id !== id
        )

        setProducts(updatedProducts)
      })
      .catch((error) => console.error("Error deleting product:", error))
  }

  // Update product price
  const handlePriceUpdate = (id, currentPrice) => {
    const updatedPrice = prompt(
      "Enter new price:",
      currentPrice
    )

    if (!updatedPrice) return

    fetch(`http://localhost:3001/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: Number(updatedPrice),
      }),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        const updatedProducts = products.map((product) =>
          product.id === id ? updatedProduct : product
        )

        setProducts(updatedProducts)
      })
      .catch((error) => console.error("Error updating price:", error))
  }

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navbar */}
        <Navbar />

        {/* Page Heading */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all coffee products here.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm"
          />
        </div>

        {/* Add Product Form */}
        <form
          onSubmit={handleAddProduct}
          className="bg-white p-6 rounded-xl shadow mt-6"
        >
          <h2 className="text-2xl font-bold mb-4">
            Add New Product
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={handleChange}
              className="p-3 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-[#1f3a2e] text-white px-6 py-3 rounded-lg"
          >
            Add Product
          </button>
        </form>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              {/* Product Details */}
              <div className="p-4">
                <h2 className="text-xl font-bold">
                  {product.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  ${product.price}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      handlePriceUpdate(
                        product.id,
                        product.price
                      )
                    }
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    Update Price
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(product.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-gray-500 text-lg">
              No products found.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products