import { StyleSheet, Text, View, Pressable } from "react-native"
import { router, useLocalSearchParams } from "expo-router";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import ChildPage from "@/src/components/layouts/child-page";

const FieldDetails = () => {
  const params = useLocalSearchParams();

  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>DATOS DE CANCHA {params.id}</Text>
    </ChildPage>
  )
};

export default FieldDetails;

const styles = StyleSheet.create({});