import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { Stack, router } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import Back from "@/src/components/header/back";
import Input from "@/src/components/input";

const Price = () => {
  const [same, setSame] = useState(true);
  const [notsame, setNotSame] = useState(false);

  const [priceHour, setPriceHour] = useState("");
  const [priceHalfHour, setPriceHalfHour] = useState("");

  const saveField = () => {
    console.log("saveField");
  };

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
      <ScrollView style={{ paddingTop: 30 }}>
        <View style={LayoutStyles.scrollContainer}>
          <Text style={LayoutStyles.pageTitle}>PRECIO DE RESERVA</Text>
          <Text style={[LayoutStyles.subtitle, { marginBottom: 30 }]}>¿Tienen un precio único de reserva por hora?</Text>

          <View style={{flexDirection: "column", gap: 10, marginBottom: 30 }}>
            <BouncyCheckbox
              isChecked={same}
              size={25}
              fillColor={Colors.greenLizard}
              unfillColor={Colors.white}
              text="Si, tiene precio único."
              iconStyle={{ borderColor: Colors.white, borderWidth: 6 }}
              innerIconStyle={styles.innerIcon}
              textStyle={styles.checkboxText}
              iconComponent={<View></View>}
              disableBuiltInState
              onPress={(isChecked: boolean) => {
                setSame(true);
                setNotSame(false);
              }}
            />
            <BouncyCheckbox
              isChecked={notsame}
              size={25}
              fillColor={Colors.greenLizard}
              unfillColor={Colors.white}
              text="No, tiene distinto precio."
              iconStyle={{ borderColor: Colors.white, borderWidth: 6 }}
              innerIconStyle={styles.innerIcon}
              textStyle={styles.checkboxText}
              iconComponent={<View></View>}
              disableBuiltInState
              onPress={(isChecked: boolean) => {
                setNotSame(true);
                setSame(false);
              }}
            />
          </View>

          <View style={{ marginBottom: 50 }}>
              <View style={{ width: "60%" }}>
                <Text style={[styles.checkboxText, { marginBottom: 10 }]}>Precio Hora</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.checkboxText, { fontSize: 20, marginRight: 10, marginTop: 5 }]}>s/</Text>
                  <Input
                    placeholder=""
                    value={priceHour}
                    onChangeText={(text: string) => setPriceHour(text)}
                    styles={[PageStyles.input, styles.input]}
                    theme="light"
                  />
                </View>
              </View>
              <View style={{ width: "60%" }}>
                <Text style={[styles.checkboxText, { marginBottom: 10 }]}>Precio 1/2 Hora</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.checkboxText, { fontSize: 20, marginRight: 10, marginTop: 5 }]}>s/</Text>
                  <Input
                    placeholder=""
                    value={priceHalfHour}
                    onChangeText={(text: string) => setPriceHalfHour(text)}
                    styles={[PageStyles.input, styles.input]}
                    theme="light"
                  />
                </View>
              </View>
          </View>

          <Pressable
            onPress={() => saveField()}
            style={[PageStyles.button, { width: "80%", marginHorizontal: "auto" }]}
          >
            <Text style={PageStyles.buttonText}>GUARDAR</Text>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default Price;

const styles = StyleSheet.create({
  checkboxText: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.maastrichtBlue,
    textDecorationLine: "none"
  },
  innerIcon: {
    borderWidth: 1,
    borderColor: Colors.silverSand
  },
  input: {
    marginBottom: 0,
    borderRadius: 25,
    paddingVertical: 5,
    width: "70%"
  }
});
