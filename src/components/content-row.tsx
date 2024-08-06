import { StyleSheet, Text, View } from "react-native";
import Colors from "@/src/utils/Colors";

const ContentRow = ({
  label,
  data,
}: {
  label: string;
  data: string | undefined;
}) => {
  return (
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>{label}</Text>
      <Text style={styles.contentData}>{data}</Text>
    </View>
  );
};

export default ContentRow;

const styles = StyleSheet.create({
  contentRow: {
    marginBottom: 20,
  },
  contentLabel: {
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    marginBottom: 10,
    color: Colors.maastrichtBlue,
  },
  contentData: {
    marginLeft: 20,
    fontFamily: "PoppinsSemiBold",
    fontSize: 22,
    color: Colors.maastrichtBlue,
  },
});
