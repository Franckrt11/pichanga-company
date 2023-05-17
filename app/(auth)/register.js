import {
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Text,
  View,
  Platform
} from 'react-native';
import { useState } from 'react';
import { Stack, useRouter, Link } from 'expo-router';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from "../../src/context/auth";
import { LayoutStyles, RegisterStyles, Colors } from "../../src/constants/styles";
import Input from "../../src/components/input";

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
  const { signUp, loading, errors } = useAuth();

  return (
    <KeyboardAvoidingView
      style={LayoutStyles.whiteContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View>
        <Icon
          onPress={() => router.back()}
          name={'arrow-left-thick'}
          style={{
            color: Colors.maastrichtBlue,
            fontSize: 30
          }}
        />
      </View>
      <View style={RegisterStyles.inputContainer}>
        <Text style={RegisterStyles.inputTitle}>REGISTRO</Text>
        <Input
          placeholder="Razón social"
          value={name}
          onChangeText={text => setName(text)}
          styles={RegisterStyles.input}
          theme="light"
          error={errors ? errors.name : null}
        />
        <Input
          placeholder="R.U.C."
          value={ruc}
          onChangeText={text => setRuc(text)}
          styles={RegisterStyles.input}
          theme="light"
          keyboardType="numeric"
          error={errors ? errors.ruc : null}
        />
        <Input
          placeholder="Correo electrónico"
          value={email}
          onChangeText={text => setEmail(text)}
          styles={RegisterStyles.input}
          theme="light"
          keyboardType="email-address"
          error={errors ? errors.email : null}
        />
        <Input
          placeholder="Contraseña"
          value={password}
          onChangeText={text => setPassword(text)}
          styles={RegisterStyles.input}
          theme="light"
          password={true}
          error={errors ? errors.password : null}
        />
        <Input
          placeholder="Repetir contraseña"
          value={password_confirmation}
          onChangeText={text => setPasswordConfirmation(text)}
          styles={RegisterStyles.input}
          theme="light"
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
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <TouchableOpacity
          onPress={() => signUp(name, ruc, email, password, password_confirmation, checkbox)}
          style={RegisterStyles.button}
        >
          <Text style={RegisterStyles.buttonText}>REGISTRAR</Text>
        </TouchableOpacity>
      )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
