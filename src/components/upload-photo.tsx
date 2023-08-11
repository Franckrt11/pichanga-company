import { StyleSheet, Text, View, Pressable } from "react-native";
import Colors from "@/src/utils/Colors";
import PencilIcon from "@/src/components/icons/pencil-icon";
import TrashIcon from "@/src/components/icons/trash-icon";

const UploadPhoto = ({ onRemovePhoto, onModalPress }: { onRemovePhoto: any, onModalPress: any }) => {
  const launchModal = () => {
    onModalPress();
  };

  const removePhoto = () => {
    onRemovePhoto();
  };

  return (
    <View style={{ flexDirection: "row", gap: 10, marginBottom: 15, width: "90%", marginHorizontal: "auto" }}>
      <Pressable
        onPress={launchModal}
        style={styles.buttonOutline}
      >
        <PencilIcon />
        <Text style={styles.buttonOutlineText}>Editar foto</Text>
      </Pressable>
      <Pressable
        onPress={removePhoto}
        style={styles.buttonOutline}
      >
        <TrashIcon />
        <Text style={styles.buttonOutlineText}>Borrar foto</Text>
      </Pressable>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  buttonOutline: {
    borderColor: Colors.silverSand,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    flexGrow: 1,
  },
  buttonOutlineText: {
    fontFamily: "PoppinsMedium",
    color: Colors.maastrichtBlue,
  },
});
