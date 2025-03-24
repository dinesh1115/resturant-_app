import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const router = useRouter();
  const text = "*DESI TADKA*    DESI TADKA     ";
  const radius = 130; // Wider text circle

  const [appReady, setAppReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      setAppReady(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!appReady) {
    return null; // Don't render until fonts are ready
  }

  const textElements = text.split("").map((char, index) => {
    const angle = (index / text.length) * 360 - 90;
    const x = 140 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 140 + radius * Math.sin((angle * Math.PI) / 180);
    const rotateAngle = angle + 90;

    return (
      <Text
        key={index}
        style={[
          styles.circularText,
          {
            transform: [{ rotate: `${rotateAngle}deg` }],
            top: y,
            left: x,
          },
        ]}
      >
        {char}
      </Text>
    );
  });

  return (
    <ImageBackground
      source={require("../assets/images/restaurant-background.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient colors={["#000000aa", "#00000000"]} style={styles.overlay} />

      {/* Circular Layout */}
      <View style={styles.circleContainer}>
        {textElements}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FF6F61" }]}
            onPress={() => router.push("/menu?type=Dine In")}
          >
            <Text style={styles.buttonText}>Dine In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#28B463" }]}
            onPress={() => router.push("/menu?type=Takeaway")}
          >
            <Text style={styles.buttonText}>Takeaway</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Call Waiter Button */}
      <TouchableOpacity style={styles.callWaiterButton} onPress={() => router.push("/callwaiter")}>
        <Text style={styles.callWaiterText}>Call Waiter</Text>
      </TouchableOpacity>

      {/* Footer */}
      <LinearGradient colors={["#000000aa", "#00000000"]} style={styles.footer}>
        <Text style={styles.footerText}>Delicious Moments Await You!</Text>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  circleContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "25%",
  },
  circularText: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700", // Gold color for elegance
    fontFamily: "Pacifico_400Regular",
    textAlign: "center",
    width: 20,
    height: 20,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  button: {
    width: 180,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    elevation: 5, // For Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  callWaiterButton: {
    position: "absolute",
    bottom: 50,  // Keep it at the bottom
    width: "90%",
    backgroundColor: "#3498DB",
    paddingVertical: 18,
    alignItems: "center",
    borderRadius: 15,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  callWaiterText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  footer: {
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  footerText: {
    color: "white",
    fontSize: 18,
  },
});
