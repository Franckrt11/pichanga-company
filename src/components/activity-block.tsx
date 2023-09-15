import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import { es } from 'date-fns/locale';
import Colors from "@/src/utils/Colors";
import { fetchActivity } from "@/src/models/Config";
import { useUserContext } from "@/src/context/User";
import { useAuthContext } from "@/src/context/Auth";

interface ActivityProps {
  max?: number;
}

interface IActivity {
  message: string;
  created_at: string;
}

const ActivityBlock = ({ max }: ActivityProps) => {
  const { state } = useUserContext();
  const { token } = useAuthContext();
  const [ logs, setLogs ] = useState<IActivity[]>([]);

  const loadActivity = async () => {
    const response = await fetchActivity(state.id as number, token);
    if (response.status) {
      const limitLog = max ? response.data.slice(0, max) : response.data;
      setLogs(limitLog);
    }
  };

  useEffect(() => {
    loadActivity();
  },[]);

  return (
    <View style={{ width: "100%" }}>
      {logs.map((log, index) => (
        <View key={`log-${index}`} style={styles.wrapper}>
          <Text style={styles.title}>{log.message}</Text>
          <Text style={styles.date}>{ formatDistance(new Date(log.created_at), new Date(), { addSuffix: true, locale: es }) }</Text>
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
    borderColor: Colors.silverSand,
  },
  title: {
    fontFamily: "PoppinsMedium",
    marginBottom: 10,
  },
  date: {
    fontFamily: "PoppinsMedium",
    fontSize: 12,
  },
});
