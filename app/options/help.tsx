import {
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import * as Linking from "expo-linking";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";

const Help = () => {
  const mail = "soporte@tejuegounapichanga.com"
  const mailUrl = "mailto:"+mail;
  const telUrl = "tel:982984877";

  return (
    <ChildPage style={{ width: "80%" }}>
      <Text style={LayoutStyles.pageTitle}>AYUDA</Text>
      <Text style={styles.content}>Puedes comunicarte al</Text>
      <Pressable onPress={() => Linking.openURL(mailUrl)}>
        <Text
          style={[
            styles.content,
            styles.contentBold,
          ]}
        >
          {mail}
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
    </ChildPage>
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
