import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes } from "react-icons/fa";
import { useCategory } from "../context/CategoryContext";
import { IoMdReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSubCategory } from "../context/SubCategoryContext";
import { toast } from "react-toastify";


const CategoryDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loadingCategory, setLoadingCategory] = useState(true);
    const [error, setError] = useState(null);
    const { categoryDetails, displayCategory, deleteCategory } = useCategory();
    const { addSubCategory, deleteSubCategory, editSubCategory } = useSubCategory();

    const [showForm, setShowForm] = useState(false);
    const [newSubcategoryName, setNewSubcategoryName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [editingSubcategoryId, setEditingSubcategoryId] = useState(null);
    const [editingSubcategoryName, setEditingSubcategoryName] = useState("");

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                await displayCategory(id);
            } catch (err) {
                setError("Failed to load category.");
            } finally {
                setLoadingCategory(false);
            }
        };

        fetchCategory();
    }, [id, displayCategory]);

    const handleEdit = (id) => {
        navigate(`/editcategory/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteCategory(id);
                toast.success("Category deleted successfully.");
                navigate("/categories");
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete category.");
            }
        }
    };

    const handleAddSubcategory = async (e) => {
        e.preventDefault();
        if (!newSubcategoryName.trim()) {
            toast.error("Please enter a subcategory name.");
            return;
        }

        try {
            setSubmitting(true);

            const newSubcategory = {
                name: newSubcategoryName,
                category_id: id,
            };

            await addSubCategory(newSubcategory);
            toast.success("Subcategory added successfully.");
            setNewSubcategoryName("");
            displayCategory(id);
        } catch (error) {
            console.error("Add subcategory error:", error);
            toast.error("Failed to add subcategory.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteSub = async (id) => {
        if (window.confirm("Are you sure you want to delete this subcategory?")) {
            try {
                await deleteSubCategory(id);
                toast.success("Subcategory deleted successfully.");
                displayCategory(id);
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete subcategory.");
            }
        }
    };

    const handleEditSub = (subcategory) => {
        setEditingSubcategoryId(subcategory.id);
        setEditingSubcategoryName(subcategory.name);
    };

    const handleCancelEditSub = () => {
        setEditingSubcategoryId(null);
        setEditingSubcategoryName("");
    };

    const handleSaveEditSub = async (e) => {
        e.preventDefault();
        if (!editingSubcategoryName.trim()) {
            toast.error("Please enter a subcategory name.");
            return;
        }

        try {
            setSubmitting(true);

            const updatedSubcategory = {
                name: editingSubcategoryName,
            };

            await editSubCategory(editingSubcategoryId , updatedSubcategory);
            toast.success("Subcategory updated successfully.");
            setEditingSubcategoryId(null);
            setEditingSubcategoryName("");
            displayCategory(id);
        } catch (error) {
            console.error("Edit subcategory error:", error);
            toast.error("Failed to update subcategory.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingCategory)
        return <div className="text-center py-10">Loading category details...</div>;
    if (error)
        return <div className="text-center text-red-500 py-4">{error}</div>;
    if (!categoryDetails)
        return <div className="text-center py-10">Category not found.</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-4">
                <Link to={`/categories`}>
                    <IoMdReturnLeft className="text-2xl text-gray-500 hover:text-gray-700 mb-4" />
                </Link>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    title="Add subcategory"
                >
                    {showForm ? "Cancel" : "Add SubCategory"}
                </button>
            </div>
            {showForm && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">
                        Add New Subcategory
                    </h3>
                    <form
                        onSubmit={handleAddSubcategory}
                        className="flex gap-4 items-center"
                    >
                        <input
                            type="text"
                            placeholder="Subcategory name"
                            value={newSubcategoryName}
                            onChange={(e) => setNewSubcategoryName(e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {submitting ? "Adding..." : "Add"}
                        </button>
                    </form>
                </div>
            )}
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {categoryDetails.name}
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handleEdit(categoryDetails.id)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit category"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => handleDelete(categoryDetails.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete category"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
                <p className="text-gray-500 mb-2">
                    <strong>Slug:</strong> {categoryDetails.slug}
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Subcategories
                </h2>
                {categoryDetails.subcategories &&
                    categoryDetails.subcategories.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                        {categoryDetails.subcategories.map((subcategory) => (
                            <div
                                key={subcategory.id}
                                className="bg-white shadow rounded-xl p-5"
                            >
                                {editingSubcategoryId === subcategory.id ? (
                                    <form onSubmit={handleSaveEditSub}>
                                        <input
                                            type="text"
                                            value={editingSubcategoryName}
                                            onChange={(e) =>
                                                setEditingSubcategoryName(e.target.value)
                                            }
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancelEditSub}
                                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-lg font-medium">{subcategory.name}</h3>
                                            <div className="flex gap-3 text-xl">
                                                <button
                                                    onClick={() => handleEditSub(subcategory)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                    title="Edit subcategory"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteSub(subcategory.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                    title="Delete subcategory"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                        <p>
                                            <strong>Slug:</strong> {subcategory.slug}
                                        </p>
                                        <p>
                                            <strong>Created At:</strong>{" "}
                                            {new Date(subcategory.created_at).toLocaleString()}
                                        </p>
                                        <p>
                                            <strong>Updated At:</strong>{" "}
                                            {new Date(subcategory.updated_at).toLocaleString()}
                                        </p>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No subcategories available.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryDetails;