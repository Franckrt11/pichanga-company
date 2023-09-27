import { StyleSheet, Text, Pressable } from "react-native";
import Colors from "@/src/utils/Colors";
import { PageStyles } from "@/src/utils/Styles";
import PlusIcon from "@/src/components/icons/plus-icon";

const AddHourButtom = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[PageStyles.button, styles.button, { marginTop: 20 }]}
    >
      <PlusIcon size={14} />
      <Text style={PageStyles.buttonText}>Agregar rango adicional</Text>
    </Pressable>
  );
};

export default AddHourButtom;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    gap: 10,
    width: "80%",
    marginHorizontal: "auto",
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 25,
    justifyContent: "center",
    paddingVertical: 6
  }
});
