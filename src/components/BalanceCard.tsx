import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from "react-native";
import { userBalance } from "../services/mockData";

const BalanceCard = () => {
  const [balance, setBalance] = useState(userBalance.balance);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");

  const handleRecharge = () => {
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0) {
      setBalance(balance + val);
      setAmount("");
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Solde actuel</Text>
      <Text style={styles.balance}>{balance} €</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Recharger</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recharger votre compte</Text>
            <TextInput
              style={styles.input}
              placeholder="Montant €"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <Button title="Valider" onPress={handleRecharge} />
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

export default BalanceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  balance: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
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
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
});
