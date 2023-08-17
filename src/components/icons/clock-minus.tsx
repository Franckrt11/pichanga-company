import { StyleProp, ViewStyle } from "react-native";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import Colors from "@/src/utils/Colors";
import { SizeIconProps } from "@/src/utils/Types";

interface ClockProps extends SizeIconProps {
  style?: StyleProp<ViewStyle>;
}

const ClockMinus = ({ size, style }: ClockProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" style={style} >
      <Defs>
        <ClipPath id="clipPath17">
          <Path transform="translate(-439.86 -753.66)" d="m0 1170h540v-1170h-540z" />
        </ClipPath>
        <ClipPath id="clipPath19">
          <Path transform="translate(-442.13 -781.19)" d="m0 1170h540v-1170h-540z" />
        </ClipPath>
        <ClipPath id="clipPath37">
          <Path transform="translate(-473.17 -484.63)" d="m0 1170h540v-1170h-540z" />
        </ClipPath>
      </Defs>
      <G transform="matrix(.26458 0 0 .26458 123.94 -98.699)">
        <Path
          transform="matrix(1.3213 0 0 -1.3056 -435.92 442.78)"
          d="m0 0c11.15 4e-3 20.178 9.027 20.182 20.17 3e-3 11.075-9.042 20.111-20.129 20.109-11.128-2e-3 -20.157-9.026-20.151-20.138 8e-3 -11.104 9.03-20.146 20.098-20.141m0.047-4.476c-13.441-0.065-24.584 11-24.627 24.452-0.043 13.686 10.904 24.712 24.612 24.787 13.454 0.074 24.598-11.04 24.633-24.567 0.035-13.596-10.952-24.607-24.618-24.672"
          clipPath="url(#clipPath17)"
          fill={Colors.white}
        />
        <Path
          transform="matrix(1.3213 0 0 -1.3056 -432.91 406.84)"
          d="m0 0c0-1.975 0.01-3.949-9e-3 -5.923-4e-3 -0.385 0.118-0.647 0.386-0.912 1.875-1.856 3.738-3.724 5.6-5.593 0.627-0.63 0.871-1.381 0.622-2.253-0.243-0.847-0.815-1.373-1.664-1.57-0.77-0.179-1.47 0.02-2.028 0.573-2.257 2.24-4.501 4.492-6.745 6.745-0.411 0.413-0.617 0.925-0.617 1.513-1e-3 4.49-0.01 8.981 5e-3 13.471 4e-3 1.285 0.979 2.219 2.232 2.213 1.25-5e-3 2.198-0.94 2.211-2.237 0.019-2.008 5e-3 -4.018 5e-3 -6.027z"
          clipPath="url(#clipPath19)"
          fill={Colors.white}
        />
        <Path
          transform="matrix(1.3123 0 0 -1.3123 -392.8 384.54)"
          d="m0 0c0-1.328-1.076-2.404-2.404-2.404h-12.659c-1.327 0-2.403 1.076-2.403 2.404s1.076 2.404 2.403 2.404h12.659c1.328 0 2.404-1.076 2.404-2.404"
          clipPath="url(#clipPath37)"
          fill={Colors.white}
        />
      </G>
    </Svg>
  )
};

export default ClockMinus;
