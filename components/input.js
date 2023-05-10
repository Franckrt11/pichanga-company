import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../constants/styles';

const Input = ({ error, password, onFocus = () => {}, styles, theme, ...props }) => {

  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);
  const errorColor = theme === 'light' ? 'red' : 'white';

  return (
    <View
      style={{
          // borderColor: error
          //   ? 'red'
          //   : isFocused
          //   ? '#7978B5'
          //   : '#F3F4FB',
          // alignItems: 'center',
          position: 'relative',
          marginBottom:15,
        }}
    >
      <TextInput
        autoCorrect={false}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={hidePassword}
        style={styles}
        {...props}
      />
      {password && (
        <Icon
          onPress={() => setHidePassword(!hidePassword)}
          name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
          style={{
            color: Colors.maastrichtBlue,
            fontSize: 22,
            position: 'absolute',
            right: 8,
            top: 7
          }}
        />
      )}
      {error && error.map((message, i) => <Text key={i} style={{marginTop: 5, color: errorColor, fontSize: 12}}>{message}</Text>)}
    </View>
  );
};

export default Input;
