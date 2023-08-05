import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "@/src/utils/Colors";

interface InputProps {
  placeholder: string;
  value: string;
  error?: [];
  password?: boolean;
  onChangeText: (text: string) => void;
  // onFocus: () => void;
  styles: StyleProp<TextStyle>;
  theme: string;
  keyboardType?: string;
}

const Input = ({
  placeholder,
  value,
  error,
  password,
  onChangeText = (text: string) => {},
  // onFocus = () => {},
  styles,
  theme,
}: // ...props
InputProps) => {
  const [hidePassword, setHidePassword] = useState(password);
  // const [isFocused, setIsFocused] = useState(false);
  const errorColor = theme === "light" ? "red" : "white";

  return (
    <View
      style={{
        position: "relative",
        marginBottom: 15,
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        // onFocus={() => {
        //   onFocus();
        //   setIsFocused(true);
        // }}
        // onBlur={() => setIsFocused(false)}
        secureTextEntry={hidePassword}
        style={styles}
        placeholder={placeholder}
        // {...props}
      />
      {password && (
        <Icon
          onPress={() => setHidePassword(!hidePassword)}
          name={hidePassword ? "eye-outline" : "eye-off-outline"}
          style={Styles.icon}
        />
      )}
      {error &&
        error.map((message, i) => (
          <Text key={i} style={[Styles.errorMessages, { color: errorColor }]}>
            {message}
          </Text>
        ))}
    </View>
  );
};

export default Input;

const Styles = StyleSheet.create({
  errorMessages: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: "PoppinsMedium",
  },
  icon: {
    color: Colors.maastrichtBlue,
    fontSize: 22,
    position: "absolute",
    right: 10,
    top: 14,
  },
});
