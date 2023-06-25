import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/styles";

const ActivityBlock = ({max}) => {
  const activityLog = [
    {
      title: "Pedro Parker solicitó reserva Cancha 1 para las 6:00 pm del 29 Dic 2023",
      datetime: "2023-06-14 18:23:07",
    },
    {
      title: "Julio Cárdenas canceló Cancha 3 de las 2:00 pm del 29 Dic 2023",
      datetime: "2023-06-13 14:23:07",
    },
    {
      title: "Pedro Parker te escribió un mensaje",
      datetime: "2023-06-12 02:23:07",
    },
    {
      title: "Pedro Parker envió un comentario en Cancha 1",
      datetime: "2023-06-11 02:23:07",
    },
    {
      title: "Creación de la cuenta de empresa",
      datetime: "2023-06-10 02:23:07",
    }
  ];

  const limitLog = activityLog.slice(0, max);

  return (
    <View>
    {limitLog.map((log, index) => (
      <View key={`log-${index}`} style={styles.wrapper}>
        <Text style={styles.title}>{log.title}</Text>
        <Text style={styles.date}>{log.datetime}</Text>
      </View>
    ))}
    </View>
  );
};

export default ActivityBlock;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderColor: Colors.silverSand
  },
  title: {
    fontFamily: "PoppinsMedium",
    marginBottom: 10
  },
  date: {
    fontFamily: "PoppinsMedium",
    fontSize: 12
  }
});
