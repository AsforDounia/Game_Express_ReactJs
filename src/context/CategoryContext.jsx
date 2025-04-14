import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CategoryContext = createContext();


export const CategoryProvider = ({ children }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [categoryDetails , setCategoryDetails ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
          const response = await api.get("v1/admin/categories");
          setCategories(response.data.categories);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };


    const deleteCategory = async (id) => {
        setLoading(true);
        try {
            const response = await api.delete(`v1/admin/categories/${id}`);
            setCategories(prev => prev.filter(category => category.id !== id));
            navigate('/categories');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete category');
        } finally {
            setLoading(false);
        }
    };  

    const displayCategory = async (id) => {
        setLoading(true);
        try {
            const response = await api.get(`v1/admin/categories/${id}`);
            setCategoryDetails(response.data.category);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch category details');
        }
    };

    const editCategory = async (id , categoryData) => {
        setLoading(true);
        try {
            const response = await api.put(`v1/admin/categories/${id}`, categoryData);
            // navigate('/categories');
        }
        catch (err) {
            setError(err.response?.data?.message || 'Failed to update category');
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (categoryData) => {
        setLoading(true);
        try {
            const response = await api.post('v1/admin/categories', categoryData);
            setCategories(prev => [...prev, response.data.category]);
            // navigate('/categories');
        }
        catch (err) {
            setError(err.response?.data?.message || 'Failed to create category');
        } finally {
            setLoading(false);
        }
    };    
    return (
        <CategoryContext.Provider value={{
            categories,
            loading,
            setLoading,
            error,
            setError,
            fetchCategories,
            deleteCategory,
            editCategory,
            displayCategory,
            categoryDetails,
            // setCategory,
            category,
            addCategory,
        }}>
            {children}
        </CategoryContext.Provider>
    );
};
export const useCategory = () => useContext(CategoryContext);