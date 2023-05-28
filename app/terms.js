import {
  Text,
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import { LayoutStyles, Colors } from "../src/constants/styles";
import Back from "../src/components/header/back";

const Terms = () => {
  return (
    <KeyboardAvoidingView
      style={[
        LayoutStyles.whiteContainer,
        { justifyContent: "flex-start", paddingTop: 20, paddingBottom: 20 },
      ]}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => {},
          headerLeft: () => <Back />,
        }}
      />
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <View style={{ width: "90%" }}>
          <Text style={styles.title}>TÉRMINOS Y CONDICIONES</Text>
          <Text style={styles.content}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            vitae justo et lectus commodo blandit. In hac habitasse platea
            dictumst. Quisque a massa eros. Aenean mattis auctor mi. In hac
            habitasse platea dictumst. Nulla et eros lectus. Sed lacinia nisl in
            dolor accumsan, in rutrum diam pellentesque. Vestibulum quis velit
            id sapien pellentesque condimentum sit amet quis magna. Vivamus
            faucibus pulvinar posuere. Proin a libero augue.
          </Text>
          <Text style={styles.content}>
            Proin eu diam gravida, pulvinar orci sit amet, pharetra orci. Etiam
            ultricies, erat vel ultricies rutrum, purus nisl posuere augue, nec
            suscipit massa dui sed diam. Proin eget ex feugiat mauris porttitor
            fermentum. Vivamus id tincidunt enim. Integer magna nisi, porta at
            condimentum ut, volutpat non orci. Quisque ac fermentum magna. Ut
            sollicitudin quam nec nibh semper, in egestas arcu tristique.
            Vivamus sit amet auctor arcu. Duis eu pellentesque ipsum. Vivamus
            auctor ligula sem, eget vestibulum nisi scelerisque non. Fusce
            bibendum est dolor, et fermentum orci gravida id. Integer sed cursus
            lacus. Sed vestibulum nec justo quis lobortis. Morbi accumsan
            interdum lorem eu pretium.
          </Text>
          <Text style={styles.content}>
            Vestibulum consectetur lorem at volutpat dignissim. Aenean iaculis
            libero odio. Donec nunc orci, interdum id dapibus a, bibendum mollis
            augue. Aliquam convallis auctor enim ac viverra. Quisque bibendum
            arcu vel nibh porttitor viverra. Proin eu pellentesque mi. Sed
            imperdiet dolor velit, sit amet scelerisque turpis finibus vel.
            Maecenas ullamcorper pellentesque interdum. Curabitur rutrum, quam
            varius lobortis sollicitudin, nibh eros fringilla nisl, et maximus
            neque ex quis ex. Cras efficitur eu massa ac imperdiet.
          </Text>
          <Text style={styles.content}>
            In in nisl risus. Integer imperdiet consequat interdum. Nulla vel
            hendrerit lectus, ac convallis dui. In sollicitudin, ante rutrum
            porta egestas, dui ex fringilla purus, a posuere quam neque at
            augue. Aenean quam ipsum, pharetra at mi sed, volutpat euismod
            justo. Vivamus dignissim ultricies neque, ut rhoncus ex mattis in.
            Proin posuere, metus eu mollis blandit, nisl tellus egestas massa,
            eget gravida velit arcu sit amet lacus. Curabitur sed efficitur
            orci. Donec pellentesque pellentesque mi. Nulla imperdiet feugiat
            tellus eu maximus. Curabitur quis pretium purus, at auctor lacus. Ut
            viverra at dolor ac facilisis.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: Colors.maastrichtBlue,
    fontSize: 28,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 10,
  },
  content: {
    color: Colors.maastrichtBlue,
    fontSize: 15,
    fontFamily: "PoppinsMedium",
    marginBottom: 10,
    textAlign: "justify",
  },
});
