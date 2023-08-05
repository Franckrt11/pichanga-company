import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { AuthProvider } from "@/src/context/Auth";
import { UserProvider } from "@/src/context/User";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "/(tabs)/home",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PoppinsMedium: require("@/src/assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("@/src/assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("@/src/assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutProvider />;
}

const RootLayoutProvider = () => {
  return (
    <UserProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: "white",
              // height: 30,
            },
            headerShadowVisible: false,
          }}
        />
      </AuthProvider>
    </UserProvider>
  );
};
