import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.headerIconWrapper}>
          <MaterialIcons name="movie-filter" size={18} color="#994700" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Movie Time</Text>
          <Text style={styles.headerSubtitle}>MINDFUL CINEMA</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.skipBtn} activeOpacity={0.7}>
        <Text style={styles.skipTxt}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffdbc8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c1c18',
    lineHeight: 22,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#994700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  skipBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#f6f3ed',
  },
  skipTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#525e7f',
  },
});
