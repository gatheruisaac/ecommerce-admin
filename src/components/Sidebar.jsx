import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#1f3a2e] text-white min-h-screen p-6">
      {/* Logo / Title */}
      <h1 className="text-3xl font-bold mb-10">
        Coffee R Us
      </h1>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <Link
          to="/"
          className="bg-[#2c4d3b] hover:bg-[#3a614c] px-4 py-3 rounded-lg transition"
        >
          Dashboard
        </Link>

        <Link
          to="/products"
          className="bg-[#2c4d3b] hover:bg-[#3a614c] px-4 py-3 rounded-lg transition"
        >
          Products
        </Link>

        <Link
          to="/admin"
          className="bg-[#2c4d3b] hover:bg-[#3a614c] px-4 py-3 rounded-lg transition"
        >
          Admin
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar