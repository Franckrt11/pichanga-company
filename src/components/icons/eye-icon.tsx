import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import Colors from "@/src/utils/Colors";

const EyeIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 50 50">
      <Defs>
        <ClipPath id="clipPath47">
          <Path transform="translate(-429.16 -556.71)" d="m0 1170h540v-1170h-540z"/>
        </ClipPath>
        <ClipPath id="clipPath49">
          <Path transform="translate(-433.16 -562.3)" d="m0 1170h540v-1170h-540z"/>
        </ClipPath>
      </Defs>
      <G transform="matrix(.26458 0 0 .26458 268.46 -164.23)">
        <Path
          transform="matrix(7.2239 0 0 -7.2239 -920.1 755.93)"
          d="m0 0c3.1 3e-3 5.629 2.544 5.624 5.652-4e-3 3.081-2.541 5.613-5.624 5.616-3.104 2e-3 -5.644-2.534-5.643-5.635 0-3.102 2.539-5.636 5.643-5.633m-0.345-2.81c-2.215 8e-3 -4.485 0.88-6.6 2.215-2.183 1.378-4.054 3.113-5.706 5.088-0.56 0.669-0.59 1.56-0.046 2.217 2.177 2.63 4.699 4.838 7.838 6.263 1.901 0.863 3.893 1.283 5.986 1.048 1.896-0.213 3.639-0.89 5.277-1.846 2.42-1.413 4.458-3.269 6.24-5.417 0.545-0.658 0.579-1.547 0.043-2.187-2.287-2.734-4.915-5.042-8.236-6.455-1.425-0.607-2.915-0.927-4.796-0.926"
          clipPath="url(#clipPath47)"
          fill={Colors.maastrichtBlue}
        />
        <Path
          transform="matrix(7.2239 0 0 -7.2239 -891.16 715.54)"
          d="m0 0c-0.011-2.23-1.815-3.988-4.076-3.973-2.209 0.015-3.965 1.816-3.955 4.057 0.01 2.228 1.816 3.989 4.076 3.974 2.208-0.015 3.966-1.818 3.955-4.058"
          clipPath="url(#clipPath49)"
          fill={Colors.maastrichtBlue}
        />
      </G>
    </Svg>
  )
};

export default EyeIcon;
