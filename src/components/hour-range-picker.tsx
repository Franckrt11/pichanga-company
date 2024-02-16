import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
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
  updateFrom: (prop: "start" | "end", value: string, index: number) => void,
  updateTo: (prop: "start" | "end", value: string, index: number) => void,
  remove: (index: number) => void,
}) => {
  const [selectedStart, setSelectedStart] = useState<string>(HOUR_LIST[0].value);
  const [selectedEnd, setSelectedEnd] = useState<string>(HOUR_LIST[2].value);

  useEffect(() => {
    setSelectedStart(hour.start);
    setSelectedEnd(hour.end);
  }, [hour]);

  return (
    <View style={{ flexDirection: "row", gap: 15 }}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}>Desde las</Text>
        <Text>{selectedStart}</Text>
        <View style={[PageStyles.pickerContainer, { borderRadius: 50, height: 45 }]}>
          <Picker
            style={[PageStyles.picker, { marginTop: -7 }]}
            selectedValue={selectedStart}
            onValueChange={(value, itemIndex) => {
              updateFrom("start", value, index);
              setSelectedStart(value);
            }}
          >
            {HOUR_LIST.map((h, i) => (
              <Picker.Item fontFamily="PoppinsMedium" key={i} label={h.text} value={h.value} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}>Hasta las</Text>
        <Text>{selectedEnd}</Text>
        <View style={[PageStyles.pickerContainer, { borderRadius: 50, height: 45 }]}>
          <Picker
            style={[PageStyles.picker, { marginTop: -7 }]}
            selectedValue={selectedEnd}
            onValueChange={(value, itemIndex) => {
              updateTo("end", value, index);
              setSelectedEnd(value);
            }}
          >
            {HOUR_LIST.map((h, i) => (
              <Picker.Item fontFamily="PoppinsMedium" key={i} label={h.text} value={h.value} />
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
