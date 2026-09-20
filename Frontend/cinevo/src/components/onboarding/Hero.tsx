import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";

export function Hero() {
  return (
    <View style={styles.heroSection}>
      <View style={styles.heroImageWrapper}>
        <View style={styles.heroImageGlow} />
        <View style={styles.heroImageInner}>
          <Image
            source={require("@/assets/images/app.icon.svg")}
            style={styles.heroImage}
          />
        </View>
        <View style={styles.badgeWrapper}>
          <MaterialIcons name="spa" size={18} color="#ff7a00" />
        </View>
      </View>

      <View style={styles.chip}>
        <MaterialIcons name="auto-awesome" size={16} color="#994700" />
        <Text style={styles.chipText}>Peace of mind, at 24 frames per sec</Text>
      </View>

      <Text style={styles.mainTitle}>
        Cinema, Made <Text style={styles.titleHighlight}>Mindful</Text> & Cozy
      </Text>
      <Text style={styles.mainSubtitle}>
        Effortless seat booking, plush heated loungers, and artisan warm bites
        delivered right to your seat with zero stress.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    alignItems: "center",
    marginTop: 16,
  },
  heroImageWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 128,
    height: 128,
  },
  heroImageGlow: {
    position: "absolute",
    width: "120%",
    height: "120%",
    borderRadius: 999,
    backgroundColor: "#ffdbc8",
    opacity: 0.5,
  },
  heroImageInner: {
    width: 128,
    height: 128,
    borderRadius: 64,
    padding: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  badgeWrapper: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "#ffffff",
    padding: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#ffdbc8",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 20,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#321200",
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1c1c18",
    textAlign: "center",
    marginTop: 16,
    maxWidth: 320,
    lineHeight: 38,
  },
  titleHighlight: {
    color: "#ff7a00",
  },
  mainSubtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#584235",
    textAlign: "center",
    marginTop: 12,
    maxWidth: 340,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
});
