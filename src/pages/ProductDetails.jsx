import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdReturnLeft } from "react-icons/io";

const ProductDetails = () => {
  const { id } = useParams();
  const { showProduct, productDetails, loading, error } = useProducts();

  useEffect(() => {
    showProduct(id);
  }, [id]); // Make sure to trigger the fetch whenever the ID changes


  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productDetails) return <div>No product found.</div>;

  // Extract the primary image
  const primaryImage = productDetails.product_images?.find((img) => img.is_primary)?.image_url;
  // Extract other images
  const otherImages = productDetails.product_images?.filter((img) => !img.is_primary);

  return (
    <div className="max-w-4xl mx-auto p-6">
        <Link to={`/products`}>
            <IoMdReturnLeft className="text-2xl text-gray-500 hover:text-gray-700 mb-4" />
        </Link>
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold mb-4">{productDetails.name} Details</h1>
            <div className="text-2xl font-bold mb-4 flex gap-2">
                <button
                    onClick={() => handleEdit(productDetails.id)}
                    className=" text-blue-500  hover:text-blue-700 cursor-pointer"
                    >
                    <FaEdit />
                    </button>
                    <button
                    onClick={() => handleDelete(productDetails.id)}
                    className=" text-red-500 hover:text-red-700  cursor-pointer"
                    >
                    <FaTrash />
                </button>
            </div>
        </div>
      <div className="">
        {/* Display Primary Image */}
        {primaryImage && (
          <div className="w-full h-96 mb-4 md:mb-0">
            <img
              src={`http://127.0.0.1:8000/storage/${primaryImage}`}
              alt={productDetails.name}
              className="w-full h-full object-cover rounded-xl shadow"
            />
          </div>
        )}

        {/* Product Details */}
        {/* <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{productDetails.name}</h1>
          <p className="text-gray-500 text-sm mb-1">
            Category: {productDetails.subcategory?.name}
          </p>
          <p className="text-green-600 font-bold text-xl mb-4">
            ${productDetails.price}
          </p>
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
        </div> */}
      </div>

      {/* Display Other Images */}
      {otherImages && otherImages.length > 0 && (
        <div className="mt-4 ">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
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


<div className="">
          <h1 className="text-3xl font-bold mb-2">{productDetails.name}</h1>
          <p className="text-gray-500 text-sm mb-1">
            Category: {productDetails.subcategory?.name}
          </p>
          <p className="text-green-600 font-bold text-xl mb-4">
            ${productDetails.price}
          </p>
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
    </div>
    


  );
};

export default ProductDetails;
