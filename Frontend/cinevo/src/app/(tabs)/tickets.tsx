import { useColorScheme } from 'react-native';
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function TicketsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 55);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 15 * 60;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedTime = `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;

  const tabs = [
    { id: "upcoming", label: "Upcoming (1)" },
    { id: "past", label: "Past Memories (14)" },
    { id: "cancelled", label: "Cancellations (0)" },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <SafeAreaView edges={["top"]} style={styles.safeHeader}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.brandIconWrap}>
              <MaterialIcons name="movie" size={20} color={isDark ? "#ff8c1a" : "#ff7a00"} />
            </View>
            <Text style={styles.headerTitle}>Tickets</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notifBtn} activeOpacity={0.7}>
              <MaterialIcons name="notifications" size={22} color={isDark ? "#a1a1aa" : "#584235"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileBtn} activeOpacity={0.8}>
              <MaterialIcons name="person" size={18} color={isDark ? "#1c1c1e" : "#ffffff"} />
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
        {/* Segmented Controls */}
        <View style={styles.tabsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScroll}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity activeOpacity={0.8}
                  key={tab.id}
                  style={[
                    styles.tab,
                    isActive ? styles.tabActive : styles.tabInactive,
                  ]}
                  onPress={() => setActiveTab(tab.id)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.tabText,
                      isActive ? styles.tabTextActive : styles.tabTextInactive,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {activeTab === "upcoming" && (
          <>
            {/* In-seat Concession Order Status */}
            <View style={styles.orderBanner}>
              <View style={styles.orderBannerLeft}>
                <View style={styles.orderIconWrap}>
                  <MaterialIcons
                    name="lunch-dining"
                    size={22}
                    color={isDark ? "#ff8c1a" : "#ff7a00"}
                  />
                </View>
                <View style={styles.orderInfo}>
                  <View style={styles.orderStatusRow}>
                    <View style={styles.pingDot} />
                    <Text style={styles.orderStatusText}>
                      ORDER DELIVERED • ROW F
                    </Text>
                  </View>
                  <Text style={styles.orderTitle} numberOfLines={1}>
                    Cyber Duo Delight delivered
                  </Text>
                </View>
              </View>
              <View style={styles.orderCheck}>
                <MaterialIcons name="check-circle" size={18} color="#515d7e" />
              </View>
            </View>

            {/* Active Ticket Hero Card */}
            <LinearGradient
              colors={[
                "rgba(255, 122, 0, 0.25)",
                "rgba(235, 232, 226, 1)",
                "rgba(202, 214, 253, 0.3)",
              ]}
              style={styles.heroGradientWrap}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.ticketCardInner}>
                {/* Poster */}
                <View style={styles.ticketPosterWrap}>
                  <Image
                    source={{
                      uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB84Y8-jka6YlxBe3cEragY4fekRs1Sh4OY65ESuJIyMBWyXgXYPk9v3Ambo0SWTjXiVKqozYjvVonVNOGjBR49M1o3mK0zmU3b5p2otEezJViPFcHQdLTBWNdZAVlip6mXxIoR13c1asJNi2zQF63dCV5QCQLlXy5zuOA3QPAYk8o_gsMCuDgeT8jnUdKvZqqGusutq5aN2jjIZcA2nlVtt3jVzwXdUT-FgPDn6eFcisv32wch84Ho",
                    }}
                    style={styles.ticketPosterImage}
                  />
                  <LinearGradient
                    colors={[
                      "rgba(49, 49, 45, 0.9)",
                      "rgba(49, 49, 45, 0.4)",
                      "transparent",
                    ]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={StyleSheet.absoluteFillObject}
                  />

                  {/* Live Status Chip */}
                  <View style={styles.liveAdmitChip}>
                    <View style={styles.pulseDot} />
                    <Text style={styles.liveAdmitText}>ADMIT TWO</Text>
                  </View>

                  <View style={styles.posterBottomInfo}>
                    <View style={styles.posterBottomLeft}>
                      <Text style={styles.formatText}>IMAX • DOLBY ATMOS</Text>
                      <Text style={styles.movieTitleHero}>Neo Tokyo 2099</Text>
                    </View>
                    <View style={styles.posterBottomRight}>
                      <Text style={styles.runtimeLabel}>Runtime</Text>
                      <Text style={styles.runtimeValue}>148 min</Text>
                    </View>
                  </View>
                </View>

                {/* Schedule & Seating */}
                <View style={styles.specsRow}>
                  <View style={styles.specItem}>
                    <View style={styles.specLabelRow}>
                      <MaterialIcons
                        name="calendar-today"
                        size={14}
                        color={isDark ? "#a1a1aa" : "#584235"}
                      />
                      <Text style={styles.specLabelText}>DATE</Text>
                    </View>
                    <Text style={styles.specValMain}>Today</Text>
                    <Text style={styles.specValSub}>Oct 24 • 20:30</Text>
                  </View>
                  <View style={styles.specItem}>
                    <View style={styles.specLabelRow}>
                      <MaterialIcons
                        name="door-front"
                        size={14}
                        color={isDark ? "#a1a1aa" : "#584235"}
                      />
                      <Text style={styles.specLabelText}>AUDITORIUM</Text>
                    </View>
                    <Text style={[styles.specValMain, { color: "#ff7a00" }]}>
                      Audi 04
                    </Text>
                    <Text style={styles.specValSub}>Level 3 Lounge</Text>
                  </View>
                  <View style={styles.specItem}>
                    <View style={styles.specLabelRow}>
                      <MaterialIcons name="chair" size={14} color={isDark ? "#a1a1aa" : "#584235"} />
                      <Text style={styles.specLabelText}>SEATS</Text>
                    </View>
                    <Text style={styles.specValMain}>Row F</Text>
                    <Text style={styles.specValSub}>Seats 6 & 7</Text>
                  </View>
                </View>

                {/* QR Module */}
                <View style={styles.qrModule}>
                  <Text style={styles.qrScanInstruction}>
                    Scan at Turnstile or Podium
                  </Text>

                  <View style={styles.qrWrapper}>
                    {/* Simulated QR Code for mockup */}
                    <View style={styles.qrMockCode}>
                      <View style={styles.qrCornerTopLeft} />
                      <View style={styles.qrCornerTopRight} />
                      <View style={styles.qrCornerBottomLeft} />

                      {/* Fake Dots */}
                      <View style={[styles.qrDot, { top: 20, left: 60 }]} />
                      <View style={[styles.qrDot, { top: 20, left: 80 }]} />
                      <View style={[styles.qrDot, { top: 40, left: 60 }]} />
                      <View style={[styles.qrDot, { top: 60, left: 20 }]} />
                      <View style={[styles.qrDot, { top: 80, left: 120 }]} />
                      <View style={[styles.qrDot, { top: 100, left: 60 }]} />
                      <View style={[styles.qrDot, { top: 120, left: 80 }]} />

                      <View style={styles.qrCenterLogo}>
                        <MaterialIcons name="movie" size={16} color={isDark ? "#1c1c1e" : "#ffffff"} />
                      </View>
                    </View>
                  </View>

                  {/* Refresh Timer */}
                  <View style={styles.refreshPill}>
                    <Text style={styles.refreshId}>Pass #TK-8829</Text>
                    <Text style={styles.refreshDot}>•</Text>
                    <MaterialIcons name="sync" size={14} color={isDark ? "#ffb370" : "#994700"} />
                    <Text style={styles.refreshTimerText}>
                      Auto-refreshes in {formattedTime}
                    </Text>
                  </View>
                </View>

                {/* Actions */}
                <View style={styles.actionStack}>
                  <TouchableOpacity
                    style={styles.walletBtn}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons
                      name="account-balance-wallet"
                      size={20}
                      color={isDark ? "#1c1c1e" : "#ffffff"}
                    />
                    <Text style={styles.walletBtnText}>
                      Save to Apple Wallet
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.secondaryActionsRow}>
                    <TouchableOpacity style={styles.secBtn} activeOpacity={0.8}>
                      <MaterialIcons name="share" size={18} color={isDark ? "#94a3b8" : "#525e7f"} />
                      <Text style={styles.secBtnText}>Share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secBtn} activeOpacity={0.8}>
                      <MaterialIcons name="near-me" size={18} color={isDark ? "#94a3b8" : "#525e7f"} />
                      <Text style={styles.secBtnText}>Directions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secBtn} activeOpacity={0.8}>
                      <MaterialIcons
                        name="edit-calendar"
                        size={18}
                        color={isDark ? "#94a3b8" : "#525e7f"}
                      />
                      <Text style={styles.secBtnText}>Modify</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </>
        )}

        {/* Past Stubs section always visible in this mockup unless strictly filtering, but I'll show it below like the HTML */}
        <View style={styles.pastSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View style={styles.sectionIconWrap}>
                <MaterialIcons
                  name="auto-awesome-motion"
                  size={18}
                  color="#515d7e"
                />
              </View>
              <Text style={styles.sectionTitle}>Past Stubs & Memories</Text>
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.viewAllText}>View All (14)</Text>
            </TouchableOpacity>
          </View>

          {/* Stub 1 */}
          <View style={styles.stubCard}>
            <View style={styles.stubTop}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkW-bBXUwpY6a_R7WRPGE14vL_aYiVBes4T33_BOOn5uj4_nWsMqyxGoNxhd_X3O8NIDpQ8dcwR-CcPF4FgI6IQMzjXRhETpEJDhR6QXKuDveWcBJ90kUcfqYf4oYfHijWoUxClvoHEVmvVsssV-85lIroGMlAJqP2UomcZ01HN1jn0nzaSOWqVI8tF2XZ2-nItWah7Sp3zbw7kWDQfGfbz2qY342jQWHNUNNuNXKAojnH_D1hEM7d",
                }}
                style={styles.stubImage}
              />
              <View style={styles.stubInfo}>
                <View style={styles.stubIdRow}>
                  <Text style={styles.stubIdText}>STUB #TK-7412</Text>
                  <Text style={styles.stubDateText}>Sep 18, 2024</Text>
                </View>
                <Text style={styles.stubTitle} numberOfLines={1}>
                  Project Aegis: Zero
                </Text>
                <Text style={styles.stubTheater} numberOfLines={1}>
                  Cinemark Pavilion • Audi 02
                </Text>
                <View style={styles.ratingRow}>
                  <View style={styles.starsRow}>
                    <MaterialIcons name="star" size={18} color={isDark ? "#ff8c1a" : "#ff7a00"} />
                    <MaterialIcons name="star" size={18} color={isDark ? "#ff8c1a" : "#ff7a00"} />
                    <MaterialIcons name="star" size={18} color={isDark ? "#ff8c1a" : "#ff7a00"} />
                    <MaterialIcons name="star" size={18} color={isDark ? "#ff8c1a" : "#ff7a00"} />
                    <MaterialIcons name="star-half" size={18} color={isDark ? "#ff8c1a" : "#ff7a00"} />
                  </View>
                  <Text style={styles.ratingValueText}>4.5</Text>
                </View>
              </View>
            </View>
            <View style={styles.stubBottom}>
              <View style={styles.stubPhotosRow}>
                <MaterialIcons name="photo-library" size={16} color={isDark ? "#94a3b8" : "#525e7f"} />
                <Text style={styles.stubPhotosText}>
                  2 Photo Snaps Attached
                </Text>
              </View>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.rewatchText}>Re-watch</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stub 2 */}
          <View style={styles.stubCard}>
            <View style={styles.stubTop}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAnSltCHhCjMiMgn-xdpUIseCIxzIUWCAsrYSYapdRRDtckAmEwRgOW77ypeqJi51wxdikt8EgTcozL0Jor4s04c2zniLw0j1yfaKn6qbZZF1GSzHmIIf-RV0WpBFBk2KjaSQ0zPG4dkNIvICsPjzlyrpk6wH-_Vx-8uVHda6llqzD7-BJAjICDekDNpQnEdkHvVKYaVlrflPbDaEKNis6l03IplKYfu4knwHJ6Vc5uMfD--13i5vf",
                }}
                style={styles.stubImage}
              />
              <View style={styles.stubInfo}>
                <View style={styles.stubIdRow}>
                  <Text style={[styles.stubIdText, { color: "#525e7f" }]}>
                    STUB #TK-6921
                  </Text>
                  <Text style={styles.stubDateText}>Aug 04, 2024</Text>
                </View>
                <Text style={styles.stubTitle} numberOfLines={1}>
                  Orbital Silence
                </Text>
                <Text style={styles.stubTheater} numberOfLines={1}>
                  Grand Horizon Theaters • Screen 7
                </Text>

                <View style={styles.rateRow}>
                  <View style={styles.starsRowEmpty}>
                    <MaterialIcons name="star" size={18} color="#e0c0af" />
                    <MaterialIcons name="star" size={18} color="#e0c0af" />
                    <MaterialIcons name="star" size={18} color="#e0c0af" />
                    <MaterialIcons name="star" size={18} color="#e0c0af" />
                    <MaterialIcons name="star" size={18} color="#e0c0af" />
                  </View>
                  <TouchableOpacity activeOpacity={0.8} style={styles.rateBtn}>
                    <Text style={styles.rateBtnText}>Rate Experience</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Perks / Vault Reminder */}
        <View style={styles.perkCard}>
          <View style={styles.perkIconWrap}>
            <MaterialIcons name="celebration" size={22} color={isDark ? "#ffb370" : "#994700"} />
          </View>
          <View style={styles.perkInfo}>
            <Text style={styles.perkTitle}>Digital Vault Perk</Text>
            <Text style={styles.perkDesc}>
              Every stub stamps your CinePass card. 2 more stamps for free
              truffle popcorn!
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
    letterSpacing: -0.2,
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
    backgroundColor: (isDark ? "#ffb370" : "#994700"),
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 24,
  },
  // Tabs
  tabsWrapper: {
    marginBottom: -8, // slight adjustment for visual spacing
  },
  tabsScroll: {
    gap: 8,
    paddingVertical: 4,
  },
  tab: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabInactive: {
    backgroundColor: (isDark ? "#2c2c2e" : "#ebe8e2"),
  },
  tabText: {
    fontSize: 14,
    fontWeight: "700",
  },
  tabTextActive: {
    color: (isDark ? "#1c1c1e" : "#ffffff"),
  },
  tabTextInactive: {
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  // Order Banner
  orderBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#cad6fd", // secondary-container
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  orderBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  orderIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  orderInfo: {
    flex: 1,
  },
  orderStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"), // primary-container
  },
  orderStatusText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"), // primary
    letterSpacing: 0.6,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#515d7e", // on-secondary-container
    marginTop: 2,
  },
  orderCheck: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  // Hero Card
  heroGradientWrap: {
    borderRadius: 24,
    padding: 4,
    shadowColor: "#2e3a59",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
  },
  ticketCardInner: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 22,
    padding: 20,
    gap: 20,
    overflow: "hidden",
  },
  ticketPosterWrap: {
    width: "100%",
    height: 176, // 44rem equivalents
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
  },
  ticketPosterImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  liveAdmitChip: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
  },
  liveAdmitText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#ff8c1a" : "#ff7a00"),
    letterSpacing: 0.5,
  },
  posterBottomInfo: {
    position: "absolute",
    bottom: 12,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  posterBottomLeft: {
    flex: 1,
  },
  formatText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#4a2e1b" : "#ffdbc8"),
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  movieTitleHero: {
    fontSize: 24,
    fontWeight: "700",
    color: (isDark ? "#1c1c1e" : "#ffffff"),
    lineHeight: 30,
  },
  posterBottomRight: {
    alignItems: "flex-end",
  },
  runtimeLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffb68b",
  },
  runtimeValue: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#1c1c1e" : "#ffffff"),
  },
  // Specs Row
  specsRow: {
    flexDirection: "row",
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    borderRadius: 12,
    padding: 16,
    justifyContent: "space-between",
  },
  specItem: {
    alignItems: "center",
    flex: 1,
  },
  specLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  specLabelText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  specValMain: {
    fontSize: 16,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    marginTop: 4,
  },
  specValSub: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
    marginTop: 2,
  },
  // QR Module
  qrModule: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#2e3a59",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  qrScanInstruction: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"),
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  qrWrapper: {
    padding: 12,
    backgroundColor: (isDark ? "#ffffff" : "#1c1c18"),
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  qrMockCode: {
    width: 140,
    height: 140,
    backgroundColor: (isDark ? "#ffffff" : "#1c1c18"),
    position: "relative",
  },
  qrCornerTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 32,
    height: 32,
    borderWidth: 8,
    borderColor: (isDark ? "#121212" : "#fcf9f3"),
    borderRadius: 8,
  },
  qrCornerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 32,
    height: 32,
    borderWidth: 8,
    borderColor: (isDark ? "#121212" : "#fcf9f3"),
    borderRadius: 8,
  },
  qrCornerBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 32,
    height: 32,
    borderWidth: 8,
    borderColor: (isDark ? "#121212" : "#fcf9f3"),
    borderRadius: 8,
  },
  qrDot: {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: (isDark ? "#121212" : "#fcf9f3"),
    borderRadius: 2,
  },
  qrCenterLogo: {
    position: "absolute",
    top: 56,
    left: 56,
    width: 28,
    height: 28,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  refreshPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 16,
  },
  refreshId: {
    fontSize: 11,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  refreshDot: {
    fontSize: 10,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  refreshTimerText: {
    fontSize: 11,
    fontWeight: "700",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  // Actions
  actionStack: {
    gap: 8,
    paddingTop: 4,
  },
  walletBtn: {
    width: "100%",
    height: 48,
    backgroundColor: (isDark ? "#ffffff" : "#1c1c18"),
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  walletBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#1c1c1e" : "#ffffff"),
  },
  secondaryActionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  secBtn: {
    flex: 1,
    height: 44,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  secBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  // Past Stubs
  pastSection: {
    gap: 16,
    paddingTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#cad6fd",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: "700",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  stubCard: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: "#2e3a59",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  stubTop: {
    flexDirection: "row",
    gap: 12,
  },
  stubImage: {
    width: 64,
    height: 80,
    borderRadius: 12,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
  },
  stubInfo: {
    flex: 1,
  },
  stubIdRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stubIdText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#ff8c1a" : "#ff7a00"),
    textTransform: "uppercase",
  },
  stubDateText: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  stubTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    marginTop: 4,
  },
  stubTheater: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  starsRow: {
    flexDirection: "row",
  },
  starsRowEmpty: {
    flexDirection: "row",
  },
  ratingValueText: {
    fontSize: 13,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  stubBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(246, 243, 237, 0.6)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  stubPhotosRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stubPhotosText: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  rewatchText: {
    fontSize: 13,
    fontWeight: "700",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  rateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  rateBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: (isDark ? "rgba(255, 140, 26, 0.15)" : "rgba(255, 122, 0, 0.15)"),
  },
  rateBtnText: {
    fontSize: 11,
    fontWeight: "700",
    color: (isDark ? "#ff8c1a" : "#ff7a00"),
  },
  // Perks Card
  perkCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  perkIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  perkInfo: {
    flex: 1,
  },
  perkTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  perkDesc: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
    marginTop: 2,
  },
});
