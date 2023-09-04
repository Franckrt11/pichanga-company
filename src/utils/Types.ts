import { ReactNode } from "react";

export interface PhotoData {
  photo: string | null;
}

export interface UserData extends PhotoData {
  id?: number;
  name: string;
  ruc: string;
  email: string;
}

export interface FetchUserData extends UserData {
  status: boolean;
  password: string;
  password_confirmation: string;
  checkbox: boolean;
}

export interface ProviderProps {
  children: ReactNode;
}

export interface ColorIconProps {
  active: boolean;
  color: string;
}

export interface SizeIconProps {
  active?: boolean;
  size: number;
}

export interface ISpecialHour {
  type: string;
  day: string;
  hour: string;
  field: string;
  reason: string;
};

export interface FieldData {
  active?: boolean;
  address: string;
  city: string;
  company_id: number;
  country: string;
  district: string;
  games: string;
  id?: number;
  map: string;
  mobile: string;
  name: string;
  parking: string;
  phone: string;
  players: string;
  portrait: string | null;
  size: string;
  type: string;
};

export interface FieldPicture {
  location: string;
  picture: string | boolean;
  position: number;
  field_id: number;
};

export interface FieldPictureData {
  id: number;
  filename: string;
  position: number;
  field_id: number;
};
