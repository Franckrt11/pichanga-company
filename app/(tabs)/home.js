import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { LayoutStyles } from '../../src/constants/styles';
import { useAuth } from "../../src/context/auth";

const Home = () => {
  const { userData } = useAuth();

  return (
    <View style={ LayoutStyles.whiteContainer }>
      <Text>Home</Text>
      <Text>{ userData ? userData.name : '' }</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
