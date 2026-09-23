import { useColorScheme } from 'react-native';
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CheckoutScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [paymentExpanded, setPaymentExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeHeader}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity activeOpacity={0.8}
              onPress={() => router.back()}
              style={styles.iconBtn}
            >
              <MaterialIcons name="arrow-back" size={24} color={isDark ? "#ffffff" : "#1c1c18"} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              Checkout And E Ticket Confirmation
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.settingsBtn}>
            <MaterialIcons name="settings" size={20} color={isDark ? "#a1a1aa" : "#584235"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Celebration Header */}
        <View style={styles.celebrationSection}>
          <View style={styles.iconWrapper}>
            <View style={styles.celebrationIcon}>
              <MaterialIcons name="celebration" size={34} color={isDark ? "#ffb370" : "#994700"} />
            </View>
            <View style={styles.badgeTopRight}>
              <Text style={styles.badgeText}>✨</Text>
            </View>
            <View style={styles.badgeBottomLeft}>
              <Text style={styles.badgeText}>🎟️</Text>
            </View>
          </View>

          <View style={styles.statusChip}>
            <MaterialIcons name="check-circle" size={14} color={isDark ? "#ffb370" : "#994700"} />
            <Text style={styles.statusText}>
              BOOKING CONFIRMED • ORDER #NX-88291
            </Text>
          </View>

          <Text style={styles.pageTitle}>You're All Set, Alex!</Text>
          <Text style={styles.pageSubtitle}>
            Your tickets are safely stored here. Take a breath and get ready for
            an amazing experience.
          </Text>
        </View>

        {/* Ticket Card */}
        <View style={styles.ticketCard}>
          {/* Poster Section */}
          <View style={styles.posterContainer}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa64L9xIROoB-VSrm42NcvkkvOEPqqjHiMSEtTOlDgqhi2LLChxOL6o8n3L9CSp7cZCqOUaO_I4DtfDK4Ae26s6atDj1Y8PrNN5-1aZng5z5TF09zxteOYZzxKM_qXqHm9O3iqtvjzvt9BCdvb7wRW-09aXZNWpesYnB4bQXLU_aqRhj2VFZ5eo3oDNW3VPgI4eAVM26ntwiUEHh6A9TdxBxRixJFngac7TxBpW7MF2cYd63s9kvux",
              }}
              style={styles.poster}
              contentFit="cover"
            />
            <View style={styles.posterGradient} />
            <View style={styles.tagsContainer}>
              <View style={styles.tagDark}>
                <Text style={styles.tagDarkText}>IMAX 3D</Text>
              </View>
              <View style={styles.tagPrimary}>
                <Text style={styles.tagPrimaryText}>Audi 04</Text>
              </View>
            </View>
          </View>

          {/* Ticket Details */}
          <View style={styles.ticketDetails}>
            <View style={styles.movieHeaderRow}>
              <View>
                <Text style={styles.movieTitle}>Neo Tokyo 2099</Text>
                <Text style={styles.movieMeta}>
                  Sci-Fi Epic • 2h 45m • English Subtitles
                </Text>
              </View>
              <View style={styles.movieIconWrap}>
                <MaterialIcons name="movie" size={22} color={isDark ? "#ffb370" : "#994700"} />
              </View>
            </View>

            <View style={styles.gridRow}>
              <View style={styles.gridCard}>
                <View style={styles.cardIconRow}>
                  <MaterialIcons
                    name="calendar-today"
                    size={14}
                    color={isDark ? "#a1a1aa" : "#584235"}
                  />
                  <Text style={styles.cardLabel}>DATE & TIME</Text>
                </View>
                <Text style={styles.cardValueMain}>Today, Oct 24</Text>
                <Text style={styles.cardValueSubPrimary}>
                  20:30 (Doors 20:10)
                </Text>
              </View>
              <View style={styles.gridCard}>
                <View style={styles.cardIconRow}>
                  <MaterialIcons name="location-on" size={14} color={isDark ? "#a1a1aa" : "#584235"} />
                  <Text style={styles.cardLabel}>CINEMA LOCATION</Text>
                </View>
                <Text style={styles.cardValueMain} numberOfLines={1}>
                  Shibuya IMAX
                </Text>
                <Text style={styles.cardValueSub} numberOfLines={1}>
                  Turnstile Hall 4
                </Text>
              </View>
            </View>

            <View style={styles.rowCard}>
              <View style={styles.rowCardLeft}>
                <View style={styles.rowCardIconWrap}>
                  <MaterialIcons name="event-seat" size={20} color={isDark ? "#ffffff" : "#1c1c18"} />
                </View>
                <View>
                  <Text style={styles.cardLabel}>RESERVED SEATING</Text>
                  <Text style={styles.cardValueMain}>Row F • Seats 6, 7</Text>
                </View>
              </View>
              <View style={styles.pillBadge}>
                <Text style={styles.pillBadgeText}>Optimal View</Text>
              </View>
            </View>

            <View style={styles.rowCardAlt}>
              <View style={styles.rowCardIconWrapAlt}>
                <MaterialIcons name="fastfood" size={20} color={isDark ? "#ff8c1a" : "#ff7a00"} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardLabel}>INCLUDED CONCESSIONS</Text>
                <Text style={styles.cardValueMain} numberOfLines={1}>
                  Cyber Duo Delight
                </Text>
                <Text style={styles.cardValueSub}>
                  Counter Pickup or Direct Seat Delivery
                </Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.dividerWrap}>
            <View style={styles.dividerCutoutLeft} />
            <View style={styles.dashedLine} />
            <View style={styles.dividerCutoutRight} />
          </View>

          {/* QR Section */}
          <View style={styles.qrSection}>
            <View style={styles.qrWrapper}>
              {/* Simulated QR Code using MaterialIcons for simplicity, or we can use an Image if preferred */}
              <MaterialIcons name="qr-code-2" size={120} color={isDark ? "#ffffff" : "#1c1c18"} />
            </View>
            <Text style={styles.passId}>Pass ID: NX8829-F67-IMX</Text>
            <Text style={styles.qrInstructions}>
              Show this QR code at the hall turnstile for contactless entry.
              Screen brightness will automatically adjust.
            </Text>
            <View style={styles.liveStatusBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.liveStatusText}>
                Active • Refreshing in 14:58
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.paymentSection}>
          <TouchableOpacity
            style={styles.paymentHeader}
            activeOpacity={0.7}
            onPress={() => setPaymentExpanded(!paymentExpanded)}
          >
            <View style={styles.paymentHeaderLeft}>
              <View style={styles.paymentIconWrap}>
                <MaterialIcons name="receipt-long" size={22} color={isDark ? "#ffffff" : "#1c1c18"} />
              </View>
              <View>
                <Text style={styles.cardLabel}>PAYMENT COMPLETED</Text>
                <Text style={styles.paymentAmount}>$56.50 • Apple Pay</Text>
              </View>
            </View>
            <View style={styles.expandIconWrap}>
              <MaterialIcons
                name={paymentExpanded ? "expand-less" : "expand-more"}
                size={18}
                color={isDark ? "#ffffff" : "#1c1c18"}
              />
            </View>
          </TouchableOpacity>

          {paymentExpanded && (
            <View style={styles.paymentDetails}>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentRowLabel}>
                  2× Prime Optimal Seats (Row F)
                </Text>
                <Text style={styles.paymentRowValue}>$36.00</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentRowLabel}>
                  1× Cyber Duo Snack Combo
                </Text>
                <Text style={styles.paymentRowValue}>$18.00</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentRowLabel}>
                  Taxes & City Surcharge
                </Text>
                <Text style={styles.paymentRowValue}>$2.50</Text>
              </View>
              <View style={styles.paymentTotalRow}>
                <View style={styles.paymentTotalLeft}>
                  <MaterialIcons
                    name="check-circle"
                    size={20}
                    color={isDark ? "#ffb370" : "#994700"}
                  />
                  <Text style={styles.paymentTotalLabel}>Total Paid</Text>
                </View>
                <Text style={styles.paymentTotalAmount}>$56.50</Text>
              </View>
              <View style={styles.transactionMeta}>
                <MaterialIcons name="verified-user" size={16} color={isDark ? "#a1a1aa" : "#584235"} />
                <Text style={styles.transactionMetaText}>
                  Transaction ID: AP-99201384 • Apple Pay Auth 9821
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.primaryActionBtn} activeOpacity={0.8}>
            <MaterialIcons
              name="account-balance-wallet"
              size={20}
              color={isDark ? "#1c1c1e" : "#ffffff"}
            />
            <Text style={styles.primaryActionText}>
              Save to Apple Wallet 📲
            </Text>
          </TouchableOpacity>
          <View style={styles.secondaryActionsRow}>
            <TouchableOpacity
              style={styles.secondaryActionBtn}
              activeOpacity={0.8}
            >
              <MaterialIcons name="file-download" size={18} color={isDark ? "#ffffff" : "#1c1c18"} />
              <Text style={styles.secondaryActionText}>PDF Pass 📄</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryActionBtn}
              activeOpacity={0.8}
            >
              <MaterialIcons name="share" size={18} color={isDark ? "#ffffff" : "#1c1c18"} />
              <Text style={styles.secondaryActionText}>Share ✉️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsBox}>
          <View style={styles.instructionIconWrap}>
            <MaterialIcons name="directions-subway" size={18} color={isDark ? "#ffffff" : "#1c1c18"} />
          </View>
          <Text style={styles.instructionTitle}>Getting There Mindfully</Text>
          <Text style={styles.instructionText}>
            Shibuya Station Exit A2 is a short 3-minute stroll away. Doors open
            20 minutes prior to showtime.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: (isDark ? "#121212" : "#fcf9f3"), // background
  },
  safeHeader: {
    backgroundColor: (isDark ? "rgba(18, 18, 18, 0.85)" : "rgba(252, 249, 243, 0.85)"),
    zIndex: 50,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(46,58,89,0.06)",
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
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"), // on-surface
    letterSpacing: -0.01,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? "#2c2c2e" : "#ebe8e2"), // surface-container-high
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 24,
  },
  celebrationSection: {
    alignItems: "center",
    paddingVertical: 16,
  },
  iconWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  celebrationIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: (isDark ? "#4a2e1b" : "#ffdbc8"), // primary-fixed
    alignItems: "center",
    justifyContent: "center",
    shadowColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
  badgeTopRight: {
    position: "absolute",
    top: -4,
    right: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#cad6fd", // secondary-container
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeBottomLeft: {
    position: "absolute",
    bottom: -4,
    left: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#e4dfff", // tertiary-fixed
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeText: {
    fontSize: 10,
  },
  statusChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: (isDark ? "#2c2c2e" : "#ebe8e2"), // surface-container-high
    borderRadius: 16,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 11,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"), // on-surface-variant
    letterSpacing: 0.6,
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    letterSpacing: -0.24,
    textAlign: "center",
  },
  pageSubtitle: {
    fontSize: 15,
    fontFamily: "Nunito Sans",
    fontWeight: "400",
    color: (isDark ? "#a1a1aa" : "#584235"),
    textAlign: "center",
    maxWidth: 280,
    marginTop: 4,
    lineHeight: 24,
  },
  ticketCard: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"), // surface-container-lowest
    borderRadius: 24, // changed from lg (approx)
    overflow: "hidden",
    shadowColor: "#2e3a59",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 4,
  },
  posterContainer: {
    height: 176, // 44 * 4
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  posterGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "rgba(255,255,255,0.2)", // simplified gradient representation
  },
  tagsContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    gap: 8,
  },
  tagDark: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "rgba(28,28,24,0.8)", // on-background with opacity
    borderRadius: 16,
  },
  tagDarkText: {
    fontSize: 11,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "800",
    color: (isDark ? "#121212" : "#fcf9f3"), // surface-bright
  },
  tagPrimary: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"), // primary-container
    borderRadius: 16,
  },
  tagPrimaryText: {
    fontSize: 11,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "800",
    color: (isDark ? "#1c1c1e" : "#ffffff"), // on-primary
  },
  ticketDetails: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: -8,
    gap: 16,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    zIndex: 10,
  },
  movieHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
  },
  movieTitle: {
    fontSize: 20,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  movieMeta: {
    fontSize: 13,
    fontFamily: "Nunito Sans",
    fontWeight: "400",
    color: (isDark ? "#a1a1aa" : "#584235"),
    marginTop: 2,
  },
  movieIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? "#4a2e1b" : "#ffdbc8"),
    alignItems: "center",
    justifyContent: "center",
  },
  gridRow: {
    flexDirection: "row",
    gap: 12,
  },
  gridCard: {
    flex: 1,
    padding: 12,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"), // surface-container-low
    borderRadius: 16,
  },
  cardIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 11,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  cardValueMain: {
    fontSize: 16,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  cardValueSubPrimary: {
    fontSize: 13,
    fontFamily: "Nunito Sans",
    fontWeight: "700",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  cardValueSub: {
    fontSize: 13,
    fontFamily: "Nunito Sans",
    fontWeight: "400",
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    borderRadius: 16,
  },
  rowCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowCardIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"), // surface-container
    alignItems: "center",
    justifyContent: "center",
  },
  pillBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: (isDark ? "#4a2e1b" : "#ffdbc8"),
  },
  pillBadgeText: {
    fontSize: 11,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  rowCardAlt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    backgroundColor: "rgba(235, 232, 226, 0.6)", // surface-container-high/60
    borderRadius: 16,
  },
  rowCardIconWrapAlt: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dividerWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 16,
    overflow: "hidden",
  },
  dividerCutoutLeft: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: (isDark ? "#121212" : "#fcf9f3"), // background color
    marginLeft: -20,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: "rgba(224, 192, 175, 0.6)", // outline-variant/60
    borderStyle: "dashed",
    marginHorizontal: 12,
  },
  dividerCutoutRight: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: (isDark ? "#121212" : "#fcf9f3"),
    marginRight: -20,
  },
  qrSection: {
    padding: 20,
    alignItems: "center",
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
  },
  qrWrapper: {
    padding: 16,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 16,
    shadowColor: "#2e3a59",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 2,
    marginBottom: 12,
  },
  passId: {
    fontSize: 16,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    letterSpacing: -0.1,
  },
  qrInstructions: {
    fontSize: 13,
    fontFamily: "Nunito Sans",
    fontWeight: "400",
    color: (isDark ? "#a1a1aa" : "#584235"),
    textAlign: "center",
    maxWidth: 320,
    marginTop: 4,
    lineHeight: 20,
  },
  liveStatusBadge: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"), // primary-container
  },
  liveStatusText: {
    fontSize: 11,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  paymentSection: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 16, // approx lg
    padding: 20,
    shadowColor: "#2e3a59",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 1,
  },
  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  paymentIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"), // surface-container
    alignItems: "center",
    justifyContent: "center",
  },
  paymentAmount: {
    fontSize: 16,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  expandIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    alignItems: "center",
    justifyContent: "center",
  },
  paymentDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 0, // as per HTML
    gap: 12,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paymentRowLabel: {
    fontSize: 15,
    fontFamily: "Nunito Sans",
    fontWeight: "400",
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  paymentRowValue: {
    fontSize: 15,
    fontFamily: "Nunito Sans",
    fontWeight: "600",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  paymentTotalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    marginTop: 4,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    padding: 12,
    borderRadius: 16,
  },
  paymentTotalLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  paymentTotalLabel: {
    fontSize: 16,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  paymentTotalAmount: {
    fontSize: 16,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  transactionMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  transactionMetaText: {
    fontSize: 13,
    fontFamily: "Nunito Sans",
    fontWeight: "400",
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  actionsSection: {
    gap: 12,
  },
  primaryActionBtn: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  primaryActionText: {
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "700",
    color: (isDark ? "#1c1c1e" : "#ffffff"),
  },
  secondaryActionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  secondaryActionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  secondaryActionText: {
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  instructionsBox: {
    alignItems: "center",
    padding: 16,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    borderRadius: 16, // lg
    gap: 8,
  },
  instructionIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    alignItems: "center",
    justifyContent: "center",
  },
  instructionTitle: {
    fontSize: 16,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  instructionText: {
    fontSize: 13,
    fontFamily: "Nunito Sans",
    fontWeight: "400",
    color: (isDark ? "#a1a1aa" : "#584235"),
    textAlign: "center",
    maxWidth: 270,
    lineHeight: 20,
  },
});
