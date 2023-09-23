import { StyleSheet, Text, View, Pressable } from "react-native";
import Colors from "@/src/utils/Colors";
import PencilIcon from "@/src/components/icons/pencil-icon";
import TrashIcon from "@/src/components/icons/trash-icon";

interface IPositions {
  Horizontal: string;
  Vertical: string;
}

type IFlexDirection = "column" | "row" | "column-reverse" | "row-reverse" | undefined;

const positions: IPositions = {
  Horizontal: "row",
  Vertical: "column"
};

const UploadPhoto = ({ onRemovePhoto, onModalPress, position, storage }: { onRemovePhoto: any, onModalPress: any, position: string, storage?: string | null }) => {
  const direction: string = positions[position as keyof IPositions];

  const launchModal = () => {
    onModalPress();
  };

  const removePhoto = () => {
    onRemovePhoto();
  };

  return (
    <View style={{ flexDirection: direction as IFlexDirection, gap: 10, marginBottom: 15, width: "90%" }}>
      <Pressable
        onPress={launchModal}
        style={[styles.buttonOutline, { marginBottom: direction === "column" ? 10 : 0 }]}
      >
        <PencilIcon />
        <Text style={styles.buttonOutlineText}>Editar foto</Text>
      </Pressable>
      <Pressable
        onPress={removePhoto}
        style={styles.buttonOutline}
      >
        <TrashIcon size={10} />
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
