import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useUserContext } from "../../context/user";
import { Colors, AppImages } from "../../constants/styles";
import GearIcon from "../../components/icons/gear-icon";
import PencilIcon from "../../components/icons/pencil-icon";
import CachedImage from "../../components/cached-image";

const Options = () => {
  const router = useRouter();
  const state = useUserContext();

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
        <CachedImage
          size={50}
          defaultImage={AppImages.images.avatarDefault}
          name={state.photo}
          styles={{borderRadius: 60}}
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
