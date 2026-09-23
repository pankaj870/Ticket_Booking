import { useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ImageBackground, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const CAST = [
  { id: '1', name: 'Ken Sato', role: 'Kenji', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfG5upeDNlqoz8Lpz3hUxGDvvJoAtDPEAnsJanEt1jHuOjBEArtYS3S7BVEu0pTNLQm7B9QcdH2bm28FHtlD9OU_ZmEvyKiPg_MDGbSfGWDtVeMka050hfvgFmrT-ujqoYxsoxXrHD-oYqnIVxGTALJ0m_jThmMnEapb3-JzZ-J2XDMMAsp_PW6IfLtDJDQV6q9FPSlIWA8odsQYHprpCCufyBkNf9BG2svXDffbFJkR52sGzbIjBa' },
  { id: '2', name: 'Rinko T.', role: 'Hana', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwX78h0H-pm9SZNfM1iYjqs3yHSIk2MdVVdOfh-e2iqTUTzd0jRpZ-nx8_H4mVd7OhtKJWrDRZSLuFSuv0MH9Hmw_RV3IwTQvrM0Dlrv4Ta_B7bazNZMGmm_a5uPQsTKELXXW8x8g98V7InoXFc5NixMAAnteo2m4SChjmHftOhzBvDMV2IdItKG_TmgoU5fdFG_MvRzauR-TybdBXmW34JHSA2A7yrKNHFbJPdh_SFM6TsMRinTCD' },
  { id: '3', name: 'H. Amano', role: 'Director', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3I3AiKsJ61IHpKLqVrDLIdwKC9TLreBX2VgPFODf5iX57FjKPB1IkthSMDzuwK9R7ZlLP41codB-vJakAjl5x2c6vWZgIp673oLebKC6UAfA_Bfocvt5f8rrd29QdX5zvoGK4qd8IbAZLeV1k6poCILNVl_NVRAlA5RyPTpY8wqPeqAEKqjR9aFMveEyiPWkbwm7SjQmnvZ0N6mKrELmVJiNWa3jcGQ22HUIthb9OsAS2e_0u4fcp' },
  { id: '4', name: 'Yuki Mori', role: 'Score', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpyvkkSSqmqY82qR7KtYyAvTbCkBYO0jgw9petHJM4gqK-4TmX43GoMCDRainGaN__Ne_fuhGxVAIMR8UL8TcIOVmxgNJTbRwNdlmgmnPZrIrMyjzxlpke9AmQeW9p-DIycfs_fZAdRsLGbSrRO1Mnb_3SNBkpfwF0w8llxI0zefhPxNM3gY3hHloco6y68VMcaf_t2xMRO2Hn0d-k0GrEQ2CNmtodcAXe0tSpViF7WU4y4XwfwJ8f' },
  { id: '5', name: 'Daiki C.', role: 'Tatsuya', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_WTUsp7k8mlY0_EY_J735si-FEeEP0lW-A9sLoHTZzVEeZ7pkjZn-Ze6rEK_K05Lg7Oi6nbDE2qAe3z2ZgQRvzAglcfq1OJW_zb7dpfg179Qw1q1W53idqqil6WdWtqCFU0CmUjPSHdOYp_XNKxIUDp2vaBR4KCestnh35sp8bInZ91ZxgylJcUjSOja7ddaqvvh5p8Zs8CHWf_91oJCVuZyQCEnQkoWX42P41_RFD9GeCsa2o5Yp' },
];

const DATES = [
  { id: '1', day: 'TODAY', num: '24', month: 'Thu', full: 'Today Oct 24' },
  { id: '2', day: 'FRI', num: '25', month: 'Oct', full: 'Fri Oct 25' },
  { id: '3', day: 'SAT', num: '26', month: 'Oct', full: 'Sat Oct 26' },
  { id: '4', day: 'SUN', num: '27', month: 'Oct', full: 'Sun Oct 27' },
  { id: '5', day: 'MON', num: '28', month: 'Oct', full: 'Mon Oct 28' },
];

const SHOWTIMES = [
  { id: '1', time: '14:00', format: '2D Standard', price: '18.00', status: 'Available' },
  { id: '2', time: '17:30', format: 'IMAX 4K', price: '22.50', status: 'Filling Fast' },
  { id: '3', time: '20:30', format: 'Laser 4K', price: '18.00', status: 'Selected' },
  { id: '4', time: '23:15', format: 'IMAX 3D', price: '26.00', status: 'Available' },
];

export default function MovieDetailsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [isFavorite, setIsFavorite] = useState(true);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  return (
    <View style={styles.container}>
      {/* Top Fixed Header */}
      <SafeAreaView edges={['top']} style={styles.safeHeader}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIconWrap}>
              <MaterialIcons name="theaters" size={18} color={isDark ? "#ffb370" : "#994700"} />
            </View>
            <Text style={styles.headerTitle}>Movie Details And Showtimes</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity activeOpacity={0.8} style={styles.headerBtn}>
              <MaterialIcons name="search" size={22} color={isDark ? "#a1a1aa" : "#584235"} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.profileBtn}>
              <MaterialIcons name="person" size={20} color={isDark ? "#ffffff" : "#1c1c18"} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Navigation & Actions */}
        <View style={styles.navRow}>
          <TouchableOpacity activeOpacity={0.8} style={styles.backBtn} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios" size={18} color={isDark ? "#ffffff" : "#1c1c18"} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
          <View style={styles.titleCol}>
            <Text style={styles.movieTitleMain} numberOfLines={1}>Neo Tokyo 2099</Text>
            <Text style={styles.movieStatusSubtitle}>NOW IN THEATERS</Text>
          </View>
          <View style={styles.actionsRight}>
            <TouchableOpacity activeOpacity={0.8} style={styles.actionBtn}>
              <MaterialIcons name="share" size={20} color={isDark ? "#ffffff" : "#1c1c18"} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.actionBtn} onPress={() => setIsFavorite(!isFavorite)}>
              <MaterialIcons name={isFavorite ? 'favorite' : 'favorite-border'} size={22} color={isFavorite ? '#994700' : '#584235'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroWrap}>
          <ImageBackground 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwIiHSvD7NroCzhAcUZXQBruyVrezMK8tTQOzJrJ4ym9Bhb5D9ly3WKKGAuF0xIE_nMPnHlRTMvQ-nIjtKYKPRUotsbcXIy6TrUWlOWsB1-ojq8wz5UH4RoKSJdHh8KzW6hKdsHyweoE0Hd2IHCNYAZ_WwRCcDMPWH7AIxKI1k6YzSeWWHjUTeixLpr-kjCZ7AjOp_HjsYFLZiXfY0_Zu9C9a5W3ATERy4W-pZvO48Ja3nbGrBLAZa' }}
            style={styles.heroBg}
            imageStyle={{ borderRadius: 16 }}
          >
            <LinearGradient
              colors={['rgba(28, 28, 24, 0.85)', 'rgba(28, 28, 24, 0.3)', 'transparent']}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.heroGradient}
            >
              <View style={styles.heroTopBadges}>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingBadgeText}>PG-13 • Sci-Fi & Adventure</Text>
                </View>
                <View style={styles.scoreBadge}>
                  <MaterialIcons name="star" size={14} color={isDark ? "#1c1c1e" : "#ffffff"} />
                  <Text style={styles.scoreBadgeText}>9.4 / 10</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.playBtn} activeOpacity={0.8}>
                <MaterialIcons name="play-arrow" size={32} color={isDark ? "#ff8c1a" : "#ff7a00"} style={{ marginLeft: 4 }} />
              </TouchableOpacity>

              <View style={styles.heroBottomStrip}>
                <View style={styles.heroMetaLeft}>
                  <View style={styles.heroMetaItem}>
                    <MaterialIcons name="schedule" size={14} color={isDark ? "#4a2e1b" : "#ffdbc8"} />
                    <Text style={styles.heroMetaText}>2h 42m</Text>
                  </View>
                  <Text style={styles.heroMetaDot}>•</Text>
                  <View style={styles.heroMetaItem}>
                    <MaterialIcons name="subtitles" size={14} color={isDark ? "#4a2e1b" : "#ffdbc8"} />
                    <Text style={styles.heroMetaText}>Eng / Jap</Text>
                  </View>
                </View>
                <View style={styles.heroFormatBadge}>
                  <MaterialIcons name="hd" size={14} color={isDark ? "#1c1c1e" : "#ffffff"} />
                  <Text style={styles.heroFormatText}>IMAX Laser</Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Synopsis */}
        <View style={styles.synopsisCard}>
          <View style={styles.synopsisHeader}>
            <Text style={styles.sectionTitle}>Storyline</Text>
            <View style={styles.criticsPick}>
              <Text style={styles.criticsPickText}>Critics Pick</Text>
            </View>
          </View>
          <Text style={styles.synopsisText} numberOfLines={synopsisExpanded ? undefined : 2}>
            In a breathtaking cybernetic metropolis where ancient Shinto shrines dwell quietly beneath neon spires, memory-weaver Kenji and cybernetic rebel Hana unravel a clandestine conspiracy capable of resetting human free will across the Pacific Federation.
          </Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.readMoreBtn} onPress={() => setSynopsisExpanded(!synopsisExpanded)}>
            <Text style={styles.readMoreText}>{synopsisExpanded ? 'Show less' : 'Read more'}</Text>
            <MaterialIcons name={synopsisExpanded ? 'expand-less' : 'expand-more'} size={18} color={isDark ? "#ff8c1a" : "#ff7a00"} />
          </TouchableOpacity>
        </View>

        {/* Cast */}
        <View style={styles.castSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Cast & Visionaries</Text>
            <Text style={styles.sectionSubtitleText}>8 Members</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.castScroll}>
            {CAST.map(person => (
              <View key={person.id} style={styles.castItem}>
                <View style={styles.castImgWrap}>
                  <Image source={{ uri: person.image }} style={styles.castImg} />
                </View>
                <Text style={styles.castName} numberOfLines={1}>{person.name}</Text>
                <Text style={styles.castRole} numberOfLines={1}>{person.role}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

      </ScrollView>

      {/* Floating Checkout Tray */}
      <View style={[styles.checkoutTray, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity style={styles.checkoutBtnFull} activeOpacity={0.8} onPress={() => router.push('/select-seats')}>
          <Text style={styles.checkoutBtnText}>Book Spot</Text>
          <MaterialIcons name="arrow-forward" size={18} color={isDark ? "#1c1c1e" : "#ffffff"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: (isDark ? '#121212' : '#fcf9f3'),
  },
  safeHeader: {
    backgroundColor: (isDark ? 'rgba(18, 18, 18, 0.85)' : 'rgba(252, 249, 243, 0.85)'),
    zIndex: 50,
    shadowColor: '#2e3a59',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  headerRow: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: (isDark ? '#4a2e1b' : '#ffdbc8'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: (isDark ? '#2c2c2e' : '#ebe8e2'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 20,
  },
  // Top Actions
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: (isDark ? '#2c2c2e' : '#f0eee8'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCol: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  movieTitleMain: {
    fontSize: 16,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  movieStatusSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: (isDark ? '#ff8c1a' : '#ff7a00'),
    letterSpacing: 0.5,
  },
  actionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: (isDark ? '#2c2c2e' : '#f0eee8'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Hero
  heroWrap: {
    width: '100%',
    aspectRatio: 1.6,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: (isDark ? '#2c2c2e' : '#ebe8e2'),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  heroBg: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  heroTopBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingBadge: {
    backgroundColor: 'rgba(252, 249, 243, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  ratingBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  scoreBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#1c1c1e' : '#ffffff'),
  },
  playBtn: {
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: (isDark ? 'rgba(28, 28, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBottomStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroMetaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroMetaText: {
    fontSize: 13,
    fontWeight: '700',
    color: (isDark ? '#1c1c1e' : '#ffffff'),
  },
  heroMetaDot: {
    color: (isDark ? '#1c1c1e' : '#ffffff'),
    opacity: 0.5,
  },
  heroFormatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  heroFormatText: {
    fontSize: 11,
    fontWeight: '700',
    color: (isDark ? '#1c1c1e' : '#ffffff'),
  },
  // Synopsis
  synopsisCard: {
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    gap: 8,
  },
  synopsisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  criticsPick: {
    backgroundColor: (isDark ? '#4a2e1b' : '#ffdbc8'),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  criticsPickText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#ffb370' : '#994700'),
  },
  synopsisText: {
    fontSize: 14,
    color: (isDark ? '#a1a1aa' : '#584235'),
    lineHeight: 22,
  },
  readMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    alignSelf: 'flex-start',
    paddingTop: 4,
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: (isDark ? '#ff8c1a' : '#ff7a00'),
  },
  // Cast
  castSection: {
    gap: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  sectionSubtitleText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#94a3b8' : '#525e7f'),
  },
  castScroll: {
    gap: 16,
  },
  castItem: {
    alignItems: 'center',
    width: 70,
    gap: 6,
  },
  castImgWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: (isDark ? '#2c2c2e' : '#ebe8e2'),
    padding: 2,
  },
  castImg: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    resizeMode: 'cover',
  },
  castName: {
    fontSize: 11,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
    textAlign: 'center',
  },
  castRole: {
    fontSize: 10,
    color: (isDark ? '#a1a1aa' : '#584235'),
    textAlign: 'center',
  },
  // Dates
  dateSection: {
    gap: 12,
  },
  dateHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateScroll: {
    gap: 10,
  },
  datePill: {
    width: 66,
    height: 76,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 4,
  },
  datePillInactive: {
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
  },
  datePillActive: {
    backgroundColor: (isDark ? '#94a3b8' : '#525e7f'),
  },
  dateDay: {
    fontSize: 11,
    fontWeight: '800',
  },
  dateDayInactive: { color: (isDark ? '#a1a1aa' : '#584235') },
  dateDayActive: { color: 'rgba(255,255,255,0.8)' },
  dateDayWeekend: { color: (isDark ? '#ff8c1a' : '#ff7a00') },
  dateNum: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 2,
  },
  dateNumInactive: { color: (isDark ? '#ffffff' : '#1c1c18') },
  dateNumActive: { color: (isDark ? '#1c1c1e' : '#ffffff') },
  dateMonth: {
    fontSize: 10,
    marginTop: 2,
  },
  dateMonthInactive: { color: (isDark ? '#a1a1aa' : '#584235') },
  dateMonthActive: { color: 'rgba(255,255,255,0.9)' },
  // Theater
  theaterCard: {
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    gap: 12,
  },
  theaterTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  theaterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  theaterIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: (isDark ? '#4a2e1b' : '#ffdbc8'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  theaterTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  theaterSubtitle: {
    fontSize: 13,
    color: (isDark ? '#a1a1aa' : '#584235'),
  },
  distanceBadge: {
    backgroundColor: (isDark ? '#1d2a4a' : '#dae2ff'),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  distanceText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#e2e8f0' : '#0d1a38'),
  },
  amenitiesScroll: {
    gap: 8,
    paddingTop: 4,
  },
  amenityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: (isDark ? '#2c2c2e' : '#f0eee8'),
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  amenityText: {
    fontSize: 11,
    fontWeight: '700',
    color: (isDark ? '#a1a1aa' : '#584235'),
  },
  // Showtimes
  showtimesSection: {
    gap: 12,
  },
  liveSeating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: (isDark ? '#ff8c1a' : '#ff7a00'),
  },
  showtimesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  slotCard: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  slotCardInactive: {
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
  },
  slotCardActive: {
    backgroundColor: (isDark ? '#94a3b8' : '#525e7f'),
  },
  slotTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slotTime: {
    fontSize: 18,
    fontWeight: '700',
  },
  slotTimeInactive: { color: (isDark ? '#ffffff' : '#1c1c18') },
  slotTimeActive: { color: (isDark ? '#1c1c1e' : '#ffffff') },
  slotBadgeAvailable: {
    backgroundColor: (isDark ? '#2c2c2e' : '#f0eee8'),
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  slotBadgeTextAvailable: {
    fontSize: 10,
    fontWeight: '700',
    color: (isDark ? '#a1a1aa' : '#584235'),
  },
  slotBadgeFast: {
    backgroundColor: (isDark ? '#4a2e1b' : '#ffdbc8'),
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  slotBadgeTextFast: {
    fontSize: 10,
    fontWeight: '800',
    color: (isDark ? '#ffb370' : '#994700'),
  },
  slotBadgeSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  slotBadgeTextSelected: {
    fontSize: 10,
    fontWeight: '800',
    color: (isDark ? '#1c1c1e' : '#ffffff'),
  },
  slotBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  slotFormat: {
    fontSize: 12,
  },
  slotFormatInactive: { color: (isDark ? '#a1a1aa' : '#584235') },
  slotFormatActive: { color: '#cad6fd' },
  slotPrice: {
    fontSize: 15,
    fontWeight: '800',
  },
  slotPriceInactive: { color: (isDark ? '#ffffff' : '#1c1c18') },
  slotPriceActive: { color: (isDark ? '#1c1c1e' : '#ffffff') },
  
  // Checkout Tray
  checkoutTray: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  checkoutInner: {
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 16,
    shadowColor: '#2e3a59',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,122,0,0.1)',
  },
  checkoutLeft: {
    flex: 1,
  },
  checkoutSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  checkoutSummaryText: {
    fontSize: 12,
    fontWeight: '700',
    color: (isDark ? '#a1a1aa' : '#584235'),
  },
  checkoutPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 2,
  },
  checkoutPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  checkoutPerSeat: {
    fontSize: 11,
    color: (isDark ? '#a1a1aa' : '#584235'),
  },
  checkoutBtn: {
    backgroundColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    gap: 6,
  },
  checkoutBtnFull: {
    backgroundColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    shadowColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  checkoutBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: (isDark ? '#1c1c1e' : '#ffffff'),
  },
});
