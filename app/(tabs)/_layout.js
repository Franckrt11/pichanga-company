import { Tabs } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from "react-native";
import { Colors } from '../../src/constants/styles';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: styles.tabBar
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "INICIO",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: () => <Icon
              name={'home'}
              style={styles.tabIcon}
            />
        }}
      />
      <Tabs.Screen
        name="fields"
        options={{
          title: "CANCHAS",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: () => <Icon
              name={'soccer-field'}
              style={styles.tabIcon}
            />
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "RESERVAS",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: () => <Icon
              name={'calendar-month'}
              style={styles.tabIcon}
            />
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "CHAT",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: () => <Icon
              name={'wechat'}
              style={styles.tabIcon}
            />
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "ACTIVIDAD",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: () => <Icon
              name={'bell'}
              style={styles.tabIcon}
            />
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    color: Colors.maastrichtBlue,
    backgroundColor: 'white',
    fontSize: 22,
    marginTop: -25,
    borderRadius: 20,
    height: 30,
    width: 30,
    textAlign: 'center',
    paddingTop: 3,
    borderColor: Colors.maastrichtBlue,
    borderWidth: 1,
  },
  tabBar: {
    backgroundColor: Colors.maastrichtBlue,
    borderTopWidth: 5
  },
  tabBarLabel: {
    color: 'white',
    marginBottom: 5,
    fontSize: 9
  }
});

export default TabsLayout;

