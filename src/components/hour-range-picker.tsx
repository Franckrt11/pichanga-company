import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "@/src/utils/Colors";
import { PageStyles } from "@/src/utils/Styles";
import { HOUR_LIST } from "@/src/utils/Constants";
import TrashIcon from "@/src/components/icons/trash-icon";
import ArrowDownIcon from "@/src/components/icons/arrowdown-icon";
import { HourRange } from "@/src/utils/Types";

const HourRangePicker = ({
  hour,
  index,
  day,
  updateFrom,
  updateTo,
  remove,
}: {
  hour: HourRange;
  index: number;
  day: number;
  updateFrom: (
    prop: "start" | "end",
    value: number,
    index: number,
    day: number
  ) => void;
  updateTo: (
    prop: "start" | "end",
    value: number,
    index: number,
    day: number
  ) => void;
  remove: (index: number, day: number) => void;
}) => {
  const [selectedStart, setSelectedStart] = useState<number>(
    HOUR_LIST[0].value
  );
  const [selectedEnd, setSelectedEnd] = useState<number>(HOUR_LIST[2].value);

  useEffect(() => {
    setSelectedStart(hour.start);
    setSelectedEnd(hour.end);
  }, [hour]);

  return (
    <View style={{ flexDirection: "row", gap: 15 }}>
      <View style={{ flex: 1 }}>
        <Text
          style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}
        >
          Desde las
        </Text>
        <Dropdown
          style={[PageStyles.dropdown, styles.dropdown]}
          data={HOUR_LIST}
          labelField="text"
          valueField="value"
          placeholder=" "
          placeholderStyle={[
            PageStyles.dropdownPlaceholder,
            { paddingHorizontal: 10, fontSize: 12 },
          ]}
          onChange={(item) => {
            updateFrom("start", item.value, index, day);
            setSelectedStart(item.value);
          }}
          value={HOUR_LIST.find((obj) => obj.value === selectedStart)}
          // selectedTextStyle={styles.dropdownSelectectText}
          renderRightIcon={() => (
            <ArrowDownIcon size={10} style={{ marginRight: 10 }} />
          )}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}
        >
          Hasta las
        </Text>
        <Dropdown
          style={[PageStyles.dropdown, styles.dropdown]}
          data={HOUR_LIST}
          labelField="text"
          valueField="value"
          placeholder=""
          placeholderStyle={[
            PageStyles.dropdownPlaceholder,
            { paddingHorizontal: 10, fontSize: 12 },
          ]}
          onChange={(item) => {
            updateTo("end", item.value, index, day);
            setSelectedEnd(item.value);
          }}
          value={HOUR_LIST.find((obj) => obj.value === selectedEnd)}
          // selectedTextStyle={styles.dropdownSelectectText}
          renderRightIcon={() => (
            <ArrowDownIcon size={10} style={{ marginRight: 10 }} />
          )}
        />
      </View>
      <View>
        <Pressable style={{ marginTop: 40 }} onPress={() => remove(index, day)}>
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
    textDecorationLine: "none",
  },
  dropdown: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 0,
    marginBottom: 20,
    borderRadius: 25
  },
  dropdownSelectectText: {
    paddingHorizontal: 15,
    fontFamily: "PoppinsMedium",
    fontSize: 14,
  },
});
