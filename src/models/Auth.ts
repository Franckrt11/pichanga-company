import * as Device from "expo-device";
import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";
import { RegisterUserData } from "@/src/utils/Types";

export const fetchLogin = async (email: string, password: string) => {
  try {
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
  } catch (error) {
    console.log("🚩 ~ models/Auth.ts ~ fetchLogin() ~ error:", error);
    return { status: false };
  }
};

export const fetchRegister = async (data: RegisterUserData) => {
  try {
    const response = await fetch(`${API_URL}api/company/register`, {
      method: "POST",
      headers: FETCH_HEADERS,
      body: JSON.stringify({
        name: data.name,
        ruc: data.ruc,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        checkbox: data.checkbox,
        device: Device.brand ? Device.brand : "myweb",
      }),
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Auth.ts ~ fetchRegister() ~ error:", error);
    return { status: false };
  }
};

export const fetchUser = async (id: string, token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/company/profile/${id}`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Auth.ts ~ fetchUser() ~ error:", error);
    return { status: false };
  }
};

export const fetchNewPassword = async (
  email: string,
  oldPassword: string,
  newPassword: string,
  newPasswordConfirm: string,
  token: string | null
) => {
  try {
    const response = await fetch(`${API_URL}api/company/change-password`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        password: oldPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirm,
      }),
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Auth.ts ~ fetchNewPassword() ~ error:", error);
    return { status: false };
  }
};

export const fetchLogout = async (token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/company/logout`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Auth.ts ~ fetchLogout() ~ error:", error);
    return { status: false };
  }
};
