import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, Pressable } from "react-native";
import { useRef, useMemo, useCallback } from "react";
import { Stack, router } from "expo-router";
// import { Image } from 'expo-image';
import Icon from "react-native-vector-icons/Feather";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import Images from "@/src/utils/Images";
import Back from "@/src/components/header/back";
import UploadPhoto from "@/src/components/upload-photo";
import { pickImageAsync, pickCameraAsync } from "@/src/models/ImagePicker";

const Photos = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [120], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClosePress = () => bottomSheetModalRef.current?.close();

  const pickImage = async (): Promise<void> => {
    let image = await pickImageAsync();
    if (image) {
      // const photo = await saveAvatar(image);
      // dispatch({
      //   type: "change-avatar",
      //   photoload: photo,
      // });
      // setAvatar(getAvatarUrl(photo));
      handleClosePress();
    }
  };

  const pickCamera = async (): Promise<void> => {
    let image = await pickCameraAsync();
    if (image) {
      // const photo = await saveAvatar(image);
      // dispatch({
      //   type: "change-avatar",
      //   photoload: photo,
      // });
      // setAvatar(getAvatarUrl(photo));
      handleClosePress();
    }
  };

  const removePortrait = async (): Promise<void> => {
    // const response: string = await removeUserAvatar(token, state.id);
    // Alert.alert(response);
    // dispatch({
    //   type: "change-avatar",
    //   photoload: null,
    // });
    // setAvatar(undefined);
  };

  const removeFieldPicture = async (): Promise<void> => {
    //
  };

  const nextStep = () => {
    router.push("/fields/new/days");
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

  return (
    <BottomSheetModalProvider>
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
                onPress={pickCamera}
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
        <ScrollView style={{ paddingTop: 20, paddingBottom: 60 }}>
          <View style={LayoutStyles.scrollContainer}>
            <Text style={LayoutStyles.pageTitle}>AGREGAR FOTOGRAFÍAS</Text>
            <Text style={LayoutStyles.subtitle}>FOTO PORTADA</Text>
            <Image
              source={Images.portraitDefault}
              style={{ borderRadius: 20, height: 250, width: "100%", marginBottom: 30 }}
              // transition={500}
            />
            <View style={{ marginBottom: 20 }}>
              <UploadPhoto
                onRemovePhoto={removePortrait}
                onModalPress={handlePresentModalPress}
                position="Horizontal"
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
              <Text style={[LayoutStyles.subtitle, {marginBottom: 0, marginRight: 8 }]}>GALERÍA</Text>
              <Text style={[LayoutStyles.subtitle, {marginBottom: 0, fontSize: 14, fontFamily: "PoppinsMedium", }]}>(max 3 fotos)</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 20, marginBottom: 50 }}>
              <Image
                source={Images.portraitDefault}
                style={{ borderRadius: 20, height: 120, width: "100%", flex: 1, flexBasis: "10%" }}
              />
              <View style={{ flex: 1, justifyContent: "center" }}>
                <UploadPhoto
                  onRemovePhoto={removeFieldPicture}
                  onModalPress={handlePresentModalPress}
                  position="Vertical"
                />
              </View>
            </View>

            <Pressable
              onPress={() => nextStep()}
              style={[PageStyles.button, { width: "80%", marginHorizontal: "auto" }]}
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
