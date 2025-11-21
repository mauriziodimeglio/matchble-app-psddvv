
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

type ProfileType = 'player' | 'organizer' | 'manager' | 'referee' | 'spectator';

interface ProfileOption {
  id: ProfileType;
  title: string;
  description: string;
  icon: string;
  iosIcon: string;
  androidIcon: string;
}

export default function ProfileTypeSelectionScreen() {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(false);

  const profileOptions: ProfileOption[] = [
    {
      id: 'player',
      title: 'Giocatore',
      description: 'Partecipa a tornei e trova compagni di squadra',
      icon: '⚽',
      iosIcon: 'figure.run',
      androidIcon: 'directions_run',
    },
    {
      id: 'organizer',
      title: 'Organizzatore Torneo',
      description: 'Crea e gestisci tornei ufficiali',
      icon: '🏆',
      iosIcon: 'trophy.fill',
      androidIcon: 'emoji_events',
    },
    {
      id: 'manager',
      title: 'Team Manager',
      description: 'Gestisci la tua squadra e i risultati',
      icon: '👔',
      iosIcon: 'person.3.fill',
      androidIcon: 'groups',
    },
    {
      id: 'referee',
      title: 'Arbitro/Giudice',
      description: 'Registra risultati ufficiali delle partite',
      icon: '🎯',
      iosIcon: 'flag.fill',
      androidIcon: 'flag',
    },
    {
      id: 'spectator',
      title: 'Spettatore',
      description: 'Segui tornei e giocatori preferiti',
      icon: '👀',
      iosIcon: 'eye.fill',
      androidIcon: 'visibility',
    },
  ];

  const handleContinue = async () => {
    if (!selectedProfile) {
      Alert.alert('Selezione Richiesta', 'Seleziona un tipo di profilo per continuare');
      return;
    }

    setLoading(true);
    try {
      // TODO: Save profile type to Firestore
      console.log('Selected profile type:', selectedProfile);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to home
      Alert.alert(
        '✅ Registrazione Completata',
        'Benvenuto su Matchble!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)/(home)'),
          },
        ]
      );
    } catch (error) {
      console.error('Profile type save error:', error);
      Alert.alert('Errore', 'Si è verificato un errore. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Salta Selezione',
      'Verrà impostato il profilo Giocatore come predefinito. Potrai modificarlo in seguito.',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Conferma',
          onPress: () => {
            setSelectedProfile('player');
            setTimeout(() => handleContinue(), 100);
          },
        },
      ]
    );
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
        <Text style={styles.headerTitle}>Tipo di Profilo</Text>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Salta</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.emoji}>🎭</Text>
        <Text style={styles.title}>Chi Sei?</Text>
        <Text style={styles.subtitle}>
          Seleziona il tipo di profilo che ti rappresenta meglio
        </Text>

        <View style={styles.profileOptions}>
          {profileOptions.map((option, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={[
                  styles.profileCard,
                  selectedProfile === option.id && styles.profileCardSelected,
                ]}
                onPress={() => setSelectedProfile(option.id)}
                disabled={loading}
              >
                <View style={styles.profileCardHeader}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.profileEmoji}>{option.icon}</Text>
                  </View>
                  {selectedProfile === option.id && (
                    <View style={styles.checkmarkContainer}>
                      <IconSymbol
                        ios_icon_name="checkmark.circle.fill"
                        android_material_icon_name="check_circle"
                        size={28}
                        color={colors.primary}
                      />
                    </View>
                  )}
                </View>
                <Text style={styles.profileTitle}>{option.title}</Text>
                <Text style={styles.profileDescription}>{option.description}</Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            (!selectedProfile || loading) && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedProfile || loading}
        >
          <Text style={styles.continueButtonText}>
            {loading ? 'Completamento in corso...' : 'Completa Registrazione'}
          </Text>
          {!loading && (
            <IconSymbol
              ios_icon_name="arrow.right"
              android_material_icon_name="arrow_forward"
              size={20}
              color={colors.card}
            />
          )}
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <IconSymbol
            ios_icon_name="info.circle.fill"
            android_material_icon_name="info"
            size={24}
            color={colors.secondary}
          />
          <Text style={styles.infoText}>
            Potrai modificare il tuo tipo di profilo in qualsiasi momento dalle impostazioni
          </Text>
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
  skipButton: {
    padding: spacing.sm,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
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
    marginBottom: spacing.xxl,
    lineHeight: 24,
  },
  profileOptions: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    borderWidth: 3,
    borderColor: colors.gray300,
    ...shadows.md,
  },
  profileCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '08',
  },
  profileCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileEmoji: {
    fontSize: 32,
  },
  checkmarkContainer: {
    marginTop: -4,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  profileDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: '#E3F2FD',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
});
