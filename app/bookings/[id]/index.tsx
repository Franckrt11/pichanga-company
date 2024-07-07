import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { LayoutStyles } from "@/src/utils/Styles";
import ChildPage from "@/src/components/layouts/child-page";

const BookingsDetails = () => {
  const params = useLocalSearchParams();

  return (
    <ChildPage style={{ paddingBottom: 70 }}>
      <Text style={[LayoutStyles.pageTitle, { marginBottom: 10 }]}>
        Reserva {params.id}
      </Text>
    </ChildPage>
  );
};

export default BookingsDetails;

const styles = StyleSheet.create({});
