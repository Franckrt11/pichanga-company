import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ArrowLeftIcon from "@/src/components/icons/arrowleft-icon";
import ArrowRightIcon from "@/src/components/icons/arrowright-icon";

const Bookings = () => {
  const [day, setDay] = useState<Date>(new Date());

  const formatDate = (value: Date) =>
    format(value, "EEEE dd MMMM", { locale: es });

  const nextDay = () => setDay(addDays(day, 1));

  const prevDay = () => setDay(subDays(day, 1));

  return (
    <SafeAreaView style={LayoutStyles.whiteContainer}>
      <ScrollView
        style={{ paddingTop: 10 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View style={LayoutStyles.scrollContainer}>
          <Text style={[LayoutStyles.pageTitle, { marginBottom: 5 }]}>
            RESERVAS
          </Text>

          {/* Date picker */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            <Pressable
              onPress={() => prevDay()}
              style={styles.borderButton}
            >
              <ArrowLeftIcon />
            </Pressable>
            <View style={{ flexGrow: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontFamily: "PoppinsSemiBold",
                }}
              >
                {formatDate(day)}
              </Text>
              <Text style={{ textAlign: "center", fontSize: 16 }}>(Hoy)</Text>
            </View>
            <Pressable
              onPress={() => nextDay()}
              style={styles.borderButton}
            >
              <ArrowRightIcon />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  borderButton: {
    borderWidth: 2,
    borderColor: Colors.silverSand,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});
