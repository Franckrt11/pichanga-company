import { ReactNode } from "react";

export interface PhotoData {
  photo: string | undefined | null;
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
