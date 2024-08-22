import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams, Href } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { FieldData } from "@/src/utils/Types";
import { fetchField, updateFieldStatus } from "@/src/models/Field";
import { useAuthContext } from "@/src/context/Auth";
import ChildPage from "@/src/components/layouts/child-page";
import ArrowDownIcon from "@/src/components/icons/arrowdown-icon";

const STATUS_LIST = [
  { label: "Habilitado", value: true },
  { label: "Inhabilitado", value: false },
];

const EditField = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const [field, setField] = useState<FieldData | null>(null);
  const [status, setStatus] = useState<boolean>(false);

  const getField = async () => {
    const response = await fetchField(params.id as unknown as number, token);
    if (response.status) {
      setField(response.data);
      setStatus(response.data.active);
    }
  };

  const save = async () => {
    const response = await updateFieldStatus(
      params.id as unknown as number,
      token,
      status
    );
    if (response.status) router.replace("/(tabs)/fields");
  };

  useEffect(() => {
    getField();
  }, []);

  return (
    <ChildPage style={{ width: "80%", marginBottom: 80 }}>
      <Text style={[LayoutStyles.pageTitle, { marginBottom: 0 }]}>
        EDITAR CANCHA
      </Text>
      <Text style={LayoutStyles.pageTitle}>{field?.name}</Text>
      <Pressable
        onPress={() =>
          router.push(
            `/fields/${params.id}/edit/data` as Href<`/fields/${string}/edit/data`>
          )
        }
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>DATOS DE CANCHA</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          router.push(
            `/fields/${params.id}/edit/photos` as Href<`/fields/${string}/edit/photos`>
          )
        }
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>FOTOGRAFÍAS</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          router.push(
            `/fields/${params.id}/edit/days` as Href<`/fields/${string}/edit/days`>
          )
        }
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>DÍAS DE ATENCIÓN</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          router.push(
            `/fields/${params.id}/edit/hours` as Href<`/fields/${string}/edit/hours`>
          )
        }
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>HORARIOS</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          router.push(
            `/fields/${params.id}/edit/price` as Href<`/fields/${string}/edit/price`>
          )
        }
        style={[styles.outlineButton]}
      >
        <Text style={styles.outlineButtonText}>PRECIOS</Text>
      </Pressable>

      <View style={{ marginBottom: 50, width: "100%" }}>
        <Text style={[styles.checkboxText, { marginBottom: 5, fontSize: 20 }]}>
          Estado
        </Text>
        <Dropdown
          style={[PageStyles.dropdown, styles.dropdown]}
          data={STATUS_LIST}
          labelField="label"
          valueField="value"
          placeholder="Tipo de cancha"
          placeholderStyle={[
            PageStyles.dropdownPlaceholder,
            { paddingHorizontal: 10 },
          ]}
          onChange={(item) => setStatus(item.value)}
          value={STATUS_LIST.find((item) => item.value === status)}
          selectedTextStyle={styles.dropdownSelectectText}
          renderRightIcon={() => (
            <ArrowDownIcon size={10} style={{ marginRight: 10 }} />
          )}
        />
      </View>

      <Pressable
        onPress={() => save()}
        style={[PageStyles.button, { width: "80%" }]}
      >
        <Text style={PageStyles.buttonText}>GUARDAR</Text>
      </Pressable>
    </ChildPage>
  );
};

export default EditField;

const styles = StyleSheet.create({
  checkboxText: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.maastrichtBlue,
    textDecorationLine: "none",
  },
  outlineButton: {
    alignItems: "center",
    color: Colors.maastrichtBlue,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    borderRadius: 25,
    fontFamily: "PoppinsMedium",
    marginBottom: 20,
    width: "100%",
  },
  outlineButtonText: {
    color: Colors.maastrichtBlue,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  dropdown: {
    flex: 1,
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  dropdownSelectectText: {
    paddingHorizontal: 15,
    fontFamily: "PoppinsMedium",
    fontSize: 14,
  },
});
