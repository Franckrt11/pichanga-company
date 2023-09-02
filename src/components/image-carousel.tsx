import { StyleSheet, FlatList, View, Dimensions, Image, ViewToken } from "react-native";
import { useState, useEffect, useRef } from "react";
import { getFieldUrl } from "@/src/utils/Helpers";
import Colors from "@/src/utils/Colors";
import Images from "@/src/utils/Images";

const { width } = Dimensions.get('window');
const ITEM_LENGTH = width * 0.8;

interface ImageCarouselItem {
  id: number;
  filename: string | null;
};

interface ImageCarouselProps {
  data: ImageCarouselItem[];
};

const Item = ({ url }: { url: string | null }) => (
  <Image
    source={{ uri: url ? url : '' }}
    defaultSource={Images.portraitDefault}
    style={{ borderRadius: 20, height: ITEM_LENGTH / 1.6, width: ITEM_LENGTH }}
  />
);

const Pagination = ({ data, index }: {data: ImageCarouselItem[], index: number})  => {
  return (
    <View style={styles.paginationWrapper}>
      {data.map((_, idx) => {
        return <View
                  key={'dot-'+idx.toString()}
                  style={[
                    styles.dots,
                    idx === index && { backgroundColor: Colors.maastrichtBlue }
                  ]}
                />
      })}
    </View>
  )
};

const ImageCarousel = ({ data }: ImageCarouselProps) => {
  const [dataWithUri, setDataWithUri] = useState<ImageCarouselItem[]>([]);
  const [index, setIndex] = useState<number>(0);

  const handleOnViewableItemsChanged = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
    setIndex(viewableItems[0].index as number);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  useEffect(() => {
    const uriAdded = data.map(item => {
      return { id: item.id, filename: getFieldUrl(item.filename) }
    });
    setDataWithUri(uriAdded);
  }, [data]);

  return (
    <View style={{ paddingBottom: 20 }}>
      <FlatList
        data={dataWithUri}
        renderItem={({ item }) => <Item url={item.filename} />}
        keyExtractor={item => 'picture-'+item.id.toString()}
        horizontal
        // pagingEnabled
        snapToAlignment="center"
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={dataWithUri} index={index} />
    </View>
  )
};

export default ImageCarousel;

const styles = StyleSheet.create({
  dots: {
    height: 15,
    width: 15,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.maastrichtBlue,
    backgroundColor: Colors.white
  },
  paginationWrapper : {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    justifyContent: "center"
  }
});
