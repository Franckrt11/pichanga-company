import { StyleSheet, Text, View, Pressable } from "react-native";
import { router, useLocalSearchParams, Href } from "expo-router";
import { useState, useEffect } from "react";
import Colors from "@/src/utils/Colors";
import { FieldData, FieldPictureData } from "@/src/utils/Types";
import ChildPage from "@/src/components/layouts/child-page";
import PencilIcon from "@/src/components/icons/pencil-icon";

import { useAuthContext } from "@/src/context/Auth";
import {
  fetchField,
  fetchFieldPictures,
  updateFieldStatus,
} from "@/src/models/Field";
import ImageCarousel from "@/src/components/image-carousel";
import RatingRow from "@/src/components/rating-row";
import Switch from "@/src/components/switch";

interface PictureList {
  id: number;
  filename: string | undefined;
}

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

const FieldDetails = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const [field, setField] = useState<FieldData | null>(null);
  const [pictures, setPictures] = useState<PictureList[]>([]);
  const [visible, setVisible] = useState(false);

  const getField = async () => {
    const response = await fetchField(params.id as unknown as number, token);
    if (response.status) {
      setField(response.data);
      const pictures = await getPictures();
      setPictures([
        { id: 1, filename: response.data.portrait as string | undefined },
        ...(pictures as FieldPictureData[]),
      ]);
      setVisible(response.data.active as boolean);
    }
  };

  const getPictures = async () => {
    const pictures = await fetchFieldPictures(
      parseInt(params.id as string),
      token
    );
    if (pictures.status) return pictures.data as FieldPictureData[];
  };

  const showGames = (json: string) => {
    const decode: string[] = JSON.parse(json);
    const replaced = decode.map((value) => value.replace("v", " vs "));
    return replaced.join(", ");
  };

  const toggleVisible = async (): Promise<void> => {
    const response = await updateFieldStatus(
      field!.id as number,
      token,
      !visible
    );
    if (response.status) {
      setVisible(!visible);
    }
  };

  useEffect(() => {
    getField();
  }, []);

  return (
    <ChildPage
      style={{ width: "80%", alignItems: "flex-start", marginBottom: 80 }}
    >
      <ImageCarousel data={pictures} />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Pressable
          onPress={() =>
            router.push(
              `/fields/${params.id}/comments` as Href<`/fields/${string}/comments`>
            )
          }
          style={styles.buttom}
        >
          <Text style={styles.buttomText}>Ver comentarios</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            router.push(
              `/fields/${params.id}/edit/photos` as Href<`/fields/${string}/edit/photos`>
            )
          }
          style={styles.buttom}
        >
          <PencilIcon />
          <Text style={styles.buttomText}>Editar fotos</Text>
        </Pressable>
        <Switch onValueChange={toggleVisible} value={visible} />
      </View>

      <View style={styles.divider} />

      <ContentRow label="Ubicación de la cancha" data={field?.location.name} />
      <ContentRow label="Medida de la cancha" data={field?.size} />
      <ContentRow label="Tipo de cancha" data={field?.type} />
      <ContentRow label="Cantidad máxima de jugadores" data={field?.players} />
      <ContentRow
        label="Modos de juego"
        data={field ? showGames(field.games) : ""}
      />

      <View style={{ width: "90%" }}>
        <RatingRow score={2} />
        <ContentRow label="Comentarios" data={"20"} />
      </View>
    </ChildPage>
  );
};

export default FieldDetails;

const styles = StyleSheet.create({
  divider: {
    backgroundColor: Colors.silverSand,
    width: "100%",
    height: 2,
    marginBottom: 40,
  },
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
  buttom: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    paddingVertical: 2,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttomText: {
    color: Colors.maastrichtBlue,
    fontFamily: "PoppinsMedium",
    fontSize: 12,
  },
  slider: {
    flex: 1,
  },
  slidePage: {
    justifyContent: "center",
    alignItems: "center",
  },
});
