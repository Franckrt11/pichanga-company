import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Stack, useRouter } from "expo-router";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/Feather";
import { useAuthContext } from "../src/context/auth";
import { useUserContext, useUserDispatch } from "../src/context/user";
import { LayoutStyles, Colors, AppImages } from "../src/constants/styles";
import Back from "../src/components/header/back";
import Input from "../src/components/input";
import PencilIcon from "../src/components/icons/pencil-icon";
import ExitIcon from "../src/components/icons/exit-icon";
import TrashIcon from "../src/components/icons/trash-icon";
import CachedImage from "../src/components/cached-image";
import { pickImageAsync, pickCameraAsync } from "../src/models/imagePicker";
import {
  saveUserProfile,
  saveUserAvatar,
  removeUserAvatar,
} from "../src/models/user";

const User = () => {
  const { signOut, token, errors } = useAuthContext();
  const state = useUserContext();
  const dispatch = useUserDispatch();
  const router = useRouter();

  const [ruc, setRuc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["20"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current.present();
  }, []);

  const handleClosePress = () => bottomSheetModalRef.current.close();

  const pickImage = async () => {
    let image = await pickImageAsync();
    if (image) {
      const photo = await saveAvatar(image);
      await dispatch({
        type: "change-avatar",
        payload: photo,
      });
      setAvatar(photo);
      await handleClosePress();
    }
  };

  const pickCamera = async () => {
    let image = await pickCameraAsync();
    if (image) {
      const photo = await saveAvatar(image);
      await dispatch({
        type: "change-avatar",
        payload: photo,
      });
      setAvatar(photo);
      await handleClosePress();
    }
  };

  const removeImage = () => {
    removeAvatar();
  };

  const saveProfile = async () => {
    const profile = await saveUserProfile(
      { name, email, ruc },
      token,
      state.id
    );
    Alert.alert("Profile guardado.");
    await dispatch({
      type: "change",
      payload: profile,
    });
  };

  const saveAvatar = async (imageUri) => {
    const avatar = await saveUserAvatar(imageUri, token, state.id);
    Alert.alert("Imagen de perfil guardada.");
    await dispatch({
      type: "change-avatar",
      payload: avatar,
    });
  };

  const removeAvatar = async () => {
    const response = await removeUserAvatar(token, state.id);
    Alert.alert(response);
    await dispatch({
      type: "change-avatar",
      payload: null,
    });
  };

  useEffect(() => {
    setRuc(state.ruc);
    setName(state.name);
    setEmail(state.email);
    setAvatar(state.photo);
  }, [state]);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.2}
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
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
        <View
          style={{
            width: "90%",
            alignItems: "center",
          }}
        >
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            style={styles.modal}
            handleStyle={{ backgroundColor: "#E6E6E6" }}
            backdropComponent={renderBackdrop}
          >
            <BottomSheetView
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={pickCamera}
                  style={[
                    styles.buttonOutline,
                    { backgroundColor: Colors.white },
                  ]}
                >
                  <Icon name="camera" size={15} color={Colors.maastrichtBlue} />
                  <Text style={styles.buttonOutlineText}>Cámara</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={pickImage}
                  style={[
                    styles.buttonOutline,
                    { backgroundColor: Colors.white },
                  ]}
                >
                  <Icon name="image" size={15} color={Colors.maastrichtBlue} />
                  <Text style={styles.buttonOutlineText}>Galería</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
          <CachedImage
            size={120}
            defaultImage={AppImages.images.avatarDefault}
            name={avatar}
            styles={{
              borderRadius: 60,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 20,
            }}
          />
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 15 }}>
            <TouchableOpacity
              onPress={handlePresentModalPress}
              style={styles.buttonOutline}
            >
              <PencilIcon />
              <Text style={styles.buttonOutlineText}>Editar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={removeImage}
              style={styles.buttonOutline}
            >
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
              <Text
                style={{ fontFamily: "PoppinsMedium", color: Colors.white }}
              >
                Cambiar contraseña
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signOut()} style={styles.button}>
              <ExitIcon />
              <Text
                style={{ fontFamily: "PoppinsMedium", color: Colors.white }}
              >
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
              onPress={() => saveProfile()}
              style={[styles.button, { backgroundColor: Colors.metallicGreen }]}
            >
              <Text
                style={{ fontFamily: "PoppinsMedium", color: Colors.white }}
              >
                GUARDAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
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
