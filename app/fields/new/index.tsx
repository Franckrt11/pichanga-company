import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import Input from "@/src/components/input";
import ButtonCheckbox from "@/src/components/button-checkbox";
// import MapView from 'react-native-maps';
import { saveField }  from "@/src/models/Field";
import { useUserContext } from "@/src/context/User";
import { useAuthContext } from "@/src/context/Auth";

const NewField = () => {
  const { state } = useUserContext();
  const { token } = useAuthContext();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [parking, setParking] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("Grass");
  const [players, setPlayers] = useState("");
  const [modes, setMode] = useState({ "5v5": false, "6v6": false, "7v7": false, "8v8": false, "9v9": false, "10v10": false, "11v11": false });
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [map, setMap] = useState("mapa demo");

  const changeModeState = (state: boolean, mode: string) => {
    setMode({ ...modes, [mode]: state });
  };

  const nextStep = async () => {
    const filteredModes = Object.keys(modes).map(key => {
      if (modes[key]) return key;
    }).filter(element => element !== undefined);

    const saved = await saveField(token, {
      address,
      city,
      company_id: state.id!,
      country,
      district,
      games: JSON.stringify(filteredModes),
      map,
      mobile,
      name,
      parking,
      phone,
      players,
      size,
      type,
    });

    if (saved.status) {
      router.push(`/fields/new/photos?id=${saved.data.id}`);
    } else {
      console.log("🚨 ~ file: index.tsx:37 ~ nextStep ~ error", saved);
      Alert.alert('Error al guardar cancha.');
    }
  };

  return (
    <ChildPage>
      <Text style={LayoutStyles.pageTitle}>NUEVA CANCHA</Text>
      <View style={{ width: "80%", marginHorizontal: "auto", marginBottom: 10 }}>
        <Input
          placeholder="Nombre de la cancha"
          value={name}
          onChangeText={(text: string) => setName(text)}
          styles={PageStyles.input}
          theme="light"
        />
        <Input
          placeholder="Teléfono fijo"
          value={phone}
          onChangeText={(text: string) => setPhone(text)}
          styles={PageStyles.input}
          theme="light"
        />
        <Input
          placeholder="Celular o Whatsapp"
          value={mobile}
          onChangeText={(text: string) => setMobile(text)}
          styles={PageStyles.input}
          theme="light"
        />
        <Input
          placeholder="Cantidad de estacionamientos"
          value={parking}
          onChangeText={(text: string) => setParking(text)}
          styles={PageStyles.input}
          theme="light"
        />
        <Input
          placeholder="Medida de cancha"
          value={size}
          onChangeText={(text: string) => setSize(text)}
          styles={PageStyles.input}
          theme="light"
        />
        <Picker
          style={{
            marginBottom: 20,
            backgroundColor: Colors.white,
            borderColor: Colors.silverSand,
            borderWidth: 2,
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            fontFamily: "PoppinsMedium",
            borderStyle: "solid"
          }}
          selectedValue={type}
          onValueChange={(value, itemIndex) => setType(value)}
        >
          <Picker.Item fontFamily="PoppinsMedium" label="Grass" value="Grass" />
          <Picker.Item fontFamily="PoppinsMedium" label="Cemento" value="Cemento" />
          <Picker.Item fontFamily="PoppinsMedium" label="Sintético" value="Sintético" />
        </Picker>
        <Input
          placeholder="Cantidad máxima de jugadores"
          value={players}
          onChangeText={(text: string) => setPlayers(text)}
          styles={PageStyles.input}
          theme="light"
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
            mode="9v9" text="9 vs 9"
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
      <View style={{ width: "80%", marginHorizontal: "auto" }}>
        <Input
          placeholder="País"
          value={country}
          onChangeText={(text: string) => setCountry(text)}
          styles={PageStyles.input}
          theme="light"
        />
        <Input
          placeholder="Ciudad"
          value={city}
          onChangeText={(text: string) => setCity(text)}
          styles={PageStyles.input}
          theme="light"
        />
        <Input
          placeholder="Distrito"
          value={district}
          onChangeText={(text: string) => setDistrict(text)}
          styles={PageStyles.input}
          theme="light"
        />
        <Input
          placeholder="Dirección"
          value={address}
          onChangeText={(text: string) => setAddress(text)}
          styles={PageStyles.input}
          theme="light"
        />
      </View>
      <View style={{ marginBottom: 50 }}>

      {/* <MapView style={{ width: '100%', height: 50 }} /> */}

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

export default NewField;

const styles = StyleSheet.create({
  pseudoButton: {
    flex: 1,
    borderWidth: 2,
    padding: 8,
    borderRadius: 25,
    borderColor: Colors.white
  }
});

