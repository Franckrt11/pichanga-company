import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { LayoutStyles } from '../../src/constants/styles';
import { useAuth } from "../../src/context/auth";

const Home = () => {
  const { signOut, user } = useAuth();

  return (
    <View style={ LayoutStyles.whiteContainer }>
      <Text>Home</Text>
      <Text>{ user ? user.name : '' }</Text>
      <Button
        title="Salir"
        onPress={() => signOut()}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
