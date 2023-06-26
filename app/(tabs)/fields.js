import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { LayoutStyles } from '../../src/constants/styles';
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Fields;

const styles = StyleSheet.create({});
