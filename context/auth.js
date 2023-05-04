import { ActivityIndicator, View } from "react-native";
import { useRouter, useSegments } from "expo-router";
import React, { createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchLogin } from "../models/auth";

const AuthContext = createContext(null);

export const useAuth = () => {
  return React.useContext(AuthContext);
};

const useProtectedRoute = (user) => {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/login");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
};

export const Provider = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);

  useProtectedRoute(user);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetchLogin(email, password);
      setUser(response.user);
      setToken(response.token);
      AsyncStorage.setItem('token', response.token);
      AsyncStorage.setItem('user', response.user);
    } catch (error) {
      console.log("🚩 ~ auth.js ~ signIn() ~ error:", error);
    }
    setLoading(false);
  };

  const signOut = () => {
    setLoading(true);
    setUser(null);
    setToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user');
    setLoading(false);
  };

  const isLoggedIn = async () => {
    setLoading(true);
    try {
      let userToken = await AsyncStorage.getItem('token');
      setToken(userToken);
    } catch (error) {
      console.log("🚩 ~ auth.js ~ isLoggedIn() ~ error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        token,
        user,
        loading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
