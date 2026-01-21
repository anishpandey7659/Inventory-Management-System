import { useState, useEffect } from "react";

//Fetch function
export const useFetch = (apiFunc, deps = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await apiFunc();
      const result = response.data.results || response.data;
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return { data, loading, error, refetch: fetchData };
};


//Post Function
export const usePost = (apiFunc) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const postData = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await apiFunc(data);
      setSuccess(true);
      return response;   // ✅ return response here
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;         // ✅ important: throw error to catch it outside
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, postData };
};

import { getCategories } from "./Apiservice";
export const useCategories = () => {
  return useFetch(getCategories);
};
