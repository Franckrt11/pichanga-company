import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import ButtonDayPicker from "@/src/components/button-day-picker";
import AddHourButtom from "@/src/components/add-hour-bottom";
import HourRangePicker from "@/src/components/hour-range-picker";
import { useAuthContext } from "@/src/context/Auth";
import { fetchFieldDays, saveFieldHours } from "@/src/models/Field";
import { HourRange, HourDayRange } from "@/src/utils/Types";

const INIT_HOUR_RANGE = { start: 1, end: 2, position: 1 };

const Hours = () => {
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
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [same, setSame] = useState<boolean>(true);
  const [hourList, setHourList] = useState<HourRange[]>([]);
  const [hourPerDayList, setHourPerDayList] = useState<HourRange[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const completeDaysWithHours = (list: HourRange[]): HourDayRange => {
    return {
      0: days[0] ? list : [],
      1: days[1] ? list : [],
      2: days[2] ? list : [],
      3: days[3] ? list : [],
      4: days[4] ? list : [],
      5: days[5] ? list : [],
      6: days[6] ? list : [],
    };
  };

  const nextStep = async () => {
    const hours = same ? completeDaysWithHours(hourList) : hourPerDayList;
    const response = await saveFieldHours(
      params.id as unknown as number,
      token,
      hours
    );
    if (response.status) router.push(`/fields/new/price?id=${params.id}`);
  };

  const loadFieldDays = async () => {
    const response = await fetchFieldDays(
      params.id as unknown as number,
      token
    );
    if (response.status) setDays(response.data);
  };

  const selectDay = (day: number) => setActiveDay(day);

  const addHourToList = () => {
    let newList = [...hourList];
    newList.push({ ...INIT_HOUR_RANGE, position: newList.length + 1 });
    setHourList(newList);
  };

  const updateHourList = (
    prop: "start" | "end",
    value: number,
    index: number
  ) => {
    let newList = [...hourList];
    newList[index][prop] = value;
    setHourList(newList);
  };

  const removeHourList = (index: number) => {
    let newList = [...hourList];
    newList.splice(index, 1);
    setHourList(newList);
  };

  const addHoursToDayList = (day: number, hours: HourRange) => {
    let dayList = [...hourPerDayList];
    let count = dayList[day].length;
    dayList[day].push({ ...hours, position: count + 1 });
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
  }, []);

  return (
    <ChildPage style={{ marginBottom: 60 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerLeft: () => <></>,
        }}
      />
      <Text style={LayoutStyles.pageTitle}>HORARIOS</Text>
      <Text style={[LayoutStyles.subtitle, { marginBottom: 20 }]}>
        ¿Todos los días atiende en el mismo horario?
      </Text>

      <View style={{ marginBottom: 30, width: "90%" }}>
        <BouncyCheckbox
          isChecked={same}
          size={25}
          style={{ marginBottom: 15 }}
          fillColor={Colors.greenLizard}
          unFillColor={Colors.white}
          text="Si, tiene el mismo horario."
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
          text="No, tiene distintos horarios."
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
          {hourList.map((hour, index) => (
            <HourRangePicker
              key={`range-s-${index}`}
              hour={hour}
              index={index}
              day={7}
              updateFrom={updateHourList}
              updateTo={updateHourList}
              remove={removeHourList}
            />
          ))}
          <AddHourButtom onPress={() => addHourToList()} />
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
      )}

      <Pressable
        onPress={() => nextStep()}
        style={[PageStyles.button, { width: "80%", marginTop: 50 }]}
      >
        <Text style={PageStyles.buttonText}>SIGUIENTE</Text>
      </Pressable>
    </ChildPage>
  );
};

export default Hours;

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
  button: {
    flexDirection: "row",
    gap: 10,
    width: "80%",
    marginHorizontal: "auto",
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 25,
    justifyContent: "center",
    paddingVertical: 6,
  },
});
