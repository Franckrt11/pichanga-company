import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { router, Href } from "expo-router";
import Colors from "@/src/utils/Colors";
import ZoomPlusIcon from "@/src/components/icons/zoom-plus-icon";
import PencilIcon from "@/src/components/icons/pencil-icon";
import Switch from "@/src/components/switch";
import { updateLocationStatus }  from "@/src/models/Location";
import { useAuthContext } from "@/src/context/Auth";

const LocationItem = ({
  id,
  name,
  district,
  active,
}: {
  id: number;
  name: string;
  district: string;
  active: boolean;
}) => {
  const { token } = useAuthContext();
  const [visible, setVisible] = useState(active);

  const toggleVisible = async(): Promise<void> => {
    const response = await updateLocationStatus(id, token, !visible);
    if (response.status) setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.content}>
            <View style={styles.description}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subtitle}>{district}</Text>
            </View>
            <View style={styles.more}>
              <Pressable onPress={() => router.push(`/locations/${id}`)}>
                <ZoomPlusIcon size={20} color={Colors.maastrichtBlue} />
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
            onPress={() => router.push(`/locations/${id}/edit` as Href<`/locations/${number}/edit`>)}
            style={styles.buttom}
          >
            <PencilIcon />
            <Text style={styles.buttomText}>Editar local</Text>
          </Pressable>
          <Switch
            onValueChange={toggleVisible}
            value={visible}
          />
        </View>
      </View>
    </View>
  );
};

export default LocationItem;

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
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  more: {
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttom: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttomText: {
    color: Colors.maastrichtBlue,
    fontFamily: "PoppinsMedium",
    fontSize: 10
  },
});
