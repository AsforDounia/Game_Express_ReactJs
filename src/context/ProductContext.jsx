import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../api/axios';

const ProductContext = createContext();


export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get('v1/admin/products');
            setProducts(response.data.products);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const showProduct = async (id) => {
        setLoading(true);
        try {
          const response = await api.get(`v1/admin/products/${id}`);
          setProductDetails(response.data.product);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch product details');
        } finally {
          setLoading(false);
        }
      };

    // Create product
    const createProduct = async (formData) => {
        setLoading(true);
        try {
            const response = await api.post('v1/admin/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(response.data.product);
            setProducts(prev => [...prev, response.data.product]);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    // Update product
    const updateProduct = async (id, formData) => {
        setLoading(true);
        try {
            const response = await api.post(`v1/admin/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-HTTP-Method-Override': 'PUT'
                }
            });
            console.log(response);
            setProducts(prev =>
                prev.map(p => (p.id === id ? response.data.product : p))
            );
            console.log(response.data.product);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update product');
        } finally {
            setLoading(false);
        }
    };

    // Delete product
    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await api.delete(`v1/admin/products/${id}`);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete product');
        } finally {
            setLoading(false);

        }
    };



    return (
        <ProductContext.Provider value={{
            products,
            loading,
            error,
            fetchProducts,
            showProduct,
            productDetails,
            createProduct,
            updateProduct,
            deleteProduct,
        }}>
            {children}
        </ProductContext.Provider>
    );
};
export const useProducts = () => useContext(ProductContext);