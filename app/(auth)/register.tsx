import {
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Platform,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Stack, Link } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useAuthContext } from "@/src/context/Auth";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import Input from "@/src/components/input";
import Back from "@/src/components/header/back";

const CheckboxText = () => {
  return (
    <Text
      style={{
        color: "black",
        paddingLeft: 15,
        fontFamily: "PoppinsMedium",
      }}
    >
      Estoy de acuerdo con los
      <Link
        href={"/terms"}
        style={{ color: Colors.metallicGreen, marginLeft: 4 }}
      >
        Términos y condiciones
      </Link>
    </Text>
  );
};

const Register = () => {
  const [ruc, setRuc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const { signUp, loading, errors } = useAuthContext();

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
      <ScrollView style={{ paddingTop: 20, paddingBottom: 40 }}>
        <View style={[LayoutStyles.scrollContainer,{ width: "70%" }]}>
          <View style={{ marginBottom: 30 }}>
            <Text style={LayoutStyles.pageTitle}>REGISTRO</Text>
            <Input
              placeholder="Razón social"
              value={name}
              onChangeText={(text: string) => setName(text)}
              styles={RegisterStyles.input}
              theme="light"
              error={errors ? errors.name : null}
            />
            <Input
              placeholder="R.U.C."
              value={ruc}
              onChangeText={(text: string) => setRuc(text)}
              styles={RegisterStyles.input}
              theme="light"
              keyboardType="numeric"
              error={errors ? errors.ruc : null}
            />
            <Input
              placeholder="Correo electrónico"
              value={email}
              onChangeText={(text: string) => setEmail(text)}
              styles={RegisterStyles.input}
              theme="light"
              keyboardType="email-address"
              error={errors ? errors.email : null}
            />
            <Input
              placeholder="Contraseña"
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              styles={RegisterStyles.input}
              theme="light"
              password={true}
              error={errors ? errors.password : null}
            />
            <Input
              placeholder="Repetir contraseña"
              value={password_confirmation}
              onChangeText={(text: string) => setPasswordConfirmation(text)}
              styles={RegisterStyles.input}
              theme="light"
              password={true}
            />
            <BouncyCheckbox
              fillColor={Colors.greenLizard}
              innerIconStyle={{ borderColor: Colors.silverSand, borderWidth: 2 }}
              size={22}
              textComponent={<CheckboxText />}
              onPress={() => setCheckbox(!checkbox)}
            />
          </View>
          <View>
            {loading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <Pressable
                onPress={() =>
                  signUp({
                    name,
                    ruc,
                    email,
                    password,
                    password_confirmation,
                    checkbox,
                  })
                }
                style={RegisterStyles.button}
              >
                <Text style={RegisterStyles.buttonText}>REGISTRAR</Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const RegisterStyles = StyleSheet.create({
  inputTitle: {
    color: Colors.maastrichtBlue,
    fontWeight: "700",
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "PoppinsSemiBold",
  },
  input: {
    color: Colors.maastrichtBlue,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    borderRadius: 10,
    fontFamily: "PoppinsMedium",
  },
  button: {
    backgroundColor: Colors.metallicGreen,
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
});
