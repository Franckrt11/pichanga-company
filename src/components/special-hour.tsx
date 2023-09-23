import { StyleSheet, Text, View } from "react-native";
import Colors from "@/src/utils/Colors";
import { ISpecialHour } from "@/src/utils/Types";
import ClockMinus from "@/src/components/icons/clock-minus";
import ClockPlus from "@/src/components/icons/clock-plus";

const SpecialHour = ({ data }: { data: ISpecialHour }) => {
  const title = data.type === 'added' ? 'HORARIO AGREGADO' : 'HORARIO RETIRADO';

  return (
    <View style={[styles.wapper, { backgroundColor: data.type === 'added' ? Colors.maastrichtBlue : Colors.ferrariRed }]}>
      {data.type === 'added' ? <ClockPlus style={styles.clockIcon} size={40} /> : <ClockMinus style={styles.clockIcon} size={50} />}
      <Text style={styles.textTitle}>{title}</Text>
      <View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.column1]}>Día:</Text>
          <Text style={[styles.text, styles.column2]}>{data.day}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.column1]}>Horario:</Text>
          <Text style={[styles.text, styles.column2]}>{data.hour}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.column1]}>Cancha:</Text>
          <Text style={[styles.text, styles.column2]}>{data.field}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text, styles.column1]}>Motivo:</Text>
          <Text style={[styles.text, styles.column2]}>{data.reason}</Text>
        </View>
      </View>
    </View>
  )
};

export default SpecialHour;

const styles = StyleSheet.create({
  wapper: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    marginBottom: 15,
    borderRadius: 15,
    position: "relative"
  },
  row: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 1
  },
  column1: {
    width: "30%"
  },
  column2: {
    width: "65%"
  },
  text: {
    color: Colors.white,
    fontFamily: "PoppinsMedium",
    fontSize: 16,
  },
  textTitle: {
    color: Colors.white,
    fontSize: 22,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 15
  },
  clockIcon: {
    position: "absolute",
    right: 20,
    top: 15
  }
});