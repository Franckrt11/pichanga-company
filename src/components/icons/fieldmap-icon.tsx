import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import Colors from "@/src/utils/Colors";

const FieldMapIcon = ({ size }: { size: number }) => {
  return (
    <Svg viewBox="0 0 50 50" width={size} height={size}>
      <Defs>
        <ClipPath id="clipPath32">
          <Path
            transform="translate(-458.1 -1097.5)"
            d="m0 1170h540v-1170h-540z"
          />
        </ClipPath>
        <ClipPath id="clipPath34">
          <Path
            transform="translate(-442.15 -1080.5)"
            d="m0 1170h540v-1170h-540z"
          />
        </ClipPath>
      </Defs>
      <G transform="matrix(.26458 0 0 .26458 91.668 -42.818)">
        <Path
          transform="matrix(5.3324 0 0 -5.3324 -252.77 245.74)"
          d="m0 0c-2.617 0-4.739 2.122-4.739 4.74 0 2.617 2.122 4.739 4.739 4.739 2.618 0 4.74-2.122 4.74-4.739 0-2.618-2.122-4.74-4.74-4.74m0 14.655c-5.354 0-9.693-4.34-9.693-9.694 0-5.353 4.422-9.753 9.693-15.49 5.151 5.885 9.694 10.137 9.694 15.49 0 5.354-4.34 9.694-9.694 9.694"
          clipPath="url(#clipPath32)"
          fill={Colors.maastrichtBlue}
        />
        <Path
          transform="matrix(5.3324 0 0 -5.3324 -337.83 336.42)"
          d="m0 0 10.607 8.839 9.694-5.577 11.901 10.074"
          clipPath="url(#clipPath34)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={3.237}
          stroke={Colors.maastrichtBlue}
        />
      </G>
    </Svg>
  );
};

export default FieldMapIcon;
