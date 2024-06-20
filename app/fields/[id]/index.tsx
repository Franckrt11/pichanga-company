import { StyleSheet, Text, View, Image, FlatList, Pressable } from "react-native"
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, LatLng } from "react-native-maps";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { FieldData, FieldPictureData } from "@/src/utils/Types";
import ChildPage from "@/src/components/layouts/child-page";
import PencilIcon from "@/src/components/icons/pencil-icon";
import { useAuthContext } from "@/src/context/Auth";
import { fetchField, fetchFieldPictures, updateFieldStatus }  from "@/src/models/Field";
import ImageCarousel from "@/src/components/image-carousel";
import Switch from "@/src/components/switch";

interface PictureList {
  id: number;
  filename: string | undefined;
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
  const [ visible, setVisible ] = useState(false);
  const [coords, setCoords] = useState<LatLng>({
    latitude: -12.0459667,
    longitude: -77.0305709
  });

  const getField = async () => {
    const response:FieldData = await fetchField(params.id as unknown as number, token);
    setField(response);
    const pictures = await getPictures();
    const coordinates = response.map.split(','); // Modificar porque el mapa es diferente ahora
    setPictures([{id: 0, filename: response.portrait as string | undefined }, ...pictures]);
    setCoords({
      latitude: parseFloat(coordinates[0]),
      longitude: parseFloat(coordinates[1])
    })
    setVisible(response.active as boolean);
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

  const toggleVisible = async(): Promise<void> => {
    const response = await updateFieldStatus(field!.id as number, token, !visible);
    if (response.status) {
      setVisible(!visible);
    }
  };

  useEffect(() => {
    getField();
  },[]);

  return (
    <ChildPage style={{ width: "80%", alignItems: "flex-start", marginBottom: 80 }}>
      <Text style={LayoutStyles.pageTitle}>{field?.name}</Text>

      <ImageCarousel data={pictures} />

      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
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
          onValueChange={toggleVisible}
          value={visible}
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
        data={field?.country.name}
      />
      <ContentRow
        label="Ciudad"
        data={field?.city.name}
      />
      <ContentRow
        label="Distrito"
        data={field?.district.name}
      />
      <ContentRow
        label="Dirección"
        data={field?.address}
      />

      <View style={{ width: "100%", height: 300, marginBottom: 50, borderRadius: 20, overflow: "hidden" }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: "100%", height: "100%" }}
          region={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.005,
          }}
        >
          <Marker coordinate={coords} />
        </MapView>
      </View>

      {/*
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
    marginBottom: 10,
    color: Colors.maastrichtBlue
  },
  contentData: {
    marginLeft: 20,
    fontFamily: "PoppinsSemiBold",
    fontSize: 22,
    color: Colors.maastrichtBlue
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
    fontSize: 12
  },
  slider: {
    flex: 1,
  },
  slidePage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
