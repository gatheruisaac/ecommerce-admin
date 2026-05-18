const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded"
      />

      <h2 className="mt-4 text-xl font-bold">
        {product.name}
      </h2>

      <p className="text-gray-600">
        ${product.price}
      </p>
    </div>
  )
}

export default ProductCard