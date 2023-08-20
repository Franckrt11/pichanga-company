import Svg, { Path, Defs, ClipPath, G } from "react-native-svg";
import Colors from "@/src/utils/Colors";

const ColumnsIcon = ({ size }: { size: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 50 50">
      <Defs>
        <ClipPath id="clipPath140">
          <Path transform="translate(-480.2 -1094.1)" d="m0 1170h540v-1170h-540z"/>
        </ClipPath>
        <ClipPath id="clipPath142">
          <Path transform="translate(-464.36 -1085.3)" d="m0 1170h540v-1170h-540z"/>
        </ClipPath>
      </Defs>
      <G transform="matrix(.26458 0 0 .26458 255.24 -33.898)">
        <Path
          transform="matrix(6.3887 0 0 -6.3887 -853.75 234.36)"
          d="m0 0v12.517c0 2.272 1.842 4.113 4.113 4.113h2.46c2.272 0 4.113-1.841 4.113-4.113v-12.517c0-2.271-1.841-4.113-4.113-4.113h-2.46c-2.271 0-4.113 1.842-4.113 4.113"
          clipPath="url(#clipPath140)"
          fill={Colors.maastrichtBlue}
        />
        <Path
          transform="matrix(6.3887 0 0 -6.3887 -954.93 290.82)"
          d="m0 0v21.354c0 2.271 1.841 4.113 4.113 4.113h2.46c2.271 0 4.113-1.842 4.113-4.113v-21.354c0-2.271-1.842-4.113-4.113-4.113h-2.46c-2.272 0-4.113 1.842-4.113 4.113"
          clipPath="url(#clipPath142)"
          fill={Colors.maastrichtBlue}
        />
      </G>
    </Svg>
  )
};

export default ColumnsIcon;
