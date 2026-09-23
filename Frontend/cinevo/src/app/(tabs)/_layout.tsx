import { useColorScheme } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet, Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderTopWidth: 1,
          borderTopColor: isDark ? '#333333' : '#EAE4D8',
          height: (Platform.OS === 'ios' ? 64 : 70) + insets.bottom,
          paddingBottom: insets.bottom + (Platform.OS === 'ios' ? 0 : 8),
          paddingTop: 8,
          position: 'absolute', // For blur effect to work correctly
        },
        tabBarActiveTintColor: isDark ? '#FF8C1A' : '#FF7A00',
        tabBarInactiveTintColor: isDark ? '#94A3B8' : '#6E6966',
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 11,
          letterSpacing: -0.2,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <MaterialIcons name="movie" size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Tickets',
          tabBarIcon: ({ color }) => <MaterialIcons name="confirmation-number" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="snacks"
        options={{
          title: 'Snacks',
          tabBarIcon: ({ color }) => <MaterialIcons name="fastfood" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  iconWrapper: {
    width: 44,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: (isDark ? 'rgba(255, 140, 26, 0.15)' : 'rgba(255, 122, 0, 0.15)'),
  }
});
