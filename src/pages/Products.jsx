import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"

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

  const fetchProducts = () => {
    fetch("https://ecommerce-admin-1mqw.onrender.com")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error))
  }

  const handleChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    fetch("https://ecommerce-admin-1mqw.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newProduct,
        price: Number(newProduct.price),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data])
        setNewProduct({ name: "", price: "", image: "" })
      })
      .catch((error) => console.error("Error adding product:", error))
  }

  const handleDelete = (id) => {
    fetch(`https://ecommerce-admin-1mqw.onrender.com/${id}`, { method: "DELETE" })
      .then(() => setProducts(products.filter((p) => p.id !== id)))
      .catch((error) => console.error("Error deleting product:", error))
  }

  const handlePriceUpdate = (id, currentPrice) => {
    const updatedPrice = prompt("Enter new price:", currentPrice)
    if (!updatedPrice) return

    fetch(`https://ecommerce-admin-1mqw.onrender.com/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: Number(updatedPrice) }),
    })
      .then((res) => res.json())
      .then((updatedProduct) => {
        setProducts(products.map((p) => (p.id === id ? updatedProduct : p)))
      })
      .catch((error) => console.error("Error updating price:", error))
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen bg-[#a08060]">
      <Sidebar />

      <div className="flex flex-1">
        {/* Left filter sidebar */}
        <div className="w-44 px-4 pt-5 flex flex-col gap-3 shrink-0">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 rounded-full border border-[#c4a882] bg-[#c4a882] text-white placeholder-white text-sm focus:outline-none"
          />

          <div className="flex flex-col gap-2 mt-1 ">
            {["Location 1", "Location 2", "Location 3", "Location 4"].map((loc) => (
              <label key={loc}x className="flex items-center gap-2 text-white text-sm cursor-pointer ">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 accent-white rounded-sm"
                />
                {loc}
              </label>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1 p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="relative rounded-2xl overflow-hidden shadow-md aspect-[3/4] group"
              style={{ minHeight: "220px" }}
            >
              {/* Background image */}
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Text content on top of image */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
                <h2 className="font-semibold text-sm leading-tight mb-0.5">
                  {product.name}
                </h2>
                <p className="text-xs opacity-80 leading-tight mb-0.5 line-clamp-1">
                  {product.description}
                </p>
                <p className="text-xs opacity-70 mb-0.5">{product.origin}</p>
                <p className="text-sm font-bold">${product.price}</p>

                {/* Action buttons - shown on hover */}
                <div className="flex gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handlePriceUpdate(product.id, product.price)}
                    className="bg-yellow-500/90 hover:bg-yellow-500 text-white text-xs px-2.5 py-1 rounded-lg transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500/90 hover:bg-red-500 text-white text-xs px-2.5 py-1 rounded-lg transition-colors"
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