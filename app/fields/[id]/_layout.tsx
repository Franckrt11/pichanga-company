import { Stack } from 'expo-router/stack';

const FieldsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    />
  );
};

export default FieldsLayout;
