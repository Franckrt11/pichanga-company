import { Pressable } from "react-native";
import { router } from "expo-router";
import ArrowLeftIcon from "@/src/components/icons/arrowleft-icon";

const Back = () => {
  return (
    <Pressable onPress={() => router.back()} style={{ paddingLeft: 10 }}>
      <ArrowLeftIcon />
    </Pressable>
  );
};

export default Back;
