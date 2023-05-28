import { Text, KeyboardAvoidingView, View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { LayoutStyles, Colors } from "../src/constants/styles";
import Back from "../src/components/header/back";

const Help = () => {
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
      <View style={{ width: "90%" }}>
        <Text style={styles.title}>AYUDA</Text>
        <Text style={styles.content}>Puedes comunicarte al</Text>
        <Text style={[styles.content, { fontSize: 17, fontFamily: "PoppinsSemiBold",}]}>soporte@tejuegounapichanga.com</Text>
        <Text style={[styles.content, { fontSize: 17, fontFamily: "PoppinsSemiBold",}]}>(+51) 982 984 877</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Help;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: Colors.maastrichtBlue,
    fontSize: 28,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 10,
  },
  content: {
    color: Colors.maastrichtBlue,
    fontSize: 15,
    fontFamily: "PoppinsMedium",
    marginBottom: 10,
    textAlign: "left"
  },
});
