import { StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import Colors from "@/src/utils/Colors";
import { IMessages, IFetchUser, IFetchCompany } from "@/src/utils/Types";

const MessageBubble = ({ data, sender, current }: { data: IMessages, sender: IFetchUser | undefined, current: IFetchCompany | undefined }) => {
  return (
    <View style={[styles.messageWrapper, { alignItems: data.sender == "user" ? "flex-start" : "flex-end" }]}>
      <View style={[styles.messageBox]}>
        <Text style={[styles.messageText, {color: data.sender == "user" ? Colors.metallicGreen : Colors.maastrichtBlue}]}>{data.message}</Text>
      </View>
      <Text>{format(new Date(data.created_at), "dd MMM yyyy h:mm aaa", {locale: es})}</Text>
    </View>
  );
};

export default MessageBubble;

const styles = StyleSheet.create({
  messageWrapper: {
    width: "100%",
    flex: 1,
    marginBottom: 20
  },
  messageBox: {
    backgroundColor: Colors.white,
    borderColor: Colors.silverSand,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 5,
    width: "80%",
    padding: 10,
    alignItems: "flex-start"
  },
  messageText: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
  }
});
