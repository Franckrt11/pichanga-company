import {
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  Button,
  Alert
} from 'react-native';
import { useState } from 'react';
import { Stack, useRouter, Link } from 'expo-router';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { LayoutStyles, RegisterStyles, Colors } from "../../constants/styles";

const CheckboxText = () => {
  return (
    <Text
      style={{color: 'black', paddingLeft: 15, fontWeight: 600}}
    >
      Estoy de acuerdo con los
        <Link href="/terminos" style={{color: Colors.metallicGreen}}>
          Términos y condiciones
        </Link>
    </Text>
  );
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [checkboxState, setCheckboxState] = useState(false);
  const router = useRouter();

  const fetchRegister = () => {
    console.log('>> fetchRegister');
    if (checkboxState) {
      console.log('fetchRegister', {
        name: name,
        email: email,
        password: password
      });
    } else {
      alert('Tienes que aceptar');
    }
  };

  return (
    <KeyboardAvoidingView
      style={LayoutStyles.whiteContainer}
      behavior="padding"
    >

      <Stack.Screen
        options={{
          headerLeft: () => <Button title="Volver" onPress={() => router.back()} />
        }}
      />

      <ScrollView style={RegisterStyles.inputContainer}>
        <Text style={RegisterStyles.inputTitle}>REGISTRO</Text>
        <TextInput
          placeholder="Razón social"
          value={name}
          onChangeText={text => setName(text)}
          style={RegisterStyles.input}
        />
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={text => setEmail(text)}
          style={RegisterStyles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={text => setPassword(text)}
          style={RegisterStyles.input}
        />
        <TextInput
          placeholder="Repetir contraseña"
          value={confirm_password}
          onChangeText={text => setConfirmPassword(text)}
          style={RegisterStyles.input}
        />
        <BouncyCheckbox
          fillColor={Colors.greenLizard}
          innerIconStyle={{ borderColor: Colors.silverSand, borderWidth: 2 }}
          size={22}
          textComponent={<CheckboxText />}
          onPress={() => setCheckboxState(!checkboxState)}
        />
      </ScrollView>

      <View style={RegisterStyles.buttonContainer}>
        <TouchableOpacity
          onPress={fetchRegister}
          style={RegisterStyles.button}
        >
          <Text style={RegisterStyles.buttonText}>REGISTRAR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
