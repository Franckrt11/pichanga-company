import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
import { LayoutStyles } from "@/src/utils/Styles";
import { useAuthContext } from "@/src/context/Auth";
import ChildPage from "@/src/components/layouts/child-page";
import ContentRow from "@/src/components/content-row";
import Switch from "@/src/components/switch";
import { fetchLocation, updateLocationStatus } from "@/src/models/Location";
import { LocationData } from "@/src/utils/Types";

const LocationDetails = () => {
  const params = useLocalSearchParams();

  const { token } = useAuthContext();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [coords, setCoords] = useState<LatLng>({
    latitude: -12.0459667,
    longitude: -77.0305709,
  });

  const getLocation = async () => {
    const response = await fetchLocation(params.id as unknown as number, token);
    if (response.status) {
      setLocation(response.data);
      setCoords({
        latitude: response.data.map_latitude,
        longitude: response.data.map_longitude,
      });
      setVisible(response.data.active as boolean);
    }
  };

  const toggleVisible = async (): Promise<void> => {
    const response = await updateLocationStatus(
      location!.id as number,
      token,
      !visible
    );
    if (response.status) setVisible(!visible);
  };

  useEffect(() => {
    getLocation();
  }, []);


  return (
    <ChildPage
      style={{ width: "80%", alignItems: "flex-start", marginBottom: 80 }}
    >
      <Text style={LayoutStyles.pageTitle}>{location?.name}</Text>

      <Switch onValueChange={toggleVisible} value={visible} />

      <ContentRow label="Teléfono fijo" data={location?.phone} />
      <ContentRow label="Celular o Whatsapp" data={location?.mobile} />
      <ContentRow label="Estacionamientos" data={location?.parking} />
      <ContentRow label="País" data={location?.country.name} />
      <ContentRow label="Ciudad" data={location?.city.name} />
      <ContentRow label="Distrito" data={location?.district.name} />
      <ContentRow label="Dirección" data={location?.address} />

      <View
        style={{
          width: "100%",
          height: 300,
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
          <Marker coordinate={coords} />
        </MapView>
      </View>
    </ChildPage>
  );
};

export default LocationDetails;
