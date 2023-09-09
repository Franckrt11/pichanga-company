import {
  Text,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import UserBlockedIcon from "@/src/components/icons/user-blocked-icon";
import TermsIcon from "@/src/components/icons/terms-icon";
import HelpIcon from "@/src/components/icons/help-icon";
import Switch from "@/src/components/switch";

const Options = () => {
  const [isPush, setIsPush] = useState(false);
  const [isMail, setIsMail] = useState(false);
  const togglePush = () => {
    setIsPush((previousState) => !previousState);
  };

  const toggleMail = () => {
    setIsMail((previousState) => !previousState);
  };

  return (
    <ChildPage style={{ width: "80%", alignItems: "stretch" }}>
      <Text style={LayoutStyles.pageTitle}>OPCIONES</Text>
      <View style={{ marginBottom: 30 }}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Notificaciones PUSH</Text>
          <Switch
            onValueChange={togglePush}
            value={isPush}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Notificaciones por correo</Text>
          <Switch
            onValueChange={toggleMail}
            value={isMail}
          />
        </View>
      </View>
      <View>
        {/* <Pressable
          onPress={() => router.push("/blockusers")}
          style={styles.buttom}
        >
          <UserBlockedIcon size={18} />
          <Text style={styles.buttomText}>Bloqueo de usuarios</Text>
        </Pressable> */}
        <Pressable
          onPress={() => router.push("/options/terms")}
          style={styles.buttom}
        >
          <TermsIcon size={18} />
          <Text style={styles.buttomText}>Términos y condiciones</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/options/help")}
          style={styles.buttom}
        >
          <HelpIcon size={18} />
          <Text style={styles.buttomText}>Ayuda</Text>
        </Pressable>
      </View>
    </ChildPage>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginBottom: 10,
  },
  inputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  inputLabel: {
    color: Colors.maastrichtBlue,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  buttom: {
    borderColor: Colors.silverSand,
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttomText: {
    color: Colors.maastrichtBlue,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    marginLeft: 10,
  },
});
