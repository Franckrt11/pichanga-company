import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import ChildPage from "@/src/components/layouts/child-page";
import ContentRow from "@/src/components/content-row";
import { fetchReserve, updateReserve } from "@/src/models/Reserve";
import { useAuthContext } from "@/src/context/Auth";
import { LayoutStyles } from "@/src/utils/Styles";
import { ReserveData, ClientData } from "@/src/utils/Types";
import Colors from "@/src/utils/Colors";
import Images from "@/src/utils/Images";
import {
  getStatus,
  getDayName,
  getHourName,
  hasInscriptionText,
} from "@/src/utils/Helpers";

const BookingsDetails = () => {
  const params = useLocalSearchParams();
  const { token } = useAuthContext();
  const [reserve, setReserve] = useState<ReserveData | null>(null);
  const [client, setClient] = useState<ClientData | null>(null);

  const getReserve = async () => {
    const response = await fetchReserve(params.id as unknown as number, token);
    if (response.status) {
      setReserve(response.data);
      setClient(response.data.user);
    }
  };

  const getGame = (value: string | undefined) => {
    return value?.replace("v", " vs ");
  };

  const approveReserve = async () => {
    const response = await updateReserve(params.id as unknown as number, 'confirm', token);
    console.log("🚀 ~ approveReserve ~ response:", response);
    if (response.status) console.log('🥩 reserve approved!!');
  };

  const rejectReserve = async () => {
    const response = await updateReserve(params.id as unknown as number, 'cancel', token);
    console.log("🚀 ~ approveReserve ~ response:", response);
    if (response.status) console.log('🥫 reserve rejected!!');
  };

  const cancelReserve = async () => {
    const response = await updateReserve(params.id as unknown as number, 'cancel', token);
    console.log("🚀 ~ approveReserve ~ response:", response);
    if (response.status) console.log('👩‍🦰 reserve canceled!!');
  };

  useEffect(() => {
    getReserve();
  }, []);

  return (
    <ChildPage style={{ paddingBottom: 70 }}>
      <Text style={[LayoutStyles.pageTitle, { marginBottom: 10 }]}>
        DATOS DE RESERVA
      </Text>
      {client && (
        <View style={{ width: "90%", marginBottom: 25 }}>
          <Image
            source={{ uri: client.photo }}
            placeholder={Images.avatarDefault}
            style={{
              borderRadius: 60,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 20,
              height: 120,
              width: 120,
            }}
            transition={300}
          />
          <ContentRow
            label="Cliente"
            data={`${client.name} ${client.lastname}`}
          />
          <ContentRow label="Teléfono" data={client.phone} />
          <ContentRow label="Correo" data={client.email} />
          <ContentRow
            label="Horario"
            data={`${getHourName(reserve?.hour?.start)} - ${getHourName(
              reserve?.hour?.end
            )}`}
          />
          <ContentRow label="Modo de juego" data={getGame(reserve?.game)} />
          <ContentRow label="Estado" data={getStatus(reserve?.status)} />
          <ContentRow
            label="Modo de inscripción"
            data={hasInscriptionText(reserve?.inscription)}
          />
        </View>
      )}
      {reserve && reserve.status != 'confirm' && (
      <View style={{ width: "80%", marginBottom: 10 }}>
        <Pressable
          style={[styles.button, { backgroundColor: Colors.metallicGreen }]}
          onPress={approveReserve}
        >
          <Text style={styles.buttonText}>Aprobar</Text>
        </Pressable>
      </View>
      )}
      <View style={{ width: "80%", flexDirection: "row", gap: 10 }}>
        {reserve && reserve.status != 'confirm' && (
        <Pressable
          style={[styles.button, { flexGrow: 1 }]}
          onPress={rejectReserve}
        >
          <Text style={styles.buttonText}>Rechazar</Text>
        </Pressable>
        )}
        <Pressable
          style={[styles.button, { flexGrow: 1 }]}
          onPress={cancelReserve}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </Pressable>
      </View>
    </ChildPage>
  );
};

export default BookingsDetails;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 15,
    padding: 10,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
});
