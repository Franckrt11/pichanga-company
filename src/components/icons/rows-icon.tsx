import Svg, { Path, Defs, ClipPath, G } from "react-native-svg";
import Colors from "@/src/utils/Colors";

const RowsIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 50 50">
      <Defs>
        <ClipPath id="clipPath76">
          <Path transform="translate(-488.66 -1098.3)" d="m0 1170h540v-1170h-540z"/>
        </ClipPath>
        <ClipPath id="clipPath78">
          <Path transform="translate(-488.66 -1086.3)" d="m0 1170h540v-1170h-540z"/>
        </ClipPath>
      </Defs>
      <G transform="matrix(.26458 0 0 .26458 41.974 -35.091)">
        <Path
          transform="matrix(6.6762 0 0 -6.6762 9.5379 214.09)"
          d="m0 0h-22.076c-1.721 0-3.115 1.395-3.115 3.115v1.864c0 1.72 1.394 3.115 3.115 3.115h22.076c1.721 0 3.115-1.395 3.115-3.115v-1.864c0-1.72-1.394-3.115-3.115-3.115"
          clipPath="url(#clipPath76)"
          fill={Colors.maastrichtBlue}
        />
        <Path
          transform="matrix(6.6762 0 0 -6.6762 9.5379 294.18)"
          d="m0 0h-22.076c-1.721 0-3.115 1.395-3.115 3.115v1.864c0 1.72 1.394 3.115 3.115 3.115h22.076c1.721 0 3.115-1.395 3.115-3.115v-1.864c0-1.72-1.394-3.115-3.115-3.115"
          clipPath="url(#clipPath78)"
          fill={Colors.maastrichtBlue}
        />
      </G>
    </Svg>
  )
};

export default RowsIcon;
