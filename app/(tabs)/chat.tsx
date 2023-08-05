import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { LayoutStyles } from "@/src/utils/Styles";

const Chat = () => {
  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={LayoutStyles.scrollContainer}>
          <Text>Chat</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
