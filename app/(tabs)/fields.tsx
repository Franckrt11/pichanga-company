import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import React from "react";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import FieldItem from "@/src/components/field-item";

const Fields = () => {
  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={LayoutStyles.scrollContainer}>
          <FieldItem id={1} name={"Cancha 1"} active={true} />
          <FieldItem id={2} name={"Cancha 2"} active={false} />
          <FieldItem id={3} name={"Cancha 3"} active={true} />
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
