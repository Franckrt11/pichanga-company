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

export interface DistrictData {
  id: number;
  name: string;
  city_id: number;
}

export interface CityData {
  id: number;
  name: string;
  country_id: number;
}

export interface CountryData {
  id: number;
  name: string;
}

export interface LocationDataSave {
  address: string;
  company_id?: number;
  city_id: number;
  country_id: number;
  district_id: number;
  map_latitude: number;
  map_longitude: number;
  mobile: string;
  name: string;
  parking: string;
  phone: string;
}

export interface FieldDataSave {
  company_id?: number;
  games: string;
  location_id?: number;
  players: string;
  size: string;
  type: string;
}

export interface LocationData {
  active?: boolean;
  address: string;
  city: CityData;
  company_id: number;
  country: CountryData;
  district: DistrictData;
  id?: number;
  map_latitude: number;
  map_longitude: number;
  mobile: string;
  name: string;
  parking: string;
  phone: string;
}

export interface FieldData {
  active?: boolean;
  games: string;
  id?: number;
  location: LocationData;
  players: string;
  portrait?: string | null;
  size: string;
  type: string;
};

export interface FieldPicture {
  picture: string | boolean;
  position?: number;
  field_id: number;
};

export interface FieldPictureData {
  id: number;
  filename: string;
  position: number;
  field_id: number;
};

export interface FieldDay {
  day: number;
  active: boolean;
};

export interface HourRange {
  id?: number;
  position: number;
  start: number;
  end: number;
  price?: any;
};

export interface HourDayRange {
  [key: number]: HourRange[]
};

export interface PriceRange {
  whole: number;
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

export interface SavePrice {
  id: number;
  price: PriceRange;
}

export interface ReserveData {
  id?: number;
  start_date: string;
  date: string;
  time: number;
  game: string;
  price: number;
  inscription: boolean;
  status?: string;
  field_hour_id: number;
  field_id: number;
  user_id: number;
  field?: FieldData;
  hour?: HourRange;
  user?: ClientData;
}

export interface ClientData extends PhotoData {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  district: string;
}
