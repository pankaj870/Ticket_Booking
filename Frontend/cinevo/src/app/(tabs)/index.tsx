import { useColorScheme } from 'react-native';
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DiscoverScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeMood, setActiveMood] = useState("Feel Good");
  const [activeFormat, setActiveFormat] = useState("All Formats");

  const moodChips = [
    { label: "Feel Good", icon: "sentiment-satisfied" },
    { label: "Sci-Fi Wonder", icon: "rocket-launch" },
    { label: "Studio Ghibli", icon: "nature-people" },
    { label: "IMAX 70mm", icon: "aspect-ratio" },
    { label: "Documentaries", icon: "movie-filter" },
  ];

  const formatTabs = ["All Formats", "IMAX Cozy", "Standard 2D", "Dolby Atmos"];

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView edges={["top"]} style={styles.safeHeader}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.brandIconWrap}>
              <MaterialIcons name="movie" size={20} color={isDark ? "#ff8c1a" : "#ff7a00"} />
            </View>
            <Text style={styles.headerTitle}>Discover</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notifBtn} activeOpacity={0.7}>
              <MaterialIcons name="notifications" size={22} color={isDark ? "#a1a1aa" : "#584235"} />
            </TouchableOpacity>
            <View style={styles.profileBtn}>
              <MaterialIcons name="person" size={18} color={isDark ? "#1c1c1e" : "#ffffff"} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(insets.bottom, 120) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          {/* Search */}
          <View style={styles.searchWrapper}>
            <MaterialIcons
              name="search"
              size={22}
              color={isDark ? "#ffb370" : "#994700"}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search movies, genres, theaters..."
              placeholderTextColor="rgba(88, 66, 53, 0.7)"
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.filterBtn}>
              <MaterialIcons name="tune" size={20} color={isDark ? "#ffb370" : "#994700"} />
            </TouchableOpacity>
          </View>

          {/* Browse by Mood */}
          <View style={styles.moodSection}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionOverline}>BROWSE BY MOOD</Text>
              <TouchableOpacity activeOpacity={0.8} style={styles.resetBtn}>
                <Text style={styles.resetBtnText}>Reset</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.moodScroll}
            >
              {moodChips.map((chip, idx) => {
                const isActive = activeMood === chip.label;
                return (
                  <TouchableOpacity activeOpacity={0.8}
                    key={idx}
                    style={[
                      styles.moodChip,
                      isActive
                        ? styles.moodChipActive
                        : styles.moodChipInactive,
                    ]}
                    onPress={() => setActiveMood(chip.label)}
                  >
                    <MaterialIcons
                      name={chip.icon as any}
                      size={16}
                      color={isActive ? "#ffffff" : "#584235"}
                    />
                    <Text
                      style={[
                        styles.moodChipText,
                        isActive
                          ? styles.moodChipTextActive
                          : styles.moodChipTextInactive,
                      ]}
                    >
                      {chip.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Format Tabs */}
          <View style={styles.formatTabsWrapper}>
            {formatTabs.map((tab, idx) => {
              const isActive = activeFormat === tab;
              return (
                <TouchableOpacity activeOpacity={0.8}
                  key={idx}
                  style={[styles.formatTab, isActive && styles.formatTabActive]}
                  onPress={() => setActiveFormat(tab)}
                >
                  <Text
                    style={[
                      styles.formatTabText,
                      isActive
                        ? styles.formatTabTextActive
                        : styles.formatTabTextInactive,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Curated List */}
        <View style={styles.curatedSection}>
          <View style={styles.curatedHeaderRow}>
            <View style={styles.curatedTitleWrap}>
              <View style={styles.curatedDot} />
              <Text style={styles.curatedTitle}>Curated For You Today</Text>
            </View>
            <Text style={styles.curatedSubtitle}>4 Peaceful Picks</Text>
          </View>

          {/* Movie Card 1 */}
          <TouchableOpacity activeOpacity={0.8}
            style={styles.movieCard}
            onPress={() => router.push("/movie-details")}
            activeOpacity={0.9}
          >
            <View style={styles.posterWrapper}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkZHMvFBLIzOxJszcH-oYygXdvtOk5RhJ9tTPDEiJitN59aoXOeeVUAC7XpKTeUhbxuiiKFq7qnmFR4CEeK1g7odl9-L2RGp2CVIhZ3YRrJed1Pyr7r6kG85Bi71wnia__Gi8A1xbpUx5vw4IcFnEPGOMGxeuQPHULxPHp63omdXcbcyCehU4U8oIcAk2PW2Q-kk96lR9LIGXeNgjRy9Hvopo8Jqjwr4DPIgSyAEhsVoEvFb4mezK6",
                }}
                style={styles.posterImage}
              />
              <View style={styles.posterTopLeft}>
                <View style={styles.ratingBadge}>
                  <MaterialIcons name="star" size={14} color={isDark ? "#ffb370" : "#994700"} />
                  <Text style={styles.ratingText}>9.4</Text>
                </View>
                <View style={styles.formatBadge}>
                  <Text style={styles.formatBadgeText}>IMAX Cozy</Text>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.bookmarkBtn}>
                <MaterialIcons
                  name="favorite-border"
                  size={18}
                  color={isDark ? "#a1a1aa" : "#584235"}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.movieInfo}>
              <View style={styles.movieMetaTop}>
                <View style={styles.titleRow}>
                  <Text style={styles.movieTitle}>Neo Tokyo 2099</Text>
                  <Text style={styles.durationText}>2h 14m</Text>
                </View>
                <View style={styles.tagsRow}>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>Sci-Fi Anime</Text>
                  </View>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>Mindful Journey</Text>
                  </View>
                  <Text style={styles.hallText}>• Cinema Hall 4</Text>
                </View>
              </View>

              <View style={styles.screeningsBlock}>
                <Text style={styles.screeningsOverline}>
                  TODAY'S SCREENINGS
                </Text>
                <View style={styles.timeChipsRow}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeChipActive}>
                    <Text style={styles.timeChipTextActive}>14:15</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeChipInactive}>
                    <Text style={styles.timeChipTextInactive}>17:45</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeChipInactive}>
                    <Text style={styles.timeChipTextInactive}>20:30</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bookingRow}>
                <View>
                  <Text style={styles.ticketTypeText}>Standard Ticket</Text>
                  <Text style={styles.priceText}>$16.50</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8}
                  style={styles.bookBtn}
                  onPress={() => router.push("/select-seats")}
                >
                  <Text style={styles.bookBtnText}>Book Spot</Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={18}
                    color={isDark ? "#1c1c1e" : "#ffffff"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          {/* Movie Card 2 */}
          <TouchableOpacity activeOpacity={0.8}
            style={styles.movieCard}
            onPress={() => router.push("/movie-details")}
            activeOpacity={0.9}
          >
            <View style={styles.posterWrapper}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7-Z44sUA67HdB4A8g0YbCZfzvV7ITs2U2pON9wtq9Kl9zSudzWoBcJxGH_RTRbzt6pYNr62fQyFvgGtu9sruVTu7kwZxDqpepZkaVCTPi9Z321llkFuAgVnUhBf9qAkAAwoTie4ixB8xgIub9nVoCLuPLcRv0h9QXiTlveS-MXjrzCHRQ-DFqxiO7Na70wC3HXqUDe5UrVQNOWgbF88YXrpNZzWU6EhxZWkVqnlV1GREgtjISTU0C",
                }}
                style={styles.posterImage}
              />
              <View style={styles.posterTopLeft}>
                <View style={styles.ratingBadge}>
                  <MaterialIcons name="star" size={14} color={isDark ? "#ffb370" : "#994700"} />
                  <Text style={styles.ratingText}>9.1</Text>
                </View>
                <View style={styles.formatBadge}>
                  <Text style={styles.formatBadgeText}>Dolby Atmos</Text>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.bookmarkBtn}>
                <MaterialIcons
                  name="favorite-border"
                  size={18}
                  color={isDark ? "#a1a1aa" : "#584235"}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.movieInfo}>
              <View style={styles.movieMetaTop}>
                <View style={styles.titleRow}>
                  <Text style={styles.movieTitle}>Orbital Silence</Text>
                  <Text style={styles.durationText}>1h 58m</Text>
                </View>
                <View style={styles.tagsRow}>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>Ambient Drama</Text>
                  </View>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>Cosmic</Text>
                  </View>
                  <Text style={styles.hallText}>• Grand Auditorium</Text>
                </View>
              </View>

              <View style={styles.screeningsBlock}>
                <Text style={styles.screeningsOverline}>
                  TODAY'S SCREENINGS
                </Text>
                <View style={styles.timeChipsRow}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeChipInactive}>
                    <Text style={styles.timeChipTextInactive}>13:30</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeChipActive}>
                    <Text style={styles.timeChipTextActive}>16:20</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeChipInactive}>
                    <Text style={styles.timeChipTextInactive}>19:40</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bookingRow}>
                <View>
                  <Text style={styles.ticketTypeText}>Standard Ticket</Text>
                  <Text style={styles.priceText}>$17.00</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8}
                  style={styles.bookBtn}
                  onPress={() => router.push("/select-seats")}
                >
                  <Text style={styles.bookBtnText}>Book Spot</Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={18}
                    color={isDark ? "#1c1c1e" : "#ffffff"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          {/* Movie Card 3 */}
          <TouchableOpacity activeOpacity={0.8}
            style={styles.movieCard}
            onPress={() => router.push("/movie-details")}
            activeOpacity={0.9}
          >
            <View style={styles.posterWrapper}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSz3VlZLU6muuM7CJmvsuZVAkPOIUaAcAmLkGKK1x6wwk34ar5htO0D-lYyPFa0L2UN6nbslmuJxiMfYmCbDeUMK9WYrQEzxyilxYTDk1Kl40Fopp56Jn_-KKEKQwXcN3bFTcghYlObgbEcwsevWpL-QxmzfCewQQDcbONN4-MqZoxtAb4uI1SeFwK7-qccHi985OMCcEIa3-u94voHjyO1up6nrnKgJYdo7aMCknmnIbKyv5Ux_fj",
                }}
                style={styles.posterImage}
              />
              <View style={styles.posterTopLeft}>
                <View style={styles.ratingBadge}>
                  <MaterialIcons name="star" size={14} color={isDark ? "#ffb370" : "#994700"} />
                  <Text style={styles.ratingText}>9.6</Text>
                </View>
                <View style={styles.formatBadge}>
                  <Text style={styles.formatBadgeText}>Standard 2D</Text>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.bookmarkBtn}>
                <MaterialIcons
                  name="favorite-border"
                  size={18}
                  color={isDark ? "#a1a1aa" : "#584235"}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.movieInfo}>
              <View style={styles.movieMetaTop}>
                <View style={styles.titleRow}>
                  <Text style={styles.movieTitle}>Whisper of the Forest</Text>
                  <Text style={styles.durationText}>1h 44m</Text>
                </View>
                <View style={styles.tagsRow}>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>Animation</Text>
                  </View>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>Family</Text>
                  </View>
                  <Text style={styles.hallText}>• Garden Screening Room</Text>
                </View>
              </View>

              <View style={styles.screeningsBlock}>
                <Text style={styles.screeningsOverline}>
                  TODAY'S SCREENINGS
                </Text>
                <View style={styles.timeChipsRow}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeChipActive}>
                    <Text style={styles.timeChipTextActive}>11:00</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeChipInactive}>
                    <Text style={styles.timeChipTextInactive}>15:15</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeChipInactive}>
                    <Text style={styles.timeChipTextInactive}>18:30</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bookingRow}>
                <View>
                  <Text style={styles.ticketTypeText}>Standard Ticket</Text>
                  <Text style={styles.priceText}>$14.50</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8}
                  style={styles.bookBtn}
                  onPress={() => router.push("/select-seats")}
                >
                  <Text style={styles.bookBtnText}>Book Spot</Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={18}
                    color={isDark ? "#1c1c1e" : "#ffffff"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>

          {/* Movie Card 4 */}
          <TouchableOpacity activeOpacity={0.8}
            style={styles.movieCard}
            onPress={() => router.push("/movie-details")}
            activeOpacity={0.9}
          >
            <View style={styles.posterWrapper}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyAXj05eFKxwOzB3MDB9dS1b_xi1mMpN-CCPnuI4nEWjFvTphkbgDqTHKc6v7xGMH-B4qoZVRX9ADOh8bVAG4e9tCAsa503VH59UeMds5rbVwQ5FmkEDYeTHWMS0A3UKkO-lHrVfl44FcGqGaR4Wb0ze6J5neLznXZuiP5TNg3y7qZyqcop15B1ulSg5nhWUIkUEC__XEyzRXes11aTuTztmeiTQSH6ySnYOw1mrqUtFEWdEgPkCFQ",
                }}
                style={styles.posterImage}
              />
              <View style={styles.posterTopLeft}>
                <View style={styles.ratingBadge}>
                  <MaterialIcons name="star" size={14} color={isDark ? "#ffb370" : "#994700"} />
                  <Text style={styles.ratingText}>8.9</Text>
                </View>
                <View style={styles.formatBadge}>
                  <Text style={styles.formatBadgeText}>IMAX 70mm</Text>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.bookmarkBtn}>
                <MaterialIcons
                  name="favorite-border"
                  size={18}
                  color={isDark ? "#a1a1aa" : "#584235"}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.movieInfo}>
              <View style={styles.movieMetaTop}>
                <View style={styles.titleRow}>
                  <Text style={styles.movieTitle}>Project Aegis: Zero</Text>
                  <Text style={styles.durationText}>2h 31m</Text>
                </View>
                <View style={styles.tagsRow}>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>Mecha Epic</Text>
                  </View>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>Adventure</Text>
                  </View>
                  <Text style={styles.hallText}>• Dome 1</Text>
                </View>
              </View>

              <View style={styles.screeningsBlock}>
                <Text style={styles.screeningsOverline}>
                  TODAY'S SCREENINGS
                </Text>
                <View style={styles.timeChipsRow}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeChipInactive}>
                    <Text style={styles.timeChipTextInactive}>12:15</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeChipInactive}>
                    <Text style={styles.timeChipTextInactive}>16:00</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={styles.timeChipActive}>
                    <Text style={styles.timeChipTextActive}>21:15</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bookingRow}>
                <View>
                  <Text style={styles.ticketTypeText}>Standard Ticket</Text>
                  <Text style={styles.priceText}>$18.50</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8}
                  style={styles.bookBtn}
                  onPress={() => router.push("/select-seats")}
                >
                  <Text style={styles.bookBtnText}>Book Spot</Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={18}
                    color={isDark ? "#1c1c1e" : "#ffffff"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Filter Summary
      <View style={[styles.floatingWrap, { bottom: Math.max(insets.bottom, 24) + 60 }]}>
        <TouchableOpacity style={styles.floatingBadge} activeOpacity={0.9}>
          <MaterialIcons name="tune" size={18} color={isDark ? "#4a2e1b" : "#ffdbc8"} />
          <Text style={styles.floatingBadgeText}>4 Screenings Available</Text>
          <MaterialIcons name="arrow-forward" size={16} color={isDark ? "#4a2e1b" : "#ffdbc8"} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: (isDark ? "#121212" : "#fcf9f3"),
  },
  safeHeader: {
    backgroundColor: (isDark ? "rgba(18, 18, 18, 0.8)" : "rgba(252, 249, 243, 0.8)"),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(46,58,89,0.05)",
    zIndex: 50,
  },
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 122, 0, 0.2)", // primary-container/20
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    letterSpacing: -0.01 * 20,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  profileBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: (isDark ? "#ffb370" : "#994700"), // primary
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  topSection: {
    gap: 24,
    marginBottom: 24,
  },
  // Search
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    height: 52,
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    zIndex: 2,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"), // surface-container-lowest
    borderRadius: 999,
    paddingLeft: 48,
    paddingRight: 56,
    fontSize: 15,
    color: (isDark ? "#ffffff" : "#1c1c18"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterBtn: {
    position: "absolute",
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(153, 71, 0, 0.1)", // primary/10
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  // Mood
  moodSection: {
    gap: 8,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionOverline: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"), // on-surface-variant
    letterSpacing: 0.06 * 11,
  },
  resetBtn: {
    paddingHorizontal: 4,
  },
  resetBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
    letterSpacing: 0.06 * 11,
  },
  moodScroll: {
    gap: 8,
    paddingBottom: 4,
  },
  moodChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  moodChipActive: {
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
  },
  moodChipInactive: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
  },
  moodChipText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.01 * 14,
  },
  moodChipTextActive: {
    color: (isDark ? "#1c1c1e" : "#ffffff"),
  },
  moodChipTextInactive: {
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  // Format Tabs
  formatTabsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"), // surface-container
    padding: 4,
    borderRadius: 999,
  },
  formatTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 999,
  },
  formatTabActive: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  formatTabText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.01 * 14,
  },
  formatTabTextActive: {
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  formatTabTextInactive: {
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  // Curated List
  curatedSection: {
    gap: 20,
  },
  curatedHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  curatedTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  curatedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
  },
  curatedTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    letterSpacing: -0.01 * 20,
  },
  curatedSubtitle: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  movieCard: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 32, // rounded-lg maps to 2rem
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  posterWrapper: {
    width: "100%",
    height: 176, // h-44 = 44*4=176
    position: "relative",
  },
  posterImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  posterTopLeft: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    gap: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: (isDark ? "rgba(28, 28, 30, 0.9)" : "rgba(255, 255, 255, 0.9)"),
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
    letterSpacing: 0.06 * 11,
  },
  formatBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: (isDark ? "rgba(28, 28, 30, 0.9)" : "rgba(255, 255, 255, 0.9)"),
  },
  formatBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#94a3b8" : "#525e7f"), // secondary
    letterSpacing: 0.06 * 11,
  },
  bookmarkBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: (isDark ? "rgba(28, 28, 30, 0.9)" : "rgba(255, 255, 255, 0.9)"),
    alignItems: "center",
    justifyContent: "center",
  },
  movieInfo: {
    padding: 20,
    gap: 16,
  },
  movieMetaTop: {
    gap: 4,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    letterSpacing: -0.01 * 20,
  },
  durationText: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  tagsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
  },
  tagBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"),
    letterSpacing: 0.06 * 11,
  },
  hallText: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  screeningsBlock: {
    gap: 8,
  },
  screeningsOverline: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"),
    letterSpacing: 0.06 * 11,
  },
  timeChipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeChipActive: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: (isDark ? "#4a2e1b" : "#ffdbc8"), // primary-fixed
  },
  timeChipTextActive: {
    fontSize: 14,
    fontWeight: "700",
    color: "#321200", // on-primary-fixed
    letterSpacing: 0.01 * 14,
  },
  timeChipInactive: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
  },
  timeChipTextInactive: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#a1a1aa" : "#584235"),
    letterSpacing: 0.01 * 14,
  },
  bookingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  ticketTypeText: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  priceText: {
    fontSize: 16,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  bookBtn: {
    height: 46,
    paddingHorizontal: 24,
    borderRadius: 999,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bookBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#1c1c1e" : "#ffffff"),
    letterSpacing: 0.01 * 14,
  },
  // Floating Filter Summary
  floatingWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 40,
  },
  floatingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: (isDark ? "#e2e8f0" : "#0d1a38"), // on-secondary-fixed
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#1c1c1e" : "#ffffff"), // on-primary
    letterSpacing: 0.01 * 14,
  },
});
