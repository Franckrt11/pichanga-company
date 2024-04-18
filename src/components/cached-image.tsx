import { Image, StyleProp, ImageStyle } from "react-native";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
import { API_URL } from "@/src/utils/Constants";

interface CachedImageProps {
  size: number;
  defaultImage: string;
  filename: string | null | undefined;
  style: StyleProp<ImageStyle>;
}

interface SourceType {
  uri: string;
}

const avatarDir = FileSystem.cacheDirectory + "avatar/";
const avatarFileUri = (filename: string) => avatarDir + filename;
const avatarUrl = (filename: string) =>
  `${API_URL}/storage/company/avatar/${filename}`;

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(avatarDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(avatarDir, { intermediates: true });
  }
};

const CachedImage = ({
  size,
  defaultImage,
  filename,
  style,
}: CachedImageProps) => {
  const [source, setSource] = useState<SourceType>({ uri: defaultImage });

  const saveInCache = async (name: string) => {
    try {
      await ensureDirExists();

      const fileUri = avatarFileUri(name);
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (fileInfo.exists) {
        setSource({ uri: fileInfo.uri });
      } else {
        const newAvatarImage = await FileSystem.downloadAsync(
          avatarUrl(name),
          fileUri
        );
        setSource({ uri: newAvatarImage.uri });
      }
      return;
    } catch (e) {
      console.error("Couldn't download avatar files:", e);
    }
  };

  return (
    <Image
      source={{ uri: defaultImage }}
      style={[
        {
          height: size,
          width: size,
        },
        style,
      ]}
    />
  );
};

export default CachedImage;
