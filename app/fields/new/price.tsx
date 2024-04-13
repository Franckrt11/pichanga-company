import { StyleSheet, Text, View, Pressable } from "react-native"
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import { useAuthContext } from "@/src/context/Auth";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import ButtonDayPicker from "@/src/components/button-day-picker";
import HourRangeItemPrice from "@/src/components/hour-range-item-price";
import Input from "@/src/components/input";
import { fetchFieldDays, fetchFieldPrices, saveFieldPrices } from "@/src/models/Field";
import { HourDayRange, PriceRange, SavePrice } from "@/src/utils/Types";

const Price = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const [days, setDays] = useState({ "lu": false, "ma": false, "mi": false, "ju": false, "vi": false, "sa": false, "do": false });
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [hourPerDayList, setHourPerDayList] = useState<HourDayRange>({ "lu": [], "ma": [], "mi": [], "ju": [], "vi": [], "sa": [], "do": [] });
  const [same, setSame] = useState<boolean>(true);

  const dayList = ["lu", "ma", "mi", "ju", "vi", "sa", "do"];

  const [priceHour, setPriceHour] = useState("");
  const [priceHalfHour, setPriceHalfHour] = useState("");

  const nextStep = async () => {
    const filtered: Array<SavePrice>  = [];

    dayList.forEach((day) => {
      hourPerDayList[day].forEach((dayEle) => {
        const dayPrice = same
          ? {
              field_hour_id: dayEle.id as number,
              half: priceHalfHour,
              whole: priceHour,
            }
          : { ...dayEle.price, field_hour_id: dayEle.id as number };
        filtered.push(dayPrice);
      });
    });

    const response = await saveFieldPrices(params.id as unknown as number, token, filtered);
    if (response.status) router.replace("/fields");
  };

  const selectDay = (day: string) => {
    setActiveDay(day);
  };

  const loadFieldDays = async () => {
    const response = await fetchFieldDays(params.id as unknown as number, token);
    if (response.status) setDays(response.data);
  };

  const fillPriceObject = (range:HourDayRange) => {
    const priceRange = { whole: 0, half: 0 };

    let priceList = { ...range };

    dayList.forEach(day => {
      range[day].forEach((dayEle, index) => {
        priceList[day][index].price = priceRange;
      });
    });

    return priceList;
  };

  const loadFieldPrices = async () => {
    const response = await fetchFieldPrices(params.id as unknown as number, token);

    if (response.status) {
      const filled = fillPriceObject(response.data);
      setHourPerDayList(filled);
    }
  };

  const updatePriceOnDays = {
    lu: function updateRangePrice(value: string, type: "whole" | "half", index: number) {
      let priceList = { ...hourPerDayList };
      priceList["lu"][index].price ?
        priceList["lu"][index].price[type] = value :
        priceList["lu"][index].price = { [type]: value };
      setHourPerDayList(priceList);
    },
    ma: function updateRangePrice(value: string, type: "whole" | "half", index: number) {
      let priceList = { ...hourPerDayList };
      priceList["ma"][index].price ?
        priceList["ma"][index].price[type] = value :
        priceList["ma"][index].price = { [type]: value };
      setHourPerDayList(priceList);
    },
    mi: function updateRangePrice(value: string, type: "whole" | "half", index: number) {
      let priceList = { ...hourPerDayList };
      priceList["mi"][index].price ?
        priceList["mi"][index].price[type] = value :
        priceList["mi"][index].price = { [type]: value };
      setHourPerDayList(priceList);
    },
    ju: function updateRangePrice(value: string, type: "whole" | "half", index: number) {
      let priceList = { ...hourPerDayList };
      priceList["ju"][index].price ?
        priceList["ju"][index].price[type] = value :
        priceList["ju"][index].price = { [type]: value };
      setHourPerDayList(priceList);
    },
    vi: function updateRangePrice(value: string, type: "whole" | "half", index: number) {
      let priceList = { ...hourPerDayList };
      priceList["vi"][index].price ?
        priceList["vi"][index].price[type] = value :
        priceList["vi"][index].price = { [type]: value };
      setHourPerDayList(priceList);
    },
    sa: function updateRangePrice(value: string, type: "whole" | "half", index: number) {
      let priceList = { ...hourPerDayList };
      priceList["sa"][index].price ?
        priceList["sa"][index].price[type] = value :
        priceList["sa"][index].price = { [type]: value };
      setHourPerDayList(priceList);
    },
    do: function updateRangePrice(value: string, type: "whole" | "half", index: number) {
      let priceList = { ...hourPerDayList };
      priceList["do"][index].price ?
        priceList["do"][index].price[type] = value :
        priceList["do"][index].price = { [type]: value };
      setHourPerDayList(priceList);
    }
  };

  useEffect(() => {
    // console.log('🎄 ~ datos price', {params, token})
    loadFieldDays();
    loadFieldPrices();
  }, []);

  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>PRECIO DE RESERVA</Text>
      <Text style={[LayoutStyles.subtitle, { marginBottom: 30 }]}>¿Tienen un precio único de reserva por hora?</Text>

      <View style={{ flexDirection: "column", gap: 10, marginBottom: 30, width: "90%" }}>
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
          }}
        />
        <BouncyCheckbox
          isChecked={!same}
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
            setSame(false);
          }}
        />
      </View>

      {same ? (
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.checkboxText, { marginLeft: 15, marginBottom: 5 }]}>Precio Hora</Text>
              <Input
                  placeholder=""
                  value={priceHour}
                  onChangeText={(text: string) => {
                    setPriceHour(text);
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
                  }}
                  styles={[PageStyles.input, styles.input]}
                  theme="light"
                  keyboard="numeric"
                />
            </View>
          </View>
        </View>
      ) : (
        <View style={{ width: "100%" }}>
          <View style={{ flexDirection: "row", gap: 6, marginBottom: 15 }}>
            <ButtonDayPicker
              allowed={days['lu']}
              value="lu"
              text="Lu"
              selected={activeDay}
              onSelect={selectDay}
            />
            <ButtonDayPicker
              allowed={days['ma']}
              value="ma"
              text="Ma"
              selected={activeDay}
              onSelect={selectDay}
            />
            <ButtonDayPicker
              allowed={days['mi']}
              value="mi"
              text="Mi"
              selected={activeDay}
              onSelect={selectDay}
            />
            <ButtonDayPicker
              allowed={days['ju']}
              value="ju"
              text="Ju"
              selected={activeDay}
              onSelect={selectDay}
            />
            <ButtonDayPicker
              allowed={days['vi']}
              value="vi"
              text="Vi"
              selected={activeDay}
              onSelect={selectDay}
            />
            <ButtonDayPicker
              allowed={days['sa']}
              value="sa"
              text="Sa"
              selected={activeDay}
              onSelect={selectDay}
            />
            <ButtonDayPicker
              allowed={days['do']}
              value="do"
              text="Do"
              selected={activeDay}
              onSelect={selectDay}
            />
          </View>

          <View style={{ borderWidth: 2, borderColor: Colors.silverSand, borderRadius: 15, padding: 5 }}>
            {(() => {
              switch (activeDay) {
                case "lu":
                  return (
                    <View style={{ alignItems: "center" }}>
                      {hourPerDayList["lu"].map((hour, index) => (
                        <HourRangeItemPrice
                          key={`lu-${index}`}
                          hour={hour}
                          price={hour.price}
                          index={index}
                          updatePrice={updatePriceOnDays.lu}
                        />
                      ))}
                    </View>
                  );
                case "ma":
                  return (
                    <View style={{ alignItems: "center" }}>
                      {hourPerDayList["ma"].map((hour, index) => (
                        <HourRangeItemPrice
                          key={`ma-${index}`}
                          hour={hour}
                          price={hour.price}
                          index={index}
                          updatePrice={updatePriceOnDays.ma}
                        />
                      ))}
                    </View>
                  );

                case "mi":
                  return (
                    <View style={{ alignItems: "center" }}>
                      {hourPerDayList["mi"].map((hour, index) => (
                        <HourRangeItemPrice
                          key={`mi-${index}`}
                          hour={hour}
                          price={hour.price}
                          index={index}
                          updatePrice={updatePriceOnDays.mi}
                        />
                      ))}
                    </View>
                  );

                case "ju":
                  return (
                    <View style={{ alignItems: "center" }}>
                      {hourPerDayList["ju"].map((hour, index) => (
                        <HourRangeItemPrice
                          key={`ju-${index}`}
                          hour={hour}
                          price={hour.price}
                          index={index}
                          updatePrice={updatePriceOnDays.ju}
                        />
                      ))}
                    </View>
                  );

                case "vi":
                  return (
                    <View style={{ alignItems: "center" }}>
                      {hourPerDayList["vi"].map((hour, index) => (
                        <HourRangeItemPrice
                          key={`vi-${index}`}
                          hour={hour}
                          price={hour.price}
                          index={index}
                          updatePrice={updatePriceOnDays.vi}
                        />
                      ))}
                    </View>
                  );

                case "sa":
                  return (
                    <View style={{ alignItems: "center" }}>
                      {hourPerDayList["sa"].map((hour, index) => (
                        <HourRangeItemPrice
                          key={`sa-${index}`}
                          hour={hour}
                          price={hour.price}
                          index={index}
                          updatePrice={updatePriceOnDays.sa}
                        />
                      ))}
                    </View>
                  );

                case "do":
                  return (
                    <View style={{ alignItems: "center" }}>
                      {hourPerDayList["do"].map((hour, index) => (
                        <HourRangeItemPrice
                          key={`do-${index}`}
                          hour={hour}
                          price={hour.price}
                          index={index}
                          updatePrice={updatePriceOnDays.do}
                        />
                      ))}
                    </View>
                  );
                default:
                  return null
              }
            })()}
          </View>
        </View>
      )}

      <Pressable
        onPress={() => nextStep()}
        style={[PageStyles.button, { width: "80%",  marginTop: 50 }]}
      >
        <Text style={PageStyles.buttonText}>GUARDAR</Text>
      </Pressable>
    </ChildPage>
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
    width: "100%"
  }
});
