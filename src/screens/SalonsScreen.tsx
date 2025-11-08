import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Modal,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

type Salon = {
  id: string;
  name: string;
  montant: number;
  participants: number;
  total: number;
  lastWinner?: string;
  timeLeft?: string;
};

const mockSalons: Salon[] = [
  {
    id: "1",
    name: "Salon Doré",
    montant: 100,
    participants: 10,
    total: 10,
    lastWinner: "Marie D.",
    timeLeft: "00:28:12",
  },
  { id: "2", name: "Salon Argenté", montant: 50, participants: 6, total: 10 },
];

const SalonsScreen = () => {
  const animatedValues = useRef(
    mockSalons.map(() => new Animated.Value(0))
  ).current;
  const [userSalonId, setUserSalonId] = useState<string | null>(null); // Salon où est l'utilisateur
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  useEffect(() => {
    Animated.stagger(
      150,
      animatedValues.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 1.2,
          bounciness: 12,
        })
      )
    ).start();
  }, []);

  const handleJoin = (salon: Salon) => {
    setSelectedSalon(salon);
    setModalVisible(true);
  };

  const confirmJoin = () => {
    if (selectedSalon) {
      setUserSalonId(selectedSalon.id);
      setModalVisible(false);
    }
  };

  const handleQuit = () => {
    setUserSalonId(null);
  };

  const renderSalonCard = ({ item, index }: { item: Salon; index: number }) => {
    const scale = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    });
    const rotate = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: ["10deg", "0deg"],
    });

    const isFull = item.participants === item.total;
    const isUserSalon = item.id === userSalonId;

    return (
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale }, { rotateY: rotate }],
            opacity: isFull && !isUserSalon ? 0.5 : 1,
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.amount}>{item.montant} €</Text>
        </View>

        {item.participants === item.total && item.lastWinner && (
          <View style={styles.activeInfo}>
            <Ionicons name="trophy" size={16} color="#FFD700" />
            <Text style={styles.winner}>
              Dernier gagnant : {item.lastWinner}
            </Text>
            <Text style={styles.time}>Prochain tirage : {item.timeLeft}</Text>
          </View>
        )}

        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${(item.participants / item.total) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.participants}>
          {item.participants}/{item.total} participants
        </Text>

        {isUserSalon ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FF3B30" }]}
            onPress={handleQuit}
          >
            <Text style={styles.buttonText}>Quitter</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isFull || userSalonId ? "#ccc" : "#007AFF" },
            ]}
            disabled={isFull || userSalonId !== null}
            onPress={() => handleJoin(item)}
          >
            <Text style={styles.buttonText}>
              {isFull ? "Complet" : "Rejoindre"}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Salons disponibles</Text>

      <FlatList
        data={mockSalons}
        keyExtractor={(item) => item.id}
        renderItem={renderSalonCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Obligations du salon</Text>
            <Text style={styles.modalText}>
              Vous vous apprêtez à rejoindre le {selectedSalon?.name}. Les
              règles de ce salon sont :{"\n"}1 - Vous devez avoir au moins 20€
              sur votre compte.{"\n"}2 - Quand vous quitter un salon déja en
              cours de jeu, vous êtes engagez sur 10 parties.{"\n"}3 - Un compte
              En dessous de 20 parties doit être impérativement rechargé.{"\n"}4
              - Si votre compte n'est pas rechargé avant l'équivalent de 10
              parties, vous serez radié du salon.{"\n"}5 - Même radié d'un
              salon, vous participerez automatiquement jusqu'à la fin des 10
              parties engagées.{"\n"}
            </Text>
            <Button title="Accepter" onPress={confirmJoin} />
            <Button
              title="Annuler"
              color="#888"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SalonsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    paddingTop: 20,
    marginTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    color: "#222",
  },
  listContent: { paddingHorizontal: 16, paddingBottom: 100 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: "700", color: "#333" },
  amount: { fontSize: 16, fontWeight: "600", color: "#007AFF" },
  progressContainer: {
    height: 8,
    backgroundColor: "#EEE",
    borderRadius: 8,
    marginVertical: 8,
    overflow: "hidden",
  },
  progressBar: { height: 8, backgroundColor: "#007AFF", borderRadius: 8 },
  participants: {
    fontSize: 13,
    color: "#666",
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  activeInfo: { alignItems: "center", marginBottom: 8 },
  winner: { fontSize: 13, color: "#555" },
  time: { fontSize: 12, color: "#007AFF", marginTop: 2 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  modalText: { fontSize: 14, marginBottom: 16 },
});
