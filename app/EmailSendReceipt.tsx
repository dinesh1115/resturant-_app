import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const EmailSendReceipt: React.FC = () => {
  const [email, setEmail] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendEmail = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter an email address.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.101:5000//send-receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", `Receipt sent to ${email}!`);
        setEmail("");
      } else {
        Alert.alert("Error", data.message || "Could not send the email.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect to the server. Check your network.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Email to Receive Receipt</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.sendButton} onPress={sendEmail}>
        <Text style={styles.buttonText}>Send Receipt</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
  sendButton: { backgroundColor: "blue", padding: 15, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 16, textAlign: "center" },
});

export default EmailSendReceipt;
