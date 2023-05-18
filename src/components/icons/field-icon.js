import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import { View } from "react-native";
import React from "react";
import { Colors, TabStyles } from "../../constants/styles";

const FieldIcon = ({active, color}) => {
  return (
    <View
      style={[TabStyles.tabIcon,
      {
        borderColor: active ? 'white': Colors.maastrichtBlue,
        backgroundColor: active ? Colors.maastrichtBlue: "white",
      }]}
    >
      <Svg width="15" height="15" viewBox="0 0 10 10">
        <Defs>
          <ClipPath id="a">
            <Path d="M-174.38 1110.6h540v-1170h-540z" />
          </ClipPath>
        </Defs>
        <G fill={color}>
          <Path d="M2.93.02v.1773c0 .5252-.001 1.0508.0004 1.576.0007.271.1068.377.3786.377 1.133.001 2.2665-.002 3.3997.002.2565.001.3812-.146.377-.384-.01-.5298-.003-1.06-.003-1.5897V.0164c.0333-.005.0599-.0122.0865-.0122.3114-.0007.6232-.005.935.0007.3846.007.6711.1811.8246.5392.0487.1141.0743.2472.0746.3718.005 1.2446.003 2.4891.002 3.7337 0 .014-.004.0278-.007.053H6.68c-.2498-.872-.7977-1.394-1.7375-1.3776-.7994.014-1.308.4733-1.6058 1.3801H1.0153c-.003-.0519-.007-.0979-.007-.1439-.0004-1.1972.001-2.3943-.001-3.5919-.0007-.3163.093-.5838.3492-.7833.151-.118.324-.1762.5118-.1794.3353-.006.6705-.002 1.0057-.002.0133 0 .0266.007.0564.0147" />
          <Path
            d="M0 0v2.7c0 .796.002 1.591-.001 2.386-.003.681-.33 1.01-1.021 1.013-1.2.005-2.399.001-3.599.002-2.021 0-4.043 0-6.064-.001-.148 0-.298.003-.443-.022-.409-.071-.669-.352-.713-.765-.016-.146-.013-.296-.013-.444-.001-1.469-.001-2.938-.001-4.407v-.45c-.093-.017-.157-.038-.221-.038-.903-.002-1.806-.014-2.709.001-1.258.021-2.198.765-2.488 1.964-.057.232-.065.481-.066.722-.004 3.45-.003 6.9-.002 10.35 0 .106.011.213.018.349h6.65c.277-1.296.931-2.361 2.04-3.122.824-.564 1.741-.837 2.739-.829 1.163.009 2.191.391 3.078 1.141.874.74 1.393 1.694 1.635 2.817h6.655c.007-.152.018-.284.018-.415.001-3.409.002-6.819.001-10.229C5.492 1.593 5.069.704 4.004.209c-.228-.106-.487-.195-.733-.2C2.196-.012 1.122 0 0 0"
            clipPath="url(#a)"
            transform="matrix(.35 0 0 -.35 7.08 9.99)"
          />
          <Path d="M6.48 9.99H3.5143V8.4474H6.48zm0-8.43H3.5157V.0202H6.48zm-.43 3.15H3.965c.047-.4097.503-.7797.9903-.805.5521-.0285 1.0047.3784 1.0947.805m-2.09.59h2.0777c-.0539.4276-.5493.8096-1.0439.8075-.4925-.002-.9826-.3824-1.0338-.8075" />
        </G>
      </Svg>
    </View>
  );
};

export default FieldIcon;
