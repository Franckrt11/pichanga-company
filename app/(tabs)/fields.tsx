import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { FieldData } from "@/src/utils/Types";
import FieldItem from "@/src/components/field-item";
import { useUserContext } from "@/src/context/User";
import { useAuthContext } from "@/src/context/Auth";
import { fetchAllFields }  from "@/src/models/Field";

const Fields = () => {
  const { state } = useUserContext();
  const { token } = useAuthContext();
  const [ fields, setFields ] = useState<FieldData[]>([]);

  const getFieldsList = async (): Promise<void> => {
    const fields = await fetchAllFields(state.id as number, token);
    setFields(fields.data);
  };

  useEffect(() => {
    getFieldsList();
  },[]);

  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={LayoutStyles.scrollContainer}>

        {fields.map((field, index) => (
          <FieldItem
            key={index}
            id={field.id as number}
            name={field.name}
            district={field.district}
            active={field.active as boolean}
          />
        ))}

          <View style={{ marginVertical: 30 }}>
            <Pressable
              onPress={() => router.push("/fields/new")}
              style={[
                styles.button,
                { backgroundColor: Colors.metallicGreen, width: "80%" },
              ]}
            >
              <Text style={[styles.buttonText, { fontSize: 22 }]}>
                AGREGAR CANCHA
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/fields/special")}
              style={[
                styles.button,
                { backgroundColor: Colors.ferrariRed, width: "70%" },
              ]}
            >
              <Text style={[styles.buttonText, { fontSize: 18 }]}>
                HORARIOS ESPECIALES
              </Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Fields;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    marginHorizontal: "auto",
    paddingVertical: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontFamily: "PoppinsMedium",
  },
});
