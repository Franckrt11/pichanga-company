import { StyleSheet, Text, View, } from "react-native";
import { useState, useEffect } from "react";
import Colors from "@/src/utils/Colors";
import Input from "@/src/components/input";
import { PageStyles } from "@/src/utils/Styles";
import { HourRange, PriceRange } from "@/src/utils/Types";

const HourRangeItemPrice = ({
  hour,
  price,
  index,
  last,
  updatePrice
}: {
  hour: HourRange,
  price: PriceRange | null,
  index: number,
  last?: boolean,
  updatePrice: (value: string, type: "whole" | "half", index: number) => void,
}) => {
  const [priceHour, setPriceHour] = useState("");
  const [priceHalfHour, setPriceHalfHour] = useState("");

  useEffect(() => {
    setPriceHour(price?.whole ? price?.whole.toString() : "");
    setPriceHalfHour(price?.half ? price?.half.toString() : "");
  }, []);

  return (
    <View style={{ width: "100%" }}>
      <View style={{ flexDirection: "row", gap: 15, marginTop: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}>Desde las</Text>
          <View style={[PageStyles.pickerContainer, { borderRadius: 50, height: 45, justifyContent: "center", paddingLeft: 15 }]}>
            <Text>{hour.start}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}>Hasta las</Text>
          <View style={[PageStyles.pickerContainer, { borderRadius: 50, height: 45, justifyContent: "center", paddingLeft: 15 }]}>
            <Text>{hour.end}</Text>
          </View>
        </View>
      </View>
      <View style={[{ flexDirection: "row", gap: 15 }, styles.lastItem]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}>Precio Hora</Text>
          <Input
              placeholder=""
              value={priceHour}
              onChangeText={(text: string) => {
                setPriceHour(text);
                updatePrice(text, "whole", index);
              }}
              styles={[PageStyles.input, styles.input]}
              theme="light"
              keyboard="numeric"
            />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}>Precio 1/2 Hora</Text>
          <Input
              placeholder=""
              value={priceHalfHour}
              onChangeText={(text: string) => {
                setPriceHalfHour(text);
                updatePrice(text, "half", index);
              }}
              styles={[PageStyles.input, styles.input]}
              theme="light"
              keyboard="numeric"
            />
        </View>
      </View>
    </View>
  );
};

export default HourRangeItemPrice;

const styles = StyleSheet.create({
  checkboxText: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.maastrichtBlue,
    textDecorationLine: "none"
  },
  input: {
    marginBottom: 0,
    borderRadius: 25,
    paddingVertical: 5,
    width: "100%"
  },
  lastItem: {
    borderBottomWidth: 1,
    marginBottom: 25,
    paddingBottom: 15
  }
});
