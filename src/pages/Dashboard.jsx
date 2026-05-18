import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ padding: "1rem" }}>
          <h1>Dashboard</h1>

          <p>Welcome to ecommerce admin panel.</p>
        </main>
      </div>
    </>
  );
}

export default Dashboard;