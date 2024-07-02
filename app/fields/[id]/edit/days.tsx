import { Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import ButtonCheckbox from "@/src/components/button-checkbox";
import { useAuthContext } from "@/src/context/Auth";
import { updateFieldDays, fetchFieldDays } from "@/src/models/Field";
import { FieldDay } from "@/src/utils/Types";

const Days = () => {
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

  const changeDaysState = (state: boolean, day: number) => {
    let currentState = days;
    currentState[day] = state;
    setDays(currentState);
  };

  const daysToArray = (days: boolean[]): Array<FieldDay> => {
    return days.map((day, index) => {
      return { day: index, active: day };
    });
  };

  const loadFieldDays = async () => {
    const response = await fetchFieldDays(
      params.id as unknown as number,
      token
    );
    if (response.status) {
      setDays(response.data);
    }
  };

  const save = async () => {
    const response = await updateFieldDays(
      params.id as unknown as number,
      token,
      daysToArray(days)
    );
    if (response.status) router.back();
  };

  useEffect(() => {
    loadFieldDays();
  }, []);

  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>DÍAS DE ATENCIÓN</Text>
      <Text style={[LayoutStyles.subtitle, { marginBottom: 50 }]}>
        ¿Qué días atiende su cancha generalmente?
      </Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 50 }}>
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[0]}
          mode={0}
          text="Do"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[1]}
          mode={1}
          text="Lu"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[2]}
          mode={2}
          text="Ma"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[3]}
          mode={3}
          text="Mi"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[4]}
          mode={4}
          text="Ju"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[5]}
          mode={5}
          text="Vi"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[6]}
          mode={6}
          text="Sa"
          onChangeMode={changeDaysState}
        />
      </View>

      <Pressable
        onPress={() => save()}
        style={[PageStyles.button, { width: "80%", marginHorizontal: "auto" }]}
      >
        <Text style={PageStyles.buttonText}>GUARDAR</Text>
      </Pressable>
    </ChildPage>
  );
};

export default Days;
