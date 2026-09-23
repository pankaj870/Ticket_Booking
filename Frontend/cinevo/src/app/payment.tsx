import { useColorScheme } from 'react-native';
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type PaymentMethod = "apple-pay" | "google-pay" | "credit-card" | "klarna";

export default function PaymentScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentTotal = 54.5;

  const handleCheckout = () => {
    if (isProcessing || isSuccess) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/checkout");
      }, 1000);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8}
            onPress={() => router.back()}
            style={styles.iconBtn}
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={24} color={isDark ? "#ffffff" : "#1c1c18"} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Review & Pay
          </Text>
          <View style={{ width: 44 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Simple Order Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Neo Tokyo 2099 - IMAX 3D</Text>
            <Text style={styles.summaryValue}>$36.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Cyber Duo Delight (Food)</Text>
            <Text style={styles.summaryValue}>$16.50</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Booking Fee</Text>
            <Text style={styles.summaryValue}>$2.00</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total Due</Text>
            <Text style={styles.totalValue}>${currentTotal.toFixed(2)}</Text>
          </View>
        </View>

        {/* Simplified Payment Options */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.paymentOption,
              paymentMethod === "credit-card" && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod("credit-card")}
          >
            <View style={styles.paymentOptionLeft}>
              <View style={styles.paymentOptionIconWrap}>
                <MaterialIcons name="credit-card" size={24} color={isDark ? "#a1a1aa" : "#584235"} />
              </View>
              <View>
                <Text style={styles.paymentOptionName}>Credit Card</Text>
                <Text style={styles.paymentOptionDesc}>•••• 8821</Text>
              </View>
            </View>
            <View
              style={
                paymentMethod === "credit-card"
                  ? styles.radioSelected
                  : styles.radioUnselected
              }
            >
              {paymentMethod === "credit-card" ? (
                <MaterialIcons name="check" size={16} color={isDark ? "#1c1c1e" : "#ffffff"} />
              ) : (
                <View style={styles.radioDot} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.paymentOption,
              paymentMethod === "apple-pay" && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod("apple-pay")}
          >
            <View style={styles.paymentOptionLeft}>
              <View style={[styles.paymentOptionIconWrap, { backgroundColor: "#31312d" }]}>
                <MaterialIcons name="wallet" size={24} color={isDark ? "#1c1c1e" : "#ffffff"} />
              </View>
              <View>
                <Text style={styles.paymentOptionName}>Apple Pay</Text>
                <Text style={styles.paymentOptionDesc}>Instant Checkout</Text>
              </View>
            </View>
            <View
              style={
                paymentMethod === "apple-pay"
                  ? styles.radioSelected
                  : styles.radioUnselected
              }
            >
              {paymentMethod === "apple-pay" ? (
                <MaterialIcons name="check" size={16} color={isDark ? "#1c1c1e" : "#ffffff"} />
              ) : (
                <View style={styles.radioDot} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.paymentOption,
              paymentMethod === "google-pay" && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod("google-pay")}
          >
            <View style={styles.paymentOptionLeft}>
              <View style={[styles.paymentOptionIconWrap, { backgroundColor: "#eef4ff" }]}>
                <MaterialIcons name="g-mobiledata" size={32} color="#4285F4" />
              </View>
              <View>
                <Text style={styles.paymentOptionName}>Google Pay</Text>
                <Text style={styles.paymentOptionDesc}>Instant Checkout</Text>
              </View>
            </View>
            <View
              style={
                paymentMethod === "google-pay"
                  ? styles.radioSelected
                  : styles.radioUnselected
              }
            >
              {paymentMethod === "google-pay" ? (
                <MaterialIcons name="check" size={16} color={isDark ? "#1c1c1e" : "#ffffff"} />
              ) : (
                <View style={styles.radioDot} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Checkout Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <TouchableOpacity
          style={[styles.payBtn, isSuccess && styles.payBtnSuccess]}
          activeOpacity={0.8}
          onPress={handleCheckout}
          disabled={isProcessing || isSuccess}
        >
          {isProcessing ? (
            <>
              <MaterialIcons name="hourglass-empty" size={22} color={isDark ? "#1c1c1e" : "#ffffff"} />
              <Text style={styles.payBtnText}>Processing Payment...</Text>
            </>
          ) : isSuccess ? (
            <>
              <MaterialIcons name="check-circle" size={22} color={isDark ? "#1c1c1e" : "#ffffff"} />
              <Text style={styles.payBtnText}>Payment Successful!</Text>
            </>
          ) : (
            <>
              <MaterialIcons name="lock" size={24} color={isDark ? "#1c1c1e" : "#ffffff"} />
              <Text style={styles.payBtnText}>Pay ${currentTotal.toFixed(2)}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: (isDark ? "#121212" : "#fcf9f3"),
  },
  safeHeader: {
    backgroundColor: "rgba(252, 249, 243, 0.96)",
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
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 20,
  },
  card: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 24,
    padding: 20,
    shadowColor: "#2e3a59",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 15,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(224, 192, 175, 0.3)",
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "800",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  paymentOptionSelected: {
    borderColor: "#ff9b61",
    backgroundColor: "#fff9f5",
  },
  paymentOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  paymentOptionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: (isDark ? "#2c2c2e" : "#ebe8e2"),
    alignItems: "center",
    justifyContent: "center",
  },
  paymentOptionName: {
    fontSize: 16,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    marginBottom: 2,
  },
  paymentOptionDesc: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  radioSelected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    alignItems: "center",
    justifyContent: "center",
  },
  radioUnselected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#dcdad4",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: (isDark ? "#121212" : "#fcf9f3"),
    borderTopWidth: 1,
    borderTopColor: "rgba(46,58,89,0.06)",
  },
  payBtn: {
    width: "100%",
    minHeight: 56,
    borderRadius: 28,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
    shadowColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 6,
  },
  payBtnSuccess: {
    backgroundColor: (isDark ? "#94a3b8" : "#525e7f"),
    shadowColor: "#000",
  },
  payBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: (isDark ? "#1c1c1e" : "#ffffff"),
    textAlign: "center",
  },
});
