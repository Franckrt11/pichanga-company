import { StyleSheet, Text, View, Image, Switch, Pressable } from "react-native";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Colors from "@/src/utils/Colors";
import StarIcon from "@/src/components/icons/star-icon";
import PencilIcon from "@/src/components/icons/pencil-icon";

interface FieldProps {
  name: string;
  active: boolean;
}

const FieldItem = ({ name, active }: FieldProps) => {
  const [visible, setVisible] = useState(active);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("Change order")}>
        <Ionicons name="menu" size={32} color={Colors.silverSand} />
      </Pressable>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image
            source={require("@/src/assets/images/cancha-lorem.jpg")}
            style={styles.image}
          />
          <View style={styles.content}>
            <View style={styles.description}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subtitle}>San Juan de Miraflores</Text>
              <View style={styles.score}>
                <StarIcon size={24} active={true} />
                <StarIcon size={24} active={true} />
                <StarIcon size={24} active={true} />
                <StarIcon size={24} active={false} />
                <StarIcon size={24} active={false} />
                <Text style={styles.countScore}>(50)</Text>
              </View>
            </View>
            <View style={styles.more}>
              <Pressable onPress={() => console.log("View more detail")}>
                <Fontisto
                  name="zoom-plus"
                  size={24}
                  color={Colors.maastrichtBlue}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.footer,
            {
              backgroundColor: active
                ? Colors.maastrichtBlue
                : Colors.silverSand,
            },
          ]}
        >
          <Pressable
            onPress={() => console.log("View comments")}
            style={styles.buttom}
          >
            <Text style={styles.buttomText}>Comentarios</Text>
          </Pressable>
          <Pressable
            onPress={() => console.log("Edit field")}
            style={styles.buttom}
          >
            <PencilIcon />
            <Text style={styles.buttomText}>Editar fotos</Text>
          </Pressable>
          <Switch
            trackColor={{ false: Colors.silverSand, true: Colors.silverSand }}
            thumbColor={visible ? Colors.greenLizard : Colors.maastrichtBlue}
            ios_backgroundColor={Colors.maastrichtBlue}
            onValueChange={() => console.log("Switch visible field")}
            value={visible}
          />
        </View>
      </View>
    </View>
  );
};

export default FieldItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 25,
  },
  wrapper: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.silverSand,
    overflow: "hidden",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.silverSand,
  },
  image: {
    height: 150,
    width: 100,
  },
  content: {
    flexDirection: "row",
    paddingVertical: 12,
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: Colors.silverSand,
  },
  description: {
    borderRightWidth: 2,
    borderRightColor: Colors.silverSand,
    flex: 1,
    paddingVertical: 5,
    paddingLeft: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: "PoppinsMedium",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "PoppinsMedium",
  },
  score: {
    flexDirection: "row",
    gap: 5,
    marginTop: 8,
  },
  countScore: {
    fontSize: 18,
    fontFamily: "PoppinsMedium",
  },
  more: {
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttom: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttomText: {
    color: Colors.maastrichtBlue,
    fontFamily: "PoppinsMedium",
  },
});
