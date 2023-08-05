import {
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
  Switch,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Stack, router } from "expo-router";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import Back from "@/src/components/header/back";
import UserBlockedIcon from "@/src/components/icons/user-blocked-icon";
import TermsIcon from "@/src/components/icons/terms-icon";
import HelpIcon from "@/src/components/icons/help-icon";

const Options = () => {
  const [isPush, setIsPush] = useState(false);
  const [isMail, setIsMail] = useState(false);
  const togglePush = () => setIsPush((previousState) => !previousState);
  const toggleMail = () => setIsMail((previousState) => !previousState);

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
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={[LayoutStyles.scrollContainer, { width: "80%" }]}>
          <Text style={LayoutStyles.pageTitle}>OPCIONES</Text>
          <View style={{ marginBottom: 30 }}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
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
