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
    alignItems: "center",
    width: "90%",
  },
  pageTitle: {
    textAlign: "center",
    color: Colors.maastrichtBlue,
    fontSize: 28,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 30,
  },
  subtitle: {
    color: Colors.maastrichtBlue,
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 20,
  },
});

export const PageStyles = StyleSheet.create({
  input: {
    color: Colors.maastrichtBlue,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    borderRadius: 10,
    fontFamily: "PoppinsMedium",
    marginBottom: 5
  },
  button: {
    backgroundColor: Colors.metallicGreen,
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  },
  pickerContainer: {
    backgroundColor: Colors.white,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: "PoppinsMedium"
  },
  dropdown: {
    backgroundColor: Colors.white,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    color: Colors.maastrichtBlue,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: "PoppinsMedium",
  },
  dropdownPlaceholder: {
    color: Colors.silverSand,
    fontFamily: "PoppinsMedium",
    fontSize: 15,
  },
});
