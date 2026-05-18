This is the Summative Lab: Building a React-Based Personal Project Showcase App

Coffee Store Admin Dashboard

A modern React + Tailwind CSS ecommerce admin dashboard for managing products.

Features
View products
Search products
Add new products
Update product prices
Delete products
Responsive product grid
Sidebar navigation
Styled with Tailwind CSS
Mock backend using JSON Server
Tech Stack
React
Vite
Tailwind CSS
JSON Server
Installation

Clone the repository:

git clone https://github.com/gatheruisaac/ecommerce-admin.git
cd ./src

Install dependencies:

npm install
Start Development Server

Run the React app:

npm run dev
Start JSON Server

Make sure you have db.json in the project root.

Run:

npx json-server --watch db.json --port 3001

Backend will run on:

http://localhost:3001
Example Product Data
{
      "id": "7",
      "name": "House Espresso Blend",
      "price": 14.99,
      "category": "Blend",
      "stock": 70,
      "description": "Bold & creamy with a thick crema and dark toffee notes",
      "origin": "Multi-origin",
      "image": "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80"
    },
    ...

    
Project Structure
src
├── App.css  
├── App.jsx  
├── assets  
│   ├── hero.png  
│   ├── react.svg  
│   └── vite.svg  
├── components  
│   ├── Hero.jsx  
│   ├── Navbar.css  
│   ├── Navbar.jsx  
│   ├── ProductCard.jsx  
│   ├── ProductForm.css  
│   ├── ProductForm.jsx  
│   ├── SearchBar.jsx  
│   └── Sidebar.jsx  
├── hooks  
│   └── useProducts.js  
├── index.css  
├── main.jsx  
├── pages  
│   ├── AddProduct.jsx  
│   ├── Admin.jsx  
│   ├── Dashboard.jsx  
│   ├── Home.css  
│   ├── Home.jsx  
│   ├── NotFound.jsx  
│   └── Products.jsx  
├── services  
│   └── api.js  
├── styles  
│   ├── api.js  
│   └── global.css  
└── tests  
    ├── Navbar.test.jsx  
    ├── Products.test.jsx  
    └── useProducts.test.jsx  
Tailwind Setup

Install Tailwind CSS:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
Responsive Design

The app uses responsive Tailwind grid layouts:

grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
Future Improvements
Authentication
Product categories filter
Cart system
Dark mode
Product edit modal
Real backend integration
Image upload support
License

This project is for educational purposes.


link to live preview:  https://ecommerce-admin-seven-pi-35.vercel.app/