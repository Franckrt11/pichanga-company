import {
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  View,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Stack, router } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import { useAuthContext } from "@/src/context/Auth";
import { useUserContext } from "@/src/context/User";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import Images from "@/src/utils/Images";
import Back from "@/src/components/header/back";
import Input from "@/src/components/input";
import PencilIcon from "@/src/components/icons/pencil-icon";
import ExitIcon from "@/src/components/icons/exit-icon";
import TrashIcon from "@/src/components/icons/trash-icon";
import {
  saveUserProfile,
  saveUserAvatar,
  removeUserAvatar,
} from "@/src/models/User";

const User = () => {
  const { signOut, token, errors } = useAuthContext();
  const { state, dispatch } = useUserContext();

  const [ruc, setRuc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const pickImage = async (): Promise<void> => {
    // let image = await pickImageAsync();
    // if (image) {
    //   const photo = await saveAvatar(image);
    //   await dispatch({
    //     type: "change-avatar",
    //     payload: photo,
    //   });
    //   await setAvatar(photo);
    //   await handleClosePress();
    // }
  };

  const pickCamera = async (): Promise<void> => {
    // let image = await pickCameraAsync();
    // if (image) {
    //   const photo = await saveAvatar(image);
    //   await dispatch({
    //     type: "change-avatar",
    //     payload: photo,
    //   });
    //   setAvatar(photo);
    //   await handleClosePress();
    // }
  };

  // const removeImage = () => { // Borrar porque no sirve
  //   removeAvatar();
  // };

  const saveProfile = async (): Promise<void> => {
    const profile = await saveUserProfile(
      {
        name,
        email,
        ruc,
      },
      token,
      state.id
    );
    console.log("🚀 ~ file: user.tsx:95 ~ saveProfile ~ profile:", profile);
    Alert.alert("Profile guardado.");
    await dispatch({
      type: "change",
      payload: profile!,
    });
  };

  const saveAvatar = async (imageUri: string | boolean): Promise<void> => {
    // const avatar = await saveUserAvatar(imageUri, token, state.id);
    // Alert.alert("Imagen de perfil guardada.");
    // await dispatch({
    //   type: "change-avatar",
    //   payload: { photo: avatar },
    // });
  };

  const removeAvatar = async (): Promise<void> => {
    // const response: string = await removeUserAvatar(token, state.id);
    // Alert.alert(response);
    // await dispatch({
    //   type: "change-avatar",
    //   payload: null,
    // });
  };

  useEffect(() => {
    setRuc(state.ruc);
    setName(state.name);
    setEmail(state.email);
    setAvatar(state.photo);
  }, [state]);

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
      <ScrollView style={{ paddingTop: 20 }}>
        <View style={[LayoutStyles.scrollContainer, { width: "80%" }]}>
          {/* <CachedImage
            size={120}
            defaultImage={Images.avatarDefault}
            name={avatar}
            styles={{
              borderRadius: 60,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 20,
            }}
          /> */}
          <Image
            source={Images.avatarDefault}
            style={{
              borderRadius: 60,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 20,
              height: 120,
              width: 120,
            }}
          />
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 15, width: "90%", marginHorizontal: "auto" }}>
            <Pressable
              // onPress={handlePresentModalPress}
              style={styles.buttonOutline}
            >
              <PencilIcon />
              <Text style={styles.buttonOutlineText}>Editar foto</Text>
            </Pressable>
            <Pressable
              onPress={removeAvatar}
              style={styles.buttonOutline}
            >
              <TrashIcon />
              <Text style={styles.buttonOutlineText}>Borrar foto</Text>
            </Pressable>
          </View>
          <View style={{ width: "100%", marginBottom: 20 }}>
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
          <View style={{ width: "80%", marginBottom: 40, marginHorizontal: "auto" }}>
            <Pressable
              onPress={() => router.push("/user/password")}
              style={styles.button}
            >
              <Text
                style={{ fontFamily: "PoppinsMedium", color: Colors.white }}
              >
                Cambiar contraseña
              </Text>
            </Pressable>
            <Pressable onPress={() => signOut()} style={styles.button}>
              <ExitIcon />
              <Text
                style={{ fontFamily: "PoppinsMedium", color: Colors.white }}
              >
                Cerrar sesión
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: Colors.white }]}
              onPress={() => router.push("/user/delete")}
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
            </Pressable>
          </View>
          <View style={{ width: "100%" }}>
            <Pressable
              onPress={() => saveProfile()}
              style={[styles.button, { backgroundColor: Colors.metallicGreen }]}
            >
              <Text
                style={{ fontFamily: "PoppinsMedium", color: Colors.white }}
              >
                GUARDAR
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  buttonOutline: {
    borderColor: Colors.silverSand,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
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
  modal: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  modalContent: {
    flexDirection: "row",
    gap: 30,
    marginBottom: 15,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 30,
  },
});
