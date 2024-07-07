import { Stack } from 'expo-router/stack';

const BookingsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    />
  );
};

export default BookingsLayout;
