import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
import { LayoutStyles, PageStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ChildPage from "@/src/components/layouts/child-page";
import Input from "@/src/components/input";
import ButtonCheckbox from "@/src/components/button-checkbox";
import ArrowDownIcon from "@/src/components/icons/arrowdown-icon";
import { saveField } from "@/src/models/Field";
import {
  fetchCountries,
  fetchCities,
  fetchDistricts,
} from "@/src/models/Config";
import { useUserContext } from "@/src/context/User";
import { useAuthContext } from "@/src/context/Auth";
import { CountryData, CityData, DistrictData } from "@/src/utils/Types";
import { FIELD_TYPES_LIST } from "@/src/utils/Constants";

const NewField = () => {
  const { state } = useUserContext();
  const { token } = useAuthContext();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [parking, setParking] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [players, setPlayers] = useState("");
  const [modes, setMode] = useState({
    "5v5": false,
    "6v6": false,
    "7v7": false,
    "8v8": false,
    "9v9": false,
    "10v10": false,
    "11v11": false,
  });

  const [countries, setCountries] = useState<CountryData[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [districts, setDistricts] = useState<DistrictData[]>([]);

  const [country, setCountry] = useState<number>(0);
  const [city, setCity] = useState<number>(0);
  const [district, setDistrict] = useState<number>(0);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<LatLng>({
    latitude: -12.0459667,
    longitude: -77.0305709,
  });

  const changeModeState = (state: boolean, mode: string) => {
    setMode({ ...modes, [mode]: state });
  };

  const getCountries = async () => {
    const countries = await fetchCountries(token);
    if (countries.status) setCountries(countries.data);
  };

  const getCities = async (country: number) => {
    const cities = await fetchCities(country, token);
    if (cities.status) setCities(cities.data);
  };

  const getDistricts = async (city: number) => {
    const districts = await fetchDistricts(city, token);
    if (districts.status) setDistricts(districts.data);
  };

  const nextStep = async () => {
    const filteredModes = Object.keys(modes)
      .map((key) => {
        if (modes[key as keyof typeof modes]) return key;
      })
      .filter((element) => element !== undefined);

    const saved = await saveField(token, {
      address,
      city_id: city,
      company_id: state.id as number,
      country_id: country,
      district_id: district,
      games: JSON.stringify(filteredModes),
      map_latitude: coords.latitude,
      map_longitude: coords.longitude,
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
      console.log("🚨 ~ fields/new/index.tsx ~ nextStep ~ error", saved);
      Alert.alert("Error al guardar cancha.");
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <ChildPage style={{ marginBottom: 80 }}>
      <Text style={LayoutStyles.pageTitle}>NUEVA CANCHA</Text>
      <View
        style={{ width: "80%", marginHorizontal: "auto", marginBottom: 10 }}
      >
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
          keyboard="numeric"
        />
        <Input
          placeholder="Celular o Whatsapp"
          value={mobile}
          onChangeText={(text: string) => setMobile(text)}
          styles={PageStyles.input}
          theme="light"
          keyboard="numeric"
        />
        <Input
          placeholder="Cantidad de estacionamientos"
          value={parking}
          onChangeText={(text: string) => setParking(text)}
          styles={PageStyles.input}
          theme="light"
          keyboard="numeric"
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
      <View style={{ width: "80%", marginHorizontal: "auto" }}>
        <Dropdown
          style={[PageStyles.dropdown, styles.dropdown]}
          data={countries}
          labelField="name"
          valueField="id"
          placeholder="País"
          placeholderStyle={[
            PageStyles.dropdownPlaceholder,
            { paddingHorizontal: 10 },
          ]}
          onChange={(item) => {
            setCountry(item.id);
            getCities(item.id);
          }}
          value={countries.find((item) => item.id === country)}
          selectedTextStyle={styles.dropdownSelectectText}
          renderRightIcon={() => (
            <ArrowDownIcon size={10} style={{ marginRight: 10 }} />
          )}
        />
        <Dropdown
          style={[PageStyles.dropdown, styles.dropdown]}
          data={cities}
          labelField="name"
          valueField="id"
          placeholder="Ciudad"
          placeholderStyle={[
            PageStyles.dropdownPlaceholder,
            { paddingHorizontal: 10 },
          ]}
          onChange={(item) => {
            setCity(item.id);
            getDistricts(item.id);
          }}
          value={cities.find((item) => item.id === city)}
          selectedTextStyle={styles.dropdownSelectectText}
          renderRightIcon={() => (
            <ArrowDownIcon size={10} style={{ marginRight: 10 }} />
          )}
        />
        <Dropdown
          style={[PageStyles.dropdown, styles.dropdown]}
          data={districts}
          labelField="name"
          valueField="id"
          placeholder="Distrito"
          placeholderStyle={[
            PageStyles.dropdownPlaceholder,
            { paddingHorizontal: 10 },
          ]}
          onChange={(item) => setDistrict(item.id)}
          value={districts.find((item) => item.id === district)}
          selectedTextStyle={styles.dropdownSelectectText}
          renderRightIcon={() => (
            <ArrowDownIcon size={10} style={{ marginRight: 10 }} />
          )}
        />
        <Input
          placeholder="Dirección"
          value={address}
          onChangeText={(text: string) => setAddress(text)}
          styles={PageStyles.input}
          theme="light"
        />
      </View>
      <View
        style={{
          width: "80%",
          height: 400,
          marginBottom: 50,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            draggable
            onDragEnd={(direction) =>
              setCoords(direction.nativeEvent.coordinate)
            }
            coordinate={coords}
          />
        </MapView>
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
