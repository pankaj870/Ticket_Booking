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
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [selectedVibes, setSelectedVibes] = useState<string[]>(['1', '2', '4', '6']);
  const [comfortPrefs, setComfortPrefs] = useState({
    heated: true,
    sensory: true,
    treats: false,
    cc: false,
  });
  
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [birthdayMonth, setBirthdayMonth] = useState('October');

  const toggleVibe = (id: string) => {
    setSelectedVibes(prev => 
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const togglePref = (key: keyof typeof comfortPrefs) => {
    setComfortPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <SafeAreaView edges={['top']} style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color="#1c1c18" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={styles.profileWrapper}>
            <View style={styles.profileInner}>
              <MaterialIcons name="person" size={18} color="#ffffff" />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 32) }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Header */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <View style={styles.progressLeft}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>2</Text>
              </View>
              <Text style={styles.stepText}>Step 2 of 2: Movie Vibes</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.progressBarWrapper}>
            <View style={styles.progressBarActive} />
            <View style={[styles.progressBarActive, styles.progressBarGlow]} />
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <View style={styles.heroTextCol}>
              <View style={styles.heroBadge}>
                <MaterialIcons name="auto-awesome" size={14} color="#753400" />
                <Text style={styles.heroBadgeText}>CURATED SANCTUARY</Text>
              </View>
              <Text style={styles.heroTitle}>Tailor your cinema sanctuary ✨</Text>
              <Text style={styles.heroSubtitle}>
                Pick your favorite genres and cozy comfort preferences so we can recommend mindful screenings and celebrate your cinema rituals.
              </Text>
            </View>
            <View style={styles.heroIconWrap}>
              <MaterialIcons name="chair" size={36} color="#ff7a00" />
            </View>
          </View>
        </View>

        {/* Section 1: Vibes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Cinema Moods & Genres</Text>
              <Text style={styles.sectionSubtitle}>Tap to pick at least 3 favorites</Text>
            </View>
            <View style={styles.selectionCount}>
              <Text style={styles.selectionCountText}>{selectedVibes.length} selected</Text>
            </View>
          </View>
          <View style={styles.chipsContainer}>
            {VIBES.map(vibe => {
              const isSelected = selectedVibes.includes(vibe.id);
              return (
                <TouchableOpacity
                  key={vibe.id}
                  activeOpacity={0.8}
                  style={[styles.chip, isSelected ? styles.chipSelected : styles.chipUnselected]}
                  onPress={() => toggleVibe(vibe.id)}
                >
                  <Text style={styles.chipEmoji}>{vibe.emoji}</Text>
                  <Text style={[styles.chipText, isSelected ? styles.chipTextSelected : styles.chipTextUnselected]}>
                    {vibe.label}
                  </Text>
                  {isSelected && <MaterialIcons name="check" size={16} color="#ffffff" style={{ marginLeft: 4 }} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Section 2: Comfort */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWrap}>
            <Text style={styles.sectionTitle}>Screening Comfort Preferences</Text>
            <Text style={styles.sectionSubtitle}>We adapt auditorium selection and seating suggestions</Text>
          </View>
          <View style={styles.prefsContainer}>
            
            <TouchableOpacity style={styles.prefRow} activeOpacity={0.7} onPress={() => togglePref('heated')}>
              <View style={styles.prefContent}>
                <View style={[styles.prefIconWrap, { backgroundColor: '#ffdbc8' }]}>
                  <MaterialIcons name="weekend" size={22} color="#753400" />
                </View>
                <View style={styles.prefTextCol}>
                  <Text style={styles.prefTitle}>Heated Cloud Lounger Preferred</Text>
                  <Text style={styles.prefDesc} numberOfLines={1}>Auto-reserve plush ergonomic recliners</Text>
                </View>
              </View>
              <Switch 
                value={comfortPrefs.heated} 
                onValueChange={() => togglePref('heated')} 
                trackColor={{ false: '#e5e2dc', true: '#ff7a00' }}
                thumbColor="#ffffff"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.prefRow} activeOpacity={0.7} onPress={() => togglePref('sensory')}>
              <View style={styles.prefContent}>
                <View style={[styles.prefIconWrap, { backgroundColor: '#dae2ff' }]}>
                  <MaterialIcons name="volume-down" size={22} color="#3a4666" />
                </View>
                <View style={styles.prefTextCol}>
                  <Text style={styles.prefTitle}>Low-Sensory / Quiet Screenings</Text>
                  <Text style={styles.prefDesc} numberOfLines={1}>Calibrated decibels & ambient dim lighting</Text>
                </View>
              </View>
              <Switch 
                value={comfortPrefs.sensory} 
                onValueChange={() => togglePref('sensory')} 
                trackColor={{ false: '#e5e2dc', true: '#ff7a00' }}
                thumbColor="#ffffff"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.prefRow} activeOpacity={0.7} onPress={() => togglePref('treats')}>
              <View style={styles.prefContent}>
                <View style={[styles.prefIconWrap, { backgroundColor: '#f0eee8' }]}>
                  <MaterialIcons name="room-service" size={22} color="#584235" />
                </View>
                <View style={styles.prefTextCol}>
                  <Text style={styles.prefTitle}>In-Seat Treat Delivery</Text>
                  <Text style={styles.prefDesc} numberOfLines={1}>Silent snack drop-off prior to previews</Text>
                </View>
              </View>
              <Switch 
                value={comfortPrefs.treats} 
                onValueChange={() => togglePref('treats')} 
                trackColor={{ false: '#e5e2dc', true: '#ff7a00' }}
                thumbColor="#ffffff"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.prefRow} activeOpacity={0.7} onPress={() => togglePref('cc')}>
              <View style={styles.prefContent}>
                <View style={[styles.prefIconWrap, { backgroundColor: '#f0eee8' }]}>
                  <MaterialIcons name="closed-caption" size={22} color="#584235" />
                </View>
                <View style={styles.prefTextCol}>
                  <Text style={styles.prefTitle}>Accessibility & Closed Captions</Text>
                  <Text style={styles.prefDesc} numberOfLines={1}>Show screenings with CC and assistive devices</Text>
                </View>
              </View>
              <Switch 
                value={comfortPrefs.cc} 
                onValueChange={() => togglePref('cc')} 
                trackColor={{ false: '#e5e2dc', true: '#ff7a00' }}
                thumbColor="#ffffff"
              />
            </TouchableOpacity>

          </View>
        </View>

        {/* Section 3: Home Theater */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWrap}>
            <Text style={styles.sectionTitle}>Preferred Home Theater</Text>
            <Text style={styles.sectionSubtitle}>Your default venue for reservations and warm welcomes</Text>
          </View>
          <View style={styles.theaterCard}>
            <View style={styles.theaterHeader}>
              <View style={styles.theaterInfo}>
                <View style={styles.theaterIconWrap}>
                  <MaterialIcons name="storefront" size={20} color="#321200" />
                </View>
                <View>
                  <Text style={styles.theaterTitle}>Cinevo Sunset Pavilion</Text>
                  <Text style={styles.theaterDesc}>Hollywood Hills • 1.2 mi away</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.changeBtn}>
                <Text style={styles.changeBtnText}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.theaterPerk}>
              <MaterialIcons name="verified" size={18} color="#ff7a00" />
              <Text style={styles.theaterPerkText}>Complimentary valet parking & herbal tea lounge included</Text>
            </View>
          </View>
        </View>

        {/* Section 4: Birthday Perk */}
        <View style={styles.birthdayCard}>
          <View style={styles.birthdayHeader}>
            <View style={styles.birthdayIconWrap}>
              <Text style={styles.birthdayEmoji}>🎂</Text>
            </View>
            <View>
              <Text style={styles.birthdayTitle}>Birthday Cinema Treat</Text>
              <Text style={styles.birthdayDesc}>A cozy tradition on your special day</Text>
            </View>
          </View>
          
          <View style={styles.birthdayPickerWrap}>
            <View style={styles.birthdayPickerLabel}>
              <MaterialIcons name="calendar-today" size={20} color="#525e7f" />
              <Text style={styles.birthdayPickerLabelText}>Birthday Month:</Text>
            </View>
            <TouchableOpacity 
              style={styles.birthdayPickerBtn}
              activeOpacity={0.8}
              onPress={() => setShowMonthPicker(true)}
            >
              <Text style={styles.birthdayPickerBtnText}>{birthdayMonth}</Text>
              <MaterialIcons name="expand-more" size={18} color="#525e7f" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.birthdayPerkDesc}>
            <MaterialIcons name="redeem" size={18} color="#ff7a00" style={{ marginTop: 2 }} />
            <Text style={styles.birthdayPerkDescText}>
              We'll send a voucher for complimentary artisan organic salted-caramel popcorn on the 1st of {birthdayMonth}!
            </Text>
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.completeBtn} activeOpacity={0.8} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.completeBtnText}>Complete Setup & Enter Cinevo</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.bottomHint}>
            <MaterialIcons name="tune" size={16} color="#584235" />
            <Text style={styles.bottomHintText}>You can customize your vibe preferences anytime in Settings</Text>
          </View>
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
                <TouchableOpacity
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
                    <MaterialIcons name="check" size={18} color="#994700" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf9f3',
  },
  safeHeader: {
    backgroundColor: 'rgba(252, 249, 243, 0.8)',
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
    color: '#1c1c18',
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
    backgroundColor: '#994700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  // Progress Header
  progressContainer: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
    backgroundColor: '#ff7a00',
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
    color: '#ffffff',
  },
  stepText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1c1c18',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#525e7f',
  },
  progressBarWrapper: {
    flexDirection: 'row',
    gap: 8,
  },
  progressBarActive: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff7a00',
  },
  progressBarGlow: {
    shadowColor: '#ff7a00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  // Hero Banner
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#2e3a59',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  heroTextCol: {
    flex: 1,
    gap: 12,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffdbc8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#753400',
    letterSpacing: 0.6,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1c1c18',
    lineHeight: 32,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#584235',
    lineHeight: 20,
  },
  heroIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#f0eee8',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#1c1c18',
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#584235',
  },
  selectionCount: {
    backgroundColor: '#dae2ff',
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
    backgroundColor: '#ff7a00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chipUnselected: {
    backgroundColor: '#ffffff',
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
    color: '#ffffff',
  },
  chipTextUnselected: {
    color: '#1c1c18',
  },
  // Comfort Prefs
  prefsContainer: {
    gap: 8,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
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
    color: '#1c1c18',
  },
  prefDesc: {
    fontSize: 13,
    color: '#584235',
    marginTop: 2,
  },
  // Home Theater
  theaterCard: {
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffdbc8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  theaterTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1c1c18',
  },
  theaterDesc: {
    fontSize: 13,
    color: '#584235',
  },
  changeBtn: {
    backgroundColor: '#f0eee8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  changeBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#525e7f',
  },
  theaterPerk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f6f3ed',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  theaterPerkText: {
    fontSize: 13,
    color: '#584235',
    flex: 1,
  },
  // Birthday
  birthdayCard: {
    backgroundColor: '#ffffff',
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
    backgroundColor: '#dae2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  birthdayEmoji: {
    fontSize: 20,
  },
  birthdayTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1c1c18',
  },
  birthdayDesc: {
    fontSize: 13,
    color: '#584235',
  },
  birthdayPickerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0eee8',
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
    color: '#1c1c18',
  },
  birthdayPickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ffffff',
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
    color: '#1c1c18',
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
    color: '#584235',
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
    backgroundColor: '#ff7a00',
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#ff7a00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 6,
  },
  completeBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  bottomHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bottomHintText: {
    fontSize: 13,
    color: '#584235',
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
    backgroundColor: "#ffffff",
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
    color: "#1c1c18",
  },
  modalOptionTextActive: {
    fontWeight: "700",
    color: "#994700",
  },
});
