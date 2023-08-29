import { StyleSheet, Text, View, Pressable } from "react-native"
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { PageStyles, LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import { FieldData } from "@/src/utils/Types";
import ChildPage from "@/src/components/layouts/child-page";
import { useAuthContext } from "@/src/context/Auth";
import { fetchField }  from "@/src/models/Field";

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
  const [ field, setField ] = useState<FieldData>();

  const getField = async () => {
    const response = await fetchField(params.id as unknown as number, token);
    console.log('getField', response.data)
    setField(response.data);
    showGames(response.data.games);
  };

  const showGames = ( json:string | undefined ) => {
    const decode: string[] = JSON.parse(json!);
    const replaced = decode.map(value => value.replace('v', ' vs '));
    return replaced.join(", ");
  };

  useEffect(() => {
    getField();
  },[]);

  return (
    <ChildPage style={{ width: "80%" }}>
      <Text style={LayoutStyles.pageTitle}>{field?.name}</Text>

      {/*
      Slide de portrait + fotos
      Botones: Comentario - Editar fotos - Active
      */}
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
        data={showGames(field?.games)}
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
  }
});
