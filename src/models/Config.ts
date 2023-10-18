import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";

export const fetchConfigAll = async (token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/config`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Config.ts ~ fetchConfigAll() ~ error:", error);
    return { status: false };
  }
};

export const fetchActivity = async (id: number, token: string | null)  => {
  try {
    const response = await fetch(`${API_URL}api/company/activity/${id}`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Config.ts ~ fetchActivity() ~ error:", error);
  }
};