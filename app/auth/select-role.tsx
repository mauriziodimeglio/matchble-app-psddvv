
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react';
import { router } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { UserRole } from '@/types';

export default function SelectRoleScreen() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles = [
    {
      id: 'regular' as UserRole,
      emoji: '👤',
      title: 'Utente Regular',
      description: 'Visualizza risultati, crea tornei non ufficiali e pubblica risultati partite',
      features: [
        'Visualizza risultati e classifiche',
        'Crea tornei non ufficiali',
        'Pubblica risultati partite',
        'Traccia le tue statistiche',
      ],
      color: colors.primary,
    },
    {
      id: 'verified' as UserRole,
      emoji: '✅',
      title: 'Delegato Verificato',
      description: 'Crea tornei ufficiali per organizzatori affiliati e gestisci risultati',
      features: [
        'Tutti i permessi di Utente Regular',
        'Crea tornei ufficiali',
        'Gestisce risultati ufficiali',
        'Caricamento massivo dati',
        'Affiliazioni multiple',
      ],
      color: colors.calcio,
      requiresVerification: true,
    },
    {
      id: 'club_manager' as UserRole,
      emoji: '🏢',
      title: 'Responsabile Società',
      description: 'Gestisci una società sportiva con squadre e atleti',
      features: [
        'Gestisce società sportiva',
        'Crea e gestisce squadre',
        'Iscrive squadre ai tornei',
        'Gestisce atleti e staff',
        'Visualizza statistiche società',
      ],
      color: colors.secondary,
      requiresVerification: true,
    },
  ];

  const handleContinue = () => {
    if (!selectedRole) {
      Alert.alert('Seleziona un ruolo', 'Scegli il tipo di account che desideri creare');
      return;
    }

    if (selectedRole === 'regular') {
      Alert.alert(
        '✅ Account Creato',
        'Il tuo account Regular è stato creato con successo!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)/(home)')
          }
        ]
      );
    } else if (selectedRole === 'verified') {
      router.push('/profile/request-verification');
    } else if (selectedRole === 'club_manager') {
      Alert.alert(
        'Richiesta Verifica',
        'Per diventare Responsabile Società devi completare la procedura di verifica',
        [
          {
            text: 'Continua',
            onPress: () => router.push('/profile/request-verification')
          },
          {
            text: 'Annulla',
            style: 'cancel'
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seleziona Ruolo</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.welcomeEmoji}>🎯</Text>
        <Text style={styles.title}>Che tipo di utente sei?</Text>
        <Text style={styles.subtitle}>
          Scegli il ruolo più adatto alle tue esigenze. Potrai sempre richiedere una verifica in seguito.
        </Text>

        <View style={styles.rolesContainer}>
          {roles.map((role, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity
                style={[
                  styles.roleCard,
                  selectedRole === role.id && styles.roleCardSelected,
                  { borderColor: role.color }
                ]}
                onPress={() => setSelectedRole(role.id)}
                activeOpacity={0.7}
              >
                <View style={styles.roleHeader}>
                  <Text style={styles.roleEmoji}>{role.emoji}</Text>
                  {selectedRole === role.id && (
                    <View style={[styles.checkBadge, { backgroundColor: role.color }]}>
                      <IconSymbol
                        ios_icon_name="checkmark"
                        android_material_icon_name="check"
                        size={16}
                        color="#FFFFFF"
                      />
                    </View>
                  )}
                </View>
                
                <Text style={styles.roleTitle}>{role.title}</Text>
                <Text style={styles.roleDescription}>{role.description}</Text>
                
                <View style={styles.featuresContainer}>
                  {role.features.map((feature, featureIndex) => (
                    <React.Fragment key={featureIndex}>
                      <View style={styles.featureItem}>
                        <IconSymbol
                          ios_icon_name="checkmark.circle.fill"
                          android_material_icon_name="check_circle"
                          size={18}
                          color={role.color}
                        />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    </React.Fragment>
                  ))}
                </View>

                {role.requiresVerification && (
                  <View style={styles.verificationBadge}>
                    <IconSymbol
                      ios_icon_name="shield.checkered"
                      android_material_icon_name="verified_user"
                      size={16}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.verificationText}>Richiede verifica</Text>
                  </View>
                )}
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedRole && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedRole}
        >
          <Text style={styles.continueButtonText}>Continua</Text>
          <IconSymbol
            ios_icon_name="arrow.right"
            android_material_icon_name="arrow_forward"
            size={20}
            color={colors.card}
          />
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={styles.infoEmoji}>💡</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Suggerimento</Text>
            <Text style={styles.infoText}>
              Se non sei sicuro, inizia come Utente Regular. Potrai sempre richiedere la verifica in seguito dal tuo profilo.
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
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
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
    padding: 24,
    paddingBottom: 100,
  },
  welcomeEmoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  rolesContainer: {
    gap: 16,
    marginBottom: 24,
  },
  roleCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
    borderColor: '#E0E0E0',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  roleCardSelected: {
    borderWidth: 3,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  roleEmoji: {
    fontSize: 48,
  },
  checkBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  featuresContainer: {
    gap: 8,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  verificationText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.card,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  infoEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
