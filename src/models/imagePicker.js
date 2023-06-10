import * as ImagePicker from "expo-image-picker";

const pickerOptions = {
  allowsEditing: true,
  aspect: [1, 1],
  base64: true,
  quality: 0.5,
};

export const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync(pickerOptions);

  if (!result.canceled) {
    return result.assets[0].base64;
  } else {
    return false;
  }
};

export const pickCameraAsync = async () => {
  let result = await ImagePicker.launchCameraAsync(pickerOptions);

  if (!result.canceled) {
    return result.assets[0].base64;
  } else {
    return false;
  }
};
