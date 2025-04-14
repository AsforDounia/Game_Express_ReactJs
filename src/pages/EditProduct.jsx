import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useSubCategory } from "../context/SubCategoryContext";
import { IoMdReturnLeft } from "react-icons/io";
import { toast } from "react-toastify";

export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateProduct, productDetails, showProduct } = useProducts();
    const { subCategories, fetchSubcategories } = useSubCategory();

    const [previewPrimaryImage, setPreviewPrimaryImage] = useState(null);
    const [existingOtherImages, setExistingOtherImages] = useState([]); // For existing image URLs
    const [deletedImages, setDeletedImages] = useState([]); // Track deleted images
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        stock: "",
        subcategory_id: "",
        primaryImage: null,
        otherImages: [], // For new file uploads
    });

    // Fetch product details and subcategories
    useEffect(() => {
        const fetchData = async () => {
            await showProduct(id);
            await fetchSubcategories();
        };
        fetchData();
    }, [id]);

    // Update productData when productDetails changes
    useEffect(() => {
        if (productDetails) {
            const primaryImage = productDetails.product_images?.find(
                (image) => image.is_primary === 1
            );
            const otherImages = productDetails.product_images?.filter(
                (image) => image.is_primary !== 1
            );

            setProductData({
                name: productDetails.name,
                price: productDetails.price,
                stock: productDetails.stock,
                subcategory_id: productDetails.subcategory_id,
                primaryImage: null, // Reset for new upload
                otherImages: [], // Reset for new uploads
            });

            setPreviewPrimaryImage(primaryImage?.image_url || null);
            setExistingOtherImages(otherImages?.map((image) => image.image_url) || []);
        }
    }, [productDetails]);

    // Handle input changes
    const handleInputChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle primary image change
    const handlePrimaryImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file && file.type.startsWith("image/")) {
            setProductData({
                ...productData,
                primaryImage: file,
            });
            // setPreviewPrimaryImage(URL.createObjectURL(file)); // Generate and set the preview URL
            setPreviewPrimaryImage(null); // Set the file name for display
        } else {
            console.error("Selected file is not an image");
        }
    };

    // Handle other image change
    const handleOtherImageChange = (index, file) => {
        if (file && file.type.startsWith("image/")) {
            const updatedImages = [...productData.otherImages];
            updatedImages[index] = file; // Update the specific index with the new file
            setProductData({
                ...productData,
                otherImages: updatedImages,
            });
        } else {
            console.error("Selected file is not an image");
        }
    };

    // Add another image field
    const addOtherImageField = () => {
        setProductData({
            ...productData,
            otherImages: [...productData.otherImages, null],
        });
    };

    // Delete other image
    const handleDeleteOtherImage = (index) => {
        if (index < existingOtherImages.length) {
            // Remove from existing images
            const updatedExistingImages = [...existingOtherImages];
            const deletedImage = updatedExistingImages.splice(index, 1)[0];
            setExistingOtherImages(updatedExistingImages);
            setDeletedImages([...deletedImages, deletedImage]);
        } else {
            // Remove from new uploads
            const updatedNewImages = [...productData.otherImages];
            updatedNewImages.splice(index - existingOtherImages.length, 1);
            setProductData({
                ...productData,
                otherImages: updatedNewImages,
            });
        }
    };

    // Handle form submission
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

        if (deletedImages.length > 0) {
            deletedImages.forEach((image) => {
                formData.append("deleted_images[]", image);
            });
        }

        try {
            const updatedProduct = await updateProduct(id, formData);
            setProductData({
                ...productData,
                primaryImage: null,
                otherImages: [],
            });
            setExistingOtherImages([]);
            setPreviewPrimaryImage(null);
            setDeletedImages([]);
            toast.success("Product updated successfully!");
            navigate("/products");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="m-8 bg-gray-50 flex items-center justify-center px-4 py-8 font-sans">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
            <Link to={`/products`}>
                <IoMdReturnLeft className="text-2xl text-gray-500 hover:text-gray-700 mb-4" />
            </Link>
                <h2 className="text-2xl font-bold text-blue-950 mb-6 text-center">
                    Edit Product
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Product Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-blue-950 font-medium mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg px-4 py-2"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-blue-950 font-medium mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg px-4 py-2"
                            required
                        />
                    </div>

                    {/* Stock */}
                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-blue-950 font-medium mb-2">
                            Stock
                        </label>
                        <input
                            type="number"
                            name="stock"
                            value={productData.stock}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg px-4 py-2"
                            required
                        />
                    </div>

                    {/* Subcategory Dropdown */}
                    <div className="mb-4">
                        <label
                            htmlFor="subcategory_id"
                            className="block text-blue-950 font-medium mb-2"
                        >
                            Subcategory
                        </label>
                        <select
                            name="subcategory_id"
                            value={productData.subcategory_id}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg px-4 py-2"
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
                                src={`http://127.0.0.1:8000/storage/${previewPrimaryImage}`}
                                alt="Primary Preview"
                                className="w-full h-auto mb-2 rounded-lg"
                            />
                        ) : productData.primaryImage ? (
                            <img
                                src={URL.createObjectURL(productData.primaryImage)}
                                alt="Primary Preview"
                                className="w-full h-auto mb-2 rounded-lg"
                            />
                        ) : null}

                        <label
                            htmlFor="primaryImage"
                            className="block text-blue-950 font-medium mb-2"
                        >
                            Primary Image
                        </label>
                        <input
                            id="primaryImage"
                            type="file"
                            accept="image/*"
                            onChange={handlePrimaryImageChange}
                            className="w-full border rounded-lg px-4 py-2"
                        />
                    </div>

                    {/* Other Images */}
                    <div className="mb-4">
                        <label className="block text-blue-950 font-medium mb-2">
                            Other Images
                        </label>

                        {/* Display existing images */}
                        {existingOtherImages.map((url, index) => (
                            <div key={index} className="mb-2">
                                <img
                                    src={`http://127.0.0.1:8000/storage/${url}`}
                                    alt={`Other Image ${index + 1}`}
                                    className="w-32 h-auto mb-2 rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteOtherImage(index)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                        {/* Display newly added images */}
                        {productData.otherImages.map((file, index) => (
                            <div key={index} className="mb-2">
                                {file && (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`New Image ${index + 1}`}
                                        className="w-32 h-auto mb-2 rounded-lg"
                                    />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleOtherImageChange(index, e.target.files[0])
                                    }
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDeleteOtherImage(index + existingOtherImages.length)
                                    }
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addOtherImageField}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                        >
                            Add Another Image
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-950 transition-colors"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}