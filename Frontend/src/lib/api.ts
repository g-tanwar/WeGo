import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
    // Prevent "infinite" pending requests on network/port issues.
    timeout: 15000,
});

api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Surface timeouts and network errors with a clearer message.
        if (error.code === 'ECONNABORTED' || error.message?.toLowerCase?.().includes('timeout')) {
            error.message = 'Request timed out. Please try again.';
        } else if (!error.response) {
            error.message = 'Network error. Check API URL, server, and connection.';
        }
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
