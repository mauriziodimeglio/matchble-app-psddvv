
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>⚽</Text>
          <Text style={styles.appName}>Matchble</Text>
          <Text style={styles.motto}>Il social di chi gioca</Text>
        </View>

        {/* Registration Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.title}>Inizia Ora</Text>
          <Text style={styles.subtitle}>
            Scegli come vuoi registrarti
          </Text>

          {/* Email/Password Registration */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/auth/email-registration')}
          >
            <IconSymbol
              ios_icon_name="envelope.fill"
              android_material_icon_name="email"
              size={24}
              color={colors.card}
            />
            <Text style={styles.primaryButtonText}>Registrati con Email</Text>
          </TouchableOpacity>

          {/* Google Sign-In */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => router.push('/auth/google-signin')}
          >
            <View style={styles.googleIcon}>
              <Text style={styles.googleIconText}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Continua con Google</Text>
          </TouchableOpacity>

          {/* Apple Sign-In */}
          <TouchableOpacity
            style={styles.appleButton}
            onPress={() => router.push('/auth/apple-signin')}
          >
            <IconSymbol
              ios_icon_name="apple.logo"
              android_material_icon_name="apple"
              size={24}
              color={colors.card}
            />
            <Text style={styles.appleButtonText}>Continua con Apple</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>oppure</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Login Link */}
          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginLinkText}>
              Hai già un account? <Text style={styles.loginLinkBold}>Accedi</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Terms and Privacy */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Continuando accetti i nostri{' '}
          <Text style={styles.footerLink}>Termini di Servizio</Text> e la{' '}
          <Text style={styles.footerLink}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxxl * 2,
  },
  logoText: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  appName: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: spacing.xs,
    letterSpacing: -1,
  },
  motto: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  optionsContainer: {
    gap: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    ...shadows.md,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
  },
  googleButton: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    borderWidth: 2,
    borderColor: colors.gray300,
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIconText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
  googleButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  appleButton: {
    backgroundColor: colors.text,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    ...shadows.md,
  },
  appleButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray300,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginHorizontal: spacing.lg,
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  loginLinkBold: {
    fontWeight: '800',
    color: colors.primary,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    fontWeight: '700',
    color: colors.secondary,
    textDecorationLine: 'underline',
  },
});
