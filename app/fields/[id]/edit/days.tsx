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
import { INIT_FIELD_DAYS } from "@/src/utils/Constants";

const Days = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const [days, setDays] = useState<FieldDay[]>(INIT_FIELD_DAYS);

  const changeDaysState = (state: boolean, day: number) => {
    let currentState = [ ...days ];
    currentState[day].active = state;
    setDays(currentState);
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

  const save = async () => {
    const response = await updateFieldDays(
      params.id as unknown as number,
      token,
      days
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
          checked={days[0].active}
          mode={0}
          text="Do"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[1].active}
          mode={1}
          text="Lu"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[2].active}
          mode={2}
          text="Ma"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[3].active}
          mode={3}
          text="Mi"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[4].active}
          mode={4}
          text="Ju"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[5].active}
          mode={5}
          text="Vi"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days[6].active}
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
