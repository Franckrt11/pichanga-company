import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import ButtonCheckbox from "@/src/components/button-checkbox";

const Days = () => {
  const [days, setDays] = useState({ "lu": false, "ma": false, "mi": false, "ju": false, "vi": false, "sa": false, "do": false });

  const changeDaysState = (state: boolean, day: string) => {
    setDays({ ...days, [day]: state });
  };

  const nextStep = () => {
    router.push("/fields/new/hours");
  };

  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>DÍAS DE ATENCIÓN</Text>
      <Text style={[LayoutStyles.subtitle, { marginBottom: 50 }]}>¿Qué días atiende su cancha generalmente?</Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 50 }}>
        <ButtonCheckbox
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days["lu"]}
          mode="lu"
          text="Lu"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days["ma"]}
          mode="ma"
          text="Ma"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days["mi"]}
          mode="mi"
          text="Mi"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days["ju"]}
          mode="ju"
          text="Ju"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days["vi"]}
          mode="vi"
          text="Vi"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days["sa"]}
          mode="sa"
          text="Sa"
          onChangeMode={changeDaysState}
        />
        <ButtonCheckbox
          radius={15}
          color={Colors.maastrichtBlue}
          checked={days["do"]}
          mode="do"
          text="Do"
          onChangeMode={changeDaysState}
        />
      </View>

      <Pressable
        onPress={() => nextStep()}
        style={[PageStyles.button, { width: "80%", marginHorizontal: "auto" }]}
      >
        <Text style={PageStyles.buttonText}>SIGUIENTE</Text>
      </Pressable>
    </ChildPage>
  )
};

export default Days;
