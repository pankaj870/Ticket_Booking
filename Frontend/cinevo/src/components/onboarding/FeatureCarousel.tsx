import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FEATURES = [
  {
    id: '1',
    icon: "🍿",
    iconBg: "#ffdbc8",
    title: "Artisan Seat Delivery",
    subtitle: "Organic snacks & beverages brought quietly"
  },
  {
    id: '2',
    icon: "🛋️",
    iconBg: "#dae2ff",
    title: "Heated Cloud Loungers",
    subtitle: "Spacious ergonomics with private acoustic pods"
  },
  {
    id: '3',
    icon: "⚡",
    iconBg: "#e4dfff",
    title: "Zen Cancellation",
    subtitle: "100% full refund up to 2 hours prior to show"
  }
];

function FeatureCard({ icon, iconBg, title, subtitle }: { icon: string, iconBg: string, title: string, subtitle: string }) {
  return (
    <View style={styles.featureCard}>
      <View style={[styles.featureIconContainer, { backgroundColor: iconBg }]}>
        <Text style={styles.featureEmoji}>{icon}</Text>
      </View>
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.featureSubtitle} numberOfLines={2}>{subtitle}</Text>
      </View>
      <MaterialIcons name="check-circle" size={20} color="#ff7a00" />
    </View>
  );
}

export function FeatureCarousel() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIndex((prev) => {
        const nextIndex = (prev + 1) % FEATURES.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <View style={styles.featuresContainer}>
        <FlatList
          ref={flatListRef}
          data={FEATURES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={(e) => {
            const offsetX = e.nativeEvent.contentOffset.x;
            const currentIndex = Math.round(offsetX / (width - 32));
            if (
              currentIndex !== activeFeatureIndex && 
              currentIndex >= 0 && 
              currentIndex < FEATURES.length
            ) {
              setActiveFeatureIndex(currentIndex);
            }
          }}
          renderItem={({ item }) => (
            <View style={styles.featureItemWrapper}>
              <FeatureCard
                icon={item.icon}
                iconBg={item.iconBg}
                title={item.title}
                subtitle={item.subtitle}
              />
            </View>
          )}
        />
      </View>

      <View style={styles.pagination}>
        {FEATURES.map((_, index) => (
          <Animated.View 
            key={index}
            style={[
              styles.dot, 
              activeFeatureIndex === index ? styles.dotActive : styles.dotInactive
            ]} 
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  featuresContainer: {
    marginTop: 24,
    width: '100%',
  },
  featureItemWrapper: {
    width: width - 32,
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c1c18',
    lineHeight: 24,
  },
  featureSubtitle: {
    fontSize: 13,
    color: '#584235',
    lineHeight: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 28,
    backgroundColor: '#ff7a00',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#e5e2dc',
  },
});
