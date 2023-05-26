import { View, Text, Image } from "react-native";
import { Colors, AppImages } from "../../constants/styles";

const Logo = () => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}
    >
      <Image
        source={AppImages.images.logo}
        style={{ width: 50, height: 50, marginRight: 5 }}
      />
      <Text
        style={{
          color: Colors.maastrichtBlue,
          fontWeight: 600,
          width: 120,
          fontSize: 13,
          lineHeight: 15,
          fontFamily: "PoppinsMedium",
        }}
      >
        Te Juego una Pichanga
      </Text>
    </View>
  );
};

export default Logo;
