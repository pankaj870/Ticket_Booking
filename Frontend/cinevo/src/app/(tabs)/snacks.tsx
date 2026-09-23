import { useColorScheme } from 'react-native';
import React, { useState } from "react";
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
import { useRouter } from "expo-router";

const CATEGORIES = [
  "Combos & Deals",
  "Popcorn & Warm Bites",
  "Cold Drinks",
  "Sweet Treats",
];

const ALACARTE = [
  {
    id: "1",
    name: "Truffle Butter Popcorn",
    desc: "White truffle infused real butter & sea salt",
    price: 8.5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBO1eTGU0I8uTsjGpASVeTh2LnJpBVXlwDnpkCWuCW3-strZkzqE0obTa-R3-rGrFQSZujtSMiYx9msl9ukF3iBhMteWkZFjgsV7R37g3yq_voG6sMGEb6HXoPWxwMhwGcftWUIF_PNMhx9jOZpycRv8OkrLgcEFRloX6mkBYcjS2qw2n2XBLSK6EPJMonN1aXdc6z9h9Tv0bTHR3EGHYYJj8omukVuMSus7cyax4h1xS6tFCkAalfd",
    tag: "",
  },
  {
    id: "2",
    name: "Neon Berry Sparkler",
    desc: "Chilled bubbly berry fruit soda",
    price: 6.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBuj0rqrS_C0LmUMafds3_9ohmQVeRSzNCQOL8ceCR75j1yAD2PuYEgEbxdjB6KFOr7jnirOO-1U6WR6DKAoiGCgqBYJ4LVX_j30akCFOjj81TFUkebr2bua3ZWeBu1a6xYnPu7Wn6Z6iZp0dHhLVa9CJIoyzGe3X0OsnSqYnyzIeaC7XAtRWK-L2f-h-GJzMCv9Kte0roaGPfi75gYgpNQoYkaRfTzS-jIaScIvkqsGDbvpgOlChTk",
    tag: "Cold",
  },
  {
    id: "3",
    name: "Cheese & Jalapeño Nachos",
    desc: "Warm slow-simmered melted cheddar",
    price: 9.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATpqiNYq5Y8QNYlnoXgvr8D-sn-IgbcvG9ubc8Uos2oyE677Pu_p8yVb8FyRzVuqglQB106RazuN4cPHhXiewfcefJTBCzRX4VEQiDCrNZC3mQ6zk753pV3JK1FtoXSCXVzJR5fISlI5Vm1rePqXKHNdQGOoRR6l7_FOu2ZRczr7RBOlkJzD9YEK0-pH8S2R4mO-Q0UpracLOXPn4qh9b6KLVP33OecJm_3k8woXumnLYIC4_hSd8W",
    tag: "",
  },
  {
    id: "4",
    name: "Cinnamon Churro Bites",
    desc: "Warm spiced dipping chocolate",
    price: 7.5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDN2uoPVCdMAOyL-eLlmLARzhUNYuu_E8J5vgXEzEF9M8Ww0CXebMnE59Qd8PssxAiuH401as6ksEv5Xa3p0wtHM3qBu9UalYkeQQ5Mv0cnsXTpdRM6buBmNjieM7b3J88e33f2Ir7WjUPuDa4Wc6Xmjb1p1XeNspRcJMCEHYpgf5wWGQC7URS-uG71TJ9RM8vuTDrZ9sn69nFl9DmF85TTv2bvA34IbQW4fRjC2rhj2u1KMByvx5_A",
    tag: "",
  },
];

export default function SnacksScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [comboQty, setComboQty] = useState(1);

  // State for a la carte items
  const [cart, setCart] = useState<Record<string, number>>({ "2": 1 }); // Pre-select Neon Berry

  const getCartTotal = () => {
    let total = comboQty * 18.0;
    Object.keys(cart).forEach((id) => {
      const item = ALACARTE.find((i) => i.id === id);
      if (item) total += item.price * cart[id];
    });
    return total;
  };

  const getCartCount = () => {
    let count = comboQty;
    Object.keys(cart).forEach((id) => {
      count += cart[id];
    });
    return count;
  };

  const updateCart = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView edges={["top"]} style={styles.safeHeader}>
        <View style={styles.header}>
          <View style={styles.headerBrand}>
            <View style={styles.brandIconWrap}>
              <MaterialIcons name="theaters" size={22} color={isDark ? "#ffb370" : "#994700"} />
            </View>
            <Text style={styles.brandTitle}>Food And Concessions Snacks</Text>
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
        contentContainerStyle={[styles.content, { paddingBottom: 180 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* In-Seat Delivery Banner */}
        <View style={styles.deliverySection}>
          <View style={styles.deliveryCard}>
            <View style={styles.deliveryIconWrap}>
              <MaterialIcons name="room-service" size={22} color={isDark ? "#1c1c1e" : "#ffffff"} />
            </View>
            <View style={styles.deliveryInfo}>
              <View style={styles.deliveryTitleRow}>
                <Text style={styles.deliveryTitle}>IN-SEAT DELIVERY</Text>
                <View style={styles.pulseDot} />
              </View>
              <Text style={styles.deliverySub}>
                Delivered directly to{" "}
                <Text style={styles.deliverySubBold}>Row F, Seats 6 & 7</Text>{" "}
                before showtime.
              </Text>
              <Text style={styles.deliveryTime}>
                Estimated handoff in 12-15 mins • Freshly prepared
              </Text>
            </View>
          </View>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity activeOpacity={0.8}
              key={cat}
              style={[
                styles.catPill,
                activeCategory === cat && styles.catPillActive,
              ]}
              onPress={() => setActiveCategory(cat)}
            >
              {cat === "Combos & Deals" && (
                <MaterialIcons
                  name="stars"
                  size={18}
                  color={activeCategory === cat ? "#ffffff" : "#584235"}
                  style={{ marginRight: 4 }}
                />
              )}
              <Text
                style={[
                  styles.catPillText,
                  activeCategory === cat && styles.catPillTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Spotlight Deal */}
        <View style={styles.spotlightSection}>
          <View style={styles.spotlightCard}>
            <View style={styles.spotlightTags}>
              <View style={styles.spotlightBadge}>
                <MaterialIcons
                  name="local-fire-department"
                  size={16}
                  color={isDark ? "#ffb370" : "#994700"}
                />
                <Text style={styles.spotlightBadgeText}>
                  BEST VALUE • SAVE $6.00
                </Text>
              </View>
              <View style={styles.spotlightServes}>
                <MaterialIcons name="groups" size={16} color={isDark ? "#ffb370" : "#994700"} />
                <Text style={styles.spotlightServesText}>Serves 2</Text>
              </View>
            </View>

            <View style={styles.spotlightImgWrap}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAESzEffLkUJWa_0aA-0cnnPZFDGE6g6Qpv7FY9_js3DuQmcNr-fFFZ8PIsHOxmlgjMmp4oDPR1U_0hZvZL6_SN_25pRQCbp_kxt28aGGrakwr6uG0xQaby8aeUaoYclR8P0fTvc6SdSoPBRoEevv3dAy_Y_3tNrrbpdPcG7c8rOc7Z3jsv4q_5a48gHMkK2qR-jOv4KG5HTPwE2VT9qOuxrf1J1V-7BSvjL5Rx-Ig3_BcrvfFwZzAx",
                }}
                style={styles.spotlightImg}
              />
              <View style={styles.freshBadge}>
                <MaterialIcons name="timer" size={14} color={isDark ? "#1c1c1e" : "#ffffff"} />
                <Text style={styles.freshBadgeText}>Freshly Popped</Text>
              </View>
            </View>

            <View style={styles.spotlightInfo}>
              <Text style={styles.spotlightTitle}>Cyber Duo Delight</Text>
              <Text style={styles.spotlightDesc}>
                Large salted caramel popcorn + 2 fountain drinks + warm loaded
                cheese nachos.
              </Text>

              <View style={styles.spotlightBottom}>
                <View style={styles.priceRow}>
                  <Text style={styles.spotlightPrice}>$18.00</Text>
                  <Text style={styles.spotlightOldPrice}>$24.00</Text>
                </View>

                {comboQty === 0 ? (
                  <TouchableOpacity activeOpacity={0.8}
                    style={styles.addBtn}
                    onPress={() => setComboQty(1)}
                  >
                    <MaterialIcons name="add" size={16} color={isDark ? "#ffb370" : "#994700"} />
                    <Text style={styles.addBtnText}>Add</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.stepper}>
                    <TouchableOpacity activeOpacity={0.8}
                      style={styles.stepperBtn}
                      onPress={() => setComboQty(Math.max(0, comboQty - 1))}
                    >
                      <MaterialIcons name="remove" size={18} color={isDark ? "#ffb370" : "#994700"} />
                    </TouchableOpacity>
                    <Text style={styles.stepperVal}>{comboQty}</Text>
                    <TouchableOpacity activeOpacity={0.8}
                      style={styles.stepperBtnActive}
                      onPress={() => setComboQty(comboQty + 1)}
                    >
                      <MaterialIcons name="add" size={18} color={isDark ? "#1c1c1e" : "#ffffff"} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* A La Carte Header */}
        <View style={styles.alacarteHeader}>
          <View>
            <Text style={styles.alacarteTitle}>Artisan A La Carte</Text>
            <Text style={styles.alacarteSub}>
              Carefully crafted for cozy viewing
            </Text>
          </View>
          <View style={styles.itemsCountBadge}>
            <Text style={styles.itemsCountText}>4 items</Text>
          </View>
        </View>

        {/* A La Carte List */}
        <View style={styles.alacarteList}>
          {ALACARTE.map((item) => {
            const qty = cart[item.id] || 0;
            return (
              <View
                key={item.id}
                style={[styles.itemCard, qty > 0 && styles.itemCardActive]}
              >
                <View style={styles.itemImgWrap}>
                  <Image source={{ uri: item.image }} style={styles.itemImg} />
                  {!!item.tag && (
                    <View style={styles.itemTag}>
                      <Text style={styles.itemTagText}>{item.tag}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemDesc} numberOfLines={1}>
                    {item.desc}
                  </Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.itemAction}>
                  {qty === 0 ? (
                    <TouchableOpacity activeOpacity={0.8}
                      style={styles.addBtn}
                      onPress={() => updateCart(item.id, 1)}
                    >
                      <MaterialIcons name="add" size={16} color={isDark ? "#ffb370" : "#994700"} />
                      <Text style={styles.addBtnText}>Add</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.stepperSmall}>
                      <TouchableOpacity activeOpacity={0.8}
                        style={styles.stepperBtnSmall}
                        onPress={() => updateCart(item.id, -1)}
                      >
                        <MaterialIcons
                          name="remove"
                          size={16}
                          color={isDark ? "#ffb370" : "#994700"}
                        />
                      </TouchableOpacity>
                      <Text style={styles.stepperValSmall}>{qty}</Text>
                      <TouchableOpacity activeOpacity={0.8}
                        style={styles.stepperBtnActiveSmall}
                        onPress={() => updateCart(item.id, 1)}
                      >
                        <MaterialIcons name="add" size={16} color={isDark ? "#1c1c1e" : "#ffffff"} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Dietary Note */}
        <View style={styles.dietaryNote}>
          <MaterialIcons name="eco" size={18} color={isDark ? "#ffb370" : "#994700"} />
          <Text style={styles.dietaryText}>
            All popcorn popped in non-GMO coconut oil. Compostable packaging
            provided for in-seat dining comfort.
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Checkout Bar */}
      {getCartCount() > 0 && (
        <View
          style={[
            styles.checkoutBar,
            { bottom: (Platform.OS === "ios" ? 64 : 70) + insets.bottom },
          ]}
        >
          <View style={styles.checkoutInner}>
            <View style={styles.checkoutLeft}>
              <View style={styles.checkoutItemsRow}>
                <View style={styles.dotPing} />
                <Text style={styles.checkoutItemsText}>
                  {getCartCount()} Item{getCartCount() !== 1 ? "s" : ""}{" "}
                  Selected
                </Text>
              </View>
              <View style={styles.checkoutTotalRow}>
                <Text style={styles.checkoutTotalPrice}>
                  ${getCartTotal().toFixed(2)}
                </Text>
                <Text style={styles.checkoutTotalLabel}>total</Text>
              </View>
            </View>
            <View style={styles.checkoutRight}>
              <TouchableOpacity activeOpacity={0.8}
                style={styles.skipBtn}
                onPress={() => router.push("/payment")}
              >
                <Text style={styles.skipBtnText}>Skip Food</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}
                style={styles.checkoutBtn}
                onPress={() => router.push("/payment")}
              >
                <Text style={styles.checkoutBtnText}>Checkout</Text>
                <MaterialIcons name="arrow-forward" size={18} color={isDark ? "#1c1c1e" : "#ffffff"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    borderBottomColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    zIndex: 50,
  },
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  brandIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? "#4a2e1b" : "#ffdbc8"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    letterSpacing: -0.5,
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
  content: {},
  // Delivery Section
  deliverySection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  deliveryCard: {
    backgroundColor: (isDark ? "rgba(74, 46, 27, 0.4)" : "rgba(255, 219, 200, 0.4)"),
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    gap: 12,
  },
  deliveryIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    alignItems: "center",
    justifyContent: "center",
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  deliveryTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
    letterSpacing: 0.5,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: (isDark ? "#ffb370" : "#994700"),
  },
  deliverySub: {
    fontSize: 15,
    fontWeight: "600",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    marginTop: 2,
  },
  deliverySubBold: {
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  deliveryTime: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
    marginTop: 4,
  },
  // Categories
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 16,
    paddingTop: 8,
  },
  catPill: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  catPillActive: {
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    shadowColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    shadowOpacity: 0.25,
  },
  catPillText: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  catPillTextActive: {
    color: (isDark ? "#1c1c1e" : "#ffffff"),
  },
  // Spotlight
  spotlightSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  spotlightCard: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  spotlightTags: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  spotlightBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: (isDark ? "#4a2e1b" : "#ffdbc8"),
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  spotlightBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
    letterSpacing: 0.5,
  },
  spotlightServes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  spotlightServesText: {
    fontSize: 12,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  spotlightImgWrap: {
    width: "100%",
    height: 190,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    marginBottom: 16,
  },
  spotlightImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  freshBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(49, 49, 45, 0.85)",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  freshBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#f3f0ea",
  },
  spotlightTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    letterSpacing: -0.5,
  },
  spotlightDesc: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
    lineHeight: 20,
    marginTop: 4,
  },
  spotlightBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(235, 232, 226, 0.6)",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  spotlightPrice: {
    fontSize: 24,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
    letterSpacing: -0.5,
  },
  spotlightOldPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#a1a1aa" : "#584235"),
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: (isDark ? "rgba(74, 46, 27, 0.5)" : "rgba(255, 219, 200, 0.5)"),
    borderRadius: 999,
    padding: 4,
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stepperVal: {
    width: 32,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  stepperBtnActive: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    alignItems: "center",
    justifyContent: "center",
  },
  // A La Carte
  alacarteHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  alacarteTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  alacarteSub: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  itemsCountBadge: {
    backgroundColor: (isDark ? "rgba(74, 46, 27, 0.6)" : "rgba(255, 219, 200, 0.6)"),
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  itemsCountText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  alacarteList: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 16,
  },
  itemCard: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
    borderWidth: 2,
    borderColor: "transparent",
  },
  itemCardActive: {
    borderColor: "rgba(255, 122, 0, 0.2)",
  },
  itemImgWrap: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    overflow: "hidden",
  },
  itemImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  itemTag: {
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: "rgba(157, 147, 255, 0.9)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
  },
  itemTagText: {
    fontSize: 10,
    fontWeight: "800",
    color: (isDark ? "#1c1c1e" : "#ffffff"),
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  itemDesc: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
    marginTop: 4,
  },
  itemAction: {
    shrink: 0,
  },
  addBtn: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: (isDark ? "#2c2c2e" : "#ebe8e2"),
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  stepperSmall: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: (isDark ? "rgba(74, 46, 27, 0.5)" : "rgba(255, 219, 200, 0.5)"),
    borderRadius: 999,
    padding: 2,
  },
  stepperBtnSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    alignItems: "center",
    justifyContent: "center",
  },
  stepperValSmall: {
    width: 24,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  stepperBtnActiveSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    alignItems: "center",
    justifyContent: "center",
  },
  // Dietary
  dietaryNote: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dietaryText: {
    flex: 1,
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
    lineHeight: 18,
  },
  // Checkout Bar
  checkoutBar: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: (isDark ? "rgba(28, 28, 30, 0.95)" : "rgba(255, 255, 255, 0.95)"),
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    shadowColor: "#2e3a59",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 10,
    zIndex: 60,
  },
  checkoutInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 480,
    alignSelf: "center",
    width: "100%",
  },
  checkoutLeft: {
    flexDirection: "column",
  },
  checkoutItemsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dotPing: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: (isDark ? "#ffb370" : "#994700"),
  },
  checkoutItemsText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"),
    textTransform: "uppercase",
  },
  checkoutTotalRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginTop: 2,
  },
  checkoutTotalPrice: {
    fontSize: 20,
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  checkoutTotalLabel: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  checkoutRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  skipBtn: {
    height: 48,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  skipBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  checkoutBtn: {
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 4,
  },
  checkoutBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#1c1c1e" : "#ffffff"),
  },
});
