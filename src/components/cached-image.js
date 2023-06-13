import { Image } from "react-native";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import API_URL from "../constants/constants";

const avatarDir = FileSystem.cacheDirectory + 'avatar/';
const avatarFileUri = (filename) => avatarDir + filename;
const avatarUrl = (filename) => `${API_URL}/storage/company/avatar/${filename}`;

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(avatarDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(avatarDir, { intermediates: true });
  }
};

const CachedImage = ({ size, defaultImage, name = null, styles }) => {
  const [source, setSource] = useState(defaultImage);

  const saveInCache = async () => {
    try {
      await ensureDirExists();

      const fileUri = avatarFileUri(name);
      const fileInfo = await FileSystem.getInfoAsync(fileUri);

      if (fileInfo.exists) {
        setSource({uri:fileInfo.uri});
      } else {
        const newAvatarImage = await FileSystem.downloadAsync(avatarUrl(name), fileUri);
        setSource({uri:newAvatarImage.uri});
      }
      return;
    } catch (e) {
      console.error("Couldn't download avatar files:", e);
    }
  };

  useEffect(() => {
    if (name) saveInCache();
  }, [name]);

  return (
    <Image
      source={source}
      style={[{
        height: size,
        width: size,
      },
      styles
      ]}
    />
  );
};

export default CachedImage;
