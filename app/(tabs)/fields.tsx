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
import { DistrictData, FieldData } from "@/src/utils/Types";
import FieldItem from "@/src/components/field-item";
import { useUserContext } from "@/src/context/User";
import { useAuthContext } from "@/src/context/Auth";
import { fetchAllFields } from "@/src/models/Field";

const Fields = () => {
  const { state } = useUserContext();
  const { token } = useAuthContext();
  const [fields, setFields] = useState<FieldData[]>([]);

  const getFieldsList = async (): Promise<void> => {
    const fields = await fetchAllFields(state.id as number, token);
    setFields(fields.data);
  };

  useEffect(() => {
    getFieldsList();
  }, []);

  return (
    <SafeAreaView style={LayoutStyles.whiteContainer}>
      <ScrollView
        style={{ paddingTop: 10 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={LayoutStyles.scrollContainer}>
          {fields?.map((field, index) => (
            <FieldItem
              key={index}
              id={field.id as number}
              name={field.name}
              district={field.district.name}
              portrait={field.portrait as string | null}
              active={field.active as boolean}
            />
          ))}
          <View style={{ marginVertical: 30, width: "80%" }}>
            <Pressable
              onPress={() => router.push("/fields/new")}
              style={[styles.button, { backgroundColor: Colors.metallicGreen }]}
            >
              <Text style={styles.buttonText}>AGREGAR CANCHA</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/fields/special")}
              style={[styles.button, { backgroundColor: Colors.ferrariRed }]}
            >
              <Text style={styles.buttonText}>HORARIOS ESPECIALES</Text>
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
    paddingVertical: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
    textAlign: "center",
  },
});
