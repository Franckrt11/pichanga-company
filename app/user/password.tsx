import { Text, SafeAreaView, ScrollView, View } from "react-native";
import { Stack } from "expo-router";
import { LayoutStyles } from "@/src/utils/Styles";
import Back from "@/src/components/header/back";

const Password = () => {
  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => <></>,
          headerLeft: () => <Back />,
        }}
      />
      <ScrollView style={{ paddingTop: 30 }}>
        <View style={LayoutStyles.scrollContainer}>
          <Text style={LayoutStyles.pageTitle}>CAMBIAR CONTRASEÑA</Text>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Password;
