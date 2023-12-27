import { API_URL } from "@/src/utils/Constants";

export const getAvatarUrl = (filename: string | null | undefined) =>
  filename ? `${API_URL}storage/company/avatar/${filename}` : undefined;

export const getUserAvatarUrl = (filename: string | null | undefined) =>
  filename ? `${API_URL}storage/user/avatar/${filename}` : undefined;

export const getFieldUrl = (filename: string | null | undefined) =>
  filename ? `${API_URL}storage/company/field/${filename}` : undefined;
