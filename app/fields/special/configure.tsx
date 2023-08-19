import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/Entypo";
import { HOUR_LIST } from "@/src/utils/Constants";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import PlusIcon from "@/src/components/icons/plus-icon";

const Configure = () => {
  const [add, setAdd] = useState(true);
  const [retire, setRetire] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [fromHour, setFromHour] = useState(false);
  const [toHour, setToHour] = useState(false);

  const [field, setField] = useState(false);
  const [reason, setReason] = useState("");

  const FIELD_LIST = [
    {
      id: 1,
      name: "Cancha 1",
    },
    {
      id: 2,
      name: "Cancha Nueva",
    },
    {
      id: 3,
      name: "Cancha 3",
    },
    {
      id: 4,
      name: "Cancha Verde",
    },
  ];

  const save = () => {
    console.log("Save Special Hour");
    router.back();
  };

  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>CONFIGURAR HORARIO ESPECIAL</Text>

      <View style={{ flexDirection: "row", marginBottom: 30 }}>
        <View style={{ flex:1, alignItems: "center" }}>
          <BouncyCheckbox
            isChecked={add}
            size={25}
            fillColor={Colors.greenLizard}
            unfillColor={Colors.white}
            text="Agregar"
            iconStyle={{ borderColor: Colors.white, borderWidth: 6 }}
            innerIconStyle={styles.innerIcon}
            textStyle={styles.checkboxText}
            iconComponent={<View></View>}
            disableBuiltInState
            onPress={(isChecked: boolean) => {
              setAdd(true);
              setRetire(false);
            }}
          />
        </View>
        <View style={{ flex:1, alignItems: "center" }}>
          <BouncyCheckbox
            isChecked={retire}
            size={25}
            fillColor={Colors.greenLizard}
            unfillColor={Colors.white}
            text="Retirar"
            iconStyle={{ borderColor: Colors.white, borderWidth: 6 }}
            innerIconStyle={styles.innerIcon}
            textStyle={styles.checkboxText}
            iconComponent={<View></View>}
            disableBuiltInState
            onPress={(isChecked: boolean) => {
              setRetire(true);
              setAdd(false);
            }}
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 30 }}>
        <View>
          <Text style={styles.checkboxText}>Fecha de horario</Text>
        </View>
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={(event, selectedDate) => selectedDate ? setDate(selectedDate) : false}
          />
        </View>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 30, gap: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.checkboxText, { marginBottom: 5 }]}>Desde las</Text>
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
          <Text style={[styles.checkboxText, { marginBottom: 5 }]}>Hasta las</Text>
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
        <View>
          <Icon name="cross" size={30} color={Colors.maastrichtBlue} style={{ marginTop: 30 }} />
        </View>
      </View>

      <Pressable
        onPress={() => router.push("/fields/special/configure")}
        style={[PageStyles.button, styles.button, { marginBottom: 40 }]}
      >
        <PlusIcon size={14} />
        <Text style={PageStyles.buttonText}>Agregar rango adicional</Text>
      </Pressable>

      <View style={{ marginBottom: 50 }}>
        <View style={{ marginBottom: 10 }}>
          <Text style={[styles.checkboxText, { marginBottom: 5, fontSize: 20 }]}>Seleccionar cancha</Text>
          <Picker
            style={[PageStyles.picker, { fontSize: 16 }]}
            selectedValue={field}
            onValueChange={(value, itemIndex) => setField(value)}
          >
          {FIELD_LIST.map((field, index) => (
            <Picker.Item fontFamily="PoppinsMedium" key={index} label={field.name} value={field.id} />
          ))}
          </Picker>
        </View>
        <View>
          <Text style={[styles.checkboxText, { marginBottom: 5, fontSize: 20 }]}>Motivo</Text>
          <TextInput
            style={styles.inputArea}
            editable
            multiline
            numberOfLines={5}
            onChangeText={text => setReason(text)}
            value={reason}
            placeholder="Escribe un motivo"
          />
        </View>
      </View>

      <Pressable
        onPress={() => save()}
        style={[PageStyles.button, { width: "80%", marginHorizontal: "auto" }]}
      >
        <Text style={PageStyles.buttonText}>SIGUIENTE</Text>
      </Pressable>
    </ChildPage>
  )
};

export default Configure;

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
  button: {
    flexDirection: "row",
    gap: 10,
    width: "65%",
    marginHorizontal: "auto",
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 25,
    justifyContent: "center"
  },
  inputArea: {
    color: Colors.maastrichtBlue,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    borderRadius: 10,
    fontFamily: "PoppinsMedium",
    marginBottom: 5,
    fontSize: 20
  },
});
