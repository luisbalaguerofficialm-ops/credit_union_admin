// src/config/api.js

// Base API URL used across the entire admin dashboard
export const API_URL = "https://admin-admin-credit.onrender.com/api";

// Optional: central place for endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_URL}/auth/login`,
  FUNDING_REQUESTS: `${API_URL}/funding-requests`,
  USERS: `${API_URL}/admin/users`,
};
