import { Stack } from "expo-router";
import { useCallback, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "../src/context/auth";
import { UserProvider } from "../src/context/user";
import { useFonts } from "../src/models/useFont";

SplashScreen.preventAutoHideAsync();

const Root = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
    setAppIsReady(true);
  };

  LoadFonts();

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthProvider onLayout={onLayoutRootView}>
      <UserProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: "white",
              height: 30,
            },
            headerShadowVisible: false
          }}
        />
      </UserProvider>
    </AuthProvider>
  );
};

export default Root;
