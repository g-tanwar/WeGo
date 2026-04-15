import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
    // Prevent "infinite" pending requests on network/port issues.
    timeout: 15000,
});

api.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = config.url || '';
    const isPublicAuthRoute = url.startsWith('/auth/login') || url.startsWith('/auth/signup');

    if (token && !isPublicAuthRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers?.Authorization) {
        delete config.headers.Authorization;
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
