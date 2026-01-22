// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
const buildQueryParams = (filters) => {
  return Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== '' && value !== null)
  );
};
export const getProducts = (filters = {}, page = 1) => {
  const params = buildQueryParams(filters);

  return api.get('/products/', {
    params: {
      page,
      ...params,
    },
  });
};

export const getProduct = (id) => api.get(`/products/${id}/`);
export const createProduct = (data) => api.post('/products/', data);
export const updateProduct = (id, data) => api.put(`/products/${id}/`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}/`);

// Categories
export const getCategories = () => api.get('/categories/');
export const getCategory = (id) => api.get(`/categories/${id}/`);
export const createCategory = (data) => api.post('/categories/', data);

// Suppliers
export const getSuppliers = (params) => api.get('/suppliers/', { params });
export const createSupplier = (data) => api.post('/suppliers/', data);

// Stock In
export const getStockIns = (params) => api.get('/stockin/', { params });
export const createStockIn = (data) => api.post('/stockin/', data);

// Stock Out
export const getStockOuts = (params) => api.get('/stockout/', { params });
export const createStockOut = (data) => api.post('/stockout/', data);


export const createsales = (data) => api.post('/sales/', data);





export default api;


