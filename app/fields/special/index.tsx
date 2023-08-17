import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { Stack, router } from "expo-router";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import Back from "@/src/components/header/back";
import PlusIcon from "@/src/components/icons/plus-icon";
import SpecialHour from "@/src/components/special-hour";
import { ISpecialHour } from "@/src/utils/Types";

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
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => <></>,
          headerLeft: () => <Back />,
        }}
      />
      <ScrollView style={{ paddingTop: 30 }}>
        <View style={LayoutStyles.scrollContainer}>
          <Text style={LayoutStyles.pageTitle}>HORARIOS ESPECIALES</Text>

          <Pressable
            onPress={() => console.log('Add Special')}
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

        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default Index;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    gap: 10,
    width: "80%",
    marginHorizontal: "auto",
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 25,
    justifyContent: "center"
  }
});
