import axios from 'axios';
import { AuthModel, UserModel, UserByIdProps } from './_models';

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const GET_USER_BY_ID = `${API_URL}/profiles`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot-password`;

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  });
}

// Server should return AuthModel
export function register(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  companyName: string,
) {
  return axios.post(REGISTER_URL, {
    email,
    firstName,
    lastName,
    password,
    companyName,
  });
}

export function getUserById(userId: string, jwtToken: string) {
  return axios.get<UserByIdProps>(`${GET_USER_BY_ID}/${userId}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}
