import { Text, View, TextInput, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import Input from "@/src/components/input";
import { useAuthContext } from "@/src/context/Auth";

const Delete = () => {
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState(0);
  const { errors } = useAuthContext();

  const nextPage = () => {
    console.log('Next Page');
    setPage(1);
  };

  const prevPage = () => {
    console.log('Prev Page');
    setPage(0);
  };

  const deleteAccount = () => {
    console.log('deleteAccount');
  };

  return (
    <ChildPage>
      <Text style={[LayoutStyles.pageTitle, { marginBottom: 40 }]}>ELIMINAR CUENTA</Text>
      {(() => {
        switch (page) {
          case 0:
            return (
              <View>
                <Text style={styles.content}>Escribe el motivo para eliminar la cuenta:</Text>
                <TextInput
                  style={styles.inputArea}
                  editable
                  multiline
                  numberOfLines={9}
                  onChangeText={text => setValue(text)}
                  value={value}
                />
                <Pressable
                  onPress={() => nextPage()}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>SIGUIENTE</Text>
                </Pressable>
              </View>
            );
          case 1:
            return (
              <View style={{ width: "80%", marginHorizontal: "auto" }}>
                <Input
                  placeholder="Contraseña"
                  value={password}
                  onChangeText={(text: string) => setPassword(text)}
                  styles={[styles.inputArea, { marginBottom: 20 }]}
                  theme="light"
                  password={true}
                  error={errors ? errors.password : null}
                />
                <Pressable
                  onPress={() => prevPage()}
                  style={{ marginHorizontal: "auto", marginBottom: 20 }}
                >
                  <Text style={[styles.buttonText, { color: Colors.metallicGreen, textDecorationLine: 'underline' }]}>Volver</Text>
                </Pressable>
                <Pressable
                  onPress={() => deleteAccount()}
                  style={[styles.button, { width: "100%" }]}
                >
                  <Text style={styles.buttonText}>ELIMINAR CUENTA</Text>
                </Pressable>
              </View>
            );
          default:
            return null
        }
      })()}
    </ChildPage>
  );
};

export default Delete;

const styles = StyleSheet.create({
  content: {
    color: Colors.maastrichtBlue,
    fontSize: 15,
    fontFamily: "PoppinsMedium",
    marginBottom: 10
  },
  inputArea: {
    color: Colors.maastrichtBlue,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    borderRadius: 10,
    fontFamily: "PoppinsMedium",
    marginBottom: 80
  },
  button: {
    backgroundColor: Colors.metallicGreen,
    width: "80%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: "auto"
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  }
});
