import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { LayoutStyles } from "@/src/utils/Styles";

const Bookings = () => {
  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={LayoutStyles.scrollContainer}>
          <Text>Bookings</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookings;

const styles = StyleSheet.create({});
