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
