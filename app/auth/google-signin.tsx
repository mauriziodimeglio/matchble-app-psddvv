
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function GoogleSignInScreen() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Auto-start Google Sign-In flow
    handleGoogleSignIn();
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      // TODO: Implement Google Sign-In with Firebase
      console.log('Starting Google Sign-In...');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to profile type selection
      router.push('/auth/profile-type-selection');
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        Alert.alert(
          'Accesso Annullato',
          'Hai chiuso la finestra di accesso. Vuoi riprovare?',
          [
            { text: 'Annulla', onPress: () => router.back() },
            { text: 'Riprova', onPress: handleGoogleSignIn },
          ]
        );
      } else if (error.code === 'auth/network-request-failed') {
        Alert.alert(
          'Errore di Connessione',
          'Verifica la connessione internet',
          [
            { text: 'Annulla', onPress: () => router.back() },
            { text: 'Riprova', onPress: handleGoogleSignIn },
          ]
        );
      } else {
        Alert.alert(
          'Registrazione Google Fallita',
          'Si è verificato un errore. Riprova o usa email.',
          [
            { text: 'Usa Email', onPress: () => router.push('/auth/email-registration') },
            { text: 'Riprova', onPress: handleGoogleSignIn },
          ]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol
            ios_icon_name="chevron.left"
            android_material_icon_name="arrow_back"
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Accesso Google</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.googleIcon}>
          <Text style={styles.googleIconText}>G</Text>
        </View>
        
        <Text style={styles.title}>Accedi con Google</Text>
        <Text style={styles.subtitle}>
          {loading
            ? 'Apertura finestra di accesso Google...'
            : 'Connessione in corso con Google'}
        </Text>

        {loading && (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        )}

        {!loading && (
          <TouchableOpacity style={styles.retryButton} onPress={handleGoogleSignIn}>
            <Text style={styles.retryButtonText}>Riprova</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Annulla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    paddingBottom: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  googleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
    ...shadows.lg,
  },
  googleIconText: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.card,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 24,
  },
  loader: {
    marginVertical: spacing.xxl,
  },
  retryButton: {
    backgroundColor: '#4285F4',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxxl,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  retryButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
  },
  cancelButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textSecondary,
  },
});
