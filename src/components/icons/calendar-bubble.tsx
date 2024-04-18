import { View } from "react-native";
import { TabStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { ColorIconProps } from "@/src/utils/Types";
import CalendarIcon from "./calendar-icon";

const CalendarBubble = ({ active, color }: ColorIconProps) => {
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
      <CalendarIcon size={15} color={color} />
    </View>
  );
};

export default CalendarBubble;
