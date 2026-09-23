import { useColorScheme } from 'react-native';
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SelectSeatsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedSeats, setSelectedSeats] = useState<string[]>(["F6", "F7"]);

  const toggleSeat = (id: string) => {
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const isSelected = (id: string) => selectedSeats.includes(id);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeHeader}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity activeOpacity={0.8}
              style={styles.backBtn}
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={20} color={isDark ? "#ffffff" : "#1c1c18"} />
            </TouchableOpacity>
            <View style={styles.headerTitleCol}>
              <Text style={styles.headerTitle}>Choose Your Spot</Text>
              <View style={styles.headerSubtitleRow}>
                <Text style={styles.headerSubtitleText}>Neo Tokyo 2099</Text>
                <Text style={styles.headerSubtitleDot}>•</Text>
                <Text style={styles.headerSubtitleText}>Audi 04</Text>
              </View>
            </View>
          </View>
          <View style={styles.profileBtn}>
            <MaterialIcons name="face" size={20} color={isDark ? "#ffb370" : "#994700"} />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 180,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Movie Meta Ribbon Card */}
        <View style={styles.ribbonCard}>
          <View style={styles.posterWrap}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi0RG_2bFzc-l3d-8icwDFqmyTXHMTiGY8rFLuKsjnoE1dKLeimfmRv6REWymTv5TApg48dptmleAJh0QTtGiinH7jLEHqolUf5gEfI6LTt0sSxLQmRg3W3QHWVVQwgCisVJw4HVESnAhmGNe6tSTpZQaDJFTIfhLWUvEDQURqnFNftzKubCJf4ty-Lj9AC0ojOYMMc_8hAWgghWSpGf6FRC6NoCN9HPUBo4qOoTdQSSZCpgutgpKx",
              }}
              style={styles.posterImage}
            />
            <View style={styles.posterGradient} />
          </View>
          <View style={styles.ribbonInfo}>
            <View style={styles.ribbonMetaTop}>
              <View style={styles.ratingBadge}>
                <MaterialIcons name="star" size={12} color="#753400" />
                <Text style={styles.ratingText}>9.4</Text>
              </View>
              <Text style={styles.metaSubText}>Sci-Fi • 2h 14m</Text>
            </View>
            <Text style={styles.ribbonTitle} numberOfLines={1}>
              Neo Tokyo 2099
            </Text>
            <View style={styles.tagsRow}>
              <View style={styles.tagBadge}>
                <MaterialIcons name="movie" size={13} color={isDark ? "#94a3b8" : "#525e7f"} />
                <Text style={styles.tagBadgeText}>IMAX Cozy</Text>
              </View>
              <View style={styles.tagBadge}>
                <MaterialIcons name="tune" size={13} color={isDark ? "#94a3b8" : "#525e7f"} />
                <Text style={styles.tagBadgeText}>Laser 4K</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Location Picker */}
        <View style={styles.locationBar}>
          <View style={styles.locationLeft}>
            <View style={styles.locationIconWrap}>
              <MaterialIcons name="theater-comedy" size={20} color={isDark ? "#e2e8f0" : "#0d1a38"} />
            </View>
            <View>
              <Text style={styles.locationTitle}>Shibuya Grand Cinema</Text>
              <Text style={styles.locationSub}>
                0.8 mi away • Shibuya 3-Chome
              </Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.changeBtn}>
            <Text style={styles.changeBtnText}>Change</Text>
            <MaterialIcons name="expand-more" size={14} color={isDark ? "#ffffff" : "#1c1c18"} />
          </TouchableOpacity>
        </View>

        {/* Date Selector */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <Text style={styles.sectionSubTitle}>October 2024</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateScroll}
        >
          <TouchableOpacity activeOpacity={0.8} style={[styles.dateChip, styles.dateChipActive]}>
            <Text style={[styles.dateDay, styles.dateActiveText]}>TODAY</Text>
            <Text style={[styles.dateNum, styles.dateActiveText]}>24</Text>
            <Text style={[styles.dateMonth, styles.dateActiveText]}>Thu</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.dateChip}>
            <Text style={styles.dateDay}>FRI</Text>
            <Text style={styles.dateNum}>25</Text>
            <Text style={styles.dateMonth}>Oct</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.dateChip}>
            <Text style={styles.dateDay}>SAT</Text>
            <Text style={styles.dateNum}>26</Text>
            <Text style={styles.dateMonth}>Oct</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.dateChip}>
            <Text style={styles.dateDay}>SUN</Text>
            <Text style={styles.dateNum}>27</Text>
            <Text style={styles.dateMonth}>Oct</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.dateChip}>
            <Text style={styles.dateDay}>MON</Text>
            <Text style={styles.dateNum}>28</Text>
            <Text style={styles.dateMonth}>Oct</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Format Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.formatScroll}
        >
          <TouchableOpacity activeOpacity={0.8}
            style={[styles.formatChip, styles.formatChipActive]}
          >
            <Text style={styles.formatChipTextActive}>All Formats</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.formatChip}>
            <Text style={styles.formatChipText}>IMAX Cozy</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.formatChip}>
            <Text style={styles.formatChipText}>Dolby Atmos</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.formatChip}>
            <Text style={styles.formatChipText}>VIP Recliner</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.formatChip}>
            <Text style={styles.formatChipText}>Standard 2D</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Amenities Bar */}
        <View style={styles.amenitiesBar}>
          <View style={styles.amenityItem}>
            <MaterialIcons name="bedtime" size={16} color={isDark ? "#ffb370" : "#994700"} />
            <Text style={styles.amenityText}>Free Blankets</Text>
          </View>
          <View style={styles.amenityDot} />
          <View style={styles.amenityItem}>
            <MaterialIcons
              name="notifications-paused"
              size={16}
              color={isDark ? "#ffb370" : "#994700"}
            />
            <Text style={styles.amenityText}>Quiet Entry</Text>
          </View>
          <View style={styles.amenityDot} />
          <View style={styles.amenityItem}>
            <MaterialIcons name="room-service" size={16} color={isDark ? "#ffb370" : "#994700"} />
            <Text style={styles.amenityText}>At-Seat Service</Text>
          </View>
        </View>

        {/* Showtimes and Seats */}
        <View style={styles.hallsContainer}>
          {/* Hall 1 */}
          <View style={styles.hallCard}>
            <View style={styles.hallHeader}>
              <View>
                <View style={styles.hallTitleRow}>
                  <Text style={styles.hallTitle}>IMAX Cozy Experience</Text>
                  <View style={styles.hallBadge}>
                    <Text style={styles.hallBadgeText}>Audi 04</Text>
                  </View>
                </View>
                <Text style={styles.hallSub}>
                  Laser 4K Projection • Premium Sound Pods
                </Text>
              </View>
              <MaterialIcons name="smart-display" size={22} color={isDark ? "#94a3b8" : "#525e7f"} />
            </View>
            <View style={styles.showtimesGrid}>
              <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                <Text style={styles.timeText}>14:15</Text>
                <Text style={styles.priceText}>$16.50</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                <View style={styles.fastBadge}>
                  <Text style={styles.fastBadgeText}>Fast</Text>
                </View>
                <Text style={styles.timeText}>17:45</Text>
                <Text style={styles.priceText}>$18.00</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.timeCardActive}>
                <Text style={styles.timeTextActive}>20:30</Text>
                <Text style={styles.priceTextActive}>$18.00</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                <Text style={styles.timeText}>23:15</Text>
                <Text style={styles.priceText}>$16.50</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Seat Picker Inline */}
          <View style={styles.seatPickerCard}>
            <View style={styles.seatPickerHeader}>
              <View>
                <View style={styles.seatPickerTitleRow}>
                  <Text style={styles.hallTitle}>
                    Selected Seats & Placement
                  </Text>
                  <View style={styles.seatCountBadge}>
                    <Text style={styles.seatCountText}>
                      {selectedSeats.length} Seats
                    </Text>
                  </View>
                </View>
                <Text style={styles.hallSub}>Audi 04 • IMAX Cozy (20:30)</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.editSeatsBtn}>
                <MaterialIcons name="edit" size={15} color={isDark ? "#ffb370" : "#994700"} />
                <Text style={styles.editSeatsText}>Edit Seats</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.seatTypesScroll}
            >
              <View style={styles.seatTypeActive}>
                <Text style={styles.seatTypeTextActive}>
                  Recliner Pods ($18.00)
                </Text>
              </View>
              <View style={styles.seatTypeInactive}>
                <Text style={styles.seatTypeTextInactive}>
                  Garden Lounger ($15.00)
                </Text>
              </View>
              <View style={styles.seatTypeInactive}>
                <Text style={styles.seatTypeTextInactive}>
                  Standard Cosy ($12.50)
                </Text>
              </View>
            </ScrollView>

            <View style={styles.seatMapArea}>
              <View style={styles.screenCurve} />
              <Text style={styles.screenText}>CURVED IMAX SCREEN</Text>

              <View style={styles.seatRows}>
                {/* Row E */}
                <View style={styles.seatRow}>
                  <Text style={styles.rowLabel}>E</Text>
                  <View style={styles.seatBlock}>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>1</Text>
                    </View>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>2</Text>
                    </View>
                  </View>
                  <View style={styles.seatAisle} />
                  <View style={styles.seatBlock}>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>3</Text>
                    </View>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>4</Text>
                    </View>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>5</Text>
                    </View>
                  </View>
                  <View style={styles.seatAisle} />
                  <View style={styles.seatBlock}>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>6</Text>
                    </View>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>7</Text>
                    </View>
                  </View>
                </View>

                {/* Row F */}
                <View style={styles.seatRow}>
                  <Text style={styles.rowLabel}>F</Text>
                  <View style={styles.seatBlock}>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>4</Text>
                    </View>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>5</Text>
                    </View>
                  </View>
                  <View style={styles.seatAisle} />
                  <View style={styles.seatBlock}>
                    <TouchableOpacity activeOpacity={0.8}
                      style={
                        isSelected("F6")
                          ? styles.seatSelected
                          : styles.seatAvailable
                      }
                      onPress={() => toggleSeat("F6")}
                    >
                      <Text
                        style={
                          isSelected("F6")
                            ? styles.seatLabelSelected
                            : styles.seatLabel
                        }
                      >
                        6
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}
                      style={
                        isSelected("F7")
                          ? styles.seatSelected
                          : styles.seatAvailable
                      }
                      onPress={() => toggleSeat("F7")}
                    >
                      <Text
                        style={
                          isSelected("F7")
                            ? styles.seatLabelSelected
                            : styles.seatLabel
                        }
                      >
                        7
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.seatAisle} />
                  <View style={styles.seatBlock}>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>8</Text>
                    </View>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>9</Text>
                    </View>
                  </View>
                </View>

                {/* Row G */}
                <View style={styles.seatRow}>
                  <Text style={styles.rowLabel}>G</Text>
                  <View style={styles.seatBlock}>
                    <View style={styles.seatTaken}>
                      <Text style={styles.seatLabelTaken}>1</Text>
                    </View>
                    <View style={styles.seatTaken}>
                      <Text style={styles.seatLabelTaken}>2</Text>
                    </View>
                  </View>
                  <View style={styles.seatAisle} />
                  <View style={styles.seatBlock}>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>3</Text>
                    </View>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>4</Text>
                    </View>
                    <View style={styles.seatAvailable}>
                      <Text style={styles.seatLabel}>5</Text>
                    </View>
                  </View>
                  <View style={styles.seatAisle} />
                  <View style={styles.seatBlock}>
                    <View style={styles.seatTaken}>
                      <Text style={styles.seatLabelTaken}>6</Text>
                    </View>
                    <View style={styles.seatTaken}>
                      <Text style={styles.seatLabelTaken}>7</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.seatLegend}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#ff7a00" }]}
                  />
                  <Text style={styles.legendText}>Selected</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#e5e2dc" }]}
                  />
                  <Text style={styles.legendText}>Available</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendDot,
                      { backgroundColor: "#31312d", opacity: 0.15 },
                    ]}
                  />
                  <Text style={styles.legendText}>Taken</Text>
                </View>
              </View>
            </View>

            <View style={styles.seatSummary}>
              <View>
                <Text style={styles.seatSummaryTitle}>Row F • Seats 6, 7</Text>
                <Text style={styles.seatSummarySub}>
                  Center Prime Recliners
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.seatSummaryTotal}>$36.00</Text>
                <Text style={styles.seatSummaryBreakdown}>($18.00 x 2)</Text>
              </View>
            </View>
          </View>

          {/* Hall 2 */}
          <View style={styles.hallCard}>
            <View style={styles.hallHeader}>
              <View>
                <View style={styles.hallTitleRow}>
                  <Text style={styles.hallTitle}>
                    Garden Lounges & Recliners
                  </Text>
                  <View style={styles.hallBadge}>
                    <Text style={styles.hallBadgeText}>Audi 02</Text>
                  </View>
                </View>
                <Text style={styles.hallSub}>
                  Heated Zero-G Loungers • Acoustic Curtains
                </Text>
              </View>
              <MaterialIcons name="weekend" size={22} color={isDark ? "#94a3b8" : "#525e7f"} />
            </View>
            <View style={styles.showtimesGrid}>
              <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                <Text style={styles.timeText}>15:30</Text>
                <Text style={styles.priceText}>$15.00</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                <Text style={styles.timeText}>18:45</Text>
                <Text style={styles.priceText}>$15.00</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                <Text style={styles.timeText}>21:30</Text>
                <Text style={styles.priceText}>$14.50</Text>
              </TouchableOpacity>
              <View style={styles.timeCardDisabled}>
                <Text style={styles.timeTextDisabled}>23:45</Text>
                <Text style={styles.priceTextDisabled}>Offline</Text>
              </View>
            </View>
          </View>

          {/* Hall 3 */}
          <View style={styles.hallCard}>
            <View style={styles.hallHeader}>
              <View>
                <View style={styles.hallTitleRow}>
                  <Text style={styles.hallTitle}>
                    Standard 2D (Low-Sensory)
                  </Text>
                  <View style={styles.hallBadge}>
                    <Text style={styles.hallBadgeText}>Audi 06</Text>
                  </View>
                </View>
                <Text style={styles.hallSub}>
                  Gentler Volume Level • Soft Ambient Floor Light
                </Text>
              </View>
              <MaterialIcons name="volume-down" size={22} color={isDark ? "#94a3b8" : "#525e7f"} />
            </View>
            <View style={styles.showtimesGrid}>
              <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                <Text style={styles.timeText}>13:00</Text>
                <Text style={styles.priceText}>$12.50</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                <Text style={styles.timeText}>16:00</Text>
                <Text style={styles.priceText}>$12.50</Text>
              </TouchableOpacity>
              <View style={styles.timeCardSoldOut}>
                <Text
                  style={[
                    styles.timeTextDisabled,
                    { textDecorationLine: "line-through" },
                  ]}
                >
                  19:15
                </Text>
                <Text style={styles.priceTextSoldOut}>Sold Out</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={styles.timeCard}>
                <Text style={styles.timeText}>22:00</Text>
                <Text style={styles.priceText}>$12.50</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={[
          styles.bottomCta,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <View style={styles.ctaLeft}>
            <Text style={styles.ctaLabel}>TOTAL PRICE</Text>
            <View style={styles.ctaPriceRow}>
              <Text style={styles.ctaPriceValue}>
                ${(selectedSeats.length * 18).toFixed(2)}
              </Text>
              <Text style={styles.ctaPriceSub}>
                ({selectedSeats.length} seats)
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            style={styles.snacksBtn}
            activeOpacity={0.9}
            onPress={() => router.push("/snacks")}
          >
            <MaterialIcons name="fastfood" size={18} color={isDark ? "#ffb370" : "#994700"} />
            <Text style={styles.snacksBtnText}>Add Snacks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.continueBtn}
            activeOpacity={0.9}
            onPress={() => router.push("/payment")}
          >
            <Text style={styles.continueBtnText}>Continue</Text>
            <MaterialIcons name="arrow-forward" size={18} color={isDark ? "#1c1c1e" : "#ffffff"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: (isDark ? "#121212" : "#fcf9f3") },
  safeHeader: {
    backgroundColor: "rgba(252, 249, 243, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(235, 232, 226, 0.6)",
    zIndex: 50,
  },
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleCol: { justifyContent: "center" },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    letterSpacing: -0.5,
  },
  headerSubtitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  headerSubtitleText: { fontSize: 12, fontWeight: "600", color: (isDark ? "#a1a1aa" : "#584235") },
  headerSubtitleDot: { color: "#e0c0af", fontSize: 12 },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffeedd",
    borderWidth: 1,
    borderColor: (isDark ? "#4a2e1b" : "#ffdbc8"),
    alignItems: "center",
    justifyContent: "center",
  },

  ribbonCard: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 20,
  },
  posterWrap: {
    width: 64,
    height: 96,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
  },
  posterImage: { width: "100%", height: "100%", resizeMode: "cover" },
  posterGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "40%",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  ribbonInfo: { flex: 1, justifyContent: "center" },
  ribbonMetaTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: (isDark ? "#4a2e1b" : "#ffdbc8"),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  ratingText: { fontSize: 11, fontWeight: "800", color: "#753400" },
  metaSubText: { fontSize: 13, color: (isDark ? "#a1a1aa" : "#584235") },
  ribbonTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  tagBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagBadgeText: { fontSize: 11, fontWeight: "700", color: (isDark ? "#94a3b8" : "#525e7f") },

  locationBar: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  locationLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  locationIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? "#1d2a4a" : "#dae2ff"),
    alignItems: "center",
    justifyContent: "center",
  },
  locationTitle: { fontSize: 14, fontWeight: "700", color: (isDark ? "#ffffff" : "#1c1c18") },
  locationSub: { fontSize: 13, color: (isDark ? "#a1a1aa" : "#584235") },
  changeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  changeBtnText: { fontSize: 11, fontWeight: "800", color: (isDark ? "#ffffff" : "#1c1c18") },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: (isDark ? "#ffffff" : "#1c1c18") },
  sectionSubTitle: { fontSize: 11, fontWeight: "800", color: (isDark ? "#a1a1aa" : "#584235") },
  dateScroll: { gap: 8, paddingBottom: 8, marginBottom: 12 },
  dateChip: {
    width: 76,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dateChipActive: { backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00") },
  dateDay: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"),
    textTransform: "uppercase",
  },
  dateNum: {
    fontSize: 20,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    marginVertical: 2,
  },
  dateMonth: { fontSize: 11, color: (isDark ? "#a1a1aa" : "#584235") },
  dateActiveText: { color: (isDark ? "#1c1c1e" : "#ffffff") },

  formatScroll: { gap: 8, paddingBottom: 16 },
  formatChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  formatChipActive: { backgroundColor: "#31312d" },
  formatChipText: { fontSize: 14, fontWeight: "700", color: (isDark ? "#ffffff" : "#1c1c18") },
  formatChipTextActive: { fontSize: 14, fontWeight: "700", color: "#f3f0ea" },

  amenitiesBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: (isDark ? "rgba(74, 46, 27, 0.4)" : "rgba(255, 219, 200, 0.4)"),
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  amenityItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  amenityText: { fontSize: 11, fontWeight: "800", color: (isDark ? "#ffb370" : "#994700") },
  amenityDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(153, 71, 0, 0.4)",
  },

  hallsContainer: { gap: 16 },
  hallCard: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  hallHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  hallTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  hallTitle: { fontSize: 16, fontWeight: "700", color: (isDark ? "#ffffff" : "#1c1c18") },
  hallBadge: {
    backgroundColor: (isDark ? "#1d2a4a" : "#dae2ff"),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  hallBadgeText: { fontSize: 11, fontWeight: "800", color: "#3a4666" },
  hallSub: { fontSize: 13, color: (isDark ? "#a1a1aa" : "#584235"), marginTop: 2 },
  showtimesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 4,
  },
  timeCard: {
    width: "23%",
    padding: 8,
    borderRadius: 8,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    alignItems: "center",
    justifyContent: "center",
  },
  timeCardActive: {
    width: "23%",
    padding: 8,
    borderRadius: 8,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeText: { fontSize: 16, fontWeight: "700", color: (isDark ? "#ffffff" : "#1c1c18") },
  priceText: { fontSize: 11, color: (isDark ? "#a1a1aa" : "#584235"), marginTop: 2 },
  timeTextActive: { fontSize: 16, fontWeight: "700", color: (isDark ? "#1c1c1e" : "#ffffff") },
  priceTextActive: {
    fontSize: 11,
    color: "rgba(255,255,255,0.9)",
    marginTop: 2,
  },
  fastBadge: {
    position: "absolute",
    top: -6,
    backgroundColor: (isDark ? "#4a2e1b" : "#ffdbc8"),
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 999,
  },
  fastBadgeText: { fontSize: 9, fontWeight: "800", color: "#753400" },
  timeCardDisabled: {
    width: "23%",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(246, 243, 237, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  timeTextDisabled: { fontSize: 16, fontWeight: "700", color: (isDark ? "#a1a1aa" : "#584235") },
  priceTextDisabled: { fontSize: 11, color: (isDark ? "#a1a1aa" : "#584235"), marginTop: 2 },
  timeCardSoldOut: {
    width: "23%",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(235, 232, 226, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  priceTextSoldOut: {
    fontSize: 10,
    fontWeight: "800",
    color: (isDark ? "#ff897d" : "#ba1a1a"),
    marginTop: 2,
  },

  seatPickerCard: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: (isDark ? "rgba(74, 46, 27, 0.5)" : "rgba(255, 219, 200, 0.5)"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  seatPickerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  seatPickerTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  seatCountBadge: {
    backgroundColor: (isDark ? "#4a2e1b" : "#ffdbc8"),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  seatCountText: { fontSize: 11, fontWeight: "800", color: "#753400" },
  editSeatsBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  editSeatsText: { fontSize: 11, fontWeight: "800", color: (isDark ? "#ffb370" : "#994700") },
  seatTypesScroll: { gap: 8, paddingBottom: 4, marginBottom: 12 },
  seatTypeActive: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  seatTypeTextActive: { fontSize: 12, fontWeight: "800", color: (isDark ? "#1c1c1e" : "#ffffff") },
  seatTypeInactive: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
  },
  seatTypeTextInactive: { fontSize: 12, color: (isDark ? "#ffffff" : "#1c1c18") },
  seatMapArea: {
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  screenCurve: {
    width: "75%",
    maxWidth: 240,
    height: 6,
    backgroundColor: "rgba(224, 192, 175, 0.6)",
    borderRadius: 999,
    marginBottom: 4,
  },
  screenText: {
    fontSize: 10,
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"),
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  seatRows: { width: "100%", alignItems: "center", gap: 10 },
  seatRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  rowLabel: {
    width: 16,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  seatBlock: { flexDirection: "row", alignItems: "center", gap: 6 },
  seatAisle: { width: 16 },
  seatAvailable: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: (isDark ? "#3a3a3c" : "#e5e2dc"),
    alignItems: "center",
    justifyContent: "center",
  },
  seatSelected: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: (isDark ? "#4a2e1b" : "#ffdbc8"),
  },
  seatTaken: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "rgba(49, 49, 45, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  seatLabel: { fontSize: 10, fontWeight: "600", color: "#78716c" },
  seatLabelSelected: { fontSize: 10, fontWeight: "800", color: (isDark ? "#1c1c1e" : "#ffffff") },
  seatLabelTaken: { fontSize: 10, fontWeight: "600", color: "#a8a29e" },
  seatLegend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(235, 232, 226, 0.6)",
    width: "100%",
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 4 },
  legendText: { fontSize: 12, color: (isDark ? "#a1a1aa" : "#584235") },
  seatSummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    padding: 12,
    borderRadius: 8,
  },
  seatSummaryTitle: { fontSize: 13, fontWeight: "800", color: (isDark ? "#ffffff" : "#1c1c18") },
  seatSummarySub: { fontSize: 12, color: (isDark ? "#a1a1aa" : "#584235") },
  seatSummaryTotal: { fontSize: 14, fontWeight: "800", color: (isDark ? "#ffb370" : "#994700") },
  seatSummaryBreakdown: { fontSize: 11, color: (isDark ? "#a1a1aa" : "#584235") },

  bottomCta: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(252, 249, 243, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(224, 192, 175, 0.2)",
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: "column",
    zIndex: 50,
  },
  ctaLeft: { flexDirection: "col" },
  ctaLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#78716c",
    letterSpacing: 1,
  },
  ctaPriceRow: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  ctaPriceValue: {
    fontSize: 24,
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    letterSpacing: -0.5,
  },
  ctaPriceSub: { fontSize: 11, fontWeight: "600", color: "#78716c" },
  snacksBtn: {
    flex: 1,
    height: 48,
    backgroundColor: "#ffeedd",
    borderWidth: 1,
    borderColor: (isDark ? "#4a2e1b" : "#ffdbc8"),
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  snacksBtnText: { fontSize: 14, fontWeight: "800", color: (isDark ? "#ffb370" : "#994700") },
  continueBtn: {
    flex: 1,
    height: 48,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  continueBtnText: {
    fontSize: 14,
    fontWeight: "800",
    color: (isDark ? "#1c1c1e" : "#ffffff"),
    letterSpacing: 0.5,
  },
});
