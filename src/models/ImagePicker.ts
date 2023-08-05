import * as ImagePicker from "expo-image-picker";

interface PickerOption {
  allowsEditing: boolean;
  aspect: [number, number];
  base64: boolean;
  quality: number;
}

const pickerOptions: PickerOption = {
  allowsEditing: true,
  aspect: [1, 1],
  base64: true,
  quality: 0.5,
};

export const pickImageAsync = async (): Promise<string | boolean> => {
  let result = await ImagePicker.launchImageLibraryAsync(pickerOptions);

  if (!result.canceled) {
    return result.assets[0].base64!;
  } else {
    return false;
  }
};

export const pickCameraAsync = async (): Promise<string | boolean>  => {
  let result = await ImagePicker.launchCameraAsync(pickerOptions);

  if (!result.canceled) {
    return result.assets[0].base64!;
  } else {
    return false;
  }
};
