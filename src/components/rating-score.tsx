import { StyleSheet, Text, View } from "react-native";
import StarIcon from "@/src/components/icons/star-icon";

const RatingScore = ({ score }: { score: number }) => {
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
    <View style={styles.score}>
      {star_array.map((star, index) => (
        <StarIcon key={index} size={15} active={star} />
      ))}
      <Text style={styles.countScore}>({score})</Text>
    </View>
  );
};

export default RatingScore;

const styles = StyleSheet.create({
  score: {
    flexDirection: "row",
    gap: 5,
    marginTop: 8,
    alignItems: "center",
  },
  countScore: {
    fontSize: 12,
    fontFamily: "PoppinsMedium",
    paddingTop: 4,
  },
});
