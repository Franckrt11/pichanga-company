import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const TabStyles = StyleSheet.create({
  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -22,
    borderRadius: 20,
    borderWidth: 1,
    height: 30,
    width: 30,
  },
});

export const LayoutStyles = StyleSheet.create({
  blueContainer: {
    backgroundColor: Colors.maastrichtBlue,
    flex: 1,
    justifyContent: "center"
  },
  whiteContainer: {
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
    flex: 1
  },
  scrollContainer: {
    width: "90%",
    marginHorizontal: "auto"
  },
  pageTitle: {
    textAlign: "center",
    color: Colors.maastrichtBlue,
    fontSize: 28,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 30,
  },
});
