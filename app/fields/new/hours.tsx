import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
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

const INIT_HOUR_RANGE = { from: "5:00", to: "6:00" };

const Hours = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const [days, setDays] = useState({ "lu": false, "ma": false, "mi": false, "ju": false, "vi": false, "sa": false, "do": false });
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [same, setSame] = useState(true);
  const [hourList, setHourList] = useState<HourRange[]>([]);
  const [hourPerDayList, setHourPerDayList] = useState<HourDayRange>({ "lu": [], "ma": [], "mi": [], "ju": [], "vi": [], "sa": [], "do": [] });

  const [hid, setHid] = useState(1);
  const [hrid, setHrid] = useState({ lu: 1, ma: 1, mi: 1, ju: 1, vi: 1, sa: 1, do: 1 });

  const updateHourList = (prop: "from" | "to", value: string, index: number) => {
    let newList = [...hourList];
    newList[index][prop] = value;
    setHourList(newList);
  };

  const addHourToList = () => {
    let newList = [...hourList];
    newList.push({...INIT_HOUR_RANGE, position: hid });
    setHid(hid+1);
    setHourList(newList);
  };

  const removeHourList = (index: number) => {
    let newList = [...hourList];
    newList.splice(index, 1);
    setHourList(newList);
  };

  const loadFieldDays = async () => {
    const response = await fetchFieldDays(params.id as unknown as number, token);
    if (response.status) {
      setDays(response.data);
    }
  };

  const selectDay = (day: string) => {
    setActiveDay(day);
  };

  const addHoursToDayList = (day: string, hours: Object) => {
    let dayList = { ...hourPerDayList };
    let dayId = { ...hrid };
    (dayList[day as keyof typeof dayList] as Array<Object>).push({...hours, position: dayId[day as keyof typeof dayId]});
    dayId[day as keyof typeof dayId] = dayId[day as keyof typeof dayId] + 1;
    setHourPerDayList(dayList);
    setHrid(dayId);
  };

  const updateHourOnDays = {
    lu: function updateHourDate(prop: "from" | "to", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["lu"][index][prop] = value;
      setHourPerDayList(dayList);
    },
    ma: function updateHourDate(prop: "from" | "to", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["ma"][index][prop] = value;
      setHourPerDayList(dayList);
    },
    mi: function updateHourDate(prop: "from" | "to", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["mi"][index][prop] = value;
      setHourPerDayList(dayList);
    },
    ju: function updateHourDate(prop: "from" | "to", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["ju"][index][prop] = value;
      setHourPerDayList(dayList);
    },
    vi: function updateHourDate(prop: "from" | "to", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["vi"][index][prop] = value;
      setHourPerDayList(dayList);
    },
    sa: function updateHourDate(prop: "from" | "to", value: string, index: number) {
      let dayList = { ...hourPerDayList };
      dayList["sa"][index][prop] = value;
      setHourPerDayList(dayList);
    },
    do: function updateHourDate(prop: "from" | "to", value: string, index: number) {
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

  const completeDaysWithHours = (list: HourRange[]): HourDayRange => {
    return {
      "lu": days.lu ? list : [],
      "ma": days.ma ? list : [],
      "mi": days.mi ? list : [],
      "ju": days.ju ? list : [],
      "vi": days.vi ? list : [],
      "sa": days.sa ? list : [],
      "do": days.do ? list : []
    }
  };

  const nextStep = async () => {
    const hours = same ? completeDaysWithHours(hourList) : hourPerDayList;
    const response = await saveFieldHours(params.id as unknown as number, token, hours);
    if (response.status) router.push(`/fields/new/price?id=${response.data}`);
  };

  useEffect(() => {
    loadFieldDays();
  }, []);

  return (
    <ChildPage style={{ marginBottom: 60 }}>
      <Text style={LayoutStyles.pageTitle}>HORARIOS</Text>
      <Text style={[LayoutStyles.subtitle, { marginBottom: 20 }]}>¿Todos los días atiende en el mismo horario?</Text>

      <View style={{ marginBottom: 30, width: "90%" }}>
        <BouncyCheckbox
          isChecked={same}
          size={25}
          style={{ marginBottom: 15 }}
          fillColor={Colors.greenLizard}
          unfillColor={Colors.white}
          text="Si, tiene el mismo horario."
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
          text="No, tiene distintos horarios."
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
          {hourList.map((hour, index) => (
            <HourRangePicker
              key={index}
              hour={hour}
              index={index}
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
      )}

      <Pressable
        onPress={() => nextStep()}
        style={[PageStyles.button, { width: "80%", marginTop: 50 }]}
      >
        <Text style={PageStyles.buttonText}>SIGUIENTE</Text>
      </Pressable>
    </ChildPage>
  )
};

export default Hours;

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
  button: {
    flexDirection: "row",
    gap: 10,
    width: "80%",
    marginHorizontal: "auto",
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 25,
    justifyContent: "center",
    paddingVertical: 6
  }
});
