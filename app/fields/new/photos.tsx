import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable, Alert } from "react-native";
import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import * as Linking from "expo-linking";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop
} from "@gorhom/bottom-sheet";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import Images from "@/src/utils/Images";
import Back from "@/src/components/header/back";
import UploadPhoto from "@/src/components/upload-photo";
import { pickImageAsync, pickCameraAsync } from "@/src/models/ImagePicker";
import { uploadPicture, fetchFieldPictures, removePicture } from "@/src/models/Field";
import { useUserContext } from "@/src/context/User";
import { useAuthContext } from "@/src/context/Auth";
import { getFieldUrl } from "@/src/utils/Helpers";
import PicturesIcon from "@/src/components/icons/pictures-icon";
import { FieldPictureData } from "@/src/utils/Types";

const Photos = () => {
  const params = useLocalSearchParams();
  const { state } = useUserContext();
  const { token } = useAuthContext();

  const [location, setLocation] = useState<string | null>(null);
  const [portrait, setPortrait] = useState<string | undefined>(undefined);
  const [pictures, setPictures] = useState<FieldPictureData[]>([]);

  const [cameraStatus, requestCameraPermission] = ImagePicker.useCameraPermissions();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [120], []);

  const handlePresentModalPress = useCallback((type: string | null) => {
    setLocation(type);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = () => bottomSheetModalRef.current?.close();

  const savePicture = async (imageUri: string | boolean, location: string): Promise<string | undefined> => {
    const picture = await uploadPicture({
      location: location,
      picture: imageUri,
      position: pictures.length + 1,
      field_id: parseInt(params.id as string),
    }, token, parseInt(params.id as string));
    Alert.alert("Imagen de perfil guardada.");
    return picture;
  };

  const handleSaveImage = async (image: string | boolean): Promise<void> => {
    if (location === 'portrait') {
      const picture = await savePicture(image, location);
      setPortrait(getFieldUrl(picture));
    }

    if (location === 'gallery') {
      const picture = await savePicture(image, location);
      loadPictures();
    }
    handleClosePress();
  };

  const pickImage = async (): Promise<void> => {
    let image = await pickImageAsync([8,5]);
    if (image) {
      handleSaveImage(image);
    }
  };

  const pickCamera = async (): Promise<void> => {
    let image = await pickCameraAsync([8,5]);
    if (image) {
      if (image) {
        handleSaveImage(image);
      }
    }
  };

  const removePortrait = async (): Promise<void> => {
    const response = await removePicture(state.id as number, token, 'portrait');
    Alert.alert(response);
  };

  const removeFieldPicture = async (id: number): Promise<void> => {
    const result = await removePicture(id, token, 'gallery');
    setPictures(result);
  };

  const addPicture = () => {
    setLocation('gallery');
    bottomSheetModalRef.current?.present();
  };

  const loadPictures = async (): Promise<void> => {
    const pictures: FieldPictureData[] = await fetchFieldPictures(parseInt(params.id as string), token);
    setPictures(pictures);
  };

  const nextStep = () => {
    router.push(`/fields/new/days?id=${params.id}`);
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
        (cameraStatus.status === ImagePicker.PermissionStatus.DENIED && cameraStatus.canAskAgain)
      ) {
        const permission = await requestCameraPermission()
        if (permission.granted) {
          await pickCamera()
        }
      } else if (cameraStatus.status === ImagePicker.PermissionStatus.DENIED) {
        await Linking.openSettings()
      } else {
        await pickCamera()
      }
    }
  }, [cameraStatus, pickCamera, requestCameraPermission]);

  useEffect(() => {
    loadPictures();
  }, []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={LayoutStyles.whiteContainer}
      >
        <Stack.Screen
          options={{
            headerShown: true,
            title: '',
            headerLeft: () => <></>,
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
          contentContainerStyle={{ alignItems: "center"}}
        >
          <View style={[LayoutStyles.scrollContainer, { paddingBottom: 60 }]}>
            <Text style={LayoutStyles.pageTitle}>AGREGAR FOTOGRAFÍAS</Text>
            <Text style={LayoutStyles.subtitle}>FOTO PORTADA</Text>
            <Image
              source={{ uri: portrait }}
              placeholder={Images.portraitDefault}
              style={{ borderRadius: 20, height: 250, width: "100%", marginBottom: 30 }}
              transition={300}
            />
            <View style={{ marginBottom: 20 }}>
              <UploadPhoto
                onRemovePhoto={removePortrait}
                onModalPress={() => handlePresentModalPress('portrait')}
                position="Horizontal"
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
              <Text style={[LayoutStyles.subtitle, { marginBottom: 0, marginRight: 8 }]}>GALERÍA</Text>
              <Text style={[LayoutStyles.subtitle, { marginBottom: 0, fontSize: 14, fontFamily: "PoppinsMedium", }]}>(max 3 fotos)</Text>
            </View>

            {pictures.map((picture, index) => (
              <View key={index} style={{ flexDirection: "row", gap: 20, marginBottom: 20 }}>
                <Image
                  source={{ uri: getFieldUrl(picture.filename) }}
                  style={{ borderRadius: 20, height: 120, width: "100%", flex: 1, flexBasis: "10%" }}
                />
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <UploadPhoto
                    onRemovePhoto={() => removeFieldPicture(picture.id)}
                    onModalPress={() => handlePresentModalPress('gallery')}
                    position="Vertical"
                  />
                </View>
              </View>
            ))}

            {pictures.length < 3 &&
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
                    borderRadius: 20
                  }
                ]}
                onPress={() => addPicture()}
              >
                <PicturesIcon size={20} />
                <Text style={styles.buttonOutlineText}>Agregar fotos</Text>
              </Pressable>
            }

            <Pressable
              onPress={() => nextStep()}
              style={[PageStyles.button, { width: "80%", marginHorizontal: "auto", marginTop: 50 }]}
            >
              <Text style={PageStyles.buttonText}>SIGUIENTE</Text>
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
