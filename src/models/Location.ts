import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";
import { LocationDataSave } from "@/src/utils/Types";

export const fetchAllLocations = async (id: number, token: string | null) => {
  const response = await fetch(`${API_URL}api/company/locations/${id}`, {
    method: "GET",
    headers: {
      ...FETCH_HEADERS,
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const updateLocationStatus = async (
  id: number,
  token: string | null,
  data: boolean
) => {
  try {
    const response = await fetch(
      `${API_URL}api/company/location/${id}/status`,
      {
        method: "PATCH",
        headers: {
          ...FETCH_HEADERS,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ active: data }),
      }
    );
    return await response.json();
  } catch (error) {
    console.log(
      "🚩 ~ models/Location.ts ~ updateLocationStatus() ~ error:",
      error
    );
    return { status: false };
  }
};

export const fetchLocation = async (lid: number, token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/company/location/${lid}`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Location.ts ~ fetchLocation() ~ error:", error);
  }
};

export const updateLocation = async (
  id: number,
  token: string | null,
  data: LocationDataSave
) => {
  try {
    const response = await fetch(`${API_URL}api/company/location/${id}`, {
      method: "PUT",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Location.ts ~ updateLocation() ~ error:", error);
    return { status: false };
  }
};

export const saveLocation = async (
  token: string | null,
  data: LocationDataSave
) => {
  try {
    const response = await fetch(`${API_URL}api/company/location/new`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Location.ts ~ saveLocation() ~ error:", error);
    return { status: false, error };
  }
};
