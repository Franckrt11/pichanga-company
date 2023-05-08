import { Tabs } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../constants/styles';

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "INICIO",
          tabBarIcon: () => <Icon
              name={'home'}
              style={{
                color: Colors.maastrichtBlue,
                fontSize: 22
              }}
            />
        }}
      />
      <Tabs.Screen
        name="fields"
        options={{
          title: "CANCHAS",
          tabBarIcon: () => <Icon
              name={'soccer-field'}
              style={{
                color: Colors.maastrichtBlue,
                fontSize: 22
              }}
            />
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "RESERVAS",
          tabBarIcon: () => <Icon
              name={'calendar-month'}
              style={{
                color: Colors.maastrichtBlue,
                fontSize: 22
              }}
            />
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "CHAT",
          tabBarIcon: () => <Icon
              name={'wechat'}
              style={{
                color: Colors.maastrichtBlue,
                fontSize: 22
              }}
            />
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "ACTIVIDAD",
          tabBarIcon: () => <Icon
              name={'bell'}
              style={{
                color: Colors.maastrichtBlue,
                fontSize: 22
              }}
            />
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
