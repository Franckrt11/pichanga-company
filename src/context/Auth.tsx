import { createContext, useEffect, useContext, useState } from "react";
import { router, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "./User";
import {
  fetchLogin,
  fetchRegister,
  fetchUser,
  fetchNewPassword,
  fetchLogout,
} from "@/src/models/Auth";
import { fetchConfigAll } from "@/src/models/Config";
import { ProviderProps, RegisterUserData } from "@/src/utils/Types";

interface IAuthContext {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (data: RegisterUserData) => Promise<void>;
  newPassword: (
    email: string,
    oldPassword: string,
    newPassword: string
  ) => Promise<void>;
  token: string | null;
  userId: string | null;
  loading: boolean;
  errors: any; // Revisar type de Errores del API
  config: any; // Setear Type de Config
}

const AuthContext = createContext({} as IAuthContext);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const useProtectedRoute = (token: string | null) => {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!token && !inAuthGroup) {
      router.replace("/login");
    } else if (token && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [token, segments]);
};

export const AuthProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [errors, setErrors] = useState(null);
  const [config, setConfig] = useState(null);
  const { dispatch } = useUserContext();

  const loadConfig = async (token: string | null) => {
    const response = await fetchConfigAll(token);
    if (response.status) {
      setConfig(response.data);
    }
  };

  const unauthenticated = () => {
    setToken(null);
    setUserId(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    dispatch({ type: "delete" });
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetchLogin(email, password);

      if (response.status) {
        setToken(response.token);
        setUserId(response.user.id.toString());
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("userId", response.user.id.toString());
        dispatch({
          type: "change",
          payload: response.user,
        });
        await loadConfig(response.token);
      } else {
        setErrors(response.messages);
        console.log("Error", response.messages);
      }
    } catch (error) {
      console.log("🚩 ~ context/Auth.js ~ signIn() ~ error:", error);
    }
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const response = await fetchLogout(token);
      if (response.status) {
        setToken(null);
        setUserId(null);
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("userId");
        dispatch({ type: "delete" });
      }

      if (response.message === "Unauthenticated.") {
        unauthenticated();
      }
    } catch (error) {
      console.log("🚩 ~ context/Auth.js ~ signOut() ~ error:", error);
    }
    setLoading(false);
  };

  const signUp = async (data: RegisterUserData) => {
    setLoading(true);
    try {
      const response = await fetchRegister(data);

      if (response.status) {
        setToken(response.token);
        setUserId(response.user.id.toString());
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("userId", response.user.id.toString());
        dispatch({
          type: "change",
          payload: response.user,
        });
        setErrors(null);
      } else {
        setErrors(response.errors);
        console.log("Error", response.errors);
      }
    } catch (error) {
      console.log("🚩 ~ context/Auth.js ~ signUp() ~ error:", error);
    }
    setLoading(false);
  };

  const newPassword = async (
    email: string,
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      let userToken = await AsyncStorage.getItem("token");
      let userId = await AsyncStorage.getItem("userId");

      const response = await fetchNewPassword(email, oldPassword, newPassword);
      // Pendiente por completar
    } catch (error) {
      console.log("🚩 ~ context/Auth.js ~ newPassword() ~ error:", error);
    }
  };

  const isLoggedIn = async () => {
    try {
      let storageToken = await AsyncStorage.getItem("token");
      let storageId = await AsyncStorage.getItem("userId");

      if (storageToken !== null && typeof storageToken !== "undefined") {
        setToken(storageToken);
        setUserId(storageId);
        await loadConfig(storageToken);
      }

      if (storageId !== null && typeof storageId !== "undefined") {
        const response = await fetchUser(storageId, storageToken);
        if (response.status) {
          dispatch({
            type: "change",
            payload: response.data,
          });
        } else if (response.message === "Unauthenticated.") {
          unauthenticated();
        } else {
          console.log("🚩 ~ context/Auth.js ~ isLoggedIn() ~ fetchUser:", response);
        }
      }
    } catch (error) {
      console.log("🚩 ~ context/Auth.js ~ isLoggedIn() ~ error:", error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  useProtectedRoute(token);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        newPassword,
        token,
        userId,
        loading,
        errors,
        config,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
