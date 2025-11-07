import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  Image,
} from "react-native";
import { userBalance } from "../services/mockData";

const HeaderBalance = () => {
  const [balance, setBalance] = useState(userBalance.balance);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");

  const handleRecharge = () => {
    const val = parseFloat(amount.replace(",", "."));
    if (!isNaN(val) && val > 10) {
      setBalance(balance + val);
      setAmount("");
      setAmountError("");
      setModalVisible(false);
    } else {
      setAmountError("Le montant doit être supérieur à 10€");
    }
  };

  const handleModalClose = () => {
    setAmount("");
    setAmountError("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>{balance} €</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recharger votre compte</Text>
            <View style={{ marginBottom: 16 }}>
              <TextInput
                style={styles.input}
                placeholder="Montant minimum 10€"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
              {amountError ? (
                <Text style={{ color: "red", paddingBottom: 10 }}>
                  {amountError}
                </Text>
              ) : null}
            </View>
            <View style={{ marginVertical: 5 }}>
              <Button title="Valider" onPress={handleRecharge} />
            </View>
            <View style={{ marginVertical: 5 }}>
              <Button title="Annuler" color="#888" onPress={handleModalClose} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HeaderBalance;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginVertical: 20,
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  rechargeBtn: {
    borderRadius: 8,
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
  },
  image: {
    width: 35,
    height: 35,
  },
});
