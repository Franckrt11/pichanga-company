import { ReactNode } from "react";

export interface RegisterUserData {
  name: string;
  ruc: string;
  email: string;
  password: string;
  password_confirmation: string;
  checkbox: boolean;
}

export interface PhotoData {
  photo: string | null;
}

export interface UserData extends PhotoData {
  id?: number;
  name: string;
  ruc: string;
  email: string;
  push?: boolean;
  mailing?: boolean;
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
  portrait?: string | null;
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

export interface FieldDay {
  day: string;
  active: boolean;
};

export interface HourRange {
  id?: number;
  position: number;
  start: string;
  end: string;
};

export interface HourDayRange {
  [key: string]: HourRange[]
};

export interface PriceRange {
  full: number;
  half: number;
};

export interface PriceDayRange {
  [key: string]: PriceRange[]
};

export interface IMessages {
  id: number;
  message: string;
  sender: string;
  attach: string | null;
  chat_id: number;
  updated_at: string;
  created_at: string;
}

export interface IRoom {
  id: number;
  last_message: string;
  last_sender: string;
  company_id: number;
  user_id: number;
  company: IFetchCompany;
  user: IFetchUser;
  created_at: string;
  updated_at: string;
}

export interface IFetchCompany extends PhotoData {
  id: number;
  name: string;
  ruc: string;
  email: string;
}

export interface IFetchUser extends PhotoData {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
}
