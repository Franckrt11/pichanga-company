import Svg, { Path, Defs, ClipPath } from "react-native-svg";
import Colors from "@/src/utils/Colors";

const ArrowLeftIcon = () => {
  return (
    <Svg width="20" height="20" viewBox="0 0 10 10">
      <Defs>
        <ClipPath id="clipPath1958">
          <Path d="m-52.151 43.337h540v-1170h-540z" />
        </ClipPath>
      </Defs>
      <Path
        transform="matrix(.37819 0 0 -.37819 5.008 3.315)"
        d="m0 0v3.07c0 1.798-2.095 2.782-3.479 1.634l-8.946-7.421c-1.089-0.903-1.089-2.573 0-3.476l8.946-7.421c1.384-1.148 3.479-0.164 3.479 1.634v3.07h11.077c1.173 0 2.123 0.951 2.123 2.123v4.664c0 1.172-0.95 2.123-2.123 2.123z"
        clipPath="url(#clipPath1958)"
        fill={Colors.maastrichtBlue}
      />
    </Svg>
  );
};

export default ArrowLeftIcon;
