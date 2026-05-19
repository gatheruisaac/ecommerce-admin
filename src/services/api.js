import axios from "axios"

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:10000"
      : "https://ecommerce-admin-1mqw.onrender.com",
})

export default API