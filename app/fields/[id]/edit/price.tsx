import { Text, View, Pressable } from "react-native"
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import { useAuthContext } from "@/src/context/Auth";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import ButtonDayPicker from "@/src/components/button-day-picker";
import HourRangeItemPrice from "@/src/components/hour-range-item-price";
import { fetchFieldDays, fetchFieldPrices, updateFieldPrices } from "@/src/models/Field";
import { HourDayRange, PriceRange } from "@/src/utils/Types";

const Price = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const [days, setDays] = useState({ "lu": false, "ma": false, "mi": false, "ju": false, "vi": false, "sa": false, "do": false });
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [hourPerDayList, setHourPerDayList] = useState<HourDayRange>({ "lu": [], "ma": [], "mi": [], "ju": [], "vi": [], "sa": [], "do": [] });

  const selectDay = (day: string) => {
    setActiveDay(day);
  };

  const loadFieldDays = async () => {
    const response = await fetchFieldDays(params.id as unknown as number, token);
    if (response.status) setDays(response.data);
  };

  const loadFieldPrices = async () => {
    const response = await fetchFieldPrices(params.id as unknown as number, token);
    if (response.status) setHourPerDayList(response.data);
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

  const save = async () => {
    const priceArray: PriceRange[] = [];
    const dayList = ["lu", "ma", "mi", "ju", "vi", "sa", "do"];

    dayList.forEach(day => {
      hourPerDayList[day].forEach(el => {
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

    const response = await updateFieldPrices(params.id as unknown as number, token, priceArray);
    if (response.status) router.back();
  };

  useEffect(() => {
    loadFieldDays();
    loadFieldPrices();
  }, []);

  return (
    <ChildPage style={{ marginBottom: 60 }}>
      <Text style={LayoutStyles.pageTitle}>PRECIO DE RESERVA</Text>
      <Text style={[LayoutStyles.subtitle, { marginBottom: 30 }]}>¿Cuáles son los precios por horario?</Text>

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

      <Pressable
        onPress={() => save()}
        style={[PageStyles.button, { width: "80%", marginTop: 50 }]}
      >
        <Text style={PageStyles.buttonText}>GUARDAR</Text>
      </Pressable>
    </ChildPage>
  )
};

export default Price;
