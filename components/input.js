import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../constants/styles';

const Input = ({ error, password, onFocus = () => {}, ...props }) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: error
            ? 'red'
            : isFocused
            ? '#7978B5'
            : '#F3F4FB',
          alignItems: 'center',
        },
      ]}
    >
      <TextInput
        autoCorrect={false}
        onFocus={() => {
          onFocus();
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={hidePassword}
        style={{color: '#7978B5', flex: 1}}
        {...props}
      />
      {password && (
        <Icon
          onPress={() => setHidePassword(!hidePassword)}
          name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
          style={{color: '#7978B5', fontSize: 22}}
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

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%'
  },
});

export default Input;
