import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import { useAuthContext } from "@/src/context/Auth";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import ButtonDayPicker from "@/src/components/button-day-picker";
import HourRangeItemPrice from "@/src/components/hour-range-item-price";
import Input from "@/src/components/input";
import {
  fetchFieldDays,
  fetchFieldPrices,
  saveFieldPrices,
} from "@/src/models/Field";
import { SavePrice, HourRange } from "@/src/utils/Types";

const Price = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const [days, setDays] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [hourPerDayList, setHourPerDayList] = useState<HourRange[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [same, setSame] = useState<boolean>(true);

  const [priceHour, setPriceHour] = useState("");
  const [priceHalfHour, setPriceHalfHour] = useState("");
  const INIT_PRICE_RAGUE = { whole: 0, half: 0 };

  const selectDay = (day: number) => setActiveDay(day);

  const loadFieldDays = async () => {
    const response = await fetchFieldDays(
      params.id as unknown as number,
      token
    );
    if (response.status) setDays(response.data);
  };

  const loadFieldPrices = async () => {
    const response = await fetchFieldPrices(
      params.id as unknown as number,
      token
    );

    if (response.status) {
      const filled = fillPriceObject(response.data);
      setHourPerDayList(filled);
    }
  };

  const updatePriceOnDays = (
    type: "whole" | "half",
    value: string,
    index: number,
    day: number
  ) => {
    let priceList = { ...hourPerDayList };
    priceList[day][index].price
        ? (priceList[day][index].price[type] = value)
        : (priceList[day][index].price = { [type]: value });
    setHourPerDayList(priceList);
  };

  const fillPriceObject = (range: HourRange[][]) => {
    let priceList = range;

    for (let i = 0; i < 7; i++) {
      range[i].forEach((_, index) => {
        priceList[i][index].price = INIT_PRICE_RAGUE;
      });
    }

    return priceList;
  };

  const nextStep = async () => {
    const filtered: Array<SavePrice> = [];

    for (let i = 0; i < 7; i++) {
      hourPerDayList[i].forEach((dayEle) => {
        const dayPrice = same
          ? {
              field_hour_id: dayEle.id as number,
              half: priceHalfHour,
              whole: priceHour,
            }
          : { ...dayEle.price, field_hour_id: dayEle.id as number };
        filtered.push(dayPrice);
      });
    }

    const response = await saveFieldPrices(
      params.id as unknown as number,
      token,
      filtered,
    );
    if (response.status) router.replace("/fields");
  };

  useEffect(() => {
    loadFieldDays();
    loadFieldPrices();
  }, []);

  return (
    <ChildPage>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerLeft: () => <></>,
        }}
      />
      <Text style={LayoutStyles.pageTitle}>PRECIO DE RESERVA</Text>
      <Text style={[LayoutStyles.subtitle, { marginBottom: 30 }]}>
        ¿Tienen un precio único de reserva por hora?
      </Text>

      <View
        style={{
          flexDirection: "column",
          gap: 10,
          marginBottom: 30,
          width: "90%",
        }}
      >
        <BouncyCheckbox
          isChecked={same}
          size={25}
          fillColor={Colors.greenLizard}
          unFillColor={Colors.white}
          text="Si, tiene precio único."
          iconStyle={{ borderColor: Colors.white, borderWidth: 6 }}
          innerIconStyle={styles.innerIcon}
          textStyle={styles.checkboxText}
          iconComponent={<View></View>}
          onPress={(isChecked: boolean) => {
            setSame(true);
          }}
        />
        <BouncyCheckbox
          isChecked={!same}
          size={25}
          fillColor={Colors.greenLizard}
          unFillColor={Colors.white}
          text="No, tiene distinto precio."
          iconStyle={{ borderColor: Colors.white, borderWidth: 6 }}
          innerIconStyle={styles.innerIcon}
          textStyle={styles.checkboxText}
          iconComponent={<View></View>}
          onPress={(isChecked: boolean) => {
            setSame(false);
          }}
        />
      </View>

      {same ? (
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.checkboxText,
                  { marginLeft: 15, marginBottom: 5 },
                ]}
              >
                Precio Hora
              </Text>
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
              <Text
                style={[
                  styles.checkboxText,
                  { marginLeft: 15, marginBottom: 5 },
                ]}
              >
                Precio 1/2 Hora
              </Text>
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
              allowed={days[0]}
              value={0}
              text="Do"
              selected={activeDay}
              onSelect={selectDay}
            />
            <ButtonDayPicker
              allowed={days[1]}
              value={1}
              text="Lu"
              selected={activeDay}
              onSelect={selectDay}
            />
            <ButtonDayPicker
              allowed={days[2]}
              value={2}
              text="Ma"
              selected={activeDay}
              onSelect={selectDay}
            />
            <ButtonDayPicker
              allowed={days[3]}
              value={3}
              text="Mi"
              selected={activeDay}
              onSelect={selectDay}
            />
            <ButtonDayPicker
              allowed={days[4]}
              value={4}
              text="Ju"
              selected={activeDay}
              onSelect={selectDay}
            />
            <ButtonDayPicker
              allowed={days[5]}
              value={5}
              text="Vi"
              selected={activeDay}
              onSelect={selectDay}
            />
            <ButtonDayPicker
              allowed={days[6]}
              value={6}
              text="Sa"
              selected={activeDay}
              onSelect={selectDay}
            />
          </View>

          <View
            style={{
              borderWidth: 2,
              borderColor: Colors.silverSand,
              borderRadius: 15,
              padding: 5,
            }}
          >
            {(() => {
            switch (activeDay) {
              case 0:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[0].map((hour, index) => (
                      <HourRangeItemPrice
                        key={`range-0-${index}`}
                        hour={hour}
                        price={hour.price}
                        index={index}
                        day={0}
                        updatePrice={updatePriceOnDays}
                      />
                    ))}
                  </View>
                );
              case 1:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[1].map((hour, index) => (
                      <HourRangeItemPrice
                        key={`range-1-${index}`}
                        hour={hour}
                        price={hour.price}
                        index={index}
                        day={1}
                        updatePrice={updatePriceOnDays}
                      />
                    ))}
                  </View>
                );

              case 2:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[2].map((hour, index) => (
                      <HourRangeItemPrice
                        key={`range-2-${index}`}
                        hour={hour}
                        price={hour.price}
                        index={index}
                        day={2}
                        updatePrice={updatePriceOnDays}
                      />
                    ))}
                  </View>
                );

              case 3:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[3].map((hour, index) => (
                      <HourRangeItemPrice
                        key={`range-3-${index}`}
                        hour={hour}
                        price={hour.price}
                        index={index}
                        day={3}
                        updatePrice={updatePriceOnDays}
                      />
                    ))}
                  </View>
                );

              case 4:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[4].map((hour, index) => (
                      <HourRangeItemPrice
                        key={`range-4-${index}`}
                        hour={hour}
                        price={hour.price}
                        index={index}
                        day={4}
                        updatePrice={updatePriceOnDays}
                      />
                    ))}
                  </View>
                );

              case 5:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[5].map((hour, index) => (
                      <HourRangeItemPrice
                        key={`range-5-${index}`}
                        hour={hour}
                        price={hour.price}
                        index={index}
                        day={5}
                        updatePrice={updatePriceOnDays}
                      />
                    ))}
                  </View>
                );

              case 6:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[6].map((hour, index) => (
                      <HourRangeItemPrice
                        key={`range-6-${index}`}
                        hour={hour}
                        price={hour.price}
                        index={index}
                        day={6}
                        updatePrice={updatePriceOnDays}
                      />
                    ))}
                  </View>
                );
              default:
                return null;
            }
          })()}
          </View>
        </View>
      )}

      <Pressable
        onPress={() => nextStep()}
        style={[PageStyles.button, { width: "80%", marginTop: 50 }]}
      >
        <Text style={PageStyles.buttonText}>GUARDAR</Text>
      </Pressable>
    </ChildPage>
  );
};

export default Price;

const styles = StyleSheet.create({
  checkboxText: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.maastrichtBlue,
    textDecorationLine: "none",
  },
  innerIcon: {
    borderWidth: 1,
    borderColor: Colors.silverSand,
  },
  input: {
    marginBottom: 0,
    borderRadius: 25,
    paddingVertical: 5,
    width: "100%",
  },
});
