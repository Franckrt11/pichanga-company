import { View } from "react-native";
import { TabStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { ColorIconProps } from "@/src/utils/Types";
import FieldIcon from "./field-icon";

const FieldBubble = ({ active, color }: ColorIconProps) => {
  return (
    <View
      style={[
        TabStyles.tabIcon,
        {
          borderColor: active ? "white" : Colors.maastrichtBlue,
          backgroundColor: active ? Colors.maastrichtBlue : "white",
        },
      ]}
    >
      <FieldIcon size={15} color={color} />
    </View>
  );
};

export default FieldBubble;
