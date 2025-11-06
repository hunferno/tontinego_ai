import { View, Text, StyleSheet, FlatList } from "react-native";
import { winners } from "../services/mockData";

const WinnersList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Derniers gagnants</Text>
      <FlatList
        data={winners}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.amount}>{item.amount} €</Text>
            <Text style={styles.salon}>{item.salon}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginLeft: 20,
    alignItems: "center",
    width: 140,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  name: { fontWeight: "600", marginBottom: 4 },
  amount: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  salon: { color: "#555" },
});
