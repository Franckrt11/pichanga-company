import { Stack } from 'expo-router/stack';

const ChatLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    />
  );
};

export default ChatLayout;
