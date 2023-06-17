import API_URL from "../constants/constants";

const fetchHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const saveUserProfile = async (data, token, id) => {
  try {
    const response = await fetch(
      `${API_URL}api/company/profile/update/${id}`,
      {
        method: "POST",
        headers: {
          ...fetchHeaders,
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          ruc: data.ruc,
        }),
      }
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log("🚩 ~ models/user.js ~ saveProfile() ~ error:", error);
  }
};

export const saveUserAvatar = async (imageUri, token, id) => {
  try {
    const response = await fetch(
      `${API_URL}api/company/avatar/update/${id}`,
      {
        method: "POST",
        headers: {
          ...fetchHeaders,
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ photo: imageUri }),
      }
    );
    const result = await response.json();
    return result.photo;
  } catch (error) {
    console.log("🚩 ~ models/user.js ~ saveAvatar() ~ error:", error);
  }
};

export const removeUserAvatar = async (token, id) => {
  try {
    const response = await fetch(
      `${API_URL}api/company/avatar/remove/${id}`,
      {
        method: "POST",
        headers: {
          ...fetchHeaders,
          'Authorization': `Bearer ${token}`
        },
      }
    );
    const result = await response.json();
    return result.message;
  } catch (error) {
    console.log("🚩 ~ models/user.js ~ removeAvatar() ~ error:", error);
  }
};
