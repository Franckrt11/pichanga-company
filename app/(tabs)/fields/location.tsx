import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router, useGlobalSearchParams, useFocusEffect } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import LocationItem from "@/src/components/location-item";
import { LocationData } from "@/src/utils/Types";
import { useUserContext } from "@/src/context/User";
import { useAuthContext } from "@/src/context/Auth";
import { fetchAllLocations } from "@/src/models/Location";

const FieldsLocation = () => {
  const { state } = useUserContext();
  const { token } = useAuthContext();
  const { reload } = useGlobalSearchParams<{ reload?: string }>();

  const [locations, setLocations] = useState<LocationData[]>([]);

  const getLocationList = async (): Promise<void> => {
    const response = await fetchAllLocations(state.id as number, token);
    if (response.status) setLocations(response.data);
  };

  useEffect(() => {
    getLocationList();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (reload === "tabs.fields.location") {
        getLocationList();
        router.setParams({ reload: undefined });
      }
    }, [reload])
  );

  return (
    <SafeAreaView style={LayoutStyles.whiteContainer}>
      <ScrollView
        style={{ paddingTop: 10 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={LayoutStyles.scrollContainer}>
          {locations &&
            locations?.map((location, index) => (
              <LocationItem
                key={index}
                id={location.id as number}
                name={location.name}
                district={location.district.name}
                active={location.active as boolean}
              />
            ))}
          <View style={{ marginVertical: 30, width: "80%" }}>
            <Pressable
              onPress={() => router.push("/locations/new")}
              style={[styles.button, { backgroundColor: Colors.metallicGreen }]}
            >
              <Text style={styles.buttonText}>AGREGAR LOCAL</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FieldsLocation;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: "PoppinsSemiBold",
    fontSize: 18,
    textAlign: "center",
  },
});
