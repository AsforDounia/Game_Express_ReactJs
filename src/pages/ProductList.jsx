import React, { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { FaTrash, FaEdit , FaCartPlus } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = () => {
  const navigate = useNavigate();
  const { fetchProducts, products, deleteProduct } = useProducts();
  const { user } = useAuth();
  const roles = user?.roles?.map((role) => role.name);
  const isSuperAdmin = roles?.includes("super_admin");
  const isProductManager = roles?.includes("product_manager");

  const [loading, setLoading] = useState(false); // Loader state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        await fetchProducts();
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  const handleEdit = (productId) => {
    navigate(`/editproduct/${productId}`);
  };

  const handleDelete = async (productId) => {
    setLoading(true);
    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {(isSuperAdmin || isProductManager) && (
        <div className="flex justify-between items-center mb-4 px-8">
          <h1 className="text-3xl font-semibold">Game Express Products</h1>
          <Link to={`/addproduct`}>
            <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Add Product
            </button>
          </Link>
        </div>
      )}
      <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="shadow-md rounded-2xl overflow-hidden border"
          >
            
            <Link to={`/productdetails/${product.id}`}>
              <div className="flex justify-center items-center h-48 bg-gray-200 rounded-t-2xl overflow-hidden z-10 relative -top-8 -mb-8">
                <img
                  src={`http://127.0.0.1:8000/storage/${
                    product.product_images.find((img) => img.is_primary)?.image_url
                  }`}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.subcategory?.name}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-green-600 font-bold">${product.price}</span>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      product.status === "available"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status === "available" ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <p className="text-sm mt-1 text-gray-400">Stock: {product.stock}</p>
                {(isSuperAdmin || isProductManager) ? (
                  <div className="flex justify-between gap-2 mt-4 z-30">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="flex  gap-2 justify-center rounded-md items-center text-white bg-blue-500 hover:bg-blue-700 cursor-pointer w-1/2 text-center py-2"
                    >
                       <FaEdit /> Modify
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white rounded-md flex gap-2 justify-center items-center hover:bg-red-700 cursor-pointer w-1/2 text-center py-2"
                    >
                       <FaTrash /> Delete
                    </button>
                  </div>
                ) : (
                  <button className="mt-3 flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full cursor-pointer">
                    <FaCartPlus /> Add to Cart
                  </button>
                )}

              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;