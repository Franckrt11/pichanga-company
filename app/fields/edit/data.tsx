import { StyleSheet, Text, View, Pressable } from "react-native"
import { router } from "expo-router";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import ChildPage from "@/src/components/layouts/child-page";

const Data = () => {
  const save = () => {
    console.log("Save Special Hour");
    router.back();
  };

  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>DATOS DE CANCHA</Text>

      <Pressable
        onPress={() => save()}
        style={[PageStyles.button, { width: "80%", marginHorizontal: "auto" }]}
      >
        <Text style={PageStyles.buttonText}>GUARDAR</Text>
      </Pressable>
    </ChildPage>
  )
};

export default Data;

const styles = StyleSheet.create({});