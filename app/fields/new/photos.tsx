import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Stack, router } from "expo-router";
import { Image } from 'expo-image';
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import Images from "@/src/utils/Images";
import Back from "@/src/components/header/back";

const Photos = () => {
  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => <></>,
          headerLeft: () => <Back />,
        }}
      />
      <ScrollView style={{ paddingTop: 20, paddingBottom: 60 }}>
        <View style={LayoutStyles.scrollContainer}>
          <Text style={LayoutStyles.pageTitle}>AGREGAR FOTOGRAFÍAS</Text>
          <Text style={styles.subtitle}>FOTO PORTADA</Text>
          <Image
            source={Images.portraitDefault}
            style={{ borderRadius: 20, height: 250, width: "100%" }}
            transition={500}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Photos;

const styles = StyleSheet.create({
  subtitle: {
    color: Colors.maastrichtBlue,
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 20,
  }
});


