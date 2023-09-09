import { StyleSheet, Pressable, View } from "react-native";
import { useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import Colors from "@/src/utils/Colors";

const Switch = ({ value, onValueChange }: { value: boolean, onValueChange:any}) => {
  const translate = useSharedValue(0);

  const config = {
    duration: 300,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const changeValue = () => {
    onValueChange();
    translate.value = !value ? 27 : 0;
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(translate.value, config) }]
    }
  });

  useEffect(() => {
    translate.value = value ? 27 : 0;
  },[value]);

  return (
    <Pressable
    style={[styles.container]}
      onPress={() => changeValue()}
    >
      <Animated.View style={[
          styles.switch,
          animatedStyles,
          {
            backgroundColor: value ? Colors.greenLizard : Colors.maastrichtBlue
          }
        ]}
      />
    </Pressable>
  )
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.silverSand,
    borderWidth: 2,
    padding: 3,
    borderRadius: 25,
    width: 53,
    backgroundColor: Colors.white
  },
  switch: {
    height: 16,
    width: 16,
    borderRadius:20
  }
});
