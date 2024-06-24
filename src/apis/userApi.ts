import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

export const updateUser = async (token: string, userId: string, data: any) => {
  return axios.put(
    `${API_BASE_URL}/users/update-user-data`,
    { userId, data },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const fetchUser = async (token: string, userId: string) => {
  return axios.get(`${API_BASE_URL}/fetch-user-data/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchAllUsers = async (token: string) => {
  return axios.get(`${API_BASE_URL}/users/fetch-all-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const signUp = async (email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, {
    email,
    password,
  });
};

export const login = async (email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/auth/signin`, {
    email,
    password,
  });
};
