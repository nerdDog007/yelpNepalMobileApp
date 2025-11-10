import * as Location from "expo-location";
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { setLat, setLong } from "../../../redux/slices/logSlice";

export default function LocationRequest() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  console.log("this")
  const requestLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    console.log("thisss")
    try {
      console.log("Requesting location permission...");
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Permission status:", status);

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      dispatch(setLat(location.coords.latitude));
      dispatch(setLong(location.coords.longitude));
      setLoading(false);
    } catch (error) {
      console.error("Location error:", error);
      setErrorMsg("Error getting location. Make sure your GPS is on or emulator has a location set.");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}
          onPress={() => router.push("/(tabs)/Dashboard")}
        >Enable Your Location</Text>
        <Text style={styles.subtitle}>
          We need your location to show nearby restaurants and cafes.
        </Text>
        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
        <TouchableOpacity style={styles.button} onPress={requestLocation} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Loading..." : "Allow Location"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  card: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20, textAlign: "center" },
  button: { backgroundColor: "#ff5a5f", paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8 },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
});
