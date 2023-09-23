import { API_URL, FETCH_HEADERS } from "@/src/utils/Constants";
import { FieldData, FieldPicture, FieldDay } from "@/src/utils/Types";

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
  try {
    const response = await fetch(`${API_URL}api/company/field/${fid}`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    });

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ fetchField() ~ error:", error);
  }
};

export const saveField = async (token: string | null, data: FieldData) => {
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

export const uploadPicture = async (
  data: FieldPicture,
  token: string | null,
  id?: number,
): Promise<string | undefined> => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/${data.location}`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    return result.picture;
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ uploadPicture() ~ error:", error);
  }
};

export const fetchFieldPictures = async (id: number, token: string | null)  => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/pictures`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    });
    const result = await response.json();

    return result.data;
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ fetchFieldPictures() ~ error:", error);
  }
};

export const removePicture = async ( id: number, token: string | null, location: string ) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/${location}`, {
      method: "DELETE",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    });
    const result = await response.json();

    return result.data;
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ removePicture() ~ error:", error);
  }
};

export const updateField = async ( id: number, token: string | null,  data: FieldData) => {
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
  }
};

export const updateFieldStatus = async ( id: number, token: string | null,  data: boolean) => {
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
  }
};

export const saveFieldDays = async ( id: number, token: string | null,  data: FieldDay[]) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/days`, {
      method: "POST",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({days: data}),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ saveFieldDays() ~ error:", error);
    return { status: false };
  }
};

export const fetchFieldDays = async ( id: number, token: string | null ) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/days`, {
      method: "GET",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      }
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ fetchFieldDays() ~ error:", error);
    return { status: false };
  }
};

export const updateFieldDays = async ( id: number, token: string | null,  data: FieldDay[]) => {
  try {
    const response = await fetch(`${API_URL}api/company/field/${id}/days`, {
      method: "PUT",
      headers: {
        ...FETCH_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({days: data}),
    });
    return await response.json();
  } catch (error) {
    console.log("🚩 ~ models/Field.ts ~ updateFieldDays() ~ error:", error);
    return { status: false };
  }
};
