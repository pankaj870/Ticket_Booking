import { useColorScheme } from 'react-native';
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const COUNTRY_CODES = [
  { label: "🇺🇸 +1", value: "+1" },
  { label: "🇯🇵 +81", value: "+81" },
  { label: "🇬🇧 +44", value: "+44" },
  { label: "🇩🇪 +49", value: "+49" },
];

export default function SignupScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex@cinemalover.com");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("US +1");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [password, setPassword] = useState("CozyMovieNights2025!");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState("");

  const handleSignup = () => {
    setError("");
    if (!fullName || !email || !mobile || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!agreeTerms) {
      setError("Please agree to the terms to continue.");
      return;
    }
    router.push("/signup-step-2");
  };

  const calculatePasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length > 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthScore = calculatePasswordStrength(password);
  let strengthLabel = "Weak";
  let activeBars = 0;
  let strengthColor = "#8c7263";
  let iconName = "info" as any;

  if (password.length > 0) {
    if (strengthScore <= 1) {
      strengthLabel = "Weak";
      activeBars = 1;
      strengthColor = "#ba1a1a";
      iconName = "error-outline";
    } else if (strengthScore <= 3) {
      strengthLabel = "Fair";
      activeBars = 2;
      strengthColor = "#ff7a00";
      iconName = "shield";
    } else {
      strengthLabel = "Strong";
      activeBars = 3;
      strengthColor = "#994700";
      iconName = "check-circle";
    }
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <SafeAreaView edges={["top"]} style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.8}
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <MaterialIcons name="arrow-back" size={24} color={isDark ? "#ffffff" : "#1c1c18"} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={styles.profileWrapper}>
            <View style={styles.profileInner}>
              <MaterialIcons name="person" size={18} color={isDark ? "#1c1c1e" : "#ffffff"} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: Math.max(insets.bottom, 32) },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress Header */}
          <View style={styles.progressContainer}>
            <View style={styles.progressRow}>
              <Text style={styles.stepText}>STEP 1 OF 2</Text>
              <Text style={styles.stepDesc}>Profile Details</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={styles.progressBarFill} />
            </View>
            <View style={styles.titleSection}>
              <Text style={styles.pageTitle}>Create Account</Text>
              <Text style={styles.pageSubtitle}>Enter your details to get started with Cinevo.</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Full Name</Text>
                <Text style={styles.labelHint}>As on ID</Text>
              </View>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="badge"
                  size={20}
                  color={isDark ? "#a1a1aa" : "#584235"}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Alex Morgan"
                  placeholderTextColor="#8c7263"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Email Address</Text>
                <Text style={styles.labelHint}>Ticket confirmations</Text>
              </View>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="mail"
                  size={20}
                  color={isDark ? "#a1a1aa" : "#584235"}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="alex@cinemalover.com"
                  placeholderTextColor="#8c7263"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Mobile Number */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Mobile Number</Text>
                <Text style={styles.labelHint}>For fast SMS QR tickets</Text>
              </View>
              <View style={styles.mobileRow}>
                <TouchableOpacity 
                  style={styles.countryPicker}
                  activeOpacity={0.8}
                  onPress={() => setShowCountryPicker(true)}
                >
                  <Text style={styles.countryCode}>{countryCode}</Text>
                  <MaterialIcons name="expand-more" size={18} color={isDark ? "#a1a1aa" : "#584235"} />
                </TouchableOpacity>
                <View style={[styles.inputWrapper, { flex: 1 }]}>
                  <MaterialIcons
                    name="sms"
                    size={20}
                    color={isDark ? "#a1a1aa" : "#584235"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="(555) 019-2834"
                    placeholderTextColor="#8c7263"
                    value={mobile}
                    onChangeText={setMobile}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Create Password</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="lock"
                  size={20}
                  color={isDark ? "#a1a1aa" : "#584235"}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="At least 8 characters"
                  placeholderTextColor="#8c7263"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity activeOpacity={0.8}
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility-off" : "visibility"}
                    size={20}
                    color={isDark ? "#a1a1aa" : "#584235"}
                  />
                </TouchableOpacity>
              </View>

              {/* Strength Meter */}
              <View style={styles.strengthCard}>
                <View style={styles.strengthHeader}>
                  <Text style={styles.strengthLabel}>Password Security:</Text>
                  <View style={styles.strengthStatus}>
                    {password.length > 0 && (
                      <MaterialIcons
                        name={iconName}
                        size={14}
                        color={strengthColor}
                      />
                    )}
                    <Text
                      style={[
                        styles.strengthText,
                        {
                          color:
                            password.length > 0 ? strengthColor : "#8c7263",
                        },
                      ]}
                    >
                      {password.length > 0 ? strengthLabel : "Enter password"}
                    </Text>
                  </View>
                </View>
                <View style={styles.strengthBars}>
                  <View
                    style={[
                      styles.barBase,
                      activeBars >= 1 && { backgroundColor: '#ff7a00' },
                    ]}
                  />
                  <View
                    style={[
                      styles.barBase,
                      activeBars >= 2 && { backgroundColor: '#ff7a00' },
                    ]}
                  />
                  <View
                    style={[
                      styles.barBase,
                      activeBars >= 3 && { backgroundColor: '#ff7a00' },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* Error Message */}
            {error ? (
              <View style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={16} color={isDark ? "#ff897d" : "#ba1a1a"} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Checkboxes */}
            <View style={styles.checkboxGroup}>
              <TouchableOpacity activeOpacity={0.8}
                style={styles.checkboxRow}
                onPress={() => setAgreeTerms(!agreeTerms)}
              >
                <View
                  style={[
                    styles.checkbox,
                    agreeTerms && styles.checkboxChecked,
                  ]}
                >
                  {agreeTerms && (
                    <MaterialIcons name="check" size={14} color={isDark ? "#1c1c1e" : "#ffffff"} />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>
                  I agree to the{" "}
                  <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Submit */}
            <View style={styles.submitSection}>
              <TouchableOpacity activeOpacity={0.8} 
                style={[styles.submitBtn, (!fullName || !email || !mobile || !password || !agreeTerms) && styles.submitBtnDisabled]} 
                onPress={handleSignup}
              >
                <Text style={styles.submitBtnText}>Continue to Step 2</Text>
                <MaterialIcons name="arrow-forward" size={20} color={isDark ? "#1c1c1e" : "#ffffff"} />
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footerSection}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity activeOpacity={0.8}
                onPress={() => router.push("/login")}
                style={styles.signInLink}
              >
                <Text style={styles.signInText}>Sign In</Text>
                <MaterialIcons
                  name="arrow-forward"
                  size={16}
                  color={isDark ? "#ffb370" : "#994700"}
                  style={{ marginLeft: 4 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCountryPicker(false)}
        >
          <View style={styles.modalContent}>
            {COUNTRY_CODES.map((item) => (
              <TouchableOpacity activeOpacity={0.8}
                key={item.value}
                style={styles.modalOption}
                onPress={() => {
                  setCountryCode(item.label);
                  setShowCountryPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    countryCode === item.label && styles.modalOptionTextActive,
                  ]}
                >
                  {item.label}
                </Text>
                {countryCode === item.label && (
                  <MaterialIcons name="check" size={18} color={isDark ? "#ffb370" : "#994700"} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
    borderBottomColor: "rgba(0,0,0,0.04)",
    zIndex: 50,
  },
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  profileWrapper: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: (isDark ? "#ffb370" : "#994700"),
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingBottom: 32,
    flexGrow: 1,
  },
  // Progress Header
  progressContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 24,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  stepText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  stepDesc: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  progressBarBg: {
    width: "100%",
    height: 6,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    borderRadius: 3,
    marginBottom: 24,
    overflow: "hidden",
  },
  progressBarFill: {
    width: "50%",
    height: "100%",
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    borderRadius: 3,
  },
  titleSection: {},
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  pageSubtitle: {
    fontSize: 15,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  // Form Container
  formContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  inputGroup: {
    gap: 4,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    paddingHorizontal: 4,
  },
  labelHint: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 999,
    height: 52,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 15,
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  mobileRow: {
    flexDirection: "row",
    gap: 8,
  },
  countryPicker: {
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  countryCode: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  eyeBtn: {
    padding: 8,
  },
  // Strength Meter
  strengthCard: {
    marginTop: 8,
    backgroundColor: (isDark ? "#1c1c1e" : "#f6f3ed"),
    padding: 12,
    borderRadius: 16,
  },
  strengthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  strengthLabel: {
    fontSize: 13,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  strengthStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  strengthText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  strengthBars: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  barBase: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: (isDark ? "#3a3a3c" : "#e5e2dc"), // surface-variant (inactive state)
  },
  // Checkboxes
  checkboxGroup: {
    gap: 12,
    paddingTop: 8,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 13,
    color: (isDark ? "#ffffff" : "#1c1c18"),
    lineHeight: 20,
  },
  linkText: {
    color: (isDark ? "#ffb370" : "#994700"),
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  // Submit
  submitSection: {
    paddingTop: 16,
  },
  submitBtn: {
    height: 52,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  submitBtnText: {
    color: (isDark ? "#1c1c1e" : "#ffffff"),
    fontSize: 14,
    fontWeight: "700",
  },
  submitBtnDisabled: {
    backgroundColor: (isDark ? "rgba(255, 140, 26, 0.5)" : "rgba(255, 122, 0, 0.5)"),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: (isDark ? '#410002' : '#ffdad6'),
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  errorText: {
    color: (isDark ? '#ffb4ab' : '#93000a'),
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  // Footer
  footerSection: {
    paddingTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 15,
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  signInLink: {
    flexDirection: "row",
    alignItems: "center",
  },
  signInText: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  securityBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(235, 232, 226, 0.5)",
    borderRadius: 999,
    alignSelf: "center",
  },
  securityBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#a1a1aa" : "#584235"),
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 24,
    width: "100%",
    maxWidth: 320,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  modalOptionText: {
    fontSize: 16,
    color: (isDark ? "#ffffff" : "#1c1c18"),
  },
  modalOptionTextActive: {
    fontWeight: "700",
    color: (isDark ? "#ffb370" : "#994700"),
  },
});
