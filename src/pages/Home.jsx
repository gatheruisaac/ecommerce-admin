import Sidebar from "../components/Sidebar"
import Hero from "../components/Hero"

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <Hero />
    </div>
  )
}

export default Home