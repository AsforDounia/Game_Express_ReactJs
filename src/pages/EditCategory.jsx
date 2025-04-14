import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";
import { toast } from "react-toastify";
import { IoMdReturnLeft } from "react-icons/io";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {displayCategory , categoryDetails ,editCategory } = useCategory();

  const [categoryData, setCategoryData] = useState({
    name: "",
    slug: ""
  });

useEffect(() => {
    const fetchCategory = async () => {
      try {
        await displayCategory(id);
      } catch (err) {
        setError("Failed to load category.");
      }
    };

    fetchCategory();
  }, [id]);
    
  useEffect(() => {
        if (categoryDetails) {
            setCategoryData({
                name: categoryDetails.name,
                slug: categoryDetails.slug,
            });
        }
    }, [categoryDetails]);

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await editCategory(id, categoryData);
        toast.success("Category updated successfully.");
        setCategoryData({ name: "", slug: "" });
        navigate("/categories");
    } catch (error) {
        console.error("Error updating category:", error);
    }
};


  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Category</h1>
      <Link to={`/categories`}>
                <IoMdReturnLeft className="text-2xl text-gray-500 hover:text-gray-700 mb-4" />
            </Link>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            name="slug"
            value={categoryData.slug}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
