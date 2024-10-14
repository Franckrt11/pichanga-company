import { StyleSheet, Pressable, View } from "react-native";
import { router } from "expo-router";
import Colors from "@/src/utils/Colors";
import FieldMapIcon from "@/src/components/icons/fieldmap-icon";
import FieldIcon from "@/src/components/icons/field-icon";
import SwapIcon from "@/src/components/icons/swap-icon";

const FieldControl = ({ route, icon }: { route: string; icon: string }) => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingRight: 10 }}
    >
      <Pressable style={styles.button} onPress={() => router.replace(route)}>
        {(() => {
          switch (icon) {
            case "map":
              return <FieldMapIcon size={30} />;
            case "field":
              return <FieldIcon size={30} color={Colors.maastrichtBlue} />;
            default:
              return null;
          }
        })()}
        <SwapIcon style={styles.icon} size={16} />
      </Pressable>
    </View>
  );
};

export default FieldControl;

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.silverSand,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: -5,
    right: -5,
  },
});
