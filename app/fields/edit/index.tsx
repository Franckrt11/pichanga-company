import { StyleSheet, Text, View, Pressable } from "react-native"
import { useState } from "react";
import { router } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";

const EditField = () => {
  const [status, setStatus] = useState("active");

  const save = () => {
    console.log("Save Special Hour");
    router.back();
  };

  return (
    <ChildPage style={{ width: "80%" }}>
      <Text style={LayoutStyles.pageTitle}>EDITAR CANCHA</Text>

      <Pressable
        onPress={() => router.push("/fields/edit/data")}
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>DATOS DE CANCHA</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/fields/edit/photos")}
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>FOTOGRAFÍAS</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/fields/edit/days")}
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>DÍAS DE ATENCIÓN</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/fields/edit/hours")}
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>HORARIOS</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push("/fields/edit/price")}
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>PRECIOS</Text>
      </Pressable>

      <View style={{ marginBottom: 50 }}>
        <Text style={[styles.checkboxText, { marginBottom: 5, fontSize: 20 }]}>Estado</Text>
        <Picker
          style={[PageStyles.picker, { fontSize: 16 }]}
          selectedValue={status}
          onValueChange={(value, itemIndex) => setStatus(value)}
        >
          <Picker.Item fontFamily="PoppinsMedium" label="Habilitado" value="active" />
          <Picker.Item fontFamily="PoppinsMedium" label="Inhabilitado" value="inactive" />
        </Picker>
      </View>

      <Pressable
        onPress={() => save()}
        style={[PageStyles.button, { width: "80%", marginHorizontal: "auto" }]}
      >
        <Text style={PageStyles.buttonText}>GUARDAR</Text>
      </Pressable>

    </ChildPage>
  )
};

export default EditField;


const styles = StyleSheet.create({
  checkboxText: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.maastrichtBlue,
    textDecorationLine: "none"
  },
  outlineButton: {
    alignItems: "center",
    color: Colors.maastrichtBlue,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    borderRadius: 25,
    fontFamily: "PoppinsMedium",
    marginBottom: 20
  },
  outlineButtonText: {
    color: Colors.maastrichtBlue,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  }
});
