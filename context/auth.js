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
      router.replace("/login");
    } else if (user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, segments]);
};

export const Provider = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);

  const signIn = async (email, password) => {
    if (!email || !password) {
      alert('No data en inputs');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchLogin(email, password);
      setUser(response.user);
      setToken(response.token);
      AsyncStorage.setItem('token', response.token);
      AsyncStorage.setItem('user', JSON.stringify(response.user));
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
      let userData = await AsyncStorage.getItem('user');

      if(userToken !== null) {
        setToken(userToken);
      }

      if(userData !== null) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log("🚩 ~ auth.js ~ isLoggedIn() ~ error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  useProtectedRoute(user);

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
