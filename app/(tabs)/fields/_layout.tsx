import { Stack } from "expo-router/stack";
import Logo from "@/src/components/header/logo";
import FieldControl from "@/src/components/header/field-control";

const FieldsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => <Logo />,
        headerStyle: { backgroundColor: "white" },
        headerShadowVisible: false,
        animation: "none",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <></>,
          headerRight: () => (
            <FieldControl route={"fields/location"} icon={"map"} />
          ),
        }}
      />
      <Stack.Screen
        name="location"
        options={{
          headerTitle: () => <></>,
          headerRight: () => (
            <FieldControl route={"fields"} icon={"field"} />
          ),
        }}
      />
    </Stack>
  );
};

export default FieldsLayout;
