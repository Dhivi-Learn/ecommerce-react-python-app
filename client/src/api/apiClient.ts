import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the access token to headers
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally, etc.
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Optional: you can handle 401 Unauthorized globally here
        return Promise.reject(error);
    }
);

export default apiClient;
