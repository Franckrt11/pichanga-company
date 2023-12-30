import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";
import { UserData } from "@/src/utils/Types";
// import { Try } from "expo-router/build/views/Try";

interface IData {
  name: string;
  email: string;
  ruc: string;
}

interface IResponse {
  status: boolean;
  message: string;
  data?: object;
}

interface IConfig {
  type: string;
  value: boolean;
}

export const saveUserProfile = async (
  data: IData,
  token: string | null,
  id?: number
) => {
  try {
    const response = await fetch(`${API_URL}api/company/profile/update/${id}`, {
      method: "PUT",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        ruc: data.ruc,
      }),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/user.js ~ saveProfile() ~ error:", error);
    return { status: false };
  }
};

export const saveUserAvatar = async (
  imageUri: string | boolean,
  token: string | null,
  id?: number
): Promise<string | undefined> => {
  try {
    const response = await fetch(`${API_URL}api/company/avatar/update/${id}`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ photo: imageUri }),
    });
    const result = await response.json();
    return result.photo;
  } catch (error) {
    console.log("🚩 ~ models/user.js ~ saveAvatar() ~ error:", error);
  }
};

export const removeUserAvatar = async (
  token: string | null,
  id?: number
): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}api/company/avatar/remove/${id}`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result.message;
  } catch (error) {
    console.log("🚩 ~ models/user.js ~ removeAvatar() ~ error:", error);
    return "No se pudo remover la imagen.";
  }
};

export const changeUserConfig = async (
  config: IConfig,
  token: string | null,
  id?: number
): Promise<IResponse> => {
  try {
    const response = await fetch(`${API_URL}api/company/config/${id}`, {
      method: "PUT",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(config),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/user.js ~ changeUserConfig() ~ error:", error);
    return {
      status:false,
      message: error as string
    };
  }
};
