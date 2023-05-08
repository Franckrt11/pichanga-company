import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useAuth } from "../../context/auth";

const Home = () => {
  const { signOut, user } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
