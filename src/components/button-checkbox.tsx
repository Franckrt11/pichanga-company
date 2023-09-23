import { StyleSheet, Text, Pressable, TextStyle } from "react-native";
import { useState, useEffect } from "react";
import Colors from "@/src/utils/Colors";

const ButtonCheckbox = ({ styleText, radius, color, text, mode, checked, onChangeMode }: { styleText?: TextStyle, radius: number, color: string, text: string, mode: string, checked: boolean, onChangeMode: any }) => {
  const [active, setActive] = useState(checked);

  const changeState = () => {
    setActive(!active);
    onChangeMode(!active, mode);
  };

  useEffect(() => {
    setActive(checked)
  }, [checked]);

  return (
    <Pressable
      style={[{ borderRadius: radius },styles.button, active ? { backgroundColor: color, borderColor: color } : { backgroundColor: Colors.white, borderColor: Colors.silverSand }]}
      onPress={() => changeState()}
    >
      <Text style={[styles.buttonText, styleText, active ? { color: Colors.white } : { color: Colors.maastrichtBlue }]}>{text}</Text>
    </Pressable>
  );
};

export default ButtonCheckbox;

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    flex: 1,
    alignItems: "center",
    padding: 8
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium"
  }
});