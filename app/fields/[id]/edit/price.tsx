import { Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import { useAuthContext } from "@/src/context/Auth";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import ButtonDayPicker from "@/src/components/button-day-picker";
import HourRangeItemPrice from "@/src/components/hour-range-item-price";
import {
  fetchFieldDays,
  fetchFieldPrices,
  updateFieldPrices,
} from "@/src/models/Field";
import { HourRange, PriceRange } from "@/src/utils/Types";

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
    if (response.status) setHourPerDayList(response.data);
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

  const save = async () => {
    const priceArray: PriceRange[] = [];
    const dayList = [0, 1, 2, 3, 4, 5, 6];

    dayList.forEach((day) => {
      hourPerDayList[day].forEach((el) => {
        if (el.price) {
          if (el.price.id) {
            priceArray.push(el.price);
          } else {
            let price_object = { ...el.price, field_hour_id: el.id };
            priceArray.push(price_object);
          }
        }
      });
    });

    const response = await updateFieldPrices(
      params.id as unknown as number,
      token,
      priceArray
    );
    if (response.status) router.back();
  };

  useEffect(() => {
    loadFieldDays();
    loadFieldPrices();
  }, []);

  return (
    <ChildPage style={{ marginBottom: 60 }}>
      <Text style={LayoutStyles.pageTitle}>PRECIO DE RESERVA</Text>
      <Text style={[LayoutStyles.subtitle, { marginBottom: 30 }]}>
        ¿Cuáles son los precios por horario?
      </Text>

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

      <Pressable
        onPress={() => save()}
        style={[PageStyles.button, { width: "80%", marginTop: 50 }]}
      >
        <Text style={PageStyles.buttonText}>GUARDAR</Text>
      </Pressable>
    </ChildPage>
  );
};

export default Price;
