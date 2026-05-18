import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="w-full bg-[#7d6147] text-white px-10 py-4 flex justify-between items-center">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/products" className="hover:underline">Shop</Link>
      <Link to="/admin" className="hover:underline">Admin Portal</Link>
    </div>
  )
}

export default Sidebar