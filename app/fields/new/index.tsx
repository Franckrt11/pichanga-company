import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import Input from "@/src/components/input";
import ButtonCheckbox from "@/src/components/button-checkbox";
import ArrowDownIcon from "@/src/components/icons/arrowdown-icon";
import { saveField } from "@/src/models/Field";
import { fetchAllLocations } from "@/src/models/Location";
import { useUserContext } from "@/src/context/User";
import { useAuthContext } from "@/src/context/Auth";
import { LocationData } from "@/src/utils/Types";
import { FIELD_TYPES_LIST } from "@/src/utils/Constants";

const NewField = () => {
  const { state } = useUserContext();
  const { token } = useAuthContext();

  const [locations, setLocations] = useState<LocationData[]>([]);

  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [players, setPlayers] = useState("");
  const [locationID, setLocationID] = useState<number | null>(null);

  const [modes, setMode] = useState({
    "5v5": false,
    "6v6": false,
    "7v7": false,
    "8v8": false,
    "9v9": false,
    "10v10": false,
    "11v11": false,
  });

  const changeModeState = (state: boolean, mode: string) => {
    setMode({ ...modes, [mode]: state });
  };

  const getLocations = async (): Promise<void> => {
    const response = await fetchAllLocations(state.id as number, token);
    if (response.status) setLocations(response.data);
  };

  const nextStep = async () => {
    const filteredModes = Object.keys(modes)
      .map((key) => {
        if (modes[key as keyof typeof modes]) return key;
      })
      .filter((element) => element !== undefined);

    const saved = await saveField(token, {
      company_id: state.id as number,
      location_id: locationID as number,
      games: JSON.stringify(filteredModes),
      players,
      size,
      type,
    });
    if (saved.status) router.push(`/fields/new/photos?id=${saved.data.id}`);
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <ChildPage style={{ marginBottom: 80 }}>
      <Text style={LayoutStyles.pageTitle}>NUEVA CANCHA</Text>
      <View
        style={{ width: "80%", marginHorizontal: "auto", marginBottom: 10 }}
      >
        <Dropdown
          style={[PageStyles.dropdown, styles.dropdown]}
          data={locations}
          labelField="name"
          valueField="id"
          placeholder="Local"
          placeholderStyle={[
            PageStyles.dropdownPlaceholder,
            { paddingHorizontal: 10 },
          ]}
          onChange={(item) => {
            setLocationID(item.id as number);
          }}
          value={locations.find((item) => item.id === locationID)}
          selectedTextStyle={styles.dropdownSelectectText}
          renderRightIcon={() => (
            <ArrowDownIcon size={10} style={{ marginRight: 10 }} />
          )}
        />
        <Input
          placeholder="Medida de cancha"
          value={size}
          onChangeText={(text: string) => setSize(text)}
          styles={PageStyles.input}
          theme="light"
        />
        <Dropdown
          style={[PageStyles.dropdown, styles.dropdown]}
          data={FIELD_TYPES_LIST}
          labelField="label"
          valueField="value"
          placeholder="Tipo de cancha"
          placeholderStyle={[
            PageStyles.dropdownPlaceholder,
            { paddingHorizontal: 10 },
          ]}
          onChange={(item) => setType(item.value)}
          value={type}
          selectedTextStyle={styles.dropdownSelectectText}
          renderRightIcon={() => (
            <ArrowDownIcon size={10} style={{ marginRight: 10 }} />
          )}
        />
        <Input
          placeholder="Cantidad máxima de jugadores"
          value={players}
          onChangeText={(text: string) => setPlayers(text)}
          styles={PageStyles.input}
          theme="light"
          keyboard="numeric"
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={LayoutStyles.subtitle}>Modos de juego disponibles:</Text>
        <View style={{ flexDirection: "row", gap: 15, marginBottom: 10 }}>
          <ButtonCheckbox
            radius={25}
            color={Colors.metallicGreen}
            checked={modes["5v5"]}
            mode="5v5"
            text="5 vs 5"
            onChangeMode={changeModeState}
          />
          <ButtonCheckbox
            radius={25}
            color={Colors.metallicGreen}
            checked={modes["6v6"]}
            mode="6v6"
            text="6 vs 6"
            onChangeMode={changeModeState}
          />
          <ButtonCheckbox
            radius={25}
            color={Colors.metallicGreen}
            checked={modes["7v7"]}
            mode="7v7"
            text="7 vs 7"
            onChangeMode={changeModeState}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 15, marginBottom: 10 }}>
          <ButtonCheckbox
            radius={25}
            color={Colors.metallicGreen}
            checked={modes["8v8"]}
            mode="8v8"
            text="8 vs 8"
            onChangeMode={changeModeState}
          />
          <ButtonCheckbox
            radius={25}
            color={Colors.metallicGreen}
            checked={modes["9v9"]}
            mode="9v9"
            text="9 vs 9"
            onChangeMode={changeModeState}
          />
          <ButtonCheckbox
            radius={25}
            color={Colors.metallicGreen}
            checked={modes["10v10"]}
            mode="10v10"
            text="10 vs 10"
            onChangeMode={changeModeState}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <ButtonCheckbox
            radius={25}
            color={Colors.metallicGreen}
            checked={modes["11v11"]}
            mode="11v11"
            text="11 vs 11"
            onChangeMode={changeModeState}
          />
          <View style={styles.pseudoButton}></View>
          <View style={styles.pseudoButton}></View>
        </View>
      </View>
      <Pressable
        onPress={() => nextStep()}
        style={[PageStyles.button, { width: "80%", marginHorizontal: "auto" }]}
      >
        <Text style={PageStyles.buttonText}>SIGUIENTE</Text>
      </Pressable>
    </ChildPage>
  );
};

export default NewField;

const styles = StyleSheet.create({
  pseudoButton: {
    flex: 1,
    borderWidth: 2,
    padding: 8,
    borderRadius: 25,
    borderColor: Colors.white,
  },
  dropdown: {
    flex: 1,
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  dropdownSelectectText: {
    paddingHorizontal: 15,
    fontFamily: "PoppinsMedium",
    fontSize: 14,
  },
});
