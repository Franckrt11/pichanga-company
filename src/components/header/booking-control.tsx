import { View, Pressable, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Colors from "@/src/utils/Colors";
import CheckIcon from "@/src/components/icons/check-icon";
import CalendarIcon from "@/src/components/icons/calendar-icon";
import ColumnsIcon from "@/src/components/icons/columns-icon";
import RowsIcon from "@/src/components/icons/rows-icon";

const BookingControl = () => {
  const [chart, setChart] = useState<string>("rows");

  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 10, gap: 10 }}>
      <Pressable style={styles.button}>
        <CheckIcon size={20} />
      </Pressable>
      <Pressable style={styles.button}>
        <CalendarIcon size={20} color={Colors.maastrichtBlue} />
      </Pressable>
      <Pressable style={styles.button}>
      {chart === "rows" ? (
        <RowsIcon size={20} />
      ) : (
        <ColumnsIcon size={20} />
      )}
      </Pressable>
    </View>
  )
};

export default BookingControl;

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.silverSand,
    borderRadius: 10,
    borderWidth: 1,
    padding: 8
  },
});