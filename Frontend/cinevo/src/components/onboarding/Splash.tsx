import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

interface SplashProps {
  onFinish: () => void;
}

export function Splash({ onFinish }: SplashProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      scale.value = withTiming(5, { duration: 500 });
      opacity.value = withTiming(0, { duration: 500 }, (finished) => {
        if (finished) {
          runOnJS(onFinish)();
        }
      });
    }, 1200);

    return () => clearTimeout(splashTimer);
  }, [onFinish, scale, opacity]);

  const animatedSplashStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.splashContainer}>
      <Animated.View style={[styles.splashIconContainer, animatedSplashStyle]}>
        <Image
          source={require("@/assets/images/app.icon.svg")}
          style={styles.splashIcon}
          contentFit="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  splashIconContainer: {
    width: 200,
    height: 200,
  },
  splashIcon: {
    width: "100%",
    height: "100%",
  },
});
