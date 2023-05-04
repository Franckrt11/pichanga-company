import { Text, View } from "react-native";
import { useAuth } from "../context/auth";

const Index = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HOME</Text>
      <Text onPress={signOut}>Sign Out</Text>
    </View>
  );
};

export default Index;
