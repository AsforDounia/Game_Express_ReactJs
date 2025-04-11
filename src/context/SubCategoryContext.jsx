import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api/axios';

const SubCategoryContext = createContext();


export const SubCategoryProvider = ({ children }) => {
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch products
    const fetchSubcategories = async () => {
        try {
          const response = await api.get("v1/admin/subcategories");
          setSubCategories(response.data.subcategories);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
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
        }}>
            {children}
        </SubCategoryContext.Provider>
    );
};
export const useSubCategory = () => useContext(SubCategoryContext);