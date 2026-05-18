import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div style={{ padding: '10px' }} className="bg-[#7d614799] text-white p-4 flex flex-nowrap
  justify-between items-center h-fit">
      <Link to="/" className="text-[#ffffff] hover:underline">Home</Link>
      <Link to="/products" className="text-[#ffffff] hover:underline">Shop</Link>
      <Link to="/admin" className="text-[#ffffff] hover:underline ">Admin Portal</Link>
    </div>
  )
}

export default Sidebar