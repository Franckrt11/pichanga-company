import { StyleProp, ViewStyle } from "react-native";
import Svg, { Path, Defs, G, ClipPath } from "react-native-svg";
import Colors from "@/src/utils/Colors";

const ArrowDownIcon = ({ size, style }: { size: number, style: StyleProp<ViewStyle> }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 50 50" style={style}>
      <Defs>
        <ClipPath id="clipPath37">
          <Path
            transform="translate(-82.269 -667.23)"
            d="m0 1170h540v-1170h-540z"
          />
        </ClipPath>
      </Defs>
      <G transform="rotate(180 71.226 353.67)">
        <Path
          transform="matrix(3.3689,0,0,-3.3689,136.02,698.79)"
          d="m0 0h-11.022c-1.664 0-2.529 1.98-1.4 3.2l5.512 5.956c0.754 0.815 2.043 0.815 2.798 0l5.51-5.956c1.129-1.22 0.264-3.2-1.398-3.2"
          clipPath="url(#clipPath37)"
          fill={Colors.maastrichtBlue}
        />
      </G>
    </Svg>
  );
};

export default ArrowDownIcon;
