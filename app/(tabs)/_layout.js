import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors, AppImages } from "../../src/constants/styles";
import HomeIcon from "../../src/components/icons/home-icon";
import FieldIcon from "../../src/components/icons/field-icon";
import CalendarIcon from "../../src/components/icons/calendar-icon";
import ChatIcon from "../../src/components/icons/chat-icon";
import BellIcon from "../../src/components/icons/bell-icon";

const Header = () => {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <Image
        source={require('../../src/assets/logo.png')}
        style={{ width: 50, height: 50, marginRight: 10 }}
      />
      <Text
        style={{ color: Colors.maastrichtBlue, fontWeight: 600, width: 100, fontSize: 15, lineHeight: 16 }}
      >Te Juego una Pichanga</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: () => <Header />,
        headerStyle: { backgroundColor: 'white', borderBottomWidth: 0 },
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: Colors.maastrichtBlue,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "INICIO",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color }) => (
            <HomeIcon active={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fields"
        options={{
          title: "CANCHAS",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color }) => (
            <FieldIcon active={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "RESERVAS",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color }) => (
            <CalendarIcon active={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "CHAT",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color }) => (
            <ChatIcon active={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "ACTIVIDAD",
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
