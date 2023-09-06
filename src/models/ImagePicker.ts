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
  quality: 0.7,
};

export const pickImageAsync = async (ratio: [number, number]): Promise<string | boolean> => {
  let result = await ImagePicker.launchImageLibraryAsync({...pickerOptions, aspect: ratio});

  if (!result.canceled) {
    return result.assets[0].base64!;
  } else {
    return false;
  }
};

export const pickCameraAsync = async (ratio: [number, number]): Promise<string | boolean>  => {
  let result = await ImagePicker.launchCameraAsync({...pickerOptions, aspect: ratio});

  if (!result.canceled) {
    return result.assets[0].base64!;
  } else {
    return false;
  }
};
