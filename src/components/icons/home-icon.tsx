import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { View } from "react-native";
import { TabStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { ColorIconProps } from "@/src/utils/Types";

const HomeIcon = ({ active, color }: ColorIconProps) => {
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
      <Svg width="15" height="15" viewBox="0 0 10 10">
        <Defs>
          <ClipPath id="clipPath5314">
            <Path d="m-66.534 1082.6h540v-1170h-540z" />
          </ClipPath>
        </Defs>
        <G transform="translate(-150.68 -154.23)">
          <Path
            transform="matrix(.37193 0 0 -.37199 155.54 154.23)"
            d="m0 0h0.735c0.785-0.157 1.333-0.666 1.876-1.211 3.326-3.341 6.659-6.675 10-10 0.555-0.551 1.059-1.113 1.197-1.914v-0.631c-0.014-0.031-0.035-0.061-0.041-0.094-0.264-1.276-1.207-2.054-2.502-2.062-0.11-1e-3 -0.219 0-0.341 0v-0.357c0-2.529 2e-3 -5.058-1e-3 -7.586-1e-3 -1.781-1.241-3.023-3.017-3.026-1.33-2e-3 -2.66 0-3.99 0-0.679 0-0.967 0.292-0.967 0.979-1e-3 2.012 1e-3 4.025-1e-3 6.037-1e-3 0.877-0.547 1.419-1.428 1.423-0.752 3e-3 -1.505 2e-3 -2.258 0-0.951-1e-3 -1.477-0.526-1.477-1.478-1e-3 -2.012 0-4.025-1e-3 -6.037-1e-3 -0.615-0.309-0.923-0.918-0.924-1.356-1e-3 -2.713-4e-3 -4.069 4e-3 -0.251 1e-3 -0.509 0.022-0.753 0.08-1.346 0.32-2.23 1.452-2.233 2.866-6e-3 2.564-1e-3 5.127-1e-3 7.691v0.292c-0.051 0.019-0.066 0.03-0.082 0.031-0.132 3e-3 -0.263 0-0.394 7e-3 -0.907 0.044-1.606 0.451-2.069 1.23-0.594 0.997-0.406 2.196 0.467 3.07 3.458 3.459 6.921 6.913 10.372 10.38 0.549 0.552 1.101 1.071 1.896 1.23"
            clipPath="url(#clipPath5314)"
            fill={color}
          />
        </G>
      </Svg>
    </View>
  );
};

export default HomeIcon;
