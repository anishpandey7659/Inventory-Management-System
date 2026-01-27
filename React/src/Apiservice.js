// src/services/api.js
import axios from 'axios';
import axiosInstance from './axiosinstance';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/';

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

  return axiosInstance.get('/products/', {
    params: {
      page,
      ...params,
    },
  });
};

export const getProduct = (id) => axiosInstance.get(`/products/${id}/`);
export const createProduct = (data) => axiosInstance.post('/products/', data);
export const updateProduct = (id, data) => axiosInstance.put(`/products/${id}/`, data);
export const deleteProduct = (id) => axiosInstance.delete(`/products/${id}/`);

// Categories
export const getCategories = () => axiosInstance.get('/categories/');
export const getCategory = (id) => axiosInstance.get(`/categories/${id}/`);
export const createCategory = (data) => axiosInstance.post('/categories/', data);

// Suppliers
export const getSuppliers = (params) => axiosInstance.get('/suppliers/', { params });
export const createSupplier = (data) => axiosInstance.post('/suppliers/', data);

// Stock In
export const getStockIns = (params) => axiosInstance.get('/stockin/', { params });
export const createStockIn = (data) => axiosInstance.post('/stockin/', data);



export const createsales = (data) => axiosInstance.post('/sales/', data);
export const getsales = (params)=>axiosInstance.get('/sales/',params)

export const products_grouped_by_category = ()=> axiosInstance.get('/products_grouped_by_category/');


//Stats
// export const total_revenue = () => axiosInstance.get('/revenue/');
export const total_revenue = () => api.get('revenue/');



export default axiosInstance;


