import { StyleSheet, Text, View, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from "@/src/utils/Colors";
import { PageStyles } from "@/src/utils/Styles";
import { HOUR_LIST } from "@/src/utils/Constants";
import TrashIcon from "@/src/components/icons/trash-icon";
import { HourRange } from "@/src/utils/Types";

const HourRangePicker = ({
  hour,
  index,
  updateFrom,
  updateTo,
  remove
}: {
  hour: HourRange,
  index: number,
  updateFrom: (prop: "from" | "to", value: string, index: number) => void,
  updateTo: (prop: "from" | "to", value: string, index: number) => void,
  remove: (index: number) => void,
}) => {
  return (
    <View style={{ flexDirection: "row", gap: 15 }}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}>Desde las</Text>
        <View style={[PageStyles.pickerContainer, { borderRadius: 50, height: 45 }]}>
          <Picker
            style={[PageStyles.picker, { marginTop: -7 }]}
            selectedValue={hour.from}
            onValueChange={(value, itemIndex) => updateFrom("from", value, index)}
          >
            {HOUR_LIST.map((hour, index) => (
              <Picker.Item fontFamily="PoppinsMedium" key={index} label={hour.text} value={hour.value} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}>Hasta las</Text>
        <View style={[PageStyles.pickerContainer, { borderRadius: 50, height: 45 }]}>
          <Picker
            style={[PageStyles.picker, { marginTop: -7 }]}
            selectedValue={hour.to}
            onValueChange={(value, itemIndex) => updateTo("to", value, index)}
          >
            {HOUR_LIST.map((hour, index) => (
              <Picker.Item fontFamily="PoppinsMedium" key={index} label={hour.text} value={hour.value} />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        <Pressable
          style={{ marginTop: 40 }}
          onPress={() => remove(index)}
        >
          <TrashIcon size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default HourRangePicker;

const styles = StyleSheet.create({
  checkboxText: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.maastrichtBlue,
    textDecorationLine: "none"
  }
});
