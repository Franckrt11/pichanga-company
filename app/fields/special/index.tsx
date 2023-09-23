import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { ISpecialHour } from "@/src/utils/Types";
import ChildPage from "@/src/components/layouts/child-page";
import PlusIcon from "@/src/components/icons/plus-icon";
import SpecialHour from "@/src/components/special-hour";

const Index = () => {
  const [added, setAdded] = useState<ISpecialHour[]>([
    {
      type: "added",
      day: "30 Dic 2022",
      hour: "2:00 am - 5:00 pm",
      field: "Cancha 1",
      reason: "Día adicional"
    },
    {
      type: "added",
      day: "15 Ene 2023",
      hour: "6:00 am - 4:00 pm",
      field: "Cancha 1",
      reason: "Día de campeonato"
    },
  ]);

  const [retired, setRetired] = useState([
    {
      type: "retired",
      day: "14 Feb 2023",
      hour: "6:00 am - 9:00 pm",
      field: "Cancha 1",
      reason: "San Valentin"
    },
  ]);

  return (
    <ChildPage style={{ marginBottom: 80 }}>
      <Text style={LayoutStyles.pageTitle}>HORARIOS ESPECIALES</Text>

      <Pressable
        onPress={() => router.push("/fields/special/configure")}
        style={[PageStyles.button, styles.button, { marginBottom: 40 }]}
      >
        <PlusIcon size={14} />
        <Text style={PageStyles.buttonText}>CONFIGURAR HORARIO ESPECIAL</Text>
      </Pressable>

      <View>
      {added.map((day, index) => (
        <SpecialHour key={index} data={day} />
      ))}
      {retired.map((day, index) => (
        <SpecialHour key={index} data={day} />
      ))}
      </View>
    </ChildPage>
  )
};

export default Index;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    gap: 10,
    width: "90%",
    marginHorizontal: "auto",
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 25,
    justifyContent: "center",
    paddingVertical: 6
  }
});
