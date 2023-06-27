import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { LayoutStyles } from '../../src/constants/styles';
import ActivityBlock from "../../src/components/activity-block";

const Activity = () => {
  return (
    <SafeAreaView
      style={[LayoutStyles.whiteContainer, { justifyContent: "flex-start" }]}
    >
      <ScrollView style={{ marginTop: 10, width: "90%" }}>
        <Text style={styles.title}>ACTIVIDAD</Text>
        <ActivityBlock />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activity;

const styles = StyleSheet.create({
  title: {
    fontFamily: "PoppinsMedium",
    marginBottom: 10,
  },
});
