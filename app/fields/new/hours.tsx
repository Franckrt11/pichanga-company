import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from '@react-native-picker/picker';
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import { HOUR_LIST } from "@/src/utils/Constants";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";

const Hours = () => {
  const [same, setSame] = useState(true);
  const [notsame, setNotSame] = useState(false);

  const [fromHour, setFromHour] = useState(false);
  const [toHour, setToHour] = useState(false);

  const nextStep = () => {
    router.push("/fields/new/price");
  };

  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>HORARIOS</Text>
        <Text style={[LayoutStyles.subtitle, { marginBottom: 30 }]}>¿Todos los días atiende en el mismo horario?</Text>

        <View style={{flexDirection: "column", gap: 10, marginBottom: 30 }}>
          <BouncyCheckbox
            isChecked={same}
            size={25}
            fillColor={Colors.greenLizard}
            unfillColor={Colors.white}
            text="Si, tiene el mismo horario."
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
            text="No, tiene distintos horarios."
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

        <View style={{ flexDirection: "row", gap: 15, marginBottom: 50 }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}>Desde las</Text>
            <Picker
              style={[PageStyles.picker, { borderRadius: 25, paddingHorizontal: 25 }]}
              selectedValue={fromHour}
              onValueChange={(value, itemIndex) => setFromHour(value)}
            >
            {HOUR_LIST.map((hour, index) => (
              <Picker.Item fontFamily="PoppinsMedium" key={index} label={hour.text} value={hour.value} />
            ))}
            </Picker>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}>Hasta las</Text>
            <Picker
              style={[PageStyles.picker, { borderRadius: 25, paddingHorizontal: 25 }]}
              selectedValue={toHour}
              onValueChange={(value, itemIndex) => setToHour(value)}
            >
            {HOUR_LIST.map((hour, index) => (
              <Picker.Item fontFamily="PoppinsMedium" key={index} label={hour.text} value={hour.value} />
            ))}
            </Picker>
          </View>
        </View>

        <Pressable
          onPress={() => nextStep()}
          style={[PageStyles.button, { width: "80%", marginHorizontal: "auto" }]}
        >
          <Text style={PageStyles.buttonText}>SIGUIENTE</Text>
        </Pressable>
    </ChildPage>
  )
};

export default Hours;

const styles = StyleSheet.create({
  checkboxText: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.maastrichtBlue,
    textDecorationLine: "none"
  },
  innerIcon: {
    borderWidth: 1,
    borderColor: Colors.silverSand
  }
});
