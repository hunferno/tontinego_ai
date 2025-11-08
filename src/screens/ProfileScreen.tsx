import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  ScrollView,
  Button,
} from "react-native";
import Constants from "expo-constants";

const ProfileScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#121212" : "#F7F9FC" },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[styles.sectionTitle, { color: darkMode ? "#fff" : "#222" }]}
        >
          Profil
        </Text>
        <View style={styles.card}>
          <Text style={[styles.label, { color: darkMode ? "#ccc" : "#555" }]}>
            Nom :
          </Text>
          <Text style={[styles.info, { color: darkMode ? "#fff" : "#222" }]}>
            Jean Dupont
          </Text>
          <Text style={[styles.label, { color: darkMode ? "#ccc" : "#555" }]}>
            Email :
          </Text>
          <Text style={[styles.info, { color: darkMode ? "#fff" : "#222" }]}>
            jean.dupont@mail.com
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={[styles.sectionTitle, { color: darkMode ? "#fff" : "#222" }]}
        >
          Préférences
        </Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={[styles.label, { color: darkMode ? "#fff" : "#222" }]}>
              Mode sombre
            </Text>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
          </View>
        </View>

        <Text
          style={[styles.sectionTitle, { color: darkMode ? "#fff" : "#222" }]}
        >
          Informations
        </Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Conditions d'utilisation</Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.info,
              { marginTop: 10, color: darkMode ? "#fff" : "#222" },
            ]}
          >
            Version : 1.0.0
          </Text>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Conditions d'utilisation</Text>
              <Text style={styles.modalText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                efficitur, nunc eu vulputate tincidunt, ex libero dapibus neque,
                ac convallis justo enim a magna.
                {/* Tu pourras remplacer par le vrai texte */}
              </Text>
              <Button title="Fermer" onPress={() => setModalVisible(false)} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Constants.statusBarHeight },
  content: { padding: 20, paddingBottom: 100 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  label: { fontSize: 14, marginBottom: 4 },
  info: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    maxHeight: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  modalText: { fontSize: 14, marginBottom: 20 },
});
