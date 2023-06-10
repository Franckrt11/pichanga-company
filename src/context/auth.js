import { createContext, useEffect, useContext, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchLogin, fetchRegister, fetchUser } from "../models/auth";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProtectedRoute = (token) => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!token && !inAuthGroup) {
      router.replace("/login");
    } else if (token && inAuthGroup) {
      router.replace("/(tabs)/home");
    }
  }, [token, segments]);
};

export const AuthProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [errors, setErrors] = useState(null);

  const signIn = async (email, password) => {
    if (!email || !password) {
      alert("No data en inputs");
      return;
    }

    setLoading(true);
    try {
      const response = await fetchLogin(email, password);

      if (response.status) {
        setUserData(response.user);
        setToken(response.token);
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("userId", response.user.id.toString());
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
    setUserData(null);
    setToken(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    setLoading(false);
  };

  const signUp = async (
    name,
    ruc,
    email,
    password,
    password_confirmation,
    checkbox
  ) => {
    if (!checkbox) {
      alert("Aceptar terminos");
      return;
    }
    if (!email || !password) {
      alert("No data en inputs");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchRegister({
        name,
        ruc,
        email,
        password,
        password_confirmation,
      });

      if (response.status) {
        setUserData(response.user);
        setToken(response.token);
        await AsyncStorage.setItem("token", response.token);
        await AsyncStorage.setItem("userId", response.user.id.toString());
      } else {
        setErrors(response.messages);
        console.log("Error", response.messages);
      }
    } catch (error) {
      console.log("🚩 ~ auth.js ~ signOut() ~ error:", error);
    }
    setLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      let userToken = await AsyncStorage.getItem("token");
      let userId = await AsyncStorage.getItem("userId");

      if (userToken !== null && typeof userToken !== "undefined") {
        setToken(userToken);
      }

      if (userId !== null && typeof userId !== 'undefined') {
        const response = await fetchUser(userId, userToken);
        setUserData(response.data);
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
        token,
        userData,
        loading,
        errors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
