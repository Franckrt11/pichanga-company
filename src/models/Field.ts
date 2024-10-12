import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";
import {
  FieldDataSave,
  FieldPicture,
  FieldDay,
  HourRange,
  HourDayRange,
  PriceRange,
  SavePrice,
} from "@/src/utils/Types";

export const fetchAllFields = async (id: number, token: string | null) => {
  const response = await fetch(`${API_URL}api/company/fields/${id}`, {
    method: "GET",
    headers: {
      ...FETCH_HEADERS,
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const fetchField = async (fid: number, token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${fid}`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ fetchField() ~ error:", error);
  }
};

export const saveField = async (token: string | null, data: FieldDataSave) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/new`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ saveField() ~ error:", error);
    return { status: false, error };
  }
};

export const uploadPortrait = async (
  data: FieldPicture,
  token: string | null,
  id?: number
) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/portrait`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ uploadPortrait() ~ error:", error);
  }
};

export const uploadPicture = async (
  data: FieldPicture,
  token: string | null
) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/gallery`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ uploadPicture() ~ error:", error);
  }
};

export const changePicture = async (
  data: FieldPicture,
  token: string | null,
  id: number
) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/gallery/${id}`, {
      method: "PUT",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ changePicture() ~ error:", error);
  }
}

export const fetchFieldPictures = async (id: number, token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/pictures`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ fetchFieldPictures() ~ error:", error);
    return { status: false };
  }
};

export const removePortrait = async (
  id: number,
  token: string | null
) => {
  try {
    const response = await fetch(
      `${API_URL}api/company/field/${id}/portrait`,
      {
        method: "DELETE",
        headers: {
          ...FETCH_HEADERS,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ removePortrait() ~ error:", error);
    return { status: false };
  }
};

export const removePicture = async (
  id: number,
  token: string | null
) => {
  try {
    const response = await fetch(
      `${API_URL}api/company/field/${id}/gallery`,
      {
        method: "DELETE",
        headers: {
          ...FETCH_HEADERS,
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ removePicture() ~ error:", error);
    return { status: false };
  }
};

export const updateField = async (
  id: number,
  token: string | null,
  data: FieldDataSave
) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}`, {
      method: "PUT",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ updateField() ~ error:", error);
    return { status: false };
  }
};

export const updateFieldStatus = async (
  id: number,
  token: string | null,
  data: boolean
) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/status`, {
      method: "PATCH",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ active: data }),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ updateFieldStatus() ~ error:", error);
    return { status: false };
  }
};

export const saveFieldDays = async (
  id: number,
  token: string | null,
  data: FieldDay[]
) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/days`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ days: data }),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ saveFieldDays() ~ error:", error);
    return { status: false };
  }
};

export const fetchFieldDays = async (id: number, token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/days`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ fetchFieldDays() ~ error:", error);
    return { status: false };
  }
};

export const updateFieldDays = async (
  id: number,
  token: string | null,
  data: FieldDay[]
) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/days`, {
      method: "PUT",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ days: data }),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ updateFieldDays() ~ error:", error);
    return { status: false };
  }
};

export const saveFieldHours = async (
  id: number,
  token: string | null,
  data: HourDayRange
) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/hours`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ hours: data }),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ saveFieldHours() ~ error:", error);
    return { status: false };
  }
};

export const updateFieldHours = async (
  id: number,
  token: string | null,
  data: HourRange[] | HourDayRange
) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/hours`, {
      method: "PUT",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ hours: data }),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ updateFieldHours() ~ error:", error);
    return { status: false };
  }
};

export const fetchFieldHours = async (id: number, token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/hours`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ fetchFieldHours() ~ error:", error);
    return { status: false };
  }
};

export const fetchFieldPrices = async (id: number, token: string | null) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/prices`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ fetchFieldPrices() ~ error:", error);
    return { status: false };
  }
};

export const updateFieldPrices = async (
  id: number,
  token: string | null,
  data: PriceRange[]
) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/prices`, {
      method: "PUT",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prices: data }),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ updateFieldPrices() ~ error:", error);
    return { status: false };
  }
};

export const saveFieldPrices = async (
  id: number,
  token: string | null,
  data: SavePrice[]
) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/prices`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prices: data }),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ saveFieldPrices() ~ error:", error);
    return { status: false };
  }
};
