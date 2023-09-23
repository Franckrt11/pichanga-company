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
  const [days, setDays] = useState({ "lu": false, "ma": false, "mi": false, "ju": false, "vi": false, "sa": false, "do": false });

  const changeDaysState = (state: boolean, day: string) => {
    setDays({ ...days, [day]: state });
  };

  const daysToArray = (days:any): Array<FieldDay> => {
    const array = [];
    for (const [key, value] of Object.entries(days)) {
      array.push({ day: key, active: value as boolean });
    }
    return array;
  };

  const loadFieldDays = async () => {
    const response = await fetchFieldDays(params.id as unknown as number, token);
    if (response.status) {
      setDays(response.data);
    }
  };

  const save = async () => {
    const response = await updateFieldDays(params.id as unknown as number, token, daysToArray(days));
    if (response.status) {
      router.back();
    }
  };

  useEffect( () => {
    loadFieldDays();
  }, []);

  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>DÍAS DE ATENCIÓN</Text>
      <Text style={[LayoutStyles.subtitle, { marginBottom: 50 }]}>¿Qué días atiende su cancha generalmente?</Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 50 }}>
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days['lu']}
          mode="lu"
          text="Lu"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days['ma']}
          mode="ma"
          text="Ma"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days['mi']}
          mode="mi"
          text="Mi"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days['ju']}
          mode="ju"
          text="Ju"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days['vi']}
          mode="vi"
          text="Vi"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days['sa']}
          mode="sa"
          text="Sa"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          styleText={{ fontSize: 14 }}
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days['do']}
          mode="do"
          text="Do"
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
  )
};

export default Days;
