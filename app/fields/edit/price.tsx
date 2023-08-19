import { StyleSheet, Text, View, Pressable } from "react-native"
import { router } from "expo-router";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import ChildPage from "@/src/components/layouts/child-page";

const Price = () => {
  const save = () => {
    console.log("Save Special Hour");
    router.back();
  };

  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>PRECIOS</Text>

      <Pressable
        onPress={() => save()}
        style={[PageStyles.button, { width: "80%", marginHorizontal: "auto" }]}
      >
        <Text style={PageStyles.buttonText}>GUARDAR</Text>
      </Pressable>
    </ChildPage>
  )
};

export default Price;

const styles = StyleSheet.create({});