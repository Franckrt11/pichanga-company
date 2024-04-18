import { StyleSheet, Text, View, Pressable } from "react-native"
import { router, useLocalSearchParams } from "expo-router";
import { LayoutStyles } from "@/src/utils/Styles";
import ChildPage from "@/src/components/layouts/child-page";

const CommentsDetails = () => {
  const params = useLocalSearchParams();

  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>COMENTARIOS {params.id}</Text>
    </ChildPage>
  )
};

export default CommentsDetails;

const styles = StyleSheet.create({});