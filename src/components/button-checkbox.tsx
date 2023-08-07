import { StyleSheet, Text, Pressable } from "react-native";
import { useState } from "react";
import Colors from "@/src/utils/Colors";

const ButtonCheckbox = ({ text, mode, checked, onChangeMode }: { text: string, mode: string, checked: boolean, onChangeMode: any }) => {
  const [active, setActive] = useState(checked);

  const changeState = () => {
    setActive(!active);
    onChangeMode(!active, mode);
  };

  return (
    <Pressable
      style={[styles.button, active ? { backgroundColor: Colors.metallicGreen, borderColor: Colors.metallicGreen } : { backgroundColor: Colors.white, borderColor: Colors.silverSand }]}
      onPress={() => changeState()}
    >
      <Text style={[styles.buttonText, active ? { color: Colors.white } : { color: Colors.maastrichtBlue }]}>{text}</Text>
    </Pressable>
  );
};

export default ButtonCheckbox;

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    flex: 1,
    alignItems: "center",
    padding: 8,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium"
  }
});