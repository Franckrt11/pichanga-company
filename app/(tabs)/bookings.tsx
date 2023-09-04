import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";

const Bookings = () => {
  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <ScrollView
        style={{ paddingTop: 10 }}
        contentContainerStyle={{ alignItems: "center"}}
      >
        <View style={LayoutStyles.scrollContainer}>
          <Text style={LayoutStyles.pageTitle}>RESERVAS</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookings;

const styles = StyleSheet.create({});
