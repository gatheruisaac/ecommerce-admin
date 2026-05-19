import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import API from "../services/api"

const Products = () => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  // GET PRODUCTS
  const fetchProducts = async () => {
    try {
      const response = await API.get("/products")
      setProducts(response.data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  // HANDLE FORM INPUTS
  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    })
  }

  // ADD PRODUCT
  const handleAddProduct = async (e) => {
    e.preventDefault()

    try {
      const response = await API.post("/products", {
        ...newProduct,
        price: Number(newProduct.price),
      })

      setProducts([...products, response.data])

      setNewProduct({
        name: "",
        price: "",
        image: "",
      })
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`)

      setProducts(products.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  // UPDATE PRICE
  const handlePriceUpdate = async (id, currentPrice) => {
    const updatedPrice = prompt("Enter new price:", currentPrice)

    if (!updatedPrice) return

    try {
      const response = await API.patch(`/products/${id}`, {
        price: Number(updatedPrice),
      })

      setProducts(
        products.map((p) =>
          p.id === id ? response.data : p
        )
      )
    } catch (error) {
      console.error("Error updating price:", error)
    }
  }

  // SEARCH
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen bg-[#a08060]">
      <Sidebar />

      <div className="flex flex-1">

        {/* LEFT SIDEBAR */}
        <div className="w-44 px-4 pt-5 flex flex-col gap-3 shrink-0">

          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-full border border-[#c4a882] bg-[#c4a882] text-white placeholder-white text-sm focus:outline-none"
          />

          <div className="flex flex-col gap-2 mt-1">
            {["Location 1", "Location 2", "Location 3", "Location 4"].map((loc) => (
              <label
                key={loc}
                className="flex items-center gap-2 text-white text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 accent-white rounded-sm"
                />
                {loc}
              </label>
            ))}
          </div>

          {/* ADD PRODUCT FORM */}
          <form
            onSubmit={handleAddProduct}
            className="flex flex-col gap-2 mt-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleChange}
              className="p-2 rounded text-sm bg-white"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleChange}
              className="p-2 rounded text-sm bg-white"
              required
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={handleChange}
              className="p-2 rounded text-sm bg-white"
              required
            />

            <button
              type="submit"
              className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* PRODUCTS GRID */}
        <div className="flex-1 p-4 grid grid-cols-2 md:grid-cols-4 gap-3">

          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative rounded-2xl overflow-hidden shadow-md aspect-[3/4] group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">

                <h2 className="font-semibold text-sm">
                  {product.name}
                </h2>

                <p className="text-xs opacity-80 line-clamp-1">
                  {product.description}
                </p>

                <p className="text-xs opacity-70">
                  {product.origin}
                </p>

                <p className="text-sm font-bold">
                  ${product.price}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition">

                  <button
                    onClick={() =>
                      handlePriceUpdate(product.id, product.price)
                    }
                    className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-lg"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products