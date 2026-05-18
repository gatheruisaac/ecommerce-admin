import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
// import Navbar from "../components/Navbar"
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
  <div className="flex flex-col min-h-screen bg-[#a08060]">
       <Sidebar />
    <div className="flex flex-1">
      {/* Left filter sidebar */}
      <div className="w-48 p-6 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-full border text-sm"
        />
        <p className="text-white text-sm mt-2">● Location 1</p>
        <p className="text-white text-sm">● Location 2</p>
        <p className="text-white text-sm">● Location 3</p>
        <p className="text-white text-sm">● Location 4</p>
      </div>

      {/* Products grid */}
      <div className="flex-1 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow p-4">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-2" />
            <h2 className="font-bold">{product.name}</h2>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="text-sm text-gray-500">{product.origin}</p>
            <p className="text-sm font-semibold">${product.price}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => handlePriceUpdate(product.id, product.price)} className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-lg">Update Price</button>
              <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white text-xs px-3 py-1 rounded-lg">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Products