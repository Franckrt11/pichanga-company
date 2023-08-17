import { StyleSheet, Text, View } from "react-native"
import { Stack, router } from "expo-router";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";

const EditField = () => {
  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>EDITAR CANCHA</Text>
    </ChildPage>
  )
};

export default EditField;

const styles = StyleSheet.create({});