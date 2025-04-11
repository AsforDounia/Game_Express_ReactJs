import { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/axios";
import { FaTag, FaDollarSign, FaImage } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useSubCategory } from "../context/SubCategoryContext";

export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateProduct, loading, error, productDetails, showProduct } =
        useProducts();
    const { subCategories, fetchSubcategories } = useSubCategory();
    const [previewPrimaryImage, setPreviewPrimaryImage] = useState(null);
    const [newOtherImages, setNewOtherImages] = useState([]);

    const [productData, setProductData] = useState({
        name: "",
        price: "",
        stock: "",
        subcategory_id: "",
        primaryImage: null,
        otherImages: [null],
    });

    useEffect(() => {
        showProduct(id);
        fetchSubcategories();

        const primaryImage = productDetails?.product_images?.find( (image) => image.is_primary === 1 );
        const otherImages = productDetails?.product_images?.filter( (image) => image.is_primary !== 1 );
        if (productDetails) {
            setProductData({
                name: productDetails.name,
                price: productDetails.price,
                stock: productDetails.stock,
                subcategory_id: productDetails.subcategory_id,
                //  primaryImage: previewPrimaryImage ? primaryImage?.image_url : null,
                primaryImage: previewPrimaryImage ? primaryImage?.image_url : null,
                otherImages: otherImages ? otherImages.map((image) => image.image_url) : [],

            });
        }
    }, [productDetails]);

    const handleInputChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePrimaryImageChange = (e) => {
        const file = e.target.files[0];
        setProductData({
            ...productData,
            primaryImage: file,
        });
        if (file) {
            setPreviewPrimaryImage(URL.createObjectURL(file));
        }
    };




    const handleDeleteOtherImage = (index) => {
        // Remove image from otherImages array
        const updatedImages = [...productData.otherImages];
        updatedImages.splice(index, 1);
    
        setProductData({
            ...productData,
            otherImages: updatedImages,
        });

        

    console.log(productData);

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
            await updateProduct(id, formData);
            alert("Product updated!");
            navigate(`/products`);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="m-8 bg-gray-50 flex items-center justify-center px-4 py-8 font-sans">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold text-blue-950 mb-6 text-center">
                    Edit Product
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Product Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-blue-950 font-medium mb-2"
                        >
                            Nom du produit
                        </label>
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
                        <label
                            htmlFor="price"
                            className="block text-blue-950 font-medium mb-2"
                        >
                            Prix
                        </label>
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
                        <label
                            htmlFor="stock"
                            className="block text-blue-950 font-medium mb-2"
                        >
                            Stock
                        </label>
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
                        <label
                            htmlFor="subcategory_id"
                            className="block text-blue-950 font-medium mb-2"
                        >
                            Sous-catégorie
                        </label>
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
                        {previewPrimaryImage ? (
                            <img
                                src={previewPrimaryImage}
                                alt="New Primary"
                                className="w-full h-auto mb-2 rounded-lg"
                            />
                        ) : (
                            productDetails &&
                            productDetails.product_images?.length > 0 &&
                            productDetails.product_images.map((image) =>
                                image.is_primary === 1 ? (
                                    <img
                                        key={image.id}
                                        src={`http://127.0.0.1:8000/storage/${image.image_url}`}
                                        alt="Primary"
                                        className="w-full h-auto mb-2 rounded-lg"
                                    />
                                ) : null
                            )
                        )}

                        <label
                            htmlFor="primaryImage"
                            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-500 cursor-pointer hover:bg-gray-100 transition"
                        >
                            Changer l'image principale
                        </label>

                        {/* Hidden input */}
                        <input
                            id="primaryImage"
                            type="file"
                            accept="image/*"
                            onChange={handlePrimaryImageChange}
                            className="hidden"
                        />
                    </div>
    
                        {/* Other Images Upload */}
                        <div className="mb-4">
    {/* Displaying Other Images */}
    {productDetails &&
    productDetails.product_images?.length > 0 &&
    productDetails.product_images
        .filter((image) => image.is_primary !== 1) // Filter out primary image
        .map((image, index) => (
            <div key={image.id} className="mb-2 flex flex-col items-center">
                <img
                    src={`http://127.0.0.1:8000/storage/${image.image_url}`}
                    alt={`Other Image ${index + 1}`}
                    className="w-32 h-auto mb-2 rounded-lg"
                />
                {/* Delete button for other images */}
                <button
                    type="button"
                    onClick={() => handleDeleteOtherImage(index)}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Delete Image {index + 1}
                </button>
                {/* Upload input for other images */}
                <label
                    htmlFor={`otherImage-${index}`}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-500 cursor-pointer hover:bg-gray-100 transition"
                >
                    Change Image {index + 1}
                </label>
                <input
                    id={`otherImage-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleOtherImageChange(index, e.target.files[0])}
                    className="hidden"
                />
            </div>
        ))}
</div>

{/* Add Other Image Field */}
<div className="mb-4">
    <button
        type="button"
        onClick={addOtherImageField}
        className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
    >
        Add Another Image
    </button>
</div>


{/* Add Other Image Field */}
<div className="mb-4">
    <button
        type="button"
        onClick={addOtherImageField}
        className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
    >
        Add Another Image
    </button>
</div>


                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-950 transition-colors"
                    >
                        Enregistrer les modifications
                    </button>
                </form>
            </div>
        </div>
    );
}
