const Navbar = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between">
      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded"
      />
    </div>
  )
}

export default Navbar