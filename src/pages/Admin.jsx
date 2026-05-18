import Sidebar from "../components/Sidebar"

const Admin = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#a08060]">
      <Sidebar />
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Add Coffee</h2>
          <input type="text" placeholder="Coffee Name" className="w-full border p-2 rounded mb-3" />
          <input type="text" placeholder="Description" className="w-full border p-2 rounded mb-3" />
          <input type="text" placeholder="Origin" className="w-full border p-2 rounded mb-3" />
          <input type="text" placeholder="Price" className="w-full border p-2 rounded mb-3" />
          <button className="bg-[#7d6147] text-white px-6 py-2 rounded w-full">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Admin