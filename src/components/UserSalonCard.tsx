import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Salon } from "../utils/types";



const UserSalonCard = () => {
  const [userSalon, setUserSalon] = useState<Salon | null>(null);

  const handleJoinSalon = () => {
    // plus tard : rediriger vers l’écran “Salons”
    console.log("Naviguer vers la page Salons");
  };

  const handleOpenSalon = () => {
    // plus tard : rediriger vers le salon actuel
    console.log("Ouvrir le salon actuel");
  };

  return (
    <View style={styles.container}>
      {userSalon ? (
        <View style={styles.card}>
          <Text style={styles.title}>Votre salon actuel</Text>
          <Text style={styles.salonName}>{userSalon.name}</Text>
          <Text style={styles.amount}>{userSalon.montant} €</Text>
          <Text style={styles.participants}>
            {userSalon.participants}/{userSalon.total} participants
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleOpenSalon}>
            <Text style={styles.buttonText}>Voir le salon</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>Vous n’êtes inscrit à aucun salon</Text>
          <Text style={styles.subtitle}>
            Rejoignez un salon et tentez votre chance !
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleJoinSalon}>
            <Text style={styles.buttonText}>S’inscrire à un salon</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default UserSalonCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  salonName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 8,
  },
  participants: {
    fontSize: 14,
    color: "#777",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
