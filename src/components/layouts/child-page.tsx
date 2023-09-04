import { View, SafeAreaView, ScrollView, StyleProp, ViewStyle  } from "react-native";
import { ReactNode } from "react";
import { Stack } from "expo-router";
import { LayoutStyles } from "@/src/utils/Styles";
import Back from "@/src/components/header/back";

const ChildPage = ({ style, children }: { style?: StyleProp<ViewStyle>, children: ReactNode }) => {
  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerLeft: () => <Back />,
        }}
      />
      <ScrollView
        style={{ paddingTop: 20 }}
        contentContainerStyle={{ alignItems: "center"}}
      >
        <View style={[LayoutStyles.scrollContainer, style]}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default ChildPage;
