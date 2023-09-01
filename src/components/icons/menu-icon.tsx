import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import Colors from "@/src/utils/Colors";

const MenuIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 50 50">
      <Defs>
        <ClipPath id="clipPath106">
          <Path transform="translate(-63.29 -942.38)" d="m0 1170h540v-1170h-540z"/>
        </ClipPath>
        <ClipPath id="clipPath108">
          <Path transform="translate(-63.29 -933.97)" d="m0 1170h540v-1170h-540z"/>
        </ClipPath>
        <ClipPath id="clipPath110">
          <Path transform="translate(-63.29 -925.55)" d="m0 1170h540v-1170h-540z"/>
        </ClipPath>
      </Defs>
      <G transform="matrix(.26458 0 0 .26458 69.833 -116.98)">
        <Path
          transform="matrix(7.3403 0 0 -7.3403 -86.769 486.63)"
          d="m0 0h-22.527c-0.889 0-1.609 0.721-1.609 1.609 0 0.889 0.72 1.609 1.609 1.609h22.527c0.889 0 1.609-0.72 1.609-1.609 0-0.888-0.72-1.609-1.609-1.609"
          clipPath="url(#clipPath106)"
          fill={Colors.silverSand}
        />
        <Path
          transform="matrix(7.3403 0 0 -7.3403 -86.769 548.43)"
          d="m0 0h-22.527c-0.889 0-1.609 0.721-1.609 1.609 0 0.889 0.72 1.609 1.609 1.609h22.527c0.889 0 1.609-0.72 1.609-1.609 0-0.888-0.72-1.609-1.609-1.609"
          clipPath="url(#clipPath108)"
          fill={Colors.silverSand}
        />
        <Path
          transform="matrix(7.3403 0 0 -7.3403 -86.769 610.23)"
          d="m0 0h-22.527c-0.889 0-1.609 0.721-1.609 1.609 0 0.889 0.72 1.609 1.609 1.609h22.527c0.889 0 1.609-0.72 1.609-1.609 0-0.888-0.72-1.609-1.609-1.609"
          clipPath="url(#clipPath110)"
          fill={Colors.silverSand}
        />
      </G>
    </Svg>
  )
};

export default MenuIcon;
