import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.safeHeader}>
        <View style={styles.header}>
          <View style={styles.headerBrand}>
            <View style={styles.brandIconWrap}>
              <MaterialIcons name="movie" size={22} color="#ffffff" />
            </View>
            <View>
              <View style={styles.greetingRow}>
                <Text style={styles.greetingText}>GOOD DAY, ALEX</Text>
                <Text style={styles.waveEmoji}>☀️</Text>
              </View>
              <Text style={styles.brandTitle}>Movie Time</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notifBtn} activeOpacity={0.7}>
              <MaterialIcons name="notifications" size={20} color="#2D2B2A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileBtn} activeOpacity={0.8}>
              <Text style={styles.profileBtnText}>AL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView 
        contentContainerStyle={[styles.content, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Location & Search */}
        <View style={styles.topSection}>
          <View style={styles.locationRow}>
            <View style={styles.locationLeft}>
              <View style={styles.locationIconWrap}>
                <MaterialIcons name="location-on" size={16} color="#FF7A00" />
              </View>
              <Text style={styles.locationText} numberOfLines={1}>Shibuya IMAX Theatre</Text>
            </View>
            <TouchableOpacity style={styles.changeLocBtn}>
              <Text style={styles.changeLocText}>Change</Text>
              <MaterialIcons name="expand-more" size={16} color="#FF7A00" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={22} color="#6E6966" style={{ marginRight: 10 }} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search relaxing films, theaters, genres..."
              placeholderTextColor="#9C948D"
            />
            <TouchableOpacity style={styles.filterBtn}>
              <MaterialIcons name="tune" size={18} color="#6E6966" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Pills */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryScroll}
          style={styles.categoryScrollContainer}
        >
          <TouchableOpacity style={[styles.catPill, styles.catPillActive]}>
            <MaterialIcons name="local-fire-department" size={16} color="#ffffff" />
            <Text style={[styles.catPillText, styles.catPillTextActive]}>Now Showing</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.catPill, styles.catPillOutline]}>
            <View style={styles.dotIndicator} />
            <Text style={styles.catPillText}>Coming Soon</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.catPill, { backgroundColor: 'rgba(225, 240, 255, 0.6)', borderColor: '#bfdbfe' }]}>
            <MaterialIcons name="stars" size={16} color="#1E5699" />
            <Text style={[styles.catPillText, { color: '#1E5699' }]}>IMAX 70mm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.catPill, { backgroundColor: 'rgba(255, 241, 194, 0.7)', borderColor: '#fde68a' }]}>
            <MaterialIcons name="sentiment-satisfied" size={16} color="#7A5B00" />
            <Text style={[styles.catPillText, { color: '#7A5B00' }]}>Family & Kids</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.catPill, { backgroundColor: 'rgba(226, 246, 238, 0.8)', borderColor: '#a7f3d0' }]}>
            <MaterialIcons name="favorite" size={16} color="#1D6C4A" />
            <Text style={[styles.catPillText, { color: '#1D6C4A' }]}>Indie & Docs</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Spotlight Hero Movie */}
        <View style={styles.heroSection}>
          <View style={styles.heroCard}>
            <View style={styles.heroPosterWrap}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNi7SzT5rhRx0kp_scbns7XgE2X7eqhOBv1HoNieWlzqlMoz0hrKZbTUvmVcwd1ibiLS1erpwQkx0rIsvoRHm5Z7VaGvqrmkhSfmJtkhvpzQobHVlJJKJUxHLV0jIihFtepQeBV5sLTqFURqa_sKgcbwzuJHSZTqZTkAD0GeFXgT5RqJ4YFi34xm6Tpe6DfHwN8-pAWueI-aC1tMiMwmnZkvrup7qF-ZyuCCkr-l-rokoalmbelBL5' }}
                style={styles.heroPoster}
              />
              
              <View style={styles.heroTopLeftBadges}>
                <View style={styles.badgeWhite}>
                  <MaterialIcons name="star" size={14} color="#f59e0b" />
                  <Text style={styles.badgeWhiteText}>9.4</Text>
                </View>
                <View style={styles.badgeWhite}>
                  <Text style={styles.badgeWhiteMuted}>PG-13</Text>
                </View>
              </View>

              <View style={styles.heroTopRightBadge}>
                <Text style={styles.badgeYellowText}>IMAX 70MM</Text>
              </View>

              <View style={styles.heroBottomBadges}>
                <View style={styles.badgeWhite}>
                  <Text style={styles.badgeWhiteOrange}>Sci-Fi Adventure</Text>
                </View>
                <View style={styles.badgeWhite}>
                  <Text style={styles.badgeWhiteMuted}>Cyberpunk</Text>
                </View>
              </View>
            </View>

            <View style={styles.heroInfo}>
              <View style={styles.heroTitleRow}>
                <Text style={styles.heroTitle}>Neo Tokyo 2099</Text>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>2h 42m</Text>
                </View>
              </View>
              <Text style={styles.heroDesc}>
                A soulful journey through Shibuya's cybernetic underworld to protect a sleeping world from a complete power blackout.
              </Text>
            </View>

            <View style={styles.showtimesStrip}>
              <View style={styles.showtimesHeader}>
                <MaterialIcons name="schedule" size={18} color="#FF7A00" />
                <Text style={styles.showtimesTitle}>Available Today:</Text>
              </View>
              <View style={styles.showtimesTimes}>
                <TouchableOpacity style={styles.timeBtnOutline}>
                  <Text style={styles.timeBtnOutlineText}>17:45</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeBtnActive}>
                  <Text style={styles.timeBtnActiveText}>20:15</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.timeBtnOutline}>
                  <Text style={styles.timeBtnOutlineText}>22:50</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.bookBtn} activeOpacity={0.8} onPress={() => router.push('/movie-details')}>
              <MaterialIcons name="confirmation-number" size={20} color="#ffffff" />
              <Text style={styles.bookBtnText}>BOOK TICKETS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoSection}>
          <View style={styles.promoCard}>
            <View style={styles.promoLeft}>
              <View style={styles.promoIconWrap}>
                <MaterialIcons name="bakery-dining" size={26} color="#FF7A00" />
              </View>
              <View>
                <Text style={styles.promoBadgeText}>COZY PAIR DEAL</Text>
                <Text style={styles.promoTitle}>Duo Tickets & Matcha Popcorn</Text>
                <Text style={styles.promoDesc}>Save 25% on couples lounge seats</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.promoBtn}>
              <MaterialIcons name="arrow-forward" size={18} color="#2D2B2A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Curated Section */}
        <View style={styles.curatedSection}>
          <View style={styles.curatedHeader}>
            <View style={styles.curatedHeaderLeft}>
              <View style={styles.curatedDot} />
              <Text style={styles.curatedTitle}>Curated For You</Text>
            </View>
            <TouchableOpacity style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See all (18)</Text>
              <MaterialIcons name="chevron-right" size={16} color="#FF7A00" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.curatedScroll}
          >
            {/* Movie 1 */}
            <View style={styles.movieCard}>
              <View style={[styles.moviePosterWrap, { backgroundColor: 'rgba(225, 240, 255, 0.3)' }]}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6sYOZRiLAxdPeArmeBYi8kZhZLF1PQLKBzCuSx-zpRFSAfoDjHVzTga916-lK5eB2F-IvjcZZX6ahv-kDwWcinEmKgOP2mR3j_iviyyz_gcZlRXGz9JaIdJW4uHEkX5xlfOWydB4fxxVHwGuAVRoqCYa1a-T3uGfSNkGxmuuds-ATdJDEOoWHPIS4-dGDcAmZHVEacblNLBDqhyIgRJVF_KNGCYpR3cUzTdhmbbjvyeHNHsFHy_6F' }}
                  style={styles.moviePoster}
                />
                <View style={styles.cardTopBadge}>
                  <MaterialIcons name="star" size={13} color="#f59e0b" />
                  <Text style={styles.cardBadgeText}>8.9</Text>
                </View>
                <View style={styles.cardBottomBadgeDolby}>
                  <Text style={styles.cardBadgeTextDolby}>DOLBY ATMOS</Text>
                </View>
              </View>
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle} numberOfLines={1}>Project Aegis: Zero</Text>
                <View style={styles.movieMeta}>
                  <Text style={styles.movieMetaText}>Action • Mecha</Text>
                  <Text style={styles.movieMetaTime}>1h 54m</Text>
                </View>
              </View>
              <View style={styles.movieTimes}>
                <TouchableOpacity style={styles.smallTimeBtn}><Text style={styles.smallTimeBtnText}>16:20</Text></TouchableOpacity>
                <TouchableOpacity style={styles.smallTimeBtn}><Text style={styles.smallTimeBtnText}>19:00</Text></TouchableOpacity>
                <TouchableOpacity style={styles.smallTimeBtn}><Text style={styles.smallTimeBtnText}>21:30</Text></TouchableOpacity>
              </View>
            </View>

            {/* Movie 2 */}
            <View style={styles.movieCard}>
              <View style={[styles.moviePosterWrap, { backgroundColor: 'rgba(255, 241, 194, 0.3)' }]}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn-TZL8iqunWAtJ8O824lf6D1ugrEtC8CuCeA8LaDKI7YEj2sLw8a5bEUs9_DeOneUaYgTgECQSXoGxe4CrhlGv0gEuJqCH7fNYNss8h61r5NZMGjg_FI2M0nnlixWU0JNoxWkOwDxsIt00l-HoPV5-gTCYoo5eCZ3SDfXEgSaRV8VGLvD2JRe75FQSJZMtFOzOX1NkeBrFSp2KGkHNwI6fh6nYpX4hyPnv-TTFGvSG0Xw6Pr6OMqC' }}
                  style={styles.moviePoster}
                />
                <View style={styles.cardTopBadge}>
                  <MaterialIcons name="star" size={13} color="#f59e0b" />
                  <Text style={styles.cardBadgeText}>9.1</Text>
                </View>
                <View style={styles.cardBottomBadgeImax}>
                  <Text style={styles.cardBadgeTextImax}>IMAX 3D</Text>
                </View>
              </View>
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle} numberOfLines={1}>Orbital Silence</Text>
                <View style={styles.movieMeta}>
                  <Text style={styles.movieMetaText}>Hard Sci-Fi</Text>
                  <Text style={styles.movieMetaTime}>2h 18m</Text>
                </View>
              </View>
              <View style={styles.movieTimes}>
                <TouchableOpacity style={styles.smallTimeBtn}><Text style={styles.smallTimeBtnText}>14:40</Text></TouchableOpacity>
                <TouchableOpacity style={styles.smallTimeBtn}><Text style={styles.smallTimeBtnText}>18:15</Text></TouchableOpacity>
                <TouchableOpacity style={styles.smallTimeBtn}><Text style={styles.smallTimeBtnText}>21:00</Text></TouchableOpacity>
              </View>
            </View>

            {/* Movie 3 */}
            <View style={styles.movieCard}>
              <View style={[styles.moviePosterWrap, { backgroundColor: 'rgba(226, 246, 238, 0.3)' }]}>
                <Image 
                  source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9jfTimwDv8K15bGqu0tkdXVEY4FMnTc5t0eciE5s1FnYVg-MO3ZCJbO7q7vLDQTyWgrfINrk7jQTFFLDZ5wYKnZ-FA4Osgyea2xeYEQEgd11pAK5epG2a3AJdeOfuM9_NfbVv9wsXgDLYR58d9stWE9l-cbXQIt-ayLfU4NCGpHnWbFZX2d5XtS9B0KxUfS1zxqmben8giGps8mYoq19ketMYTaRVfj4U_ZJIEp84Pyd1hMl1rGK2' }}
                  style={styles.moviePoster}
                />
                <View style={styles.cardTopBadge}>
                  <MaterialIcons name="star" size={13} color="#f59e0b" />
                  <Text style={styles.cardBadgeText}>8.5</Text>
                </View>
                <View style={styles.cardBottomBadgeMuted}>
                  <Text style={styles.cardBadgeTextMuted}>4DX MOTION</Text>
                </View>
              </View>
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle} numberOfLines={1}>Midnight Velocity</Text>
                <View style={styles.movieMeta}>
                  <Text style={styles.movieMetaText}>Thriller • Heist</Text>
                  <Text style={styles.movieMetaTime}>1h 48m</Text>
                </View>
              </View>
              <View style={styles.movieTimes}>
                <TouchableOpacity style={styles.smallTimeBtn}><Text style={styles.smallTimeBtnText}>15:00</Text></TouchableOpacity>
                <TouchableOpacity style={styles.smallTimeBtn}><Text style={styles.smallTimeBtnText}>17:30</Text></TouchableOpacity>
                <TouchableOpacity style={styles.smallTimeBtn}><Text style={styles.smallTimeBtnText}>20:45</Text></TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF9F3',
  },
  safeHeader: {
    backgroundColor: 'rgba(252, 249, 243, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#F0EBE1',
    zIndex: 50,
  },
  header: {
    height: 64,
    paddingHorizontal: 20,
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
    backgroundColor: '#FF7A00',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fed7aa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  greetingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6E6966',
    letterSpacing: 0.5,
  },
  waveEmoji: {
    fontSize: 12,
  },
  brandTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#2D2B2A',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#EAE4D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE7DB',
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  profileBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF7A00',
  },
  content: {
    paddingTop: 16,
  },
  // Location & Search
  topSection: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#EAE4D8',
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  locationIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 122, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D2B2A',
    flex: 1,
  },
  changeLocBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 122, 0, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  changeLocText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF7A00',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#EAE4D8',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2D2B2A',
    padding: 0,
  },
  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#F4EFE6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  // Category Pills
  categoryScrollContainer: {
    marginBottom: 20,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  catPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    gap: 6,
  },
  catPillActive: {
    backgroundColor: '#FF7A00',
    borderColor: '#FF7A00',
    shadowColor: '#fdba74',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  catPillOutline: {
    backgroundColor: '#ffffff',
    borderColor: '#EAE4D8',
  },
  dotIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF7A00',
  },
  catPillText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  catPillTextActive: {
    color: '#ffffff',
  },
  // Hero Movie
  heroSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECE5DA',
  },
  heroPosterWrap: {
    width: '100%',
    height: 224,
    borderRadius: 16,
    backgroundColor: '#FFE7DB',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  heroPoster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroTopLeftBadges: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    gap: 6,
  },
  badgeWhite: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
  },
  badgeWhiteText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2D2B2A',
  },
  badgeWhiteMuted: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6E6966',
  },
  badgeWhiteOrange: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FF7A00',
  },
  heroTopRightBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFF1C2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeYellowText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#684C00',
    letterSpacing: 0.5,
  },
  heroBottomBadges: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    gap: 6,
  },
  heroInfo: {
    gap: 6,
    marginBottom: 16,
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D2B2A',
    letterSpacing: -0.5,
  },
  durationBadge: {
    backgroundColor: '#F4EFE6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6E6966',
  },
  heroDesc: {
    fontSize: 14,
    color: '#6E6966',
    lineHeight: 22,
  },
  showtimesStrip: {
    backgroundColor: '#F8F4EC',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'column',
    gap: 10,
    borderWidth: 1,
    borderColor: '#F0EAE0',
    marginBottom: 16,
  },
  showtimesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  showtimesTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2D2B2A',
  },
  showtimesTimes: {
    flexDirection: 'row',
    gap: 8,
  },
  timeBtnOutline: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E4DCD0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  timeBtnOutlineText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2D2B2A',
  },
  timeBtnActive: {
    backgroundColor: '#FF7A00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#FF7A00',
    shadowColor: '#fdba74',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
  timeBtnActiveText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  bookBtn: {
    backgroundColor: '#FF7A00',
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#fdba74',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  bookBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  // Promo
  promoSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  promoCard: {
    backgroundColor: 'rgba(255, 231, 219, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(254, 215, 170, 0.7)',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  promoIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FF7A00',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D2B2A',
    marginBottom: 2,
  },
  promoDesc: {
    fontSize: 12,
    color: '#6E6966',
  },
  promoBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Curated
  curatedSection: {
    marginBottom: 24,
  },
  curatedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  curatedHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  curatedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF7A00',
  },
  curatedTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D2B2A',
    letterSpacing: -0.5,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF7A00',
  },
  curatedScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  movieCard: {
    width: 256,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ECE5DA',
  },
  moviePosterWrap: {
    width: '100%',
    height: 144,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 12,
  },
  moviePoster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardTopBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    gap: 4,
  },
  cardBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2D2B2A',
  },
  cardBottomBadgeDolby: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  cardBadgeTextDolby: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E5699',
  },
  cardBottomBadgeImax: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#FFF1C2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  cardBadgeTextImax: {
    fontSize: 10,
    fontWeight: '700',
    color: '#725200',
  },
  cardBottomBadgeMuted: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  cardBadgeTextMuted: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6E6966',
  },
  movieInfo: {
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D2B2A',
    marginBottom: 2,
  },
  movieMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieMetaText: {
    fontSize: 12,
    color: '#6E6966',
  },
  movieMetaTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6E6966',
  },
  movieTimes: {
    flexDirection: 'row',
    gap: 6,
  },
  smallTimeBtn: {
    flex: 1,
    backgroundColor: '#F8F4EC',
    borderWidth: 1,
    borderColor: '#EAE4D8',
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  smallTimeBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2D2B2A',
  },
});
