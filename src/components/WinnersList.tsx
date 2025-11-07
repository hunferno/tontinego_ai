import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions, Easing } from "react-native";
import { winners } from "../services/mockData";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 160;
const SPACING = 16;

const WinnersList = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  const dataLoop = [...winners, ...winners, ...winners];

  useEffect(() => {
    const totalWidth = (ITEM_WIDTH + SPACING) * winners.length;

    Animated.loop(
      Animated.timing(translateX, {
        toValue: -totalWidth,
        duration: 20000, // vitesse (ajuste si tu veux plus lent/rapide)
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Derniers gagnants</Text>
      <View style={styles.carouselContainer}>
        <Animated.View
          style={[
            styles.row,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          {dataLoop.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.amount}>{item.amount} €</Text>
              <Text style={styles.salon}>{item.salon}</Text>
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

export default WinnersList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 12,
  },
  carouselContainer: {
    overflow: "hidden",
    width: width,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginRight: SPACING,
    alignItems: "center",
    width: ITEM_WIDTH,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  name: { fontWeight: "600", marginBottom: 4 },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    color: "#007AFF",
  },
  salon: { color: "#555" },
});
