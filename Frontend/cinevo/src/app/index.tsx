import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";

import { Splash } from "../components/onboarding/Splash";
import { Header } from "../components/onboarding/Header";
import { Hero } from "../components/onboarding/Hero";
import { FeatureCarousel } from "../components/onboarding/FeatureCarousel";
import { Actions } from "../components/onboarding/Actions";

export default function HomeScreen() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        entering={FadeIn.duration(600)}
      >
        <Header />
        <Hero />
        <FeatureCarousel />
        <Actions />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcf9f3",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});
