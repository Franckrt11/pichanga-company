import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Colors, AppImages } from "../../src/constants/styles";
import HomeIcon from "../../src/components/icons/home-icon";
import FieldIcon from "../../src/components/icons/field-icon";
import CalendarIcon from "../../src/components/icons/calendar-icon";
import ChatIcon from "../../src/components/icons/chat-icon";
import BellIcon from "../../src/components/icons/bell-icon";

const HeaderLogo = () => {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}
    >
      <Image
        source={AppImages.images.logo}
        style={{ width: 50, height: 50, marginRight: 5 }}
      />
      <Text
        style={{
          color: Colors.maastrichtBlue,
          fontWeight: 600,
          width: 120,
          fontSize: 13,
          lineHeight: 15,
          fontFamily: "PoppinsMedium",
        }}
      >
        Te Juego una Pichanga
      </Text>
    </View>
  );
};

const HeaderOptions = () => {
  const router = useRouter();

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingRight: 10 }}
    >
      <TouchableOpacity onPress={() => router.push("/options")}>
        <Text>Opt</Text>
      </TouchableOpacity>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerLeft: () => <HeaderLogo />,
        headerStyle: { backgroundColor: "white", borderBottomWidth: 0 },
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: Colors.maastrichtBlue,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: () => {},
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color }) => (
            <HomeIcon active={focused} color={color} />
          ),
          headerRight: () => <HeaderOptions />,
        }}
      />
      <Tabs.Screen
        name="fields"
        options={{
          headerTitle: () => {},
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color }) => (
            <FieldIcon active={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          headerTitle: () => {},
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color }) => (
            <CalendarIcon active={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerTitle: () => {},
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color }) => (
            <ChatIcon active={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          headerTitle: () => {},
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color }) => (
            <BellIcon active={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    color: Colors.maastrichtBlue,
    backgroundColor: "white",
    fontSize: 22,
    marginTop: -25,
    borderRadius: 20,
    height: 30,
    width: 30,
    textAlign: "center",
    paddingTop: 3,
    borderColor: Colors.maastrichtBlue,
    borderWidth: 1,
  },
  tabBar: {
    backgroundColor: Colors.maastrichtBlue,
    borderTopWidth: 5,
  },
  tabBarLabel: {
    color: "white",
    marginBottom: 5,
    fontSize: 9,
  },
});

export default TabsLayout;
