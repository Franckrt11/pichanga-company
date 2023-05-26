import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { Colors } from "../../src/constants/styles";
import HomeIcon from "../../src/components/icons/home-icon";
import FieldIcon from "../../src/components/icons/field-icon";
import CalendarIcon from "../../src/components/icons/calendar-icon";
import ChatIcon from "../../src/components/icons/chat-icon";
import BellIcon from "../../src/components/icons/bell-icon";
import Logo from "../../src/components/header/logo";
import Options from "../../src/components/header/options";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerLeft: () => <Logo />,
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
          headerRight: () => <Options />,
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
