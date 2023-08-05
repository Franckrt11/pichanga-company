import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { LayoutStyles } from "@/src/utils/Styles";
import ActivityBlock from "@/src/components/activity-block";

const Activity = () => {
  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={LayoutStyles.scrollContainer}>
          <Text style={styles.title}>ACTIVIDAD</Text>
          <ActivityBlock />
        </View>
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
