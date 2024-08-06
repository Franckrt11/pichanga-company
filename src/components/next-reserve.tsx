import { StyleSheet, Text, View } from "react-native";
import { formatDistanceToNowStrict } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";
import { ReserveData } from "@/src/utils/Types";

const NextReserve = ({ reserve }: { reserve: ReserveData | null }) => {
  const [sentence, setSentence] = useState<string>("NO HAY PRÓXIMOS PARTIDOS");

  const timeRemaining = () => {
    if (reserve) {
      const result = formatDistanceToNowStrict(reserve.start_date, {
        locale: es,
      });
      setSentence("PRÓXIMO PARTIDO EN " + result.toUpperCase());
    }
  };

  useEffect(() => {
    timeRemaining();
  }, [reserve]);

  return (
    <View>
      <Text style={styles.title}>{sentence}</Text>
    </View>
  );
};

export default NextReserve;

const styles = StyleSheet.create({
  title: {
    fontFamily: "PoppinsMedium",
    marginBottom: 10,
  },
});
