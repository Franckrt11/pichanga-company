import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Switch,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { LayoutStyles, RegisterStyles, Colors } from "../src/constants/styles";
import ArrowLeftIcon from "../src/components/icons/arrowleft-icon";
import UserBlockedIcon from "../src/components/icons/user-blocked-icon";
import TermsIcon from "../src/components/icons/terms-icon";
import HelpIcon from "../src/components/icons/help-icon";

const Options = () => {
  const router = useRouter();
  const [isPush, setIsPush] = useState(false);
  const [isMail, setIsMail] = useState(false);
  const togglePush = () => setIsPush((previousState) => !previousState);
  const toggleMail = () => setIsMail((previousState) => !previousState);

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
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 10 }}
            >
              <ArrowLeftIcon />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Text style={RegisterStyles.inputTitle}>OPCIONES</Text>
      </View>
      <View style={[styles.container, { width: "70%" }]}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Notificaciones PUSH</Text>
          <Switch
            trackColor={{ false: Colors.silverSand, true: Colors.silverSand }}
            thumbColor={isPush ? Colors.greenLizard : Colors.maastrichtBlue}
            ios_backgroundColor={Colors.maastrichtBlue}
            onValueChange={togglePush}
            value={isPush}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Notificaciones por correo</Text>
          <Switch
            trackColor={{ false: Colors.silverSand, true: Colors.silverSand }}
            thumbColor={isMail ? Colors.greenLizard : Colors.maastrichtBlue}
            ios_backgroundColor={Colors.maastrichtBlue}
            onValueChange={toggleMail}
            value={isMail}
          />
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttom}>
          <UserBlockedIcon size={18} />
          <Text style={styles.buttomText}>Bloqueo de usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttom}>
          <TermsIcon size={18} />
          <Text style={styles.buttomText}>Términos y condiciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttom}>
          <HelpIcon size={18} />
          <Text style={styles.buttomText}>Ayuda</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    justifyContent: "center"
  },
  buttomText: {
    color: Colors.maastrichtBlue,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    marginLeft: 10
  },
});
