import { View, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { useUserContext } from "@/src/context/User";
import Images from "@/src/utils/Images";
import Colors from "@/src/utils/Colors";
import GearIcon from "@/src/components/icons/gear-icon";
import PencilIcon from "@/src/components/icons/pencil-icon";
import CachedImage from "@/src/components/cached-image";

const Options = () => {
  const { state } = useUserContext();

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingRight: 10 }}
    >
      <Link href="/options" asChild>
        <Pressable
          // onPress={() => router.push("/options")}
          style={{
            borderColor: Colors.silverSand,
            borderRadius: 8,
            borderWidth: 1,
            padding: 6,
            marginRight: 10,
          }}
        >
          <GearIcon />
        </Pressable>
      </Link>
      <Link href="/user" asChild>
        <Pressable
          style={{ position: "relative" }}
          // onPress={() => router.push("/user")}
        >
          {/* <CachedImage
            size={50}
            defaultImage={Images.avatarDefault}
            filename={state.photo}
            style={{ borderRadius: 60 }}
          /> */}
          <Image
            source={Images.avatarDefault}
            style={{ borderRadius: 60, height: 50, width: 50 }}
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
        </Pressable>
      </Link>
    </View>
  );
};

export default Options;
