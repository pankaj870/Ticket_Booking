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
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    if (!email) {
      setError("Please enter your email or username.");
      return;
    }
    if (!email.includes("@") && email.length < 3) {
      setError("Please enter a valid email or username.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    
    // Proceed if validation passes
    router.replace('/(tabs)');
  };

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
          <Text style={styles.headerTitle}>Sign In</Text>
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
          {/* Top Utility Quick Action */}
          <View style={styles.helpContainer}>
            <TouchableOpacity activeOpacity={0.8} style={styles.helpBtn}>
              <MaterialIcons name="help" size={16} color={isDark ? "#94a3b8" : "#525e7f"} />
              <Text style={styles.helpText}>Need help?</Text>
            </TouchableOpacity>
          </View>

          {/* Warm Header Area */}
          <View style={styles.mascotArea}>
            <Text style={styles.welcomeTitle}>Welcome Back!</Text>
            <Text style={styles.welcomeSubtitle}>
              Sign in to access your tickets and account.
            </Text>
          </View>

          {/* Form Container Card */}
          <View style={styles.formCard}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email or Username</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="alternate-email"
                  size={20}
                  color={isDark ? "#94a3b8" : "#525e7f"}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="alex.morgan@example.com"
                  placeholderTextColor="#8c7263"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="lock"
                  size={20}
                  color={isDark ? "#94a3b8" : "#525e7f"}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
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
                    color={isDark ? "#94a3b8" : "#525e7f"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Error Message */}
            {error ? (
              <View style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={16} color={isDark ? "#ff897d" : "#ba1a1a"} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Options Row */}
            <View style={styles.optionsRow}>
              <TouchableOpacity activeOpacity={0.8}
                style={styles.rememberRow}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && (
                    <MaterialIcons name="check" size={14} color={isDark ? "#1c1c1e" : "#ffffff"} />
                  )}
                </View>
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Primary CTA */}
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={[styles.submitBtn, (!email || !password) && styles.submitBtnDisabled]} 
              onPress={handleLogin}
            >
              <Text style={styles.submitBtnText}>Sign In to Cinevo</Text>
              <MaterialIcons name="arrow-forward" size={20} color={isDark ? "#1c1c1e" : "#ffffff"} />
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerWrap}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Logins */}
          <View style={styles.socialRow}>
            <TouchableOpacity activeOpacity={0.8} style={styles.socialBtn}>
              <Ionicons name="logo-apple" size={20} color={isDark ? "#ffffff" : "#1c1c18"} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.socialBtn}>
              <Ionicons name="logo-google" size={20} color={isDark ? "#ffffff" : "#1c1c18"} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.socialBtnBiometric}>
              <MaterialIcons name="fingerprint" size={24} color={isDark ? "#ffb370" : "#994700"} />
            </TouchableOpacity>
          </View>

          {/* Sign Up Callout */}
          <View style={styles.signUpArea}>
            <Text style={styles.signUpText}>Don't have an account yet? </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.push("/signup")}>
              <Text style={styles.signUpLink}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 16,
    flexGrow: 1,
  },
  helpContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  helpBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
  },
  helpText: {
    fontSize: 13,
    color: (isDark ? "#94a3b8" : "#525e7f"),
  },
  mascotArea: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: (isDark ? "#94a3b8" : "#525e7f"),
    textAlign: "center",
    maxWidth: 280,
  },
  formCard: {
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 32,
    padding: 20,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    gap: 4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#ffffff" : "#1c1c18"),
    paddingHorizontal: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    borderRadius: 999,
    height: 52,
    paddingHorizontal: 16,
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
  eyeBtn: {
    padding: 8,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingTop: 2,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: (isDark ? "#2c2c2e" : "#f0eee8"),
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
  },
  rememberText: {
    fontSize: 13,
    color: (isDark ? "#94a3b8" : "#525e7f"),
  },
  forgotText: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#ffb370" : "#994700"),
  },
  submitBtn: {
    height: 52,
    backgroundColor: (isDark ? "#ff8c1a" : "#ff7a00"),
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  submitBtnText: {
    color: (isDark ? "#1c1c1e" : "#ffffff"),
    fontSize: 16,
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
  dividerWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
    position: "relative",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: (isDark ? "#3a3a3c" : "#e5e2dc"),
  },
  dividerText: {
    position: "absolute",
    backgroundColor: (isDark ? "#121212" : "#fcf9f3"),
    paddingHorizontal: 16,
    fontSize: 11,
    fontWeight: "800",
    color: (isDark ? "#94a3b8" : "#525e7f"),
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    height: 48,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  socialBtnBiometric: {
    flex: 1,
    height: 48,
    backgroundColor: (isDark ? "#1c1c1e" : "#ffffff"),
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  signUpArea: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  signUpText: {
    fontSize: 15,
    color: (isDark ? "#94a3b8" : "#525e7f"),
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: "700",
    color: (isDark ? "#ffb370" : "#994700"),
  },
});
