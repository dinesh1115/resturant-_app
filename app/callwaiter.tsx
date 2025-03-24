import { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function CallWaiterScreen() {
  const router = useRouter();
  const [assistanceMessage, setAssistanceMessage] = useState<string | null>(null);

  const requestAssistance = (item: string) => {
    setAssistanceMessage(`Waiter is coming with ${item}...`);
    
    // Simulate a short delay before hiding the message
    setTimeout(() => setAssistanceMessage(null), 5000);
  };

  return (
    <ImageBackground
      source={require("../assets/images/restaurant-background.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>How can we assist you?</Text>

        {assistanceMessage ? (
          <Text style={styles.waiterMessage}>{assistanceMessage}</Text>
        ) : (
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={() => requestAssistance("Water")}>
              <Text style={styles.optionText}>Water</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton} onPress={() => requestAssistance("Table Cleaning")}>
              <Text style={styles.optionText}>Table Cleaning</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton} onPress={() => requestAssistance("Sauce")}>
              <Text style={styles.optionText}>Sauce</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionButton} onPress={() => requestAssistance("Other Assistance")}>
              <Text style={styles.optionText}>Other</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  waiterMessage: {
    color: "#f1c40f",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  optionButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10,
  },
  optionText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  backText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
