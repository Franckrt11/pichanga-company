import { StyleSheet, Text, View } from "react-native";
import Colors from "@/src/utils/Colors";
import StarIcon from "@/src/components/icons/star-icon";

const RatingRow = ({ score }: { score: number }) => {
  let star_array = [];

  for (let i = 0; i < 5; i++) {
    if (i < score) {
      star_array.push(true);
    } else {
      star_array.push(false);
    }
  }
  // Add half star
  return (
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Ranking</Text>
      <View style={{ flexDirection: "row", gap: 5, marginLeft: 20 }}>
        {star_array.map((star, index) => (
          <StarIcon key={index} size={28} active={star} />
        ))}
      </View>
    </View>
  );
};

export default RatingRow;

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
});
