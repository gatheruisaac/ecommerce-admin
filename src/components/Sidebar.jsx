import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      style={{
        width: "200px",
        padding: "1rem",
        background: "#f3f4f6",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/add-product">Add Product</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;