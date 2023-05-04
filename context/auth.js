import { ActivityIndicator, View } from "react-native";
import { useRouter, useSegments } from "expo-router";
import React, { createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(null);

// This hook can be used to access the user info.
export const useAuth = () => {
  return React.useContext(AuthContext);
};

// This hook will protect the route access based on user authentication.
const useProtectedRoute = (user) => {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
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

  const signIn = () => {
    setLoading(true);
    try {
      setUser('Laucian');
      setToken('adasdvavadsv');
      AsyncStorage.setItem('token', token);
      AsyncStorage.setItem('user', user);
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
