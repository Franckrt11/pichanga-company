import { Text, View, TouchableOpacity } from "react-native";
import { Stack, Slot } from "expo-router";
import { LayoutStyles } from '../src/constants/styles';
import ArrowLeftIcon from "../src/components/icons/arrowleft-icon";

const Options = () => {
  return (
    <View style={ LayoutStyles.whiteContainer }>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => {},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 10 }}
            >
              <ArrowLeftIcon />
            </TouchableOpacity>
          ),
        }}
      />
      <Text>Options</Text>
    </View>
  );
};

export default Options;
