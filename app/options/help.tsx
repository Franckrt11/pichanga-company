import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import * as Linking from "expo-linking";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import Back from "@/src/components/header/back";

const mailUrl = "mailto:soporte@tejuegounapichanga.com";
const telUrl = "tel:982984877";

const Help = () => {
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
      <ScrollView style={{ paddingTop: 20 }}>
        <View style={LayoutStyles.scrollContainer}>
          <Text style={LayoutStyles.pageTitle}>AYUDA</Text>
          <Text style={styles.content}>Puedes comunicarte al</Text>
          <Pressable onPress={() => Linking.openURL(mailUrl)}>
            <Text
              style={[
                styles.content,
                styles.contentBold,
              ]}
            >
              soporte@tejuegounapichanga.com
            </Text>
          </Pressable>
          <Pressable onPress={() => Linking.openURL(telUrl)}>
            <Text
              style={[
                styles.content,
                styles.contentBold,
              ]}
            >
              (+51) 982 984 877
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Help;

const styles = StyleSheet.create({
  content: {
    color: Colors.maastrichtBlue,
    fontSize: 15,
    fontFamily: "PoppinsMedium",
    marginBottom: 10,
    textAlign: "left",
  },
  contentBold: {
    fontSize: 17,
    fontFamily: "PoppinsSemiBold"
  }
});
