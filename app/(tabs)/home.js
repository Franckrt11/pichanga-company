import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { LayoutStyles } from "../../src/constants/styles";
import { useUserContext } from "../../src/context/user";

const Home = () => {
  const state = useUserContext();

  return (
    <View style={LayoutStyles.whiteContainer}>
      <Text>Home</Text>
      <Text>{state?.name}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
