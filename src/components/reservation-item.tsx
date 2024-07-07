import { StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import ZoomPlusIcon from "@/src/components/icons/zoom-plus-icon";
import CashIcon from "@/src/components/icons/cash-icon";
import Colors from "@/src/utils/Colors";
import { FieldData, HourRange } from "@/src/utils/Types";
import { HOUR_LIST, RESERVE_STATUS } from "@/src/utils/Constants";

const ReservationItem = ({
  id,
  date,
  field,
  hour,
  status,
  inscription,
}: {
  id: number;
  date: string;
  field: FieldData;
  hour: HourRange;
  status: string;
  inscription: boolean;
}) => {
  const getHourName = (key: number) => {
    if (key) {
      const filtered = HOUR_LIST.filter((hour) => {
        return hour.value === key;
      });
      return filtered[0].text;
    }
    return;
  };

  const getDayName = (day: string) => {
    const date = parseISO(day);
    return format(date, "dd MMM yyyy", { locale: es });
  };

  const getStatus = (status: string) => {
    if (status) {
      const filtered = RESERVE_STATUS.filter((statusObj) => {
        return statusObj.value === status;
      });
      return filtered[0].text;
    }
    return;
  };

  const hasInscription = (value:boolean) => {
    if (value) return <CashIcon />;
  };

  return (
    <Pressable
      style={styles.matchBlock}
      onPress={() => router.push(`/bookings/${id}`)}
    >
      <View style={styles.matchContent}>
        <View style={{ justifyContent: "center", width: 25 }}>
         {hasInscription(inscription)}
        </View>
        <View>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            Estado:
          </Text>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            Fecha:
          </Text>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            Horario:
          </Text>
          <Text style={styles.matchContentText}>Cancha:</Text>
        </View>
        <View>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            {getStatus(status)}
          </Text>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            {getDayName(date)}
          </Text>
          <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
            {getHourName(hour.start)} - {getHourName(hour.end)}
          </Text>
          <Text style={styles.matchContentText}>{field.name}</Text>
        </View>
      </View>
      <View style={styles.matchIcon}>
        <ZoomPlusIcon size={20} color={Colors.white} />
      </View>
    </Pressable>
  );
};

export default ReservationItem;

const styles = StyleSheet.create({
  matchBlock: {
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    paddingVertical: 15,
    marginBottom: 20,
  },
  matchContent: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  matchContentText: {
    color: Colors.white,
    fontFamily: "PoppinsMedium",
  },
  matchIcon: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: Colors.silverSand,
    paddingRight: 10,
    paddingLeft: 15,
  },
});
