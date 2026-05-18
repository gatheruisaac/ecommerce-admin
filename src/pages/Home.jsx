import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />
        <Hero />
      </div>
    </div>
  )
}

export default Home