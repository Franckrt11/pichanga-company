import { View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { useUserContext } from "@/src/context/User";
import Images from "@/src/utils/Images";
import Colors from "@/src/utils/Colors";
import GearIcon from "@/src/components/icons/gear-icon";
import PencilIcon from "@/src/components/icons/pencil-icon";
import { getAvatarUrl } from "@/src/utils/Helpers";

const Options = () => {
  const { state } = useUserContext();
  const [avatar, setAvatar] = useState<string | undefined>(undefined);

  useEffect(() => {
    setAvatar(getAvatarUrl(state.photo));
  }, [state]);

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <Link href="/options" asChild>
        <Pressable
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
        >
          <Image
            source={{uri: avatar}}
            placeholder={Images.avatarDefault}
            style={{ borderRadius: 60, height: 50, width: 50 }}
            transition={200}
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
