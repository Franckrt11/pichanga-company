import * as Device from "expo-device";
import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";
import { FetchUserData } from "@/src/utils/Types";

export const fetchLogin = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}api/company/login`, {
    method: "POST",
    headers: FETCH_HEADERS,
    body: JSON.stringify({
      email: email,
      password: password,
      device: Device.brand ? Device.brand : "myweb",
    }),
  });

  return await response.json();
};

export const fetchRegister = async (data: FetchUserData) => {
  const response = await fetch(`${API_URL}api/company/register`, {
    method: "POST",
    headers: FETCH_HEADERS,
    body: JSON.stringify({
      name: data.name,
      ruc: data.ruc,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      status: true,
      device: Device.brand ? Device.brand : "myweb",
    }),
  });

  return await response.json();
};

export const fetchUser = async (id: string, token: string | null) => {
  const response = await fetch(`${API_URL}api/company/profile/${id}`, {
    method: "GET",
    headers: {
      ...FETCH_HEADERS,
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const fetchNewPassword = async (email: string, oldPassword: string, newPassword: string) => {
  const response = await fetch(`${API_URL}api/company/reset-password`, {
    method: "POST",
    headers: FETCH_HEADERS,
    body: JSON.stringify({
      email,
      password: oldPassword,
      new_password: newPassword,
    }),
  });

  return await response.json();
};