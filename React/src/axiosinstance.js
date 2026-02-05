import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API;

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Track if we're currently refreshing to prevent multiple simultaneous refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Request Interceptor
axiosInstance.interceptors.request.use(
    function(config){
        const accessToken = localStorage.getItem('accessToken'); 
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    function(response){
        return response;
    },
    async function(error){
        const originalRequest = error.config;
        
        if(error.response?.status === 401 && !originalRequest._retry){
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }).catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                console.log('⚠️ No refresh token found');
                localStorage.clear();
                window.location.href = '/';
                return Promise.reject(error);
            }

            try{
                const response = await axios.post(`${baseURL}/auth-url/token/refresh/`, {
                    refresh: refreshToken
                });
                
                const newAccessToken = response.data.access;
                localStorage.setItem('accessToken', newAccessToken);
                console.log("✅ Token refreshed successfully!");
                
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                processQueue(null, newAccessToken);
                
                return axiosInstance(originalRequest);
                
            } catch(refreshError){
                console.error('❌ Token refresh failed:', refreshError);
                processQueue(refreshError, null);
                localStorage.clear();
                window.location.href = '/';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;