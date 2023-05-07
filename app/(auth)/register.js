import {
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
import { useState } from 'react';
import { Stack, useRouter, Link } from 'expo-router';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useAuth } from "../../context/auth";
import { LayoutStyles, RegisterStyles, Colors } from "../../constants/styles";
import Input from "../../components/input";

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
  const [ruc, setRuc] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

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
      <View style={RegisterStyles.inputContainer}>
        <Text style={RegisterStyles.inputTitle}>REGISTRO</Text>
        <TextInput
          placeholder="Razón social"
          value={name}
          onChangeText={text => setName(text)}
          style={RegisterStyles.input}
        />
        <TextInput
          placeholder="R.U.C."
          value={ruc}
          onChangeText={text => setRuc(text)}
          style={RegisterStyles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={text => setEmail(text)}
          style={RegisterStyles.input}
          keyboardType="email-address"
        />
        <Input
          placeholder="Contraseña"
          value={password}
          onChangeText={text => setPassword(text)}
          styles={RegisterStyles.input}
          password={true}
        />
        <Input
          placeholder="Repetir contraseña"
          value={password_confirmation}
          onChangeText={text => setPasswordConfirmation(text)}
          styles={RegisterStyles.input}
          password={true}
        />
        <BouncyCheckbox
          fillColor={Colors.greenLizard}
          innerIconStyle={{ borderColor: Colors.silverSand, borderWidth: 2 }}
          size={22}
          textComponent={<CheckboxText />}
          onPress={() => setCheckbox(!checkbox)}
        />
      </View>

      <View style={RegisterStyles.buttonContainer}>
        <TouchableOpacity
          onPress={() => signUp(name, ruc, email, password, password_confirmation, checkbox)}
          style={RegisterStyles.button}
        >
          <Text style={RegisterStyles.buttonText}>REGISTRAR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
