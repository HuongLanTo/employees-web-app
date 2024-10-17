import axios from "axios";

const API_URL = "http://localhost:5001";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (username: string, password: string) => {
  try {
    const response = await api.post("/auth/register", { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmployees = async (page: number) => {
  try {
    const response = await api.get(`/employees?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addEmployee = async (employeeData: {
  name: string;
  age: number;
  address: string;
  picture: string;
}) => {
  try {
    const response = await api.post("/employees", employeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (
  id: number,
  employeeData: { name: string; age: number; address: string; picture: string }
) => {
  try {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployee = async (id: number) => {
  try {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
