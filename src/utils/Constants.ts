// import { Platform } from "react-native";

export const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL;

export const FETCH_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const RESERVE_STATUS = [
  {
    value: "pending",
    text: "En espera",
  },
  {
    value: "confirm",
    text: "Confirmado",
  },
  {
    value: "cancel",
    text: "Cancelado",
  },
];

export const HOUR_LIST = [
  {
    value: 1,
    text: "5:00 am",
  },
  {
    value: 2,
    text: "6:00 am",
  },
  {
    value: 3,
    text: "7:00 am",
  },
  {
    value: 4,
    text: "8:00 am",
  },
  {
    value: 5,
    text: "9:00 am",
  },
  {
    value: 6,
    text: "10:00 am",
  },
  {
    value: 7,
    text: "11:00 am",
  },
  {
    value: 8,
    text: "12:00 pm",
  },
  {
    value: 9,
    text: "1:00 pm",
  },
  {
    value: 10,
    text: "2:00 pm",
  },
  {
    value: 11,
    text: "3:00 pm",
  },
  {
    value: 12,
    text: "4:00 pm",
  },
  {
    value: 13,
    text: "5:00 pm",
  },
  {
    value: 14,
    text: "6:00 pm",
  },
  {
    value: 15,
    text: "7:00 pm",
  },
  {
    value: 16,
    text: "8:00 pm",
  },
  {
    value: 17,
    text: "9:00 pm",
  },
  {
    value: 18,
    text: "10:00 pm",
  },
  {
    value: 19,
    text: "11:00 pm",
  },
  {
    value: 20,
    text: "12:00 am",
  },
];
