import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";
// import { ReserveData } from "@/src/utils/Types";

export const fetchAllReserves = async (id: number, token: string | null)  => {
  try {
    const response = await fetch(`${API_URL}api/company/reserves/${id}`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Reserve.ts ~ fetchAllReserves() ~ error:", error);
    return { status: false };
  }
};

export const fetchNextReserve = async (id: number, token: string | null)  => {
  try {
    const response = await fetch(`${API_URL}api/company/reserve/${id}/next`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Reserve.ts ~ fetchNextReserve() ~ error:", error);
    return { status: false };
  }
};

export const fetchReserve = async (id: number, token: string | null)  => {
  try {
    const response = await fetch(`${API_URL}api/company/reserve/${id}`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Reserve.ts ~ fetchReserve() ~ error:", error);
    return { status: false };
  }
};

export const updateReserve = async (id: number, status: string, token: string | null)  => {
  try {
    const response = await fetch(`${API_URL}api/company/reserve/${id}`, {
      method: "PUT",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({status}),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Reserve.ts ~ confirmReserve() ~ error:", error);
    return { status: false };
  }
};
