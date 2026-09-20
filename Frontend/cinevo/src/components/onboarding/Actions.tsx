import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export function Actions() {
  const router = useRouter();

  return (
    <View style={styles.actions}>
      <TouchableOpacity
        style={styles.btnPrimary}
        activeOpacity={0.8}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.btnPrimaryText}>Get Started</Text>
        <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnSecondary}
        activeOpacity={0.8}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.btnSecondaryText}>I already have an account</Text>
      </TouchableOpacity>

      <View style={styles.guestContainer}>
        <TouchableOpacity style={styles.btnGhost} activeOpacity={0.6}>
          <Text style={styles.btnGhostText}>Explore showtimes as guest</Text>
          <MaterialIcons name="arrow-outward" size={16} color="#994700" />
        </TouchableOpacity>
        <Text style={styles.guestSubtitle}>
          No account required to browse previews & menus
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    marginTop: 24,
    gap: 12,
    width: "100%",
  },
  btnPrimary: {
    flexDirection: "row",
    height: 56,
    backgroundColor: "#ff7a00",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#ff7a00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  btnPrimaryText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  btnSecondary: {
    height: 56,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  btnSecondaryText: {
    color: "#1c1c18",
    fontSize: 16,
    fontWeight: "700",
  },
  guestContainer: {
    alignItems: "center",
    marginTop: 8,
    paddingBottom: 16,
  },
  btnGhost: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  btnGhostText: {
    color: "#994700",
    fontSize: 14,
    fontWeight: "700",
  },
  guestSubtitle: {
    fontSize: 13,
    color: "#584235",
    marginTop: 4,
  },
});
