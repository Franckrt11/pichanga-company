import { Text, View } from "react-native";
import { useAuth } from "../context/auth";

const Index = () => {
  const { signOut, user } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HOME</Text>
      <Text>{user.name}</Text>
      <Text onPress={() => signOut}>Sign Out</Text>
    </View>
  );
};

export default Index;
