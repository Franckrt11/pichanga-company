import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/Feather";
import Back from "@/src/components/header/back";
import UploadPhoto from "@/src/components/upload-photo";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import Images from "@/src/utils/Images";
import { pickImageAsync, pickCameraAsync } from "@/src/models/ImagePicker";
import {
  fetchField,
  changePicture,
  uploadPicture,
  fetchFieldPictures,
  removePicture,
  removePortrait,
  uploadPortrait,
} from "@/src/models/Field";
import { useUserContext } from "@/src/context/User";
import { useAuthContext } from "@/src/context/Auth";
import { getFieldUrl } from "@/src/utils/Helpers";
import PicturesIcon from "@/src/components/icons/pictures-icon";
import { FieldData, FieldPictureData } from "@/src/utils/Types";

const Photos = () => {
  const params = useLocalSearchParams();
  const { state } = useUserContext();
  const { token } = useAuthContext();

  const [location, setLocation] = useState<string | null>(null);
  const [changedPicture, setChangedPicture] = useState<
    FieldPictureData | undefined
  >(undefined);

  const [portrait, setPortrait] = useState<string | undefined>(undefined);
  const [pictures, setPictures] = useState<FieldPictureData[]>([]);

  const [cameraStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [120], []);

  const handlePresentModalPress = useCallback(
    async (type: string | null, id?: number) => {
      if (id) {
        const selected = pictures.find((picture) => picture.id === id);
        setChangedPicture(selected);
      }
      setLocation(type);
      bottomSheetModalRef.current?.present();
    },
    [pictures]
  );

  const handleClosePress = () => bottomSheetModalRef.current?.close();

  const savePortrait = async (
    imageUri: string | boolean
  ): Promise<string | undefined> => {
    const portrait = await uploadPortrait(
      {
        picture: imageUri,
        field_id: parseInt(params.id as string),
      },
      token,
      parseInt(params.id as string)
    );
    if (portrait.status) return portrait.data;
  };

  const savePicture = async (
    imageUri: string | boolean
  ): Promise<FieldPictureData | undefined> => {
    const picture = await uploadPicture(
      {
        picture: imageUri,
        position: pictures.length + 1,
        field_id: parseInt(params.id as string),
      },
      token
    );
    if (picture.status) return picture.data;
  };

  const editPicture = async (
    imageUri: string | boolean,
    picture: FieldPictureData
  ) => {
    const editedPicture = await changePicture(
      {
        picture: imageUri,
        position: picture.position,
        field_id: parseInt(params.id as string),
      },
      token,
      picture.id
    );
    if (editedPicture.status) return editedPicture.data;
  };

  const handleSaveImage = async (image: string | boolean): Promise<void> => {
    if (location === "portrait") {
      const picture = await savePortrait(image);
      setPortrait(getFieldUrl(picture));
    }

    if (location === "add-gallery") {
      const picture = await savePicture(image);
      const picture_list: FieldPictureData[] = [
        ...(pictures as FieldPictureData[]),
        picture as FieldPictureData,
      ];
      setPictures(picture_list);
    }

    if (location === "edit-gallery") {
      const pictures: FieldPictureData[] = await editPicture(
        image,
        changedPicture as FieldPictureData
      );
      setPictures(pictures);
    }

    handleClosePress();
  };

  const pickImage = async (): Promise<void> => {
    let image = await pickImageAsync([8, 5]);
    if (image) handleSaveImage(image);
  };

  const pickCamera = async (): Promise<void> => {
    let image = await pickCameraAsync([8, 5]);
    if (image) handleSaveImage(image);
  };

  const removeFieldPortrait = async (): Promise<void> => {
    const response = await removePortrait(state.id as number, token);
    if (response.status) {
      setPortrait(undefined);
      Alert.alert(response.data);
    }
  };

  const removeFieldPicture = async (id: number): Promise<void> => {
    const result = await removePicture(id, token);
    if (result.status) setPictures(result.data);
  };

  const addPicture = () => {
    setLocation("add-gallery");
    bottomSheetModalRef.current?.present();
  };

  const loadPictures = async (): Promise<void> => {
    const pictures = await fetchFieldPictures(
      parseInt(params.id as string),
      token
    );
    if (pictures.status) setPictures(pictures.data);
  };

  const loadPortrait = async (): Promise<void> => {
    const response = await fetchField(params.id as unknown as number, token);
    if (response.status)
      setPortrait(getFieldUrl(response.data.portrait) as string | undefined);
  };

  const save = () => {
    router.back();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
      />
    ),
    []
  );

  const handleCameraPermission = useCallback(async () => {
    if (cameraStatus) {
      if (
        cameraStatus.status === ImagePicker.PermissionStatus.UNDETERMINED ||
        (cameraStatus.status === ImagePicker.PermissionStatus.DENIED &&
          cameraStatus.canAskAgain)
      ) {
        const permission = await requestCameraPermission();
        if (permission.granted) {
          await pickCamera();
        }
      } else if (cameraStatus.status === ImagePicker.PermissionStatus.DENIED) {
        await Linking.openSettings();
      } else {
        await pickCamera();
      }
    }
  }, [cameraStatus, pickCamera, requestCameraPermission]);

  useEffect(() => {
    loadPortrait();
    loadPictures();
  }, []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={LayoutStyles.whiteContainer}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "",
            headerLeft: () => <Back />,
          }}
        />
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
              <Pressable
                onPress={handleCameraPermission}
                style={[
                  styles.buttonOutline,
                  { backgroundColor: Colors.white },
                ]}
              >
                <Icon name="camera" size={15} color={Colors.maastrichtBlue} />
                <Text style={styles.buttonOutlineText}>Cámara</Text>
              </Pressable>
              <Pressable
                onPress={pickImage}
                style={[
                  styles.buttonOutline,
                  { backgroundColor: Colors.white },
                ]}
              >
                <Icon name="image" size={15} color={Colors.maastrichtBlue} />
                <Text style={styles.buttonOutlineText}>Galería</Text>
              </Pressable>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
        <ScrollView
          style={{ paddingTop: 20 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={[LayoutStyles.scrollContainer, { paddingBottom: 60 }]}>
            <Text style={[LayoutStyles.pageTitle, { marginBottom: 5 }]}>
              FOTOGRAFÍAS
            </Text>
            <Text style={[LayoutStyles.subtitle, { marginBottom: 5 }]}>
              FOTO PORTADA
            </Text>
            <View
              style={{ marginBottom: 30, overflow: "hidden", borderRadius: 20 }}
            >
              <Image
                source={{ uri: portrait }}
                placeholder={Images.portraitDefault}
                style={{ height: 200, width: 330 }}
                transition={300}
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <UploadPhoto
                onRemovePhoto={removeFieldPortrait}
                onModalPress={() => handlePresentModalPress("portrait")}
                position="Horizontal"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={[
                  LayoutStyles.subtitle,
                  { marginBottom: 0, marginRight: 8 },
                ]}
              >
                GALERÍA
              </Text>
              <Text
                style={[
                  LayoutStyles.subtitle,
                  {
                    marginBottom: 0,
                    fontSize: 14,
                    fontFamily: "PoppinsMedium",
                  },
                ]}
              >
                (max 3 fotos)
              </Text>
            </View>
            {pictures &&
              Array.isArray(pictures) &&
              pictures.map((picture, index) => (
                <View
                  key={`picture-${index}`}
                  style={{ flexDirection: "row", gap: 20, marginBottom: 20 }}
                >
                  <Image
                    source={{ uri: getFieldUrl(picture.filename) }}
                    style={{
                      borderRadius: 20,
                      height: 120,
                      width: "100%",
                      flex: 1,
                      flexBasis: "10%",
                    }}
                  />
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <UploadPhoto
                      onRemovePhoto={() => removeFieldPicture(picture.id)}
                      onModalPress={() =>
                        handlePresentModalPress("edit-gallery", picture.id)
                      }
                      position="Vertical"
                    />
                  </View>
                </View>
              ))}

            {pictures.length < 3 && (
              <Pressable
                style={[
                  styles.buttonOutline,
                  {
                    backgroundColor: Colors.white,
                    width: "50%",
                    marginHorizontal: "auto",
                    marginBottom: 50,
                    borderWidth: 2,
                    paddingVertical: 6,
                    borderRadius: 20,
                  },
                ]}
                onPress={() => addPicture()}
              >
                <PicturesIcon size={20} />
                <Text style={styles.buttonOutlineText}>Agregar fotos</Text>
              </Pressable>
            )}

            <Pressable
              onPress={() => save()}
              style={[
                PageStyles.button,
                { width: "80%", marginHorizontal: "auto", marginTop: 50 },
              ]}
            >
              <Text style={PageStyles.buttonText}>GUARDAR</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default Photos;

const styles = StyleSheet.create({
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
});
