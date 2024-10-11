import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
import { router, useLocalSearchParams } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import ChildPage from "@/src/components/layouts/child-page";
import ArrowDownIcon from "@/src/components/icons/arrowdown-icon";
import Input from "@/src/components/input";
import { useAuthContext } from "@/src/context/Auth";
import { fetchLocation, updateLocation } from "@/src/models/Location";
import {
  fetchCountries,
  fetchCities,
  fetchDistricts,
} from "@/src/models/Config";
import { CountryData, CityData, DistrictData } from "@/src/utils/Types";

const EditLocation = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();

  const [countries, setCountries] = useState<CountryData[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [districts, setDistricts] = useState<DistrictData[]>([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [parking, setParking] = useState("");

  const [country, setCountry] = useState<number>(0);
  const [city, setCity] = useState<number>(0);
  const [district, setDistrict] = useState<number>(0);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<LatLng>({
    latitude: -12.0459667,
    longitude: -77.0305709,
  });

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

  const getLocation = async () => {
    const response = await fetchLocation(params.id as unknown as number, token);
    if (response.status) {
      await getCities(response.data.country_id);
      await getDistricts(response.data.city_id);
      setName(response.data.name);
      setPhone(response.data.phone);
      setMobile(response.data.mobile);
      setParking(response.data.parking);
      setCountry(response.data.country_id);
      setCity(response.data.city_id);
      setDistrict(response.data.district_id);
      setAddress(response.data.address);
      setCoords({
        latitude: response.data.map_latitude,
        longitude: response.data.map_longitude,
      });
    }
  };

  const saveData = async () => {
    const response = await updateLocation(params.id as unknown as number, token, {
      address,
      city_id: city,
      country_id: country,
      district_id: district,
      map_latitude: coords.latitude,
      map_longitude: coords.longitude,
      mobile,
      name,
      parking,
      phone,
    });
    if (response.status) {
      router.setParams({ reload: "tabs.fields.location" });
      router.back();
    }
  };

  useEffect(() => {
    getCountries();
    getLocation();
  }, []);

  return (
    <ChildPage style={{ width: "80%", marginBottom: 80 }}>
      <Text style={[LayoutStyles.pageTitle, { marginBottom: 20 }]}>
        EDITAR LOCAL
      </Text>

      <View
        style={{ width: "80%", marginHorizontal: "auto", marginBottom: 10 }}
      >
        <Input
          placeholder="Nombre del local"
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
          region={{
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
        onPress={() => saveData()}
        style={[PageStyles.button, { width: "80%", marginHorizontal: "auto" }]}
      >
        <Text style={PageStyles.buttonText}>GUARDAR</Text>
      </Pressable>
    </ChildPage>
  );
};

export default EditLocation;

const styles = StyleSheet.create({
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
