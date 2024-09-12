import {
  View,
  SafeAreaView,
  ScrollView,
  StyleProp,
  ViewStyle,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { ReactNode } from "react";
import { Stack } from "expo-router";
import { LayoutStyles } from "@/src/utils/Styles";
import Back from "@/src/components/header/back";

const ChildPage = ({
  style,
  children,
}: {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) => {
  return (
    <SafeAreaView style={LayoutStyles.whiteContainer}>
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerLeft: () => <Back />,
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={120}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{ paddingTop: 20 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={[LayoutStyles.scrollContainer, style]}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChildPage;
