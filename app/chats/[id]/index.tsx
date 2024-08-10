import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { useEffect, useState, createRef } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import Colors from "@/src/utils/Colors";
import { fetchMessages, fetchChat, postMessage } from "@/src/models/Chat";
import { useAuthContext } from "@/src/context/Auth";
import ArrowMessageIcon from "@/src/components/icons/arrow-message-icon";
import { getUserAvatarUrl } from "@/src/utils/Helpers";
import Images from "@/src/utils/Images";
import Back from "@/src/components/header/back";
import { LayoutStyles } from "@/src/utils/Styles";
import MessageBubble from "@/src/components/message-bubble";
import { IMessages, IRoom } from "@/src/utils/Types";
import { socket } from "@/src/models/Socket";

const ChatMessages = () => {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<IMessages[]>([]);
  const [room, setRoom] = useState<IRoom | undefined>(undefined);
  const { token } = useAuthContext();
  const [message, setMessage] = useState<string>("");
  const scrollViewRef = createRef<ScrollView>();

  const getMessagesList = async (): Promise<void> => {
    const response = await fetchMessages(id as unknown as number, token);
    if (response.status) {
      setMessages(response.data);
    }
  };

  const getChat = async (): Promise<void> => {
    const response = await fetchChat(id as unknown as number, token);
    if (response.status) {
      setRoom(response.data);
    }
  };

  const sendMessage = async (): Promise<void> => {
    const response = await postMessage(id as unknown as number, token, message);
    if (response.status) {
      setMessage("");
      socket?.emit("message", response.data);
      setMessages([...messages, response.data]);
    }
  };

  const newMessage = (msgObject: IMessages): void => {
    setMessages([...messages, msgObject]);
  };

  useEffect(() => {
    getChat();
    getMessagesList();
  }, []);

  useEffect(() => {
    socket?.emit("subscribe", id);
    socket?.on("message", newMessage);

    return () => {
      socket?.emit("unsubscribe", id);
      socket?.off("message", newMessage);
    };
  }, [id, messages]);

  return (
    <SafeAreaView
      style={[
        LayoutStyles.whiteContainer,
        { alignItems: "center", paddingBottom: 10 },
      ]}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerLeft: () => <Back />,
        }}
      />
      <View style={[LayoutStyles.scrollContainer, { flex: 1, width: "90%" }]}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Image
            source={{ uri: getUserAvatarUrl(room?.user.photo) }}
            placeholder={Images.avatarDefault}
            style={styles.avatar}
            transition={300}
          />
          <Text style={styles.roomTitle}>
            {room?.user.name} {room?.user.lastname}
          </Text>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            style={{ flexGrow: 1 }}
            alwaysBounceVertical={false}
            ref={scrollViewRef}
            onContentSizeChange={() => {
              scrollViewRef.current?.scrollToEnd({ animated: true });
            }}
          >
            {messages.map((item) => (
              <MessageBubble
                data={item}
                sender={room?.user}
                current={room?.company}
                key={item.id}
              />
            ))}
          </ScrollView>
          <View style={styles.inputBox}>
            <TextInput
              style={{ marginRight: 10, flexGrow: 1, fontSize: 16 }}
              onChangeText={setMessage}
              value={message}
              placeholder="Enviar mensaje"
              placeholderTextColor={Colors.silverSand}
              maxLength={255}
            />
            <Pressable onPress={() => sendMessage()}>
              <ArrowMessageIcon />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default ChatMessages;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 50,
    height: 50,
    width: 50,
    marginRight: 20,
  },
  roomTitle: {
    color: Colors.metallicGreen,
    fontSize: 22,
    fontFamily: "PoppinsSemiBold",
  },
  inputBox: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Colors.silverSand,
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
  },
});
