import {
  Pressable,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Stack, router } from "expo-router";
import { useAuthContext } from "@/src/context/Auth";
import Input from "@/src/components/input";
import Images from "@/src/utils/Images";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading, errors } = useAuthContext();

  return (
    <SafeAreaView
      style={LayoutStyles.blueContainer}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView
        style={{ paddingTop: 60 }}
        contentContainerStyle={{ alignItems: "center"}}
      >
        <View style={[LayoutStyles.scrollContainer, { width: "80%", alignItems: "stretch" }]}>
          <View style={{ flex: 1, alignItems: "center", marginBottom: 50 }}>
            <Image style={LoginStyles.logo} source={Images.logo} />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              placeholder="Correo"
              value={email}
              onChangeText={(text: string) => setEmail(text)}
              styles={LoginStyles.input}
              theme="dark"
              error={errors ? errors.email : null}
            />
            <Input
              placeholder="Contraseña"
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              styles={LoginStyles.input}
              theme="dark"
              password={true}
              error={errors ? errors.password : null}
            />
          </View>
          <View style={LoginStyles.buttonContainer}>
            {loading ? (
              <ActivityIndicator style={{ marginBottom: 10 }} size={"large"} />
            ) : (
              <Pressable
                onPress={() => signIn(email, password)}
                style={LoginStyles.button}
              >
                <Text style={LoginStyles.buttonText}>INGRESAR</Text>
              </Pressable>
            )}
            <Pressable
              style={LoginStyles.buttonOutline}
              onPress={() => router.push("/register")}
            >
              <Text style={LoginStyles.buttonText}>REGISTRARSE</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const LoginStyles = StyleSheet.create({
  logo: {
    height: 150,
    width: 140
  },
  input: {
    color: Colors.maastrichtBlue,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    fontFamily: "PoppinsMedium",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
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
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  buttonOutline: {
    backgroundColor: Colors.maastrichtBlue,
    marginTop: 5,
    borderColor: Colors.white,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
});
