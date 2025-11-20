
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';

export default function GuestAccessScreen() {
  const { setGuestMode } = useAuth();

  const handleGuestAccess = () => {
    setGuestMode();
    Alert.alert(
      '✅ Accesso Effettuato',
      'Stai navigando come ospite. Potrai visualizzare risultati e inserire partite.',
      [
        {
          text: 'OK',
          onPress: () => router.replace('/(tabs)/(home)')
        }
      ]
    );
  };

  const guestFeatures = [
    {
      icon: '👀',
      title: 'Visualizza Risultati',
      description: 'Accedi a tutti i risultati e classifiche dei tornei'
    },
    {
      icon: '⚽',
      title: 'Inserisci Partite',
      description: 'Pubblica risultati di partite amichevoli'
    },
    {
      icon: '📸',
      title: 'Aggiungi Foto',
      description: 'Carica foto delle partite'
    },
    {
      icon: '💬',
      title: 'Commenti',
      description: 'Aggiungi note e commenti alle partite'
    },
  ];

  const registeredFeatures = [
    {
      icon: '👤',
      title: 'Profilo Personale',
      description: 'Crea il tuo profilo atleta con statistiche'
    },
    {
      icon: '⭐',
      title: 'Preferenze Tornei',
      description: 'Segui i tuoi tornei preferiti e ricevi notifiche'
    },
    {
      icon: '📹',
      title: 'Video Live',
      description: 'Trasmetti partite in diretta'
    },
    {
      icon: '💬',
      title: 'Messaggistica',
      description: 'Chatta con altri atleti'
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Accedi</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.emoji}>👋</Text>
        <Text style={styles.title}>Accedi come Ospite</Text>
        <Text style={styles.subtitle}>
          Inizia subito a visualizzare risultati e inserire partite senza registrazione
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Cosa Puoi Fare Come Ospite</Text>
          <View style={styles.featuresGrid}>
            {guestFeatures.map((feature, index) => (
              <React.Fragment key={index}>
                <View style={styles.featureCard}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.guestButton} onPress={handleGuestAccess}>
          <Text style={styles.guestButtonText}>Accedi Senza Registrazione</Text>
          <IconSymbol
            ios_icon_name="arrow.right.circle.fill"
            android_material_icon_name="arrow_circle_right"
            size={24}
            color={colors.card}
          />
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>oppure</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Funzionalità Aggiuntive con Registrazione</Text>
          <View style={styles.featuresGrid}>
            {registeredFeatures.map((feature, index) => (
              <React.Fragment key={index}>
                <View style={styles.featureCard}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/auth/register')}
        >
          <Text style={styles.registerButtonText}>Registrati Ora</Text>
          <IconSymbol
            ios_icon_name="person.badge.plus.fill"
            android_material_icon_name="person_add"
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoEmoji}>💡</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Nota Importante</Text>
            <Text style={styles.infoText}>
              Come ospite puoi iniziare subito, ma per accedere a tutte le funzionalità e salvare le tue preferenze, ti consigliamo di registrarti.
            </Text>
          </View>
        </View>
      </ScrollView>
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
  },
  contentContainer: {
    padding: spacing.xl,
    paddingBottom: 100,
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: spacing.lg,
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
    lineHeight: 24,
    marginBottom: spacing.xxl,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  guestButtonText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.card,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
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
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  infoEmoji: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
