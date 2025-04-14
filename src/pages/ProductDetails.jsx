import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdReturnLeft } from "react-icons/io";
import { useAuth } from "../context/AuthContext";



const ProductDetails = () => {

  const { user } = useAuth();
  const roles = user?.roles?.map((role) => role.name);
  const isSuperAdmin = roles?.includes("super_admin");
  const isProductManager = roles?.includes("product_manager");


  const { id } = useParams();
  const navigate = useNavigate();
  const { showProduct, productDetails, loading, error, deleteProduct } = useProducts();

  const [primaryImage, setPrimaryImage] = useState(null);
  const [otherImages, setOtherImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await showProduct(id);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (productDetails && productDetails.product_images) {
      const primary = productDetails.product_images.find((img) => img.is_primary)?.image_url;
      const others = productDetails.product_images.filter((img) => !img.is_primary);
      setPrimaryImage(primary);
      setOtherImages(others);
    }
  }, [productDetails]);

  const handleEdit = (productId) => {
    navigate(`/editproduct/${productId}`);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
      navigate("/products");
    }
  };

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error loading product details: {error}</div>;
  if (!productDetails) return <div>Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to={`/products`}>
        <IoMdReturnLeft className="text-2xl text-gray-500 hover:text-gray-700 mb-4" />
      </Link>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">{productDetails.name} Details</h1>
        {(isSuperAdmin || isProductManager) && (
        <div className="text-2xl font-bold mb-4 flex gap-2">
          <button
            onClick={() => handleEdit(productDetails.id)}
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(productDetails.id)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            <FaTrash />
          </button>
        </div>
        )}
      </div>

      {/* Display Primary Image */}
      {primaryImage && (
        <div className="w-full h-96 mb-4">
          <img
            src={`http://127.0.0.1:8000/storage/${primaryImage}`}
            alt={productDetails.name}
            className="w-full h-full object-cover rounded-xl shadow"
          />
        </div>
      )}

      {/* Product Details */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">{productDetails.name}</h1>
        <p className="text-gray-500 text-sm mb-1">
          Category: {productDetails.subcategory?.name || "N/A"}
        </p>
        <p className="text-green-600 font-bold text-xl mb-4">${productDetails.price}</p>
        <span
          className={`inline-block px-3 py-1 mb-3 text-sm font-medium rounded-full ${
            productDetails.status === "available"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {productDetails.status === "available" ? "In Stock" : "Out of Stock"}
        </span>
        <p className="text-gray-400 mb-2">Stock: {productDetails.stock}</p>
        {productDetails.description && (
          <p className="text-gray-700 mt-4">{productDetails.description}</p>
        )}
      </div>

      {/* Display Other Images */}
      {otherImages.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Other Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {otherImages.map((image) => (
              <div key={image.id} className="w-full h-48">
                <img
                  src={`http://127.0.0.1:8000/storage/${image.image_url}`}
                  alt={`${productDetails.name} - ${image.id}`}
                  className="w-full h-full object-cover rounded-xl shadow"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;