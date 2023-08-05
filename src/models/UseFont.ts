import * as Font from "expo-font";

export const useFonts = async () => {
  await Font.loadAsync({
    PoppinsMedium: require("@/src/assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("@/src/assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("@/src/assets/fonts/Poppins-Bold.ttf"),
  });
};
