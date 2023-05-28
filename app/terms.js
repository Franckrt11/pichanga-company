import { Text, KeyboardAvoidingView } from "react-native";
import { Stack } from "expo-router";
import { LayoutStyles } from "../src/constants/styles";
import Back from "../src/components/header/back";

const Terms = () => {
  return (
    <KeyboardAvoidingView
      style={[
        LayoutStyles.whiteContainer,
        { justifyContent: "flex-start", paddingTop: 20 },
      ]}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => {},
          headerLeft: () => <Back />,
        }}
      />
      <Text>Terms</Text>
    </KeyboardAvoidingView>
  );
};

export default Terms;
