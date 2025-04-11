import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAllProducts, addProduct } from '../js/data';

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProducts = () => {
        try {
            const allProducts = getAllProducts();
            setProducts(allProducts);
            setError(null);
        } catch (err) {
            setError('Failed to load products');
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (newProduct) => {
        try {
            const updatedProducts = addProduct(newProduct);
            if (updatedProducts) {
                setProducts(updatedProducts);
                return true;
            }
            return false;
        } catch (err) {
            console.error('Error adding product:', err);
            return false;
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <ProductContext.Provider value={{
            products,
            loading,
            error,
            refreshProducts: loadProducts,
            addProduct: handleAddProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProducts = () => useContext(ProductContext); 