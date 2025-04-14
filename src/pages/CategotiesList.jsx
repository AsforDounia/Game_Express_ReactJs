import React, { useEffect, useState } from 'react'
import { useCategory } from '../context/CategoryContext';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function CategoriesList() {
    const { fetchCategories, categories, loading, error, deleteCategory, editCategory, addCategory  } = useCategory();
    const navigate = useNavigate();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', slug: '' });

    useEffect(() => {
        fetchCategories();
    }, [categories]);

    const handleEdit = (id) => {
        navigate(`/editcategory/${id}`);
        editCategory(id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                deleteCategory(id);
                toast.success("Category deleted successfully.");
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete category.");
            }
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCategory(newCategory);
            toast.success("Category added successfully.");  
            setNewCategory({ name: '' });
            
            setIsFormVisible(false);  // Hide form after submission
        } catch (error) {
            console.error("Add category error:", error);
            toast.error("Failed to add category.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4 px-8">
                <h1 className="text-3xl font-semibold">Game Express Categories</h1>
                <button 
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Category
                </button>
            </div>

            {/* Hidden form for adding category */}
            {isFormVisible && (
                <div className="px-8 mb-4">
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newCategory.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700">Category Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={newCategory.slug}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div> */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="shadow-md rounded-2xl overflow-hidden border bg-white"
                    >
                        <div className="flex gap-2 justify-end mt-4 relative left-0 mx-4 z-30">
                            <button
                                onClick={() => handleEdit(category.id)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(category.id)}
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                                <FaTrash />
                            </button>
                        </div>

                        <Link to={`/categorydetails/${category.id}`}>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{category.name}</h3>
                                <p className="text-gray-500 text-sm mt-1 break-all">
                                    <span className='text-green-500 font-medium'>Slug: </span>{category.slug}
                                </p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Created At: {new Date(category.created_at).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Updated At: {new Date(category.updated_at).toLocaleDateString()}
                                </p>
                                    {/* : {category.subcategories_count} */}
                                <p className="text-sm text-gray-400 mt-2">
                                    Subcategories: {category.subcategories_count }
                                </p>
                            </div>
                        </Link> 
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoriesList;
