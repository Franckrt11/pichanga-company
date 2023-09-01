import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { LayoutStyles } from "@/src/utils/Styles";
import Colors from "@/src/utils/Colors";
import ActivityBlock from "@/src/components/activity-block";
import ZoomPlusIcon from "@/src/components/icons/zoom-plus-icon";

const Home = () => {

  return (
    <SafeAreaView
      style={LayoutStyles.whiteContainer}
    >
      <ScrollView style={{ paddingTop: 10 }}>
        <View style={LayoutStyles.scrollContainer}>
          <Text style={styles.title}>ACTIVIDAD</Text>
          <ActivityBlock max={2} />
          <View style={styles.buttonGroup}>
            <Pressable
              style={[styles.button, { borderRadius: 15 }]}
              onPress={() => console.log("GoTo Activity")}
            >
              <Text style={[styles.buttonText, { fontSize: 14 }]}>Ver más</Text>
            </Pressable>
          </View>

          <Text style={styles.title}>PRÓXIMO PARTIDO EN 45 mins</Text>
          <Pressable
            style={styles.matchBlock}
            onPress={() => console.log("GoTo Next Match")}
          >
            <View style={styles.matchContent}>
              <View>
                <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
                  Reserva:
                </Text>
                <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
                  Horario:
                </Text>
                <Text style={styles.matchContentText}>Cancha:</Text>
              </View>
              <View>
                <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
                  Pedro Paredes
                </Text>
                <Text style={[styles.matchContentText, { marginBottom: 3 }]}>
                  5:00 pm - 8:00 pm
                </Text>
                <Text style={styles.matchContentText}>Cancha Lorem</Text>
              </View>
            </View>
            <View style={styles.matchIcon}>
              <ZoomPlusIcon size={20} color={Colors.white} />
            </View>
          </Pressable>

          <View style={[styles.buttonGroup, { width: "80%" }]}>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: Colors.metallicGreen,
                  paddingVertical: 8,
                  marginBottom: 10,
                },
              ]}
              onPress={() => router.push("/fields/new")}
            >
              <Text
                style={[
                  styles.buttonText,
                  { fontSize: 18, fontFamily: "PoppinsSemiBold" },
                ]}
              >
                AGREGAR CANCHA
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                { backgroundColor: Colors.ferrariRed, paddingVertical: 8 },
              ]}
              onPress={() => router.push("/fields/special")}
            >
              <Text
                style={[
                  styles.buttonText,
                  { fontSize: 18, fontFamily: "PoppinsSemiBold" },
                ]}
              >
                HORARIOS ESPECIALES
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontFamily: "PoppinsMedium",
    marginBottom: 10,
  },
  buttonGroup: {
    width: "40%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 10,
    padding: 2,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    textAlign: "center",
  },
  matchBlock: {
    backgroundColor: Colors.maastrichtBlue,
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    paddingVertical: 15,
    marginBottom: 20,
  },
  matchContent: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    paddingLeft: 40,
    flexGrow: 1,
  },
  matchContentText: {
    color: Colors.white,
    fontFamily: "PoppinsMedium",
  },
  matchIcon: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: Colors.silverSand,
    paddingRight: 10,
    paddingLeft: 15,
  },
});
