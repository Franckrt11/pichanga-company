import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";

export const fetchConfigAll = async (token: string | null) => {
  const response = await fetch(`${API_URL}api/config`, {
    method: "GET",
    headers: {
      ...FETCH_HEADERS,
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};
