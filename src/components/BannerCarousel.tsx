import React, { useRef, useState } from "react";
import {
  View,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  Animated,
} from "react-native";
import { banners } from "../services/mockData";

const { width } = Dimensions.get("window");

const BannerCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.image} resizeMode="cover" />
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      <View style={styles.dots}>
        {banners.map((_, index) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [8, 24, 8],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={index}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  image: {
    width: width * 0.9,
    height: 160,
    borderRadius: 16,
    marginHorizontal: (width * 0.05) / 2,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginHorizontal: 4,
  },
});
