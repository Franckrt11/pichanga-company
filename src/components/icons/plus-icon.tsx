import Svg, { G, Path,  Defs, ClipPath  } from "react-native-svg";
import Colors from "@/src/utils/Colors";
import { SizeIconProps } from "@/src/utils/Types";

const PlusIcon = ({ size }: SizeIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 50 50">
      <Defs>
        <ClipPath id="clipPath6">
          <Path transform="translate(-121.04 -886.88)" d="m0 1170h540v-1170h-540z" />
        </ClipPath>
      </Defs>
      <G transform="matrix(.26458 0 0 .26458 86.929 -87.714)">
        <Path
          transform="matrix(12.015 0 0 -12.015 -139.56 450.06)"
          d="m0 0h-5.767v-5.86h-4.195v5.86h-5.767v3.979h5.767v5.89h4.195v-5.89h5.767z"
          clipPath="url(#clipPath6)"
          fill={Colors.white}
        />
      </G>
    </Svg>
  )
};

export default PlusIcon;
