import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="w-full bg-[#7d614799] text-white px-10 py-4 flex justify-between items-center h-auto">
      <Link to="/" className="text-[#ffffff] hover:underline">Home</Link>
      <Link to="/products" className="text-[#ffffff] hover:underline">Shop</Link>
      <Link to="/admin" className="text-[#ffffff] hover:underline">Admin Portal</Link>
    </div>
  )
}

export default Sidebar