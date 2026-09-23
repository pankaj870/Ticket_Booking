import { useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Upcoming (1)');

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView edges={["top"]} style={styles.safeHeader}>
        <View style={styles.header}>
          <View style={styles.headerBrand}>
            <View style={styles.brandIconWrap}>
              <MaterialIcons name="person" size={22} color={isDark ? "#ffb370" : "#994700"} />
            </View>
            <Text style={styles.brandTitle}>Profile & History</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <MaterialIcons name="search" size={24} color={isDark ? "#a1a1aa" : "#584235"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileBtn} activeOpacity={0.8}>
              <MaterialIcons name="person" size={20} color={isDark ? "#ffffff" : "#1c1c18"} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: 150 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileCardContent}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjRCZ3q9HANaHQDgTuLQp0xCYl22AA_vi11yK1fLO4u2heXUfnkh-Ik74oT1DLbYEcc7pNgezwPcg-8x-VQNdx8QjP1w5SGeWpvlANIJNJQ6tUMrnxMZBCuwfzSR73kvFYkqBL5olN7AzRMUtlYIyc0SKYpyyBaNUqNozzkTuhwoNCeoCxKX0EgyZoMzQq6Y9CyDkrVlXSKBA7R5YXGzGcv8LUFpPpGueKizFmZPUTKEQLR4F7j9kC'}} 
                style={styles.avatarImg} 
              />
              <TouchableOpacity style={styles.avatarEditBtn} activeOpacity={0.9}>
                <MaterialIcons name="photo-camera" size={14} color={isDark ? "#a1a1aa" : "#584235"} />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.profileNameRow}>
                <Text style={styles.profileName} numberOfLines={1}>Alex Morgan</Text>
                <View style={styles.goldBadge}>
                  <MaterialIcons name="stars" size={12} color={isDark ? "#ffb370" : "#994700"} style={{marginRight: 2}} />
                  <Text style={styles.goldBadgeText}>Gold Member</Text>
                </View>
              </View>
              <Text style={styles.profileEmail} numberOfLines={1}>alex.morgan@example.com</Text>
              <Text style={styles.profileSince}>Member since Jan 2023</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.editBtn}>
              <MaterialIcons name="edit" size={16} color={isDark ? "#a1a1aa" : "#584235"} style={{marginRight: 4}} />
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, {backgroundColor: 'rgba(218, 226, 255, 0.5)'}]}>
              <MaterialIcons name="movie" size={18} color={isDark ? "#94a3b8" : "#525e7f"} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statVal}>24</Text>
              <Text style={styles.statLabel}>Movies Watched</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, {backgroundColor: 'rgba(255, 219, 200, 0.6)'}]}>
              <MaterialIcons name="stars" size={18} color={isDark ? "#ffb370" : "#994700"} />
            </View>
            <View style={styles.statInfo}>
              <Text style={[styles.statVal, {color: '#994700'}]}>1,420</Text>
              <Text style={styles.statLabel}>Pts ($15 value)</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, {backgroundColor: 'rgba(228, 223, 255, 0.5)'}]}>
              <MaterialIcons name="bookmark" size={18} color="#5847d2" />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statVal}>6</Text>
              <Text style={styles.statLabel}>In Watchlist</Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {['Upcoming (1)', 'Past Movies', 'Watchlist'].map(tab => (
            <TouchableOpacity activeOpacity={0.8} 
              key={tab} 
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'Upcoming (1)' && (
          <View style={styles.upcomingSection}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <View style={styles.pulseDot} />
                <Text style={styles.sectionTitle}>Active Ticket</Text>
              </View>
              <View style={styles.readyBadge}>
                <Text style={styles.readyBadgeText}>Ready to Scan</Text>
              </View>
            </View>

            <View style={styles.ticketCard}>
              <View style={styles.ticketImageWrap}>
                <Image 
                  source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGDOxdR2yHqgRgEE38TpDVE1m7J52d7JHFLOKg-Y1ov-0wolYqu1S8iYTmtdfGaalOiy6NSmWH4MyRqUEEMRA1Ng4dld9aVozdNCIgbxEohoBlleT_T8t-tacnhPzfum7MlmLRniRRna-DkD4BUu2lcXR4-nckpyafzFzSnfyYOM9tLgmHh6foBQQ09Wptu-VdScw7QJoLtgL70m4TAOmPyQkExXjCL4g5ioCLfZLuwY1hRmr4ia5z'}} 
                  style={styles.ticketImg} 
                />
                <LinearGradient 
                  colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.25)', 'transparent']}
                  start={{x: 0, y: 1}}
                  end={{x: 0, y: 0}}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.imaxBadge}>
                  <Text style={styles.imaxBadgeText}>IMAX 3D</Text>
                </View>
                <View style={styles.ticketImgTextWrap}>
                  <Text style={styles.ticketImgTitle}>Neo Tokyo 2099</Text>
                  <Text style={styles.ticketImgSub}>Sci-Fi • 2h 18m</Text>
                </View>
              </View>

              <View style={styles.ticketDetails}>
                <View style={styles.ticketInfoGrid}>
                  <View style={styles.ticketInfoItem}>
                    <View style={styles.ticketInfoIcon}>
                      <MaterialIcons name="schedule" size={18} color={isDark ? "#ffb370" : "#994700"} />
                    </View>
                    <View>
                      <Text style={styles.ticketInfoLabel}>Showtime</Text>
                      <Text style={styles.ticketInfoValue}>Today, 20:30 • Audi 04</Text>
                    </View>
                  </View>
                  <View style={styles.ticketInfoItem}>
                    <View style={[styles.ticketInfoIcon, {backgroundColor: 'rgba(218, 226, 255, 0.5)', marginLeft: 8}]}>
                      <MaterialIcons name="event-seat" size={18} color={isDark ? "#94a3b8" : "#525e7f"} />
                    </View>
                    <View>
                      <Text style={styles.ticketInfoLabel}>Seats</Text>
                      <Text style={styles.ticketInfoValue}>Row F, 6-7</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.ticketActionRow}>
                  <TouchableOpacity style={styles.scanCodeWrap} activeOpacity={0.8}>
                    <View style={styles.qrIconWrap}>
                      <MaterialIcons name="qr-code" size={24} color={isDark ? "#ffffff" : "#1c1c18"} />
                    </View>
                    <View>
                      <Text style={styles.ticketId}>#TK-8942</Text>
                      <Text style={styles.scanText}>Scan Pass <MaterialIcons name="arrow-forward" size={12} /></Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.viewPassBtn}>
                    <MaterialIcons name="confirmation-number" size={16} color={isDark ? "#1c1c1e" : "#ffffff"} style={{marginRight: 4}} />
                    <Text style={styles.viewPassText}>View Pass</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}

        {(activeTab === 'Past Movies' || activeTab === 'Watchlist') && (
          <View style={styles.pastSection}>
            <View style={styles.sectionHeaderAlt}>
              <Text style={styles.sectionTitleLarge}>Past Movies</Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.viewAllBtn}>
                <Text style={styles.viewAllText}>View All (24)</Text>
                <MaterialIcons name="chevron-right" size={16} color={isDark ? "#ffb370" : "#994700"} />
              </TouchableOpacity>
            </View>

            {/* Past Movie 1 */}
            <View style={styles.pastCard}>
              <View style={styles.pastImgWrap}>
                <Image 
                  source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoEpblcHZkMxQO8ypfxD8VI1G62333S9jeM6eT0lB_wfNyem0MMao08BIn4f-5PT7HAVQA9tMLw9dfcCXVGsZmD6K16pJ0iTOmpED134OUrEr-5mJ_ZegQ1NSCYEMf79YKXhgOLUjIFGRZpv-Aqy4lQyuxFmSES71Zzzj709I0ojB56qAKDShBc131XFchnNpufAcuICtFiYkSaWiO0H_mvbAAVIPEm2IkUFBS-djStHZa_NimxD0F'}} 
                  style={styles.pastImg} 
                />
              </View>
              <View style={styles.pastInfo}>
                <View>
                  <View style={styles.pastTopRow}>
                    <Text style={styles.pastDate}>Oct 12, 2024</Text>
                    <View style={styles.pastCinemaBadge}>
                      <Text style={styles.pastCinemaText}>Grand Cinema</Text>
                    </View>
                  </View>
                  <Text style={styles.pastTitle} numberOfLines={1}>Project Aegis: Zero</Text>
                  <Text style={styles.pastSub} numberOfLines={1}>Standard 2D • Screen 2</Text>
                </View>
                <View style={styles.pastActions}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.rateBtn}>
                    <MaterialIcons name="star" size={14} color={isDark ? "#ffb370" : "#994700"} style={{marginRight: 4}} />
                    <Text style={styles.rateBtnText}>Rate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.receiptBtn}>
                    <MaterialIcons name="receipt-long" size={18} color={isDark ? "#a1a1aa" : "#584235"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Past Movie 2 */}
            <View style={styles.pastCard}>
              <View style={styles.pastImgWrap}>
                <Image 
                  source={{uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMq_AsP1A0Li9JMi9kOr39sr6NilOIoxwUJSP_GzDqBC7V6alacOrpNz9I3QNSq_CkNdph44h0PDNt4il0_ADvb4-FKGcipWCP-gShDLe6M7z5chxoyLYqymLM2ZsXcQ_kzIy4MROaO9XzbUjTe2gTpVa5XEiBWRZXkXicAxLo9NARi8co3mxDkjZan2ulNaBPBeV_p-Szv1meU3vHu8VH44uHJqGRkk6zmUuWxwiswQb8S75ZgZl9'}} 
                  style={styles.pastImg} 
                />
              </View>
              <View style={styles.pastInfo}>
                <View>
                  <View style={styles.pastTopRow}>
                    <Text style={styles.pastDate}>Sep 28, 2024</Text>
                    <View style={styles.pastRatingBadge}>
                      <MaterialIcons name="star" size={12} color={isDark ? "#ffb370" : "#994700"} style={{marginRight: 2}} />
                      <Text style={styles.pastRatingText}>5.0</Text>
                    </View>
                  </View>
                  <Text style={styles.pastTitle} numberOfLines={1}>Orbital Silence</Text>
                  <Text style={styles.pastSub} numberOfLines={1}>Dolby Cinema • Recliner D04</Text>
                </View>
                <View style={styles.pastActions}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.bookAgainBtn}>
                    <MaterialIcons name="replay" size={14} color={isDark ? "#ffffff" : "#1c1c18"} style={{marginRight: 4}} />
                    <Text style={styles.bookAgainText}>Book Again</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.receiptBtn}>
                    <MaterialIcons name="share" size={18} color={isDark ? "#a1a1aa" : "#584235"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Footer Prompt */}
        <View style={styles.footerPrompt}>
          <View style={styles.footerIconWrap}>
            <MaterialIcons name="spa" size={20} color={isDark ? "#e2e8f0" : "#0d1a38"} />
          </View>
          <View style={styles.footerTextWrap}>
            <Text style={styles.footerTitle}>Mindful Moviegoing</Text>
            <Text style={styles.footerSub}>Arrive 10 minutes early to settle in with zero stress. Popcorn is waiting!</Text>
          </View>
        </View>

      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(46,58,89,0.06)',
    zIndex: 50,
  },
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? '#4a2e1b' : '#ffdbc8'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: (isDark ? '#ffffff' : '#1c1c18'),
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? '#2c2c2e' : '#ebe8e2'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingTop: 16,
  },
  
  // Profile Card
  profileCard: {
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 16,
    shadowColor: 'rgba(46,58,89,1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 2,
  },
  profileCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: (isDark ? 'rgba(74, 46, 27, 0.6)' : 'rgba(255, 219, 200, 0.6)'),
    backgroundColor: (isDark ? '#2c2c2e' : '#ebe8e2'),
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: (isDark ? '#2c2c2e' : '#f0eee8'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: (isDark ? '#ffffff' : '#1c1c18'),
    letterSpacing: -0.5,
    flexShrink: 1,
  },
  goldBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: (isDark ? 'rgba(74, 46, 27, 0.6)' : 'rgba(255, 219, 200, 0.6)'),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  goldBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#753400',
  },
  profileEmail: {
    fontSize: 13,
    color: (isDark ? '#a1a1aa' : '#584235'),
    marginTop: 2,
  },
  profileSince: {
    fontSize: 13,
    color: 'rgba(88, 66, 53, 0.8)',
    marginTop: 2,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: (isDark ? '#2c2c2e' : '#f0eee8'),
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  editBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },

  // Quick Stats
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    borderRadius: 16,
    padding: 12,
    minHeight: 104,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  statIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statInfo: {
    marginTop: 8,
  },
  statVal: {
    fontSize: 20,
    fontWeight: '800',
    color: (isDark ? '#ffffff' : '#1c1c18'),
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    color: (isDark ? '#a1a1aa' : '#584235'),
    fontWeight: '800',
    marginTop: 2,
  },

  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: (isDark ? '#2c2c2e' : '#f0eee8'),
    padding: 4,
    borderRadius: 999,
    marginHorizontal: 16,
    marginTop: 24,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    shadowColor: 'rgba(46,58,89,1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: (isDark ? '#a1a1aa' : '#584235'),
  },
  tabTextActive: {
    fontWeight: '800',
    color: (isDark ? '#ffb370' : '#994700'),
  },

  // Upcoming Section
  upcomingSection: {
    marginHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: (isDark ? '#ff8c1a' : '#ff7a00'),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  readyBadge: {
    backgroundColor: (isDark ? 'rgba(74, 46, 27, 0.5)' : 'rgba(255, 219, 200, 0.5)'),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  readyBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#ffb370' : '#994700'),
  },
  ticketCard: {
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  ticketImageWrap: {
    width: '100%',
    height: 160,
    backgroundColor: (isDark ? '#3a3a3c' : '#e5e2dc'),
    position: 'relative',
  },
  ticketImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imaxBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  imaxBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#1c1c1e' : '#ffffff'),
  },
  ticketImgTextWrap: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
  },
  ticketImgTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: (isDark ? '#1c1c1e' : '#ffffff'),
    letterSpacing: -0.5,
  },
  ticketImgSub: {
    fontSize: 13,
    color: 'rgba(252, 249, 243, 0.9)',
    marginTop: 2,
  },
  ticketDetails: {
    padding: 16,
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    gap: 16,
  },
  ticketInfoGrid: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: (isDark ? '#1c1c1e' : '#f6f3ed'),
    padding: 12,
    borderRadius: 12,
  },
  ticketInfoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ticketInfoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: (isDark ? 'rgba(74, 46, 27, 0.5)' : 'rgba(255, 219, 200, 0.5)'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketInfoLabel: {
    fontSize: 11,
    color: (isDark ? '#a1a1aa' : '#584235'),
    fontWeight: '800',
  },
  ticketInfoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  ticketActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  scanCodeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    backgroundColor: (isDark ? '#1c1c1e' : '#f6f3ed'),
    borderRadius: 12,
  },
  qrIconWrap: {
    width: 40,
    height: 40,
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketId: {
    fontSize: 14,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  scanText: {
    fontSize: 13,
    color: (isDark ? '#ffb370' : '#994700'),
    marginTop: 2,
  },
  viewPassBtn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: (isDark ? '#ff8c1a' : '#ff7a00'),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  viewPassText: {
    fontSize: 14,
    fontWeight: '700',
    color: (isDark ? '#1c1c1e' : '#ffffff'),
  },

  // Past Movies / Watchlist Section
  pastSection: {
    marginHorizontal: 16,
    marginTop: 24,
    gap: 16,
  },
  sectionHeaderAlt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitleLarge: {
    fontSize: 20,
    fontWeight: '800',
    color: (isDark ? '#ffffff' : '#1c1c18'),
    letterSpacing: -0.5,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#ffb370' : '#994700'),
  },
  pastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: (isDark ? '#1c1c1e' : '#ffffff'),
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  pastImgWrap: {
    width: 80,
    height: 96,
    borderRadius: 12,
    backgroundColor: (isDark ? '#2c2c2e' : '#ebe8e2'),
    overflow: 'hidden',
  },
  pastImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pastInfo: {
    flex: 1,
    height: 96,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  pastTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  pastDate: {
    fontSize: 11,
    color: (isDark ? '#a1a1aa' : '#584235'),
    fontWeight: '800',
  },
  pastCinemaBadge: {
    backgroundColor: (isDark ? '#2c2c2e' : '#f0eee8'),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  pastCinemaText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#a1a1aa' : '#584235'),
  },
  pastTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  pastSub: {
    fontSize: 13,
    color: (isDark ? '#a1a1aa' : '#584235'),
    marginTop: 2,
  },
  pastActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  rateBtn: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: (isDark ? 'rgba(74, 46, 27, 0.5)' : 'rgba(255, 219, 200, 0.5)'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#ffb370' : '#994700'),
  },
  receiptBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: (isDark ? '#1c1c1e' : '#f6f3ed'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pastRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pastRatingText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#ffb370' : '#994700'),
  },
  bookAgainBtn: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: (isDark ? '#2c2c2e' : '#f0eee8'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookAgainText: {
    fontSize: 11,
    fontWeight: '800',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },

  // Footer Prompt
  footerPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: (isDark ? '#1c1c1e' : '#f6f3ed'),
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  footerIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? '#1d2a4a' : '#dae2ff'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerTextWrap: {
    flex: 1,
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: (isDark ? '#ffffff' : '#1c1c18'),
  },
  footerSub: {
    fontSize: 13,
    color: (isDark ? '#a1a1aa' : '#584235'),
    marginTop: 2,
  }
});

