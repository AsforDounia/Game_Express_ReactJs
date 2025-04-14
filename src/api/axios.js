import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);



export const apiV1 = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/admin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
apiV1.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      const errorMessage = error.response.data.message || "Unknown error occurred";
      toast.error(errorMessage);
    } else if (error.request) {
      // Request was made but no response received
      toast.error("Network error. Please try again.");
    } else {
      // Something else happened while setting up the request
      toast.error("An error occurred while making the request.");
    }
    return Promise.reject(error);
  }
);

// Response interceptor
apiV1.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data.message || "Unknown error occurred";
      toast.error(errorMessage);
      localStorage.removeItem('token');
      window.location.href = '/login';
    }else if (error.request) {
      // Request was made but no response received
      toast.error("Network error. Please try again.");
    } else {
      // Something else happened while setting up the request
      toast.error("An error occurred while making the request.");
    }
    return Promise.reject(error);
  }
);
export default api;