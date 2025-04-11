import { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/axios";
import { FaTag, FaAlignLeft, FaDollarSign, FaImage } from "react-icons/fa";
import { useProducts } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { useSubCategory } from "../context/SubCategoryContext";

export default function AddProduct() {
    const navigate = useNavigate();
    const { createProduct } = useProducts();
    const {subCategories, fetchSubcategories} = useSubCategory();
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    stock: "",
    subcategory_id: "",
    primaryImage: null,
    otherImages: [null],
  });


  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrimaryImageChange = (e) => {
    setProductData({
      ...productData,
      primaryImage: e.target.files[0],
    });
  };

  const handleOtherImageChange = (index, file) => {
    const updatedImages = [...productData.otherImages];
    updatedImages[index] = file;
    setProductData({
      ...productData,
      otherImages: updatedImages,
    });
  };

  const addOtherImageField = () => {
    setProductData({
      ...productData,
      otherImages: [...productData.otherImages, null],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("stock", productData.stock);
    formData.append("subcategory_id", productData.subcategory_id);

    if (productData.primaryImage) {
      formData.append("primary_image", productData.primaryImage);
    }

    productData.otherImages.forEach((img) => {
      if (img) {
        formData.append("images[]", img);
      }
    });

    try {
        createProduct(formData);
        alert("Product created!");
        setProductData({
            name: "",
            price: "",
            stock: "",
            subcategory_id: "",
            primaryImage: null,
            otherImages: [null],
        });
        navigate("/products");
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div className="m-8 bg-gray-50 flex items-center justify-center px-4 py-8 font-sans">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-blue-950 mb-6 text-center">Create New Product</h2>

        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-blue-950 font-medium mb-2">Nom du produit</label>
            <div className="relative">
              <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                placeholder="Nom du produit"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                required
              />
            </div>
          </div>


          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-blue-950 font-medium mb-2">Prix</label>
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                required
              />
            </div>
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label htmlFor="stock" className="block text-blue-950 font-medium mb-2">Stock</label>
            <div className="relative">
              <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
                placeholder="Stock"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                required
              />
            </div>
          </div>

          {/* Subcategory Dropdown */}
          <div className="mb-4">
            <label htmlFor="subcategory_id" className="block text-blue-950 font-medium mb-2">Sous-catégorie</label>
            <select
              name="subcategory_id"
              value={productData.subcategory_id}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
              required
            >
              <option value="">Select a subcategory</option>
              {subCategories.map((subcat) => (
                <option key={subcat.id} value={subcat.id}>
                  {subcat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Primary Image Upload */}
          <div className="mb-4">
            <label htmlFor="primaryImage" className="block text-blue-950 font-medium mb-2">Image principale</label>
            <div className="relative">
              <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePrimaryImageChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                
              />
            </div>
          </div>

          {/* Other Images Upload */}
          <div className="mb-4">
            <label className="block text-blue-950 font-medium mb-2">Autres images</label>
            {productData.otherImages.map((_, index) => (
              <div key={index} className="mb-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleOtherImageChange(index, e.target.files[0])}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addOtherImageField}
              className="text-sm mt-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition"
            >
              + Ajouter une autre image
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-950 transition-colors"
          >
            Enregistrer le produit
          </button>
        </form>
      </div>
    </div>
  );
}
