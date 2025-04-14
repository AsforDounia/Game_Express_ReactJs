import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import api, { apiV1 } from '../api/axios';

const SubCategoryContext = createContext();


export const SubCategoryProvider = ({ children }) => {
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch products
    const fetchSubcategories = async () => {
        try {
          const response = await apiV1.get("subcategories");
          setSubCategories(response.data.subcategories);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      };

      const addSubCategory = async (formData) => {
        setLoading(true);
        try {
            const response = await apiV1.post('subcategories', formData);
            console.log(response.data.subcategory);
            setSubCategories(prev => [...prev, response.data.subcategory]);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create subcategory');
        } finally {
            setLoading(false);
        }
    }

    const deleteSubCategory = async (id) => {
      setLoading(true);
      try {
        const response = await apiV1.delete(`subcategories/${id}`);
        setSubCategories(prev => prev.filter(subCategory => subCategory.id !== id));
      }
      catch (err) {
        setError(err.response?.data?.message || 'Failed to delete subcategory');
      }
      finally {
        setLoading(false);
      }
    }

    const editSubCategory = async (id, subCategoryData) => {
        setLoading(true);
        try {
            console.log(subCategoryData);
            console.log(id);
            const response = await apiV1.put(`subcategories/${id}`, subCategoryData);
        }
        catch (err) {
            setError(err.response?.data?.message || 'Failed to update subcategory');
        } finally {
            setLoading(false);
        }
    };
    return (
        <SubCategoryContext.Provider value={{
            subCategories,
            loading,
            setLoading,
            error,
            setError,
            fetchSubcategories,
            addSubCategory,
            deleteSubCategory,
            editSubCategory,
        }}>
            {children}
        </SubCategoryContext.Provider>
    );
};
export const useSubCategory = () => useContext(SubCategoryContext);