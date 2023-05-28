import {
  Text,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import * as Linking from "expo-linking";
import { LayoutStyles, Colors } from "../src/constants/styles";
import Back from "../src/components/header/back";

const mailUrl = "mailto:soporte@tejuegounapichanga.com";
const telUrl = "tel:982984877";

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
        <TouchableOpacity onPress={() => Linking.openURL(mailUrl)}>
          <Text
            style={[
              styles.content,
              { fontSize: 17, fontFamily: "PoppinsSemiBold" },
            ]}
          >
            soporte@tejuegounapichanga.com
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(telUrl)}>
          <Text
            style={[
              styles.content,
              { fontSize: 17, fontFamily: "PoppinsSemiBold" },
            ]}
          >
            (+51) 982 984 877
          </Text>
        </TouchableOpacity>
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
    textAlign: "left",
  },
});
