import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ArrowLeftIcon from "../../components/icons/arrowleft-icon";

const Back = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={{ paddingLeft: 10 }}>
      <ArrowLeftIcon />
    </TouchableOpacity>
  );
};

export default Back;
