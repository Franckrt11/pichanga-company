import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          // height: 30,
        },
        headerShadowVisible: false,
      }}
    />
  );
}
