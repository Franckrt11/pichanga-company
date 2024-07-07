import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import Colors from "@/src/utils/Colors";
import { fetchActivity } from "@/src/models/Config";
import { useAuthContext } from "@/src/context/Auth";

interface IActivity {
  message: string;
  created_at: string;
}

const ActivityBlock = ({ max }: { max?: number }) => {
  const { userId, token } = useAuthContext();
  const [logs, setLogs] = useState<IActivity[]>([]);

  const loadActivity = async () => {
    if (userId) {
      const response = await fetchActivity(Number(userId), token);
      if (response.status) {
        const limitLog = max ? response.data.slice(0, max) : response.data;
        setLogs(limitLog);
      }
    }
  };

  useEffect(() => {
    loadActivity();
  }, [userId]);

  return (
    <View style={{ width: "100%" }}>
      {logs.map((log, index) => (
        <View key={`log-${index}`} style={styles.wrapper}>
          <Text style={styles.title}>{log.message}</Text>
          <Text style={styles.date}>
            {formatDistance(new Date(log.created_at), new Date(), {
              addSuffix: true,
              locale: es,
            })}
          </Text>
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
