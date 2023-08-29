import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";
import { FieldData } from "@/src/utils/Types";

export const fetchAllFields = async (id: number, token: string | null)  => {
  const response = await fetch(`${API_URL}api/company/fields/${id}`, {
    method: "GET",
    headers: {
      ...FETCH_HEADERS,
      Authorization: `Bearer ${token}`,
    }
  });

  return await response.json();
};

export const fetchField = async (fid: number, token: string | null)  => {
  const response = await fetch(`${API_URL}api/company/field/${fid}`, {
    method: "GET",
    headers: {
      ...FETCH_HEADERS,
      Authorization: `Bearer ${token}`,
    }
  });

  return await response.json();
};

export const saveField = async (token: string | null, data: FieldData) => {
  const response = await fetch(`${API_URL}api/company/field/new`, {
    method: "POST",
    headers: {
      ...FETCH_HEADERS,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};