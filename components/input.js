import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../constants/styles';

const Input = ({ error, password, onFocus = () => {}, styles, ...props }) => {

  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

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
      {error && (
        <Text style={{marginTop: 7, color: 'red', fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;
