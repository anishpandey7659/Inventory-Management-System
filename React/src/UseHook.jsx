import { useState, useEffect } from "react";

// Fetch function
export const useFetch = (apiFunc, deps = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      let allResults = [];
      let response = await apiFunc(); // page 1

      while (true) {
        const resData = response.data;

        // DRF style
        if (resData.results) {
          allResults.push(...resData.results);
          if (!resData.next) break;

          // fetch next page
          response = await fetch(resData.next).then(r => r.json()).then(d => ({ data: d }));
        } else {
          // non-paginated API
          allResults = resData;
          break;
        }
      }

      setData(allResults);
    } catch (err) {
      setError(err?.message || "Something went wrong");
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

import { getCategories,getSuppliers } from "./Apiservice";
export const useCategories = () => {
  return useFetch(getCategories);
};

export const useSuppilier =()=>{
  return useFetch(getSuppliers);
}


import { getProducts } from "./Apiservice";

