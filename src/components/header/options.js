import { View, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/styles";
import GearIcon from "../../components/icons/gear-icon";
import PencilIcon from "../../components/icons/pencil-icon";

const Options = () => {
  const router = useRouter();

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingRight: 10 }}
    >
      <TouchableOpacity
        onPress={() => router.push("/options")}
        style={{
          borderColor: Colors.silverSand,
          borderRadius: 8,
          borderWidth: 1,
          padding: 6,
          marginRight: 10,
        }}
      >
        <GearIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: "relative" }}
        onPress={() => router.push("/user")}
      >
        <Image
          source={require("../../assets/user-default.jpg")}
          style={{ height: 50, width: 50, borderRadius: 60 }}
        />
        <View
          style={{
            backgroundColor: Colors.white,
            padding: 4,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: Colors.silverSand,
            position: "absolute",
            right: 0,
            bottom: 0,
          }}
        >
          <PencilIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Options;
