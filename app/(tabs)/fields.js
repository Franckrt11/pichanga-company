import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { LayoutStyles, Colors } from "../../src/constants/styles";
import FieldItem from "../../src/components/field-item";

const Fields = () => {
  return (
    <SafeAreaView
      style={[LayoutStyles.whiteContainer, { justifyContent: "flex-start" }]}
    >
      <ScrollView style={{ marginTop: 10, width: "90%" }}>
        <FieldItem name={"Cancha 1"} active={true} />
        <FieldItem name={"Cancha 2"} active={false} />
        <FieldItem name={"Cancha 3"} active={true} />
        <View style={{ marginVertical: 30 }}>
          <TouchableOpacity
            onPress={() => console.log("Add Field")}
            style={[
              styles.button,
              { backgroundColor: Colors.metallicGreen, width: "80%" },
            ]}
          >
            <Text style={[styles.buttonText, { fontSize: 22 }]}>
              AGREGAR CANCHA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Special Hours")}
            style={[
              styles.button,
              { backgroundColor: Colors.ferrariRed, width: "70%" },
            ]}
          >
            <Text style={[styles.buttonText, { fontSize: 18 }]}>
              HORARIOS ESPECIALES
            </Text>
          </TouchableOpacity>
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
