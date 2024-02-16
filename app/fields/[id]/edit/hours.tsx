import { StyleSheet, Text, View, Pressable } from "react-native"
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import ButtonDayPicker from "@/src/components/button-day-picker";
import AddHourButtom from "@/src/components/add-hour-bottom";
import HourRangePicker from "@/src/components/hour-range-picker";
import { useAuthContext } from "@/src/context/Auth";
import { fetchFieldDays, fetchFieldHours, updateFieldHours } from "@/src/models/Field";
import { HourDayRange } from "@/src/utils/Types";

const INIT_HOUR_RANGE = { start: "5:00", end: "6:00" };

const Hours = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const [days, setDays] = useState({ "lu": false, "ma": false, "mi": false, "ju": false, "vi": false, "sa": false, "do": false });
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [hourPerDayList, setHourPerDayList] = useState<HourDayRange>({ "lu": [], "ma": [], "mi": [], "ju": [], "vi": [], "sa": [], "do": [] });

  const save = async () => {
    const response = await updateFieldHours(params.id as unknown as number, token, hourPerDayList);
    if (response.status) router.back();
  };

  const loadFieldDays = async () => {
    const response = await fetchFieldDays(params.id as unknown as number, token);
    if (response.status) setDays(response.data);
  };

  const loadFieldHours = async () => {
    const response = await fetchFieldHours(params.id as unknown as number, token);
    if (response.status) setHourPerDayList(response.data);
  };

  const selectDay = (day: string) => {
    setActiveDay(day);
  };

  const addHoursToDayList = (day: string, hours: Object) => {
    let dayList = { ...hourPerDayList };
    let count = dayList[day as keyof typeof dayList].length;
    (dayList[day as keyof typeof dayList] as Array<Object>).push({...hours, position: count + 1 });
    setHourPerDayList(dayList);
  };

  const updateHourOnDays = {
    lu: function updateHourDate(prop: "start" | "end", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["lu"][index][prop] = value;
      setHourPerDayList(dayList);
    },
    ma: function updateHourDate(prop: "start" | "end", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["ma"][index][prop] = value;
      setHourPerDayList(dayList);
    },
    mi: function updateHourDate(prop: "start" | "end", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["mi"][index][prop] = value;
      setHourPerDayList(dayList);
    },
    ju: function updateHourDate(prop: "start" | "end", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["ju"][index][prop] = value;
      setHourPerDayList(dayList);
    },
    vi: function updateHourDate(prop: "start" | "end", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["vi"][index][prop] = value;
      setHourPerDayList(dayList);
    },
    sa: function updateHourDate(prop: "start" | "end", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["sa"][index][prop] = value;
      setHourPerDayList(dayList);
    },
    do: function updateHourDate(prop: "start" | "end", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["do"][index][prop] = value;
      setHourPerDayList(dayList);
    }
  };

  const removeourOnDays = {
    lu: function removeHourDate(index: number) {
      let newList = { ...hourPerDayList };
      newList["lu"].splice(index, 1);
      setHourPerDayList(newList);
    },
    ma: function removeHourDate(index: number) {
      let newList = { ...hourPerDayList };
      newList["ma"].splice(index, 1);
      setHourPerDayList(newList);
    },
    mi: function removeHourDate(index: number) {
      let newList = { ...hourPerDayList };
      newList["mi"].splice(index, 1);
      setHourPerDayList(newList);
    },
    ju: function removeHourDate(index: number) {
      let newList = { ...hourPerDayList };
      newList["ju"].splice(index, 1);
      setHourPerDayList(newList);
    },
    vi: function removeHourDate(index: number) {
      let newList = { ...hourPerDayList };
      newList["vi"].splice(index, 1);
      setHourPerDayList(newList);
    },
    sa: function removeHourDate(index: number) {
      let newList = { ...hourPerDayList };
      newList["sa"].splice(index, 1);
      setHourPerDayList(newList);
    },
    do: function removeHourDate(index: number) {
      let newList = { ...hourPerDayList };
      newList["do"].splice(index, 1);
      setHourPerDayList(newList);
    }
  };

  useEffect(() => {
    loadFieldDays();
    loadFieldHours();
  }, []);

  return (
    <ChildPage style={{ marginBottom: 60 }}>
      <Text style={LayoutStyles.pageTitle}>HORARIOS</Text>
      <Text style={[LayoutStyles.subtitle, { marginBottom: 20 }]}>¿En qué horarios atiende la cancha?</Text>

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
                      <HourRangePicker
                        key={index}
                        hour={hour}
                        index={index}
                        updateFrom={updateHourOnDays.lu}
                        updateTo={updateHourOnDays.lu}
                        remove={removeourOnDays.lu}
                      />
                      // <Text style={{color: "black"}} key={index}>{hour.from} - {hour.to}</Text>
                    ))}
                    <AddHourButtom onPress={() => addHoursToDayList("lu", INIT_HOUR_RANGE)} />
                  </View>
                );
              case "ma":
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList["ma"].map((hour, index) => (
                      <HourRangePicker
                        key={index}
                        hour={hour}
                        index={index}
                        updateFrom={updateHourOnDays.ma}
                        updateTo={updateHourOnDays.ma}
                        remove={removeourOnDays.ma}
                      />
                    ))}
                    <AddHourButtom onPress={() => addHoursToDayList("ma", INIT_HOUR_RANGE)} />
                  </View>
                );

              case "mi":
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList["mi"].map((hour, index) => (
                      <HourRangePicker
                        key={index}
                        hour={hour}
                        index={index}
                        updateFrom={updateHourOnDays.mi}
                        updateTo={updateHourOnDays.mi}
                        remove={removeourOnDays.mi}
                      />
                    ))}
                    <AddHourButtom onPress={() => addHoursToDayList("mi", INIT_HOUR_RANGE)} />
                  </View>
                );

              case "ju":
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList["ju"].map((hour, index) => (
                      <HourRangePicker
                        key={index}
                        hour={hour}
                        index={index}
                        updateFrom={updateHourOnDays.ju}
                        updateTo={updateHourOnDays.ju}
                        remove={removeourOnDays.ju}
                      />
                    ))}
                    <AddHourButtom onPress={() => addHoursToDayList("ju", INIT_HOUR_RANGE)} />
                  </View>
                );

              case "vi":
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList["vi"].map((hour, index) => (
                      <HourRangePicker
                        key={index}
                        hour={hour}
                        index={index}
                        updateFrom={updateHourOnDays.vi}
                        updateTo={updateHourOnDays.vi}
                        remove={removeourOnDays.vi}
                      />
                    ))}
                    <AddHourButtom onPress={() => addHoursToDayList("vi", INIT_HOUR_RANGE)} />
                  </View>
                );

              case "sa":
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList["sa"].map((hour, index) => (
                      <HourRangePicker
                        key={index}
                        hour={hour}
                        index={index}
                        updateFrom={updateHourOnDays.sa}
                        updateTo={updateHourOnDays.sa}
                        remove={removeourOnDays.sa}
                      />
                    ))}
                    <AddHourButtom onPress={() => addHoursToDayList("sa", INIT_HOUR_RANGE)} />
                  </View>
                );

              case "do":
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList["do"].map((hour, index) => (
                      <HourRangePicker
                        key={index}
                        hour={hour}
                        index={index}
                        updateFrom={updateHourOnDays.do}
                        updateTo={updateHourOnDays.do}
                        remove={removeourOnDays.do}
                      />
                    ))}
                    <AddHourButtom onPress={() => addHoursToDayList("do", INIT_HOUR_RANGE)} />
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

export default Hours;
