import { Image } from "react-native";

const ImageViewer = ({ placeholderImageSource, selectedImage }) => {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

  return (
    <Image
      source={imageSource}
      style={{
        height: 120,
        width: 120,
        borderRadius: 60,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20,
      }}
    />
  );
};

export default ImageViewer;
