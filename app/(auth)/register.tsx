import {
  Pressable,
  ActivityIndicator,
  Text,
  View,
  Platform,
} from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useAuthContext } from "@/src/context/Auth";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import Input from "@/src/components/input";

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
    <ChildPage style={{ width: "70%" }}>
      <View style={{ marginBottom: 30 }}>
        <Text style={LayoutStyles.pageTitle}>REGISTRO</Text>
        <Input
          placeholder="Razón social"
          value={name}
          onChangeText={(text: string) => setName(text)}
          styles={PageStyles.input}
          theme="light"
          error={errors ? errors.name : null}
        />
        <Input
          placeholder="R.U.C."
          value={ruc}
          onChangeText={(text: string) => setRuc(text)}
          styles={PageStyles.input}
          theme="light"
          keyboardType="numeric"
          error={errors ? errors.ruc : null}
        />
        <Input
          placeholder="Correo electrónico"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          styles={PageStyles.input}
          theme="light"
          keyboardType="email-address"
          error={errors ? errors.email : null}
        />
        <Input
          placeholder="Contraseña"
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          styles={PageStyles.input}
          theme="light"
          password={true}
          error={errors ? errors.password : null}
        />
        <Input
          placeholder="Repetir contraseña"
          value={password_confirmation}
          onChangeText={(text: string) => setPasswordConfirmation(text)}
          styles={PageStyles.input}
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
                status: false,
                photo: null
              })
            }
            style={PageStyles.button}
          >
            <Text style={PageStyles.buttonText}>REGISTRAR</Text>
          </Pressable>
        )}
      </View>
    </ChildPage>
  );
};

export default Register;
