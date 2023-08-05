import { View, Text, Image } from "react-native";
import Images from "@/src/utils/Images";
import Colors from "@/src/utils/Colors";

const Logo = () => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}
    >
      <Image
        source={Images.logo}
        style={{ width: 50, height: 50, marginRight: 5 }}
      />
      <Text
        style={{
          color: Colors.maastrichtBlue,
          fontWeight: "600",
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
