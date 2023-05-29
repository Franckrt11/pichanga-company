import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../src/context/auth";
import { LayoutStyles, Colors } from "../src/constants/styles";
import Back from "../src/components/header/back";
import Input from "../src/components/input";
import PencilIcon from "../src/components/icons/pencil-icon";
import ExitIcon from "../src/components/icons/exit-icon";
import TrashIcon from "../src/components/icons/trash-icon";
import ImageViewer from "../src/components/image-viewer";

const User = () => {
  const { signOut, user, errors } = useAuth();
  const [image, setImage] = useState(null);
  const [ruc, setRuc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      console.log("ImagePicker", result.assets);
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  useEffect(() => {
    setRuc(user ? user.ruc : "");
    setName(user ? user.name : "");
    setEmail(user ? user.email : "");
  }, []);

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
          headerLeft: () => <Back />,
        }}
      />
      <View style={{ width: "90%", alignItems: "center" }}>
        <ImageViewer
          placeholderImageSource={require("../src/assets/user-default.jpg")}
          selectedImage={image}
        />
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
          <TouchableOpacity
            onPress={pickImageAsync}
            style={styles.buttonOutline}
          >
            <PencilIcon />
            <Text style={styles.buttonOutlineText}>Editar foto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={removeImage} style={styles.buttonOutline}>
            <TrashIcon />
            <Text style={styles.buttonOutlineText}>Borrar foto</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%" }}>
          <Input
            placeholder="Razón social"
            value={name}
            onChangeText={(text) => setName(text)}
            styles={styles.input}
            theme="light"
            error={errors ? errors.name : null}
          />
          <Input
            placeholder="R.U.C."
            value={ruc}
            onChangeText={(text) => setRuc(text)}
            styles={styles.input}
            theme="light"
            keyboardType="numeric"
            error={errors ? errors.ruc : null}
          />
          <Input
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            styles={styles.input}
            theme="light"
            keyboardType="email-address"
            error={errors ? errors.email : null}
          />
        </View>
        <View style={{ width: "80%", marginBottom: 40 }}>
          <TouchableOpacity
            onPress={() => router.push("/password")}
            style={styles.button}
          >
            <Text style={{ fontFamily: "PoppinsMedium", color: Colors.white }}>
              Cambiar contraseña
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signOut()} style={styles.button}>
            <ExitIcon />
            <Text style={{ fontFamily: "PoppinsMedium", color: Colors.white }}>
              Cerrar sesión
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors.white }]}
          >
            <Text
              style={{
                color: Colors.metallicGreen,
                textDecorationLine: "underline",
                fontFamily: "PoppinsMedium",
              }}
            >
              Eliminar cuenta
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors.metallicGreen }]}
          >
            <Text style={{ fontFamily: "PoppinsMedium", color: Colors.white }}>
              GUARDAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default User;

const styles = StyleSheet.create({
  buttonOutline: {
    borderColor: Colors.silverSand,
    borderWidth: 1,
    padding: 4,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    flexGrow: 1,
  },
  buttonOutlineText: {
    fontFamily: "PoppinsMedium",
    color: Colors.maastrichtBlue,
  },
  button: {
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    padding: 10,
  },
  buttonText: {
    color: Colors.maastrichtBlue,
    fontSize: 18,
    fontFamily: "PoppinsMedium",
  },
  input: {
    color: Colors.maastrichtBlue,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor: Colors.silverSand,
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "PoppinsMedium",
  },
});
