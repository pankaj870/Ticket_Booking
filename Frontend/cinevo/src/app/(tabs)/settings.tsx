import { useColorScheme } from 'react-native';
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Custom toggle switch matching the mockup
const CustomSwitch = ({ value, onValueChange }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={[
        styles.switchBase,
        value ? styles.switchActive : styles.switchInactive,
      ]}
    >
      <View
        style={[
          styles.switchKnob,
          value ? styles.switchKnobActive : styles.switchKnobInactive,
        ]}
      />
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  // Toggle states
  const [showtimeReminders, setShowtimeReminders] = useState(true);
  const [ticketDiscounts, setTicketDiscounts] = useState(true);
  const [watchlistReleases, setWatchlistReleases] = useState(true);
  const [personalizedRecs, setPersonalizedRecs] = useState(true);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <SafeAreaView edges={["top"]} style={styles.safeHeader}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.brandIconWrap}>
              <MaterialIcons name="theaters" size={22} color={isDark ? "#ffb370" : "#994700"} />
            </View>
            <Text style={styles.headerTitle} numberOfLines={1}>
              Settings
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity activeOpacity={0.8}
              style={styles.profileBtn}
              onPress={() => router.push("/(tabs)/profile")}
            >
              <MaterialIcons name="person" size={20} color={isDark ? "#ffffff" : "#1c1c18"} />
            </TouchableOpacity>
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
        {/* Search */}
        <View style={styles.greetingSection}>
          <View style={styles.searchWrapper}>
            <MaterialIcons
              name="search"
              size={20}
              color={isDark ? "#a1a1aa" : "#584235"}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search settings..."
              placeholderTextColor="rgba(88, 66, 53, 0.6)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Quick Tip Pill */}
        <View style={styles.quickTipCard}>
          <View style={styles.quickTipIconWrap}>
            <MaterialIcons name="chevron-left" size={22} color={isDark ? "#e2e8f0" : "#0d1a38"} />
          </View>
          <View style={styles.quickTipTextWrap}>
            <Text style={styles.quickTipTitle}>Your Privacy Sanctuary</Text>
            <Text style={styles.quickTipSub}>
              Your ticket history and payment data are encrypted.
            </Text>
          </View>
        </View>

        {/* SECTION 1: Account & Preferences */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <MaterialIcons name="person-pin" size={18} color={isDark ? "#ff8c1a" : "#ff7a00"} />
            <Text style={styles.sectionTitle}>ACCOUNT & PREFERENCES</Text>
          </View>
          <View style={styles.sectionCard}>
            <TouchableOpacity activeOpacity={0.8} style={styles.listItem}>
              <View style={styles.listLeft}>
                <View
                  style={[
                    styles.listIconWrap,
                    { backgroundColor: "rgba(255,219,200,0.4)" },
                  ]}
                >
                  <MaterialIcons name="badge" size={20} color={isDark ? "#ffb370" : "#994700"} />
                </View>
                <View style={styles.listTextWrap}>
                  <Text style={styles.listTitle}>Edit Personal Info</Text>
                  <Text style={styles.listSub} numberOfLines={1}>
                    Elena Vance • e.vance@cinema.art • +81 90-4821
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color="rgba(88,66,53,0.7)"
              />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.listItem}>
              <View style={styles.listLeft}>
                <View
                  style={[
                    styles.listIconWrap,
                    { backgroundColor: "rgba(202,214,253,0.4)" },
                  ]}
                >
                  <MaterialIcons name="contactless" size={20} color={isDark ? "#94a3b8" : "#525e7f"} />
                </View>
                <View style={styles.listTextWrap}>
                  <Text style={styles.listTitle}>Payment Methods</Text>
                  <Text style={styles.listSub} numberOfLines={1}>
                    Apple Pay active • Visa ending in 4242
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color="rgba(88,66,53,0.7)"
              />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.listItem}>
              <View style={styles.listLeft}>
                <View
                  style={[
                    styles.listIconWrap,
                    { backgroundColor: "rgba(255,219,200,0.4)" },
                  ]}
                >
                  <MaterialIcons name="storefront" size={20} color={isDark ? "#ffb370" : "#994700"} />
                </View>
                <View style={styles.listTextWrap}>
                  <Text style={styles.listTitle}>Preferred Theatres</Text>
                  <Text style={styles.listSub} numberOfLines={1}>
                    Shibuya IMAX • Shinjuku Laser Cinema
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color="rgba(88,66,53,0.7)"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 2: Notifications & Reminders */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <MaterialIcons
              name="notifications-active"
              size={18}
              color={isDark ? "#ff8c1a" : "#ff7a00"}
            />
            <Text style={styles.sectionTitle}>NOTIFICATIONS & REMINDERS</Text>
          </View>
          <View style={styles.sectionCard}>
            <View style={styles.listItem}>
              <View style={styles.listLeft}>
                <View style={styles.listIconWrapGray}>
                  <MaterialIcons name="alarm" size={20} color={isDark ? "#ffb370" : "#994700"} />
                </View>
                <View style={styles.listTextWrap}>
                  <Text style={styles.listTitle}>Showtime Reminders</Text>
                  <Text style={styles.listSub}>
                    Friendly alert 2 hours before curtain calls
                  </Text>
                </View>
              </View>
              <CustomSwitch
                value={showtimeReminders}
                onValueChange={setShowtimeReminders}
              />
            </View>

            <View style={styles.listItem}>
              <View style={styles.listLeft}>
                <View style={styles.listIconWrapGray}>
                  <MaterialIcons name="local-offer" size={20} color={isDark ? "#ffb370" : "#994700"} />
                </View>
                <View style={styles.listTextWrap}>
                  <Text style={styles.listTitle}>Ticket Discounts & Perks</Text>
                  <Text style={styles.listSub}>
                    Student specials, matinees & snack upgrades
                  </Text>
                </View>
              </View>
              <CustomSwitch
                value={ticketDiscounts}
                onValueChange={setTicketDiscounts}
              />
            </View>

            <View style={styles.listItem}>
              <View style={styles.listLeft}>
                <View style={styles.listIconWrapGray}>
                  <MaterialIcons
                    name="bookmark-heart"
                    size={20}
                    color={isDark ? "#ffb370" : "#994700"}
                  />
                </View>
                <View style={styles.listTextWrap}>
                  <Text style={styles.listTitle}>Watchlist Releases</Text>
                  <Text style={styles.listSub}>
                    Get pinged when anticipated movies open
                  </Text>
                </View>
              </View>
              <CustomSwitch
                value={watchlistReleases}
                onValueChange={setWatchlistReleases}
              />
            </View>
          </View>
        </View>

        {/* SECTION 3: Privacy, Security & Data */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <MaterialIcons name="verified-user" size={18} color={isDark ? "#ff8c1a" : "#ff7a00"} />
            <Text style={styles.sectionTitle}>PRIVACY, SECURITY & DATA</Text>
          </View>
          <View style={styles.sectionCard}>
            <View style={styles.listItem}>
              <View style={styles.listLeft}>
                <View style={styles.listIconWrapGray}>
                  <MaterialIcons name="near-me" size={20} color={isDark ? "#ffb370" : "#994700"} />
                </View>
                <View style={styles.listTextWrap}>
                  <Text style={styles.listTitle}>Location Services</Text>
                  <Text style={styles.listSub} numberOfLines={1}>
                    To display closest theatres and parking
                  </Text>
                </View>
              </View>
              <View style={styles.statusPill}>
                <Text style={styles.statusPillText}>While Using App</Text>
              </View>
            </View>

            <View style={styles.listItem}>
              <View style={styles.listLeft}>
                <View style={styles.listIconWrapGray}>
                  <MaterialIcons
                    name="auto-awesome"
                    size={20}
                    color={isDark ? "#ffb370" : "#994700"}
                  />
                </View>
                <View style={styles.listTextWrap}>
                  <Text style={styles.listTitle}>
                    Personalized Recommendations
                  </Text>
                  <Text style={styles.listSub}>
                    Films tailored to your genre affinities
                  </Text>
                </View>
              </View>
              <CustomSwitch
                value={personalizedRecs}
                onValueChange={setPersonalizedRecs}
              />
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.listItem}>
              <View style={styles.listLeft}>
                <View style={styles.listIconWrapGray}>
                  <MaterialIcons
                    name="share-location"
                    size={20}
                    color={isDark ? "#ffb370" : "#994700"}
                  />
                </View>
                <View style={styles.listTextWrap}>
                  <Text style={styles.listTitle}>Data Sharing Preferences</Text>
                  <Text style={styles.listSub}>
                    Manage third-party analytics & diagnostic logs
                  </Text>
                </View>
              </View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color="rgba(88,66,53,0.7)"
              />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={styles.listItem}>
              <View style={styles.listLeft}>
                <View
                  style={[
                    styles.listIconWrap,
                    { backgroundColor: "rgba(255,219,200,0.4)" },
                  ]}
                >
                  <MaterialIcons
                    name="file-download"
                    size={20}
                    color={isDark ? "#ffb370" : "#994700"}
                  />
                </View>
                <View style={styles.listTextWrap}>
                  <Text style={[styles.listTitle, { color: "#994700" }]}>
                    Download My Personal Data
                  </Text>
                  <Text style={styles.listSub}>
                    Receive a clean JSON archive of ticket stubs and ratings
                  </Text>
                </View>
              </View>
              <MaterialIcons name="download" size={20} color={isDark ? "#ffb370" : "#994700"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 4: Legal, Policies & Terms */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <MaterialIcons name="gavel" size={18} color={isDark ? "#ff8c1a" : "#ff7a00"} />
            <Text style={styles.sectionTitle}>LEGAL, POLICIES & TERMS</Text>
          </View>
          <View style={styles.sectionCard}>
            <TouchableOpacity activeOpacity={0.8} style={styles.policyCard}>
              <View style={styles.policyHeader}>
                <View style={styles.policyHeaderLeft}>
                  <Text style={styles.policyTitle}>Privacy Policy</Text>
                  <View style={styles.datePill}>
                    <Text style={styles.datePillText}>Updated Oct 2024</Text>
                  </View>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={16}
                  color="rgba(88,66,53,0.7)"
                />
              </View>
              <Text style={styles.policyDesc}>
                Summary: We keep your ticketing info private. We never sell
                profile habits, watch history, or payment profiles to
                programmatic ad exchanges.
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity activeOpacity={0.8} style={styles.simpleListItem}>
              <View style={styles.listTextWrap}>
                <Text style={styles.listTitle}>Terms of Service</Text>
                <Text style={styles.listSub}>
                  Ticketing policies, entry rules & seating etiquette
                </Text>
              </View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color="rgba(88,66,53,0.7)"
              />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity activeOpacity={0.8} style={styles.simpleListItem}>
              <View style={styles.listTextWrap}>
                <Text style={styles.listTitle}>
                  Cancellation & Refund Policy
                </Text>
                <Text
                  style={[
                    styles.listSub,
                    { color: "#ff7a00", fontWeight: "600" },
                  ]}
                >
                  100% free cancellation up to 2 hours before showtime
                </Text>
              </View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color="rgba(88,66,53,0.7)"
              />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity activeOpacity={0.8} style={styles.simpleListItem}>
              <View style={styles.listTextWrap}>
                <Text style={styles.listTitle}>Licenses & Open Source</Text>
                <Text style={styles.listSub}>
                  Gratitude to the open-source multimedia ecosystem
                </Text>
              </View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color="rgba(88,66,53,0.7)"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Mascot State */}
        <View style={styles.mascotCard}>
          <View style={styles.mascotIconWrap}>
            <MaterialIcons name="movie-filter" size={24} color={isDark ? "#1c1c1e" : "#ffffff"} />
          </View>
          <View style={styles.listTextWrap}>
            <Text style={styles.listTitle}>Movies are better together</Text>
            <Text style={styles.listSub}>
              Rest easy knowing your preferences are kept in your pocket, always
              cozy.
            </Text>
          </View>
        </View>

        {/* Footer Actions */}
        <View style={styles.footerSection}>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.8}>
              <MaterialIcons name="logout" size={18} color={isDark ? "#a1a1aa" : "#584235"} />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.8}>
              <MaterialIcons name="delete-forever" size={18} color={isDark ? "#ff897d" : "#ba1a1a"} />
              <Text style={styles.deleteText}>Delete Account</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.versionWrap}>
            <Text style={styles.versionTitle}>
              Cinevo v3.4.2 (Warm Edition)
            </Text>
            <Text style={styles.versionSub}>
              Crafted with ♥ for movie enthusiasts everywhere
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: (isDark ? "#121212" : "#fcf9f3"),
  },
  safeHeader: {
    backgroundColor: (isDark ? "rgba(18, 18, 18, 0.85)" : "rgba(252, 249, 243, 0.85)"),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(46,58,89,0.06)",
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
    gap: 12,
    flex: 1,
  },
  brandIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? "#4a2e1b" : "#ffdbc8"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2e3a59",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    letterSpacing: -0.5,
    flexShrink: 1,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? "#2c2c2e" : "#ebe8e2"),
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 24,
  },
  greetingSection: {
    gap: 12,
  },
  greetingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingTextWrap: {
    flex: 1,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    letterSpacing: -0.2,
  },
  greetingSub: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
    marginTop: 2,
  },
  tuneIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: (isDark ? "#4a2e1b" : "#ffdbc8"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 999,
    height: 48,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  quickTipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: "#2e3a59",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  quickTipIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(202,214,253,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  quickTipTextWrap: {
    flex: 1,
  },
  quickTipTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  quickTipSub: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
    marginTop: 2,
  },
  section: {
    gap: 8,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#a1a1aa" : "#584235"),
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 12,
    padding: 8,
    gap: 4,
    shadowColor: "#2e3a59",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
  },
  listLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    paddingRight: 12,
  },
  listIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  listIconWrapGray: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    alignItems: "center",
    justifyContent: "center",
  },
  listTextWrap: {
    flex: 1,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  listSub: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
    marginTop: 2,
  },
  switchBase: {
    width: 52,
    height: 28,
    borderRadius: 14,
    padding: 4,
    justifyContent: "center",
  },
  switchActive: {
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
  },
  switchInactive: {
    backgroundColor: (isDark ? "#2c2c2e" : "#ebe8e2"),
  },
  switchKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  switchKnobActive: {
    transform: [{ translateX: 24 }],
  },
  switchKnobInactive: {
    transform: [{ translateX: 0 }],
  },
  statusPill: {
    backgroundColor: "rgba(255,219,200,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#321200",
  },
  policyCard: {
    padding: 16,
  },
  policyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  policyHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  datePill: {
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  datePillText: {
    fontSize: 11,
    fontWeight: "700",
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  policyDesc: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
    marginTop: 12,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    marginHorizontal: 16,
  },
  simpleListItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  mascotCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    borderRadius: 12,
    padding: 16,
    gap: 16,
    marginTop: 8,
  },
  mascotIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  footerSection: {
    alignItems: "center",
    paddingTop: 8,
    gap: 16,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  signOutBtn: {
    flex: 1,
    height: 48,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#2e3a59",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  signOutText: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  deleteBtn: {
    flex: 1,
    height: 48,
    backgroundColor: (isDark ? "#410002" : "#ffdad6"),
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#ffb4ab" : "#93000a"),
  },
  versionWrap: {
    alignItems: "center",
    gap: 4,
  },
  versionTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"),
    letterSpacing: 0.5,
  },
  versionSub: {
    fontSize: 13,
    color: "rgba(88,66,53,0.6)",
  },
});
