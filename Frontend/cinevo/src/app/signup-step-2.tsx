import { useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, Switch } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const VIBES = [
  { id: '1', emoji: '🌾', label: 'Cozy Indie' },
  { id: '2', emoji: '🪐', label: 'Sci-Fi & Mindful Wonder' },
  { id: '3', emoji: '✨', label: 'Studio Ghibli & Anime' },
  { id: '4', emoji: '🌿', label: 'Nature & Ambient Doc' },
  { id: '5', emoji: '🎭', label: 'Gripping Drama' },
  { id: '6', emoji: '🍿', label: 'Heartwarming Comedy' },
  { id: '7', emoji: '🎬', label: 'Classic 35mm Cinema' },
  { id: '8', emoji: '🕯️', label: 'Slow Cinema & Arthouse' },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function SignupStep2Screen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const VIBES_LIST = [
    { id: '1', label: 'Indie' },
    { id: '2', label: 'Sci-Fi' },
    { id: '3', label: 'Anime' },
    { id: '4', label: 'Documentary' },
    { id: '5', label: 'Drama' },
    { id: '6', label: 'Comedy' },
    { id: '7', label: 'Classic' },
    { id: '8', label: 'Arthouse' },
  ];

  const [selectedVibes, setSelectedVibes] = useState<string[]>(['1', '2', '4', '6']);
  const [comfortPrefs, setComfortPrefs] = useState({
    heated: true,
    sensory: true,
    treats: false,
  });
  
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [birthdayMonth, setBirthdayMonth] = useState('October');
  const [error, setError] = useState("");

  const toggleVibe = (id: string) => {
    setError("");
    setSelectedVibes(prev => 
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const togglePref = (key: keyof typeof comfortPrefs) => {
    setComfortPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleComplete = () => {
    if (selectedVibes.length < 3) {
      setError("Please select at least 3 favorite genres.");
      return;
    }
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <SafeAreaView edges={['top']} style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={isDark ? "#ffffff" : "#1c1c18"} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Preferences</Text>
          <View style={styles.headerPlaceholder} />
        </View>
      </SafeAreaView>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 32) }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Bar Header */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <View style={styles.progressLeft}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>2</Text>
              </View>
              <Text style={styles.stepText}>Step 2 of 2</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.progressBarWrapper}>
            <View style={styles.progressBarActive} />
            <View style={[styles.progressBarActive, styles.progressBarGlow]} />
          </View>
        </View>

        {/* Welcoming Hero Banner Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Personalize your experience</Text>
          <Text style={styles.heroSubtitle}>
            Select genres and seating defaults for curated recommendations.
          </Text>
        </View>

        {/* Section 1: Genre & Vibe Chips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Favorite Genres</Text>
              <Text style={styles.sectionSubtitle}>Select at least 3</Text>
            </View>
            <View style={styles.selectionCount}>
              <Text style={styles.selectionCountText}>{selectedVibes.length} selected</Text>
            </View>
          </View>
          <View style={styles.chipsContainer}>
            {VIBES_LIST.map(vibe => {
              const isSelected = selectedVibes.includes(vibe.id);
              return (
                <TouchableOpacity
                  key={vibe.id}
                  activeOpacity={0.8}
                  style={[styles.chip, isSelected ? styles.chipSelected : styles.chipUnselected]}
                  onPress={() => toggleVibe(vibe.id)}
                >
                  <Text style={[styles.chipText, isSelected ? styles.chipTextSelected : styles.chipTextUnselected]}>
                    {vibe.label}
                  </Text>
                  {isSelected && <MaterialIcons name="check" size={16} color={isDark ? "#1c1c1e" : "#ffffff"} style={{ marginLeft: 4 }} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section 2: Cinema Comfort Preferences */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWrap}>
            <Text style={styles.sectionTitle}>Seating & Audio</Text>
          </View>
          <View style={styles.prefsContainer}>
            
            <TouchableOpacity style={styles.prefRow} activeOpacity={0.7} onPress={() => togglePref('heated')}>
              <View style={styles.prefContent}>
                <View style={[styles.prefIconWrap, { backgroundColor: '#ffdbc8' }]}>
                  <MaterialIcons name="weekend" size={20} color="#753400" />
                </View>
                <Text style={styles.prefTitle}>Heated Recliners</Text>
              </View>
              <Switch 
                value={comfortPrefs.heated} 
                onValueChange={() => togglePref('heated')} 
                trackColor={{ false: '#e5e2dc', true: '#ff7a00' }}
                thumbColor={isDark ? "#1c1c1e" : "#ffffff"}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.prefRow} activeOpacity={0.7} onPress={() => togglePref('sensory')}>
              <View style={styles.prefContent}>
                <View style={[styles.prefIconWrap, { backgroundColor: '#dae2ff' }]}>
                  <MaterialIcons name="volume-down" size={20} color="#3a4666" />
                </View>
                <Text style={styles.prefTitle}>Low-Sensory Audio & Lighting</Text>
              </View>
              <Switch 
                value={comfortPrefs.sensory} 
                onValueChange={() => togglePref('sensory')} 
                trackColor={{ false: '#e5e2dc', true: '#ff7a00' }}
                thumbColor={isDark ? "#1c1c1e" : "#ffffff"}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.prefRow} activeOpacity={0.7} onPress={() => togglePref('treats')}>
              <View style={styles.prefContent}>
                <View style={[styles.prefIconWrap, { backgroundColor: '#f0eee8' }]}>
                  <MaterialIcons name="room-service" size={20} color={isDark ? "#a1a1aa" : "#584235"} />
                </View>
                <Text style={styles.prefTitle}>In-Seat Delivery</Text>
              </View>
              <Switch 
                value={comfortPrefs.treats} 
                onValueChange={() => togglePref('treats')} 
                trackColor={{ false: '#e5e2dc', true: '#ff7a00' }}
                thumbColor={isDark ? "#1c1c1e" : "#ffffff"}
              />
            </TouchableOpacity>

          </View>
        </View>

        {/* Section 3: Home Theater Sanctuary Location */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWrap}>
            <Text style={styles.sectionTitle}>Preferred Theater</Text>
          </View>
          <View style={styles.theaterCard}>
            <View style={styles.theaterHeader}>
              <View style={styles.theaterInfo}>
                <View style={styles.theaterIconWrap}>
                  <MaterialIcons name="storefront" size={20} color="#321200" />
                </View>
                <View>
                  <Text style={styles.theaterTitle}>Cinevo Sunset Pavilion</Text>
                  <Text style={styles.theaterDesc}>1.2 mi away</Text>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.changeBtn}>
                <Text style={styles.changeBtnText}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.theaterPerk}>
              <MaterialIcons name="verified" size={18} color={isDark ? "#ff8c1a" : "#ff7a00"} />
              <Text style={styles.theaterPerkText}>Valet parking included</Text>
            </View>
          </View>
        </View>

        {/* Section 4: Birthday Perk Card */}
        <View style={styles.birthdayCard}>
          <View style={styles.birthdayHeader}>
            <View style={styles.birthdayIconWrap}>
              <MaterialIcons name="cake" size={20} color={isDark ? "#e2e8f0" : "#0d1a38"} />
            </View>
            <View>
              <Text style={styles.birthdayTitle}>Birthday Month</Text>
              <Text style={styles.birthdayDesc}>Popcorn perk on your month</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.birthdayPickerBtn}
            activeOpacity={0.8}
            onPress={() => setShowMonthPicker(true)}
          >
            <Text style={styles.birthdayPickerBtnText}>{birthdayMonth}</Text>
            <MaterialIcons name="expand-more" size={18} color={isDark ? "#94a3b8" : "#525e7f"} />
          </TouchableOpacity>
        </View>

        {/* Bottom Sticky Actions Area */}
        <View style={styles.bottomActions}>
          {error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={16} color={isDark ? "#ff897d" : "#ba1a1a"} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          <TouchableOpacity 
            style={[styles.completeBtn, selectedVibes.length < 3 && styles.completeBtnDisabled]} 
            activeOpacity={0.8} 
            onPress={handleComplete}
          >
            <Text style={styles.completeBtnText}>Complete Setup</Text>
            <MaterialIcons name="arrow-forward" size={20} color={isDark ? "#1c1c1e" : "#ffffff"} />
          </TouchableOpacity>
          <Text style={styles.bottomHintText}>You can change these anytime in Settings.</Text>
        </View>

      </ScrollView>

      {/* Month Picker Modal */}
      <Modal
        visible={showMonthPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMonthPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMonthPicker(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView style={{ maxHeight: 400 }}>
              {MONTHS.map((month) => (
                <TouchableOpacity activeOpacity={0.8}
                  key={month}
                  style={styles.modalOption}
                  onPress={() => {
                    setBirthdayMonth(month);
                    setShowMonthPicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      birthdayMonth === month && styles.modalOptionTextActive,
                    ]}
                  >
                    {month}
                  </Text>
                  {birthdayMonth === month && (
                    <MaterialIcons name="check" size={18} color={isDark ? "#ffb370" : "#994700"} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: (isDark ? '#121212' : '#fcf9f3'),
  },
  safeHeader: {
    backgroundColor: (isDark ? 'rgba(18, 18, 18, 0.8)' : 'rgba(252, 249, 243, 0.8)'),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.04)',
    zIndex: 50,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  profileWrapper: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: (isDark ? '#ffb370' : '#994700'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  // Progress Header
  progressSection: {
    paddingTop: 12,
    gap: 8,
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#1c1c1e' : '#ffffff'),
  },
  stepText: {
    fontSize: 14,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: (isDark ? '#94a3b8' : '#525e7f'),
  },
  progressBarWrapper: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 4,
  },
  progressBarActive: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: (isDark ? '#ff8c1a' : '#ff7a00'),
  },
  progressBarGlow: {
    shadowColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  // Hero Banner
  heroCard: {
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    borderRadius: 32,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#2e3a59',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    gap: 4,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  heroSubtitle: {
    fontSize: 13,
    color: (isDark ? '#a1a1aa' : '#584235'),
  },
  // Sections common
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderWrap: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: (isDark ? '#a1a1aa' : '#584235'),
  },
  selectionCount: {
    backgroundColor: (isDark ? '#1d2a4a' : '#dae2ff'),
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  selectionCountText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#3a4666',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  chipSelected: {
    backgroundColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chipUnselected: {
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  chipEmoji: {
    fontSize: 16,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  chipTextSelected: {
    color: (isDark ? '#1c1c1e' : '#ffffff'),
  },
  chipTextUnselected: {
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  // Comfort Prefs
  prefsContainer: {
    gap: 8,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    padding: 16,
    borderRadius: 16,
    shadowColor: '#2e3a59',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  prefContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  prefIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefTextCol: {
    flex: 1,
  },
  prefTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  prefDesc: {
    fontSize: 13,
    color: (isDark ? '#a1a1aa' : '#584235'),
    marginTop: 2,
  },
  // Home Theater
  theaterCard: {
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    borderRadius: 16,
    padding: 16,
    shadowColor: '#2e3a59',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },
  theaterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  theaterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  theaterIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? '#4a2e1b' : '#ffdbc8'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  theaterTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  theaterDesc: {
    fontSize: 13,
    color: (isDark ? '#a1a1aa' : '#584235'),
  },
  changeBtn: {
    backgroundColor: (isDark ? '#2c2c2e' : '#f0eee8'),
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  changeBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#94a3b8' : '#525e7f'),
  },
  theaterPerk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: (isDark ? '#1c1c1e' : '#f6f3ed'),
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  theaterPerkText: {
    fontSize: 13,
    color: (isDark ? '#a1a1aa' : '#584235'),
    flex: 1,
  },
  // Birthday
  birthdayCard: {
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    borderRadius: 16,
    padding: 20,
    shadowColor: '#2e3a59',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
    marginBottom: 24,
  },
  birthdayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  birthdayIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: (isDark ? '#1d2a4a' : '#dae2ff'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  birthdayEmoji: {
    fontSize: 20,
  },
  birthdayTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  birthdayDesc: {
    fontSize: 13,
    color: (isDark ? '#a1a1aa' : '#584235'),
  },
  birthdayPickerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: (isDark ? '#2c2c2e' : '#f0eee8'),
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  birthdayPickerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  birthdayPickerLabelText: {
    fontSize: 14,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  birthdayPickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  birthdayPickerBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  birthdayPerkDesc: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
  },
  birthdayPerkDescText: {
    flex: 1,
    fontSize: 13,
    color: (isDark ? '#a1a1aa' : '#584235'),
    lineHeight: 20,
  },
  // Bottom Actions
  bottomActions: {
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
    alignItems: 'center',
  },
  completeBtn: {
    width: '100%',
    height: 52,
    backgroundColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 6,
  },
  completeBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: (isDark ? '#1c1c1e' : '#ffffff'),
  },
  completeBtnDisabled: {
    backgroundColor: (isDark ? 'rgba(255, 140, 26, 0.5)' : 'rgba(255, 122, 0, 0.5)'),
  },
  bottomHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bottomHintText: {
    fontSize: 13,
    color: (isDark ? '#a1a1aa' : '#584235'),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: (isDark ? '#410002' : '#ffdad6'),
    padding: 12,
    borderRadius: 8,
    gap: 8,
    width: '100%',
  },
  errorText: {
    color: (isDark ? '#ffb4ab' : '#93000a'),
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 24,
    width: "100%",
    maxWidth: 320,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  modalOptionText: {
    fontSize: 16,
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  modalOptionTextActive: {
    fontWeight: "700",
    color: (isDark ? "#ffb370" : "#994700"),
  },
});
