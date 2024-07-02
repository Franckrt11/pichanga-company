import { StyleSheet, Text, Pressable, View } from "react-native";
import { useState, useEffect } from "react";
import Colors from "@/src/utils/Colors";
import ArrowUpIcon from "@/src/components/icons/arrowup-icon";

const ButtonDayPicker = ({ text, value, allowed, selected, onSelect }: { text: string, value: number, allowed: boolean, selected: number | null, onSelect: any }) => {
  const [active, setActive] = useState(allowed);
  const [show, setShow] = useState<boolean>(selected === value ? true : false);

  const changeState = () => {
    if (allowed) {
      setShow(true);
      onSelect(value);
    }
  };

  useEffect(() => {
    setActive(allowed);
    setShow(selected === value ? true : false);
  }, [allowed, selected]);

  return (
    <Pressable
      onPress={() => changeState()}
      style={{ alignItems: "center", flex: 1 }}
    >
      <View
        style={[
          styles.button,
          show ? styles.buttonSelected : active ? styles.buttonAllowed : styles.buttonDisabled
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            show ? { color: Colors.white } : active ? { color: Colors.maastrichtBlue } : { color: Colors.gray }
          ]}
        >
          {text}
        </Text>
      </View>
      {show ? (
        <ArrowUpIcon />
      ) : (
        <View style={{ height: 20, width: 20 }} />
      )}
    </Pressable>
  )
};

export default ButtonDayPicker;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 5,
    width: "100%"
  },
  buttonAllowed: {
    backgroundColor: Colors.white,
    borderColor: Colors.silverSand,
    borderWidth: 2
  },
  buttonSelected: {
    backgroundColor: Colors.maastrichtBlue,
    borderColor: Colors.maastrichtBlue,
    borderWidth: 2
  },
  buttonDisabled: {
    backgroundColor: Colors.white,
    borderColor: Colors.brightGray,
    borderWidth: 1
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium"
  }
});
