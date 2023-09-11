import {
  Text,
  Pressable,
  StyleSheet,
  View
} from "react-native";
import * as Linking from "expo-linking";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import { useAuthContext } from "@/src/context/Auth";

const Help = () => {
  const { config } = useAuthContext();
  const mail = config.mail;
  const tel = config.phone;
  const mailUrl = "mailto:"+mail;
  const telUrl = "tel:"+tel;

  return (
    <ChildPage style={{ width: "80%"}}>
      <Text style={LayoutStyles.pageTitle}>AYUDA</Text>
      <View style={{alignItems: "flex-start" }}>
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
            (+51) {tel}
          </Text>
        </Pressable>
      </View>
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
