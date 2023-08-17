import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useUserContext } from "@/src/context/User";
import { useAuthContext } from "@/src/context/Auth";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import Input from "@/src/components/input";

const Password = () => {
  const [old, setOld] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { state } = useUserContext();
  const { newPassword } = useAuthContext();

  const changePassword = async (): Promise<void> => {
    console.log('changePassword');
    const response = await newPassword(state.email, old, password);
    console.log("🚀 ~ file: user.tsx:95 ~ saveProfile ~ change:", response);
    Alert.alert("Contraseña actualizada.");
  };

  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>CAMBIAR CONTRASEÑA</Text>
      <View style={{ width: "80%", marginHorizontal: "auto", marginBottom: 40 }}>
        <Input
          placeholder="Contraseña actual"
          value={old}
          onChangeText={(text: string) => setOld(text)}
          styles={PageStyles.input}
          theme="light"
          password={true}
        />
        <Input
          placeholder="Contraseña nueva"
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          styles={PageStyles.input}
          theme="light"
          password={true}
        />
        <Input
          placeholder="Repetir contraseña nueva"
          value={confirm}
          onChangeText={(text: string) => setConfirm(text)}
          styles={PageStyles.input}
          theme="light"
          password={true}
        />
      </View>
      <Pressable
        onPress={() => changePassword()}
        style={[styles.button, { width: "80%" }]}
      >
        <Text style={styles.buttonText}>GUARDAR</Text>
      </Pressable>
    </ChildPage>
  );
};

export default Password;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.metallicGreen,
    width: "80%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: "auto"
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  }
});
