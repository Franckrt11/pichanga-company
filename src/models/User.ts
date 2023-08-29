import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";
import { UserData } from "@/src/utils/Types";

interface IData {
  name: string;
  email: string;
  ruc: string;
}

export const saveUserProfile = async (
  data: IData,
  token: string | null,
  id?: number
): Promise<UserData | void> => {
  try {
    const response = await fetch(`${API_URL}api/company/profile/update/${id}`, {
      method: "POST",
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
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log("🚩 ~ models/user.js ~ saveProfile() ~ error:", error);
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
