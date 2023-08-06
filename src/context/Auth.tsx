import { createContext, useEffect, useContext, useState } from "react";
import { router, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "./User";
import { fetchLogin, fetchRegister, fetchUser, fetchNewPassword } from "@/src/models/Auth";
import { UserData, FetchUserData, ProviderProps } from "@/src/utils/Types";

interface IAuthContext {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (data: FetchUserData) => Promise<void>;
  newPassword: (email: string, oldPassword: string, newPassword: string) => Promise<void>;
  token: string | null;
  loading: boolean;
  errors: any; // Revisar type de Errores del API
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
  const [errors, setErrors] = useState(null);
  const { dispatch } = useUserContext();

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      alert("No data en inputs");
      return;
    }

    setLoading(true);
    try {
      const response = await fetchLogin(email, password);

      if (response.status) {
        setToken(response.token);
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("userId", response.user.id.toString());
        dispatch({
          type: "change",
          payload: response.user,
        });
      } else {
        setErrors(response.messages);
        console.log("Error", response.messages);
      }
    } catch (error) {
      console.log("🚩 ~ auth.js ~ signIn() ~ error:", error);
    }
    setLoading(false);
  };

  const signOut = () => {
    setLoading(true);
    setToken(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    dispatch({ type: "delete", payload: null });
    setLoading(false);
  };

  const signUp = async (data: FetchUserData) => {
    if (!data.checkbox) {
      alert("Aceptar terminos");
      return;
    }
    if (!data.email || !data.password) {
      alert("No data en inputs");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchRegister(data);

      if (response.status) {
        setToken(response.token);
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("userId", response.user.id.toString());
        dispatch({
          type: "change",
          payload: response.user,
        });
        setErrors(null);
      } else {
        setErrors(response.messages);
        console.log("Error", response.messages);
      }
    } catch (error) {
      console.log("🚩 ~ auth.js ~ signOut() ~ error:", error);
    }
    setLoading(false);
  };

  const newPassword = async (email: string, oldPassword: string, newPassword: string) => {
    try {
      let userToken = await AsyncStorage.getItem("token");
      let userId = await AsyncStorage.getItem("userId");

      const response = await fetchNewPassword(email, oldPassword, newPassword);
    } catch (error) {
      console.log("🚩 ~ auth.js ~ newPassword() ~ error:", error);
    }
  };

  const isLoggedIn = async () => {
    try {
      let userToken = await AsyncStorage.getItem("token");
      let userId = await AsyncStorage.getItem("userId");

      if (userToken !== null && typeof userToken !== "undefined") {
        setToken(userToken);
      }

      if (userId !== null && typeof userId !== "undefined") {
        const response = await fetchUser(userId, userToken);
        dispatch({
          type: "change",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log("🚩 ~ auth.js ~ isLoggedIn() ~ error:", error);
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
        loading,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
