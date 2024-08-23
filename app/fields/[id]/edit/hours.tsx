import { Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import ButtonDayPicker from "@/src/components/button-day-picker";
import AddHourButtom from "@/src/components/add-hour-bottom";
import HourRangePicker from "@/src/components/hour-range-picker";
import { useAuthContext } from "@/src/context/Auth";
import {
  fetchFieldDays,
  fetchFieldHours,
  updateFieldHours,
} from "@/src/models/Field";
import { HourRange, FieldDay } from "@/src/utils/Types";
import { INIT_FIELD_DAYS } from "@/src/utils/Constants";

const INIT_HOUR_RANGE = { start: 1, end: 2, position: 1 };

const Hours = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const [days, setDays] = useState<FieldDay[]>(INIT_FIELD_DAYS);
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

  const save = async () => {
    const response = await updateFieldHours(
      params.id as unknown as number,
      token,
      hourPerDayList
    );
    if (response.status) router.back();
  };

  const loadFieldDays = async () => {
    const response = await fetchFieldDays(
      params.id as unknown as number,
      token
    );
    if (response.status) {
      if (response.data.length > 0) {
        setDays(response.data);
      } else {
        setDays(INIT_FIELD_DAYS);
      }
    }
  };

  const loadFieldHours = async () => {
    const response = await fetchFieldHours(
      params.id as unknown as number,
      token
    );
    if (response.status) setHourPerDayList(response.data);
  };

  const selectDay = (day: number) => setActiveDay(day);

  const addHoursToDayList = (day: number, hours: HourRange) => {
    let dayList = [...hourPerDayList];
    let count = dayList[day].length;
    dayList[day].push({...hours, position: count + 1 });
    setHourPerDayList(dayList);
  };

  const updateHourOnDays = (
    prop: "start" | "end",
    value: number,
    index: number,
    day: number
  ) => {
    let dayList = [...hourPerDayList];
    dayList[day][index][prop] = value;
    setHourPerDayList(dayList);
  };

  const removeHourOnDays = (index: number, day: number) => {
    let newList = [...hourPerDayList];
    newList[day].splice(index, 1);
    setHourPerDayList(newList);
  };

  useEffect(() => {
    loadFieldDays();
    loadFieldHours();
  }, []);

  return (
    <ChildPage style={{ marginBottom: 60 }}>
      <Text style={LayoutStyles.pageTitle}>HORARIOS</Text>
      <Text style={[LayoutStyles.subtitle, { marginBottom: 20 }]}>
        ¿En qué horarios atiende la cancha?
      </Text>

      <View style={{ width: "100%" }}>
        <View style={{ flexDirection: "row", gap: 6, marginBottom: 15 }}>
          <ButtonDayPicker
            allowed={days[0].active}
            value={0}
            text="Do"
            selected={activeDay}
            onSelect={selectDay}
          />
          <ButtonDayPicker
            allowed={days[1].active}
            value={1}
            text="Lu"
            selected={activeDay}
            onSelect={selectDay}
          />
          <ButtonDayPicker
            allowed={days[2].active}
            value={2}
            text="Ma"
            selected={activeDay}
            onSelect={selectDay}
          />
          <ButtonDayPicker
            allowed={days[3].active}
            value={3}
            text="Mi"
            selected={activeDay}
            onSelect={selectDay}
          />
          <ButtonDayPicker
            allowed={days[4].active}
            value={4}
            text="Ju"
            selected={activeDay}
            onSelect={selectDay}
          />
          <ButtonDayPicker
            allowed={days[5].active}
            value={5}
            text="Vi"
            selected={activeDay}
            onSelect={selectDay}
          />
          <ButtonDayPicker
            allowed={days[6].active}
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
                      <HourRangePicker
                        key={`range-0-${index}`}
                        hour={hour}
                        index={index}
                        day={0}
                        updateFrom={updateHourOnDays}
                        updateTo={updateHourOnDays}
                        remove={removeHourOnDays}
                      />
                    ))}
                    <AddHourButtom
                      onPress={() => addHoursToDayList(0, INIT_HOUR_RANGE)}
                    />
                  </View>
                );
              case 1:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[1].map((hour, index) => (
                      <HourRangePicker
                        key={`range-1-${index}`}
                        hour={hour}
                        index={index}
                        day={1}
                        updateFrom={updateHourOnDays}
                        updateTo={updateHourOnDays}
                        remove={removeHourOnDays}
                      />
                    ))}
                    <AddHourButtom
                      onPress={() => addHoursToDayList(1, INIT_HOUR_RANGE)}
                    />
                  </View>
                );

              case 2:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[2].map((hour, index) => (
                      <HourRangePicker
                        key={`range-2-${index}`}
                        hour={hour}
                        index={index}
                        day={2}
                        updateFrom={updateHourOnDays}
                        updateTo={updateHourOnDays}
                        remove={removeHourOnDays}
                      />
                    ))}
                    <AddHourButtom
                      onPress={() => addHoursToDayList(2, INIT_HOUR_RANGE)}
                    />
                  </View>
                );

              case 3:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[3].map((hour, index) => (
                      <HourRangePicker
                        key={`range-3-${index}`}
                        hour={hour}
                        index={index}
                        day={3}
                        updateFrom={updateHourOnDays}
                        updateTo={updateHourOnDays}
                        remove={removeHourOnDays}
                      />
                    ))}
                    <AddHourButtom
                      onPress={() => addHoursToDayList(3, INIT_HOUR_RANGE)}
                    />
                  </View>
                );

              case 4:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[4].map((hour, index) => (
                      <HourRangePicker
                        key={`range-4-${index}`}
                        hour={hour}
                        index={index}
                        day={4}
                        updateFrom={updateHourOnDays}
                        updateTo={updateHourOnDays}
                        remove={removeHourOnDays}
                      />
                    ))}
                    <AddHourButtom
                      onPress={() => addHoursToDayList(4, INIT_HOUR_RANGE)}
                    />
                  </View>
                );

              case 5:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[5].map((hour, index) => (
                      <HourRangePicker
                        key={`range-5-${index}`}
                        hour={hour}
                        index={index}
                        day={5}
                        updateFrom={updateHourOnDays}
                        updateTo={updateHourOnDays}
                        remove={removeHourOnDays}
                      />
                    ))}
                    <AddHourButtom
                      onPress={() => addHoursToDayList(5, INIT_HOUR_RANGE)}
                    />
                  </View>
                );

              case 6:
                return (
                  <View style={{ alignItems: "center" }}>
                    {hourPerDayList[6].map((hour, index) => (
                      <HourRangePicker
                        key={`range-6-${index}`}
                        hour={hour}
                        index={index}
                        day={6}
                        updateFrom={updateHourOnDays}
                        updateTo={updateHourOnDays}
                        remove={removeHourOnDays}
                      />
                    ))}
                    <AddHourButtom
                      onPress={() => addHoursToDayList(6, INIT_HOUR_RANGE)}
                    />
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

export default Hours;
