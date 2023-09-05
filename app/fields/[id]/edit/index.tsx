import { StyleSheet, Text, View, Pressable } from "react-native"
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { FieldData } from "@/src/utils/Types";
import { fetchField }  from "@/src/models/Field";
import { useAuthContext } from "@/src/context/Auth";
import ChildPage from "@/src/components/layouts/child-page";

const EditField = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const [ field, setField ] = useState<FieldData | null>(null);
  const [ status, setStatus ] = useState<boolean>(false);

  const getField = async () => {
    const response:FieldData = await fetchField(params.id as unknown as number, token);
    setField(response);
    setStatus(response.active as boolean);
  };

  const save = () => {
    console.log("Save Special Hour");
    router.back();
  };

  useEffect(() => {
    getField();
  },[]);

  return (
    <ChildPage style={{ width: "80%", marginBottom: 80 }}>
      <Text style={[LayoutStyles.pageTitle, { marginBottom: 0 }]}>EDITAR CANCHA</Text>
      <Text style={LayoutStyles.pageTitle}>{field?.name}</Text>
      <Pressable
        onPress={() => router.push(`/fields/${params.id}/edit/data`)}
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>DATOS DE CANCHA</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push(`/fields/${params.id}/edit/photos`)}
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>FOTOGRAFÍAS</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push(`/fields/${params.id}/edit/days`)}
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>DÍAS DE ATENCIÓN</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push(`/fields/${params.id}/edit/hours`)}
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>HORARIOS</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push(`/fields/${params.id}/edit/price`)}
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>PRECIOS</Text>
      </Pressable>

      <View style={{ marginBottom: 50, width: "100%" }}>
        <Text style={[styles.checkboxText, { marginBottom: 5, fontSize: 20 }]}>Estado</Text>
        <View style={{
          backgroundColor: Colors.white,
          borderColor: Colors.silverSand,
          borderWidth: 2,
          borderRadius: 25,
          marginBottom: 20
        }}>
          <Picker
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              fontFamily: "PoppinsMedium"
            }}
            selectedValue={status}
            onValueChange={(value, itemIndex) => {
              console.log('value', value.toString(), itemIndex);
              setStatus(value);
            }}
          >
            <Picker.Item fontFamily="PoppinsMedium" label="Habilitado" value={true} />
            <Picker.Item fontFamily="PoppinsMedium" label="Inhabilitado" value={false} />
          </Picker>
        </View>
      </View>

      <Pressable
        onPress={() => save()}
        style={[PageStyles.button, { width: "80%" }]}
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
    marginBottom: 20,
    width: "100%"
  },
  outlineButtonText: {
    color: Colors.maastrichtBlue,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  }
});
