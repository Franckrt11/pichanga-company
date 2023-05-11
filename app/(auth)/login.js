import {
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { useState } from 'react';
import { useRouter } from "expo-router";
import { useAuth } from "../../context/auth";
import { LayoutStyles, LoginStyles, AppImages } from "../../constants/styles";
import Input from "../../components/input";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading, errors } = useAuth();

  return (
    <KeyboardAvoidingView
      style={LayoutStyles.blueContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Image
        style={LoginStyles.logo}
        source={AppImages.images.logo}
      />

      <View style={LoginStyles.inputContainer}>
        <Input
          placeholder="Correo"
          value={email}
          onChangeText={text => setEmail(text)}
          styles={LoginStyles.input}
          theme="dark"
          error={errors ? errors.email : null}
        />
        <Input
          placeholder="Contraseña"
          value={password}
          onChangeText={text => setPassword(text)}
          styles={LoginStyles.input}
          theme="dark"
          password={true}
          error={errors ? errors.password : null}
        />
      </View>

      <View style={LoginStyles.buttonContainer}>
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <TouchableOpacity
          onPress={() => signIn(email, password)}
          style={LoginStyles.button}
        >
          <Text style={LoginStyles.buttonText}>INGRESAR</Text>
        </TouchableOpacity>
      )}
        <TouchableOpacity
          style={LoginStyles.buttonOutline}
          onPress={() => router.push("/register")}
        >
          <Text style={LoginStyles.buttonOutlineText}>REGISTRARSE</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
};

export default Login;
