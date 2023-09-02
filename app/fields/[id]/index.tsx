import { StyleSheet, Text, View, Image, Switch, FlatList, Pressable } from "react-native"
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { FieldData, FieldPictureData } from "@/src/utils/Types";
import ChildPage from "@/src/components/layouts/child-page";
import PencilIcon from "@/src/components/icons/pencil-icon";
import { useAuthContext } from "@/src/context/Auth";
import { fetchField, fetchFieldPictures }  from "@/src/models/Field";
import ImageCarousel from "@/src/components/image-carousel";

interface PictureList {
  id: number;
  filename: string | null;
};

const ContentRow = ({ label, data }: { label: string, data: string | undefined }) => {
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
  const [ field, setField ] = useState<FieldData | null>(null);
  const [ pictures, setPictures ] = useState<PictureList[]>([]);

  const getField = async () => {
    const response:FieldData = await fetchField(params.id as unknown as number, token);
    setField(response);
    const pictures = await getPictures();
    await setPictures([{id: 0, filename: response.portrait }, ...pictures]);
  };

  const getPictures = async (): Promise<FieldPictureData[]> => {
    const pictures: FieldPictureData[] = await fetchFieldPictures(parseInt(params.id as string), token);
    return pictures;
  };

  const showGames = ( json:string ) => {
    const decode: string[] = JSON.parse(json);
    const replaced = decode.map(value => value.replace('v', ' vs '));
    return replaced.join(", ");
  };

  useEffect(() => {
    getField();
  },[]);

  return (
    <ChildPage style={{ width: "80%" }}>
      <Text style={LayoutStyles.pageTitle}>{field?.name}</Text>

      <ImageCarousel data={pictures} />

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Pressable
          onPress={() => router.push(`/fields/${params.id}/comments`)}
          style={styles.buttom}
        >
          <Text style={styles.buttomText}>Ver comentarios</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push(`/fields/${params.id}/edit/photos`)}
          style={styles.buttom}
        >
          <PencilIcon />
          <Text style={styles.buttomText}>Editar fotos</Text>
        </Pressable>
        <Switch
          trackColor={{ false: Colors.silverSand, true: Colors.silverSand }}
          thumbColor={field?.active ? Colors.greenLizard : Colors.maastrichtBlue}
          ios_backgroundColor={Colors.maastrichtBlue}
          onValueChange={() => console.log("Switch visible field")}
          value={field?.active}
        />
      </View>

      <View style={styles.divider}/>
      <ContentRow
        label="Teléfono fijo"
        data={field?.phone}
      />
      <ContentRow
        label="Celular o Whatsapp"
        data={field?.mobile}
      />
      <ContentRow
        label="Estacionamientos"
        data={field?.parking}
      />
      <ContentRow
        label="Medida de la cancha"
        data={field?.size}
      />
      <ContentRow
        label="Tipo de cancha"
        data={field?.type}
      />
      <ContentRow
        label="Cantidad máxima de jugadores"
        data={field?.players}
      />
      <ContentRow
        label="Modos de juego"
        data={field ? showGames(field.games) : ''}
      />
      <ContentRow
        label="País"
        data={field?.country}
      />
      <ContentRow
        label="Ciudad"
        data={field?.city}
      />
      <ContentRow
        label="Distrito"
        data={field?.district}
      />
      <ContentRow
        label="Dirección"
        data={field?.address}
      />

      {/*
      Mapa
      Rating
      N° Comentarios
      */}

    </ChildPage>
  )
};

export default FieldDetails;

const styles = StyleSheet.create({
  divider: {
    backgroundColor: Colors.silverSand,
    width: "100%",
    height: 2,
    marginBottom: 40
  },
  contentRow: {
    marginBottom: 20
  },
  contentLabel: {
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    marginBottom: 10
  },
  contentData: {
    marginLeft: 20,
    fontFamily: "PoppinsSemiBold",
    fontSize: 22
  },
  buttom: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    paddingVertical: 4,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttomText: {
    color: Colors.maastrichtBlue,
    fontFamily: "PoppinsMedium",
  },
  slider: {
    flex: 1,
  },
  slidePage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
