
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { requestNotificationPermissions } from '@/utils/notificationHelpers';
import * as Haptics from 'expo-haptics';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: { ios: string; android: string };
  enabled: boolean;
}

export default function NotificationsSettingsScreen() {
  const { user, isAuthenticated, isGuest } = useAuth();
  const { favoriteTournaments, favoriteGroups } = useFavorites();
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'match_results',
      title: 'Risultati Partite',
      description: 'Notifiche per i risultati delle partite dei tuoi tornei preferiti',
      icon: { ios: 'sportscourt.fill', android: 'sports_soccer' },
      enabled: true,
    },
    {
      id: 'tournament_updates',
      title: 'Aggiornamenti Tornei',
      description: 'Notifiche per modifiche ai tornei che segui',
      icon: { ios: 'trophy.fill', android: 'emoji_events' },
      enabled: true,
    },
    {
      id: 'tournament_start',
      title: 'Inizio Tornei',
      description: 'Ricevi una notifica quando inizia un torneo che segui',
      icon: { ios: 'calendar.badge.clock', android: 'event_available' },
      enabled: true,
    },
    {
      id: 'group_standings',
      title: 'Classifiche Gironi',
      description: 'Aggiornamenti sulle classifiche dei gironi preferiti',
      icon: { ios: 'chart.bar.fill', android: 'bar_chart' },
      enabled: false,
    },
    {
      id: 'team_invites',
      title: 'Inviti Squadra',
      description: 'Notifiche per inviti a unirsi a una squadra',
      icon: { ios: 'person.2.fill', android: 'group_add' },
      enabled: true,
    },
    {
      id: 'training_reminders',
      title: 'Promemoria Allenamenti',
      description: 'Ricevi promemoria prima degli allenamenti programmati',
      icon: { ios: 'figure.run', android: 'directions_run' },
      enabled: false,
    },
    {
      id: 'result_validation',
      title: 'Validazione Risultati',
      description: 'Richieste di validazione risultati per le tue squadre',
      icon: { ios: 'checkmark.seal.fill', android: 'verified' },
      enabled: true,
    },
    {
      id: 'athlete_requests',
      title: 'Richieste Atleti',
      description: 'Notifiche per richieste di associazione atleti (solo manager)',
      icon: { ios: 'person.badge.plus', android: 'person_add' },
      enabled: user?.role === 'club_manager',
    },
  ]);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const granted = await requestNotificationPermissions();
    setPermissionsGranted(granted);
  };

  const handleToggleSetting = (id: string) => {
    if (!permissionsGranted) {
      Alert.alert(
        'Permessi Richiesti',
        'Per ricevere notifiche, devi abilitare i permessi nelle impostazioni del dispositivo.',
        [
          { text: 'Annulla', style: 'cancel' },
          { 
            text: 'Abilita', 
            onPress: async () => {
              const granted = await requestNotificationPermissions();
              setPermissionsGranted(granted);
            }
          },
        ]
      );
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSettings(settings.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  const handleTestNotification = () => {
    Alert.alert(
      'Test Notifica',
      'Riceverai una notifica di test tra pochi secondi',
      [{ text: 'OK' }]
    );
    // In real app, trigger a test notification
    console.log('Test notification triggered');
  };

  if (!isAuthenticated || isGuest) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifiche</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🔔</Text>
          <Text style={styles.emptyTitle}>Accedi per le Notifiche</Text>
          <Text style={styles.emptyText}>
            Registrati per ricevere notifiche sui risultati, tornei e molto altro
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/auth/register')}
          >
            <Text style={styles.loginButtonText}>Registrati Ora</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifiche</Text>
        <TouchableOpacity onPress={handleTestNotification} style={styles.testButton}>
          <Text style={styles.testButtonText}>Test</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Permission Status */}
        <View style={[
          styles.permissionCard,
          { backgroundColor: permissionsGranted ? '#E8F5E9' : '#FFEBEE' }
        ]}>
          <View style={styles.permissionIcon}>
            <IconSymbol
              ios_icon_name={permissionsGranted ? 'checkmark.circle.fill' : 'exclamationmark.triangle.fill'}
              android_material_icon_name={permissionsGranted ? 'check_circle' : 'warning'}
              size={32}
              color={permissionsGranted ? '#4CAF50' : '#F44336'}
            />
          </View>
          <View style={styles.permissionContent}>
            <Text style={styles.permissionTitle}>
              {permissionsGranted ? 'Notifiche Abilitate' : 'Notifiche Disabilitate'}
            </Text>
            <Text style={styles.permissionDescription}>
              {permissionsGranted 
                ? 'Riceverai notifiche per gli eventi selezionati'
                : 'Abilita i permessi per ricevere notifiche'}
            </Text>
          </View>
          {!permissionsGranted && (
            <TouchableOpacity
              style={styles.enableButton}
              onPress={checkPermissions}
            >
              <Text style={styles.enableButtonText}>Abilita</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Favorites Summary */}
        {(favoriteTournaments.length > 0 || favoriteGroups.length > 0) && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>📊 I Tuoi Preferiti</Text>
            <View style={styles.summaryStats}>
              <View style={styles.summaryStatItem}>
                <Text style={styles.summaryStatValue}>{favoriteTournaments.length}</Text>
                <Text style={styles.summaryStatLabel}>Tornei</Text>
              </View>
              <View style={styles.summaryStatItem}>
                <Text style={styles.summaryStatValue}>{favoriteGroups.length}</Text>
                <Text style={styles.summaryStatLabel}>Gironi</Text>
              </View>
            </View>
            <Text style={styles.summaryDescription}>
              Riceverai notifiche per questi tornei e gironi in base alle tue preferenze
            </Text>
          </View>
        )}

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferenze Notifiche</Text>
          <Text style={styles.sectionDescription}>
            Scegli quali notifiche vuoi ricevere
          </Text>

          <View style={styles.settingsList}>
            {settings.map((setting, index) => (
              <React.Fragment key={index}>
                <View style={styles.settingItem}>
                  <View style={styles.settingIcon}>
                    <IconSymbol
                      ios_icon_name={setting.icon.ios}
                      android_material_icon_name={setting.icon.android}
                      size={24}
                      color={setting.enabled ? colors.primary : colors.textSecondary}
                    />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{setting.title}</Text>
                    <Text style={styles.settingDescription}>{setting.description}</Text>
                  </View>
                  <Switch
                    value={setting.enabled}
                    onValueChange={() => handleToggleSetting(setting.id)}
                    trackColor={{ false: colors.gray300, true: colors.primary + '40' }}
                    thumbColor={setting.enabled ? colors.primary : colors.card}
                  />
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Notification Timing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tempistiche</Text>
          <Text style={styles.sectionDescription}>
            Quando vuoi ricevere le notifiche
          </Text>

          <View style={styles.timingCard}>
            <View style={styles.timingItem}>
              <Text style={styles.timingLabel}>Promemoria Allenamenti</Text>
              <Text style={styles.timingValue}>60 minuti prima</Text>
            </View>
            <View style={styles.timingItem}>
              <Text style={styles.timingLabel}>Inizio Tornei</Text>
              <Text style={styles.timingValue}>Il giorno stesso</Text>
            </View>
            <View style={styles.timingItem}>
              <Text style={styles.timingLabel}>Risultati Partite</Text>
              <Text style={styles.timingValue}>Immediatamente</Text>
            </View>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoEmoji}>💡</Text>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Suggerimento</Text>
            <Text style={styles.infoText}>
              Aggiungi tornei e gironi ai preferiti per ricevere notifiche personalizzate sui risultati e aggiornamenti
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
  testButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary + '20',
  },
  testButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  permissionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  permissionIcon: {
    marginRight: spacing.md,
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  permissionDescription: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  enableButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  enableButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.card,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.md,
  },
  summaryStats: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  summaryStatItem: {
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  summaryStatLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  summaryDescription: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    lineHeight: 18,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  sectionDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  settingsList: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    lineHeight: 16,
  },
  timingCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  timingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  timingLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  timingValue: {
    fontSize: 14,
    fontWeight: '600',
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    ...shadows.md,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.card,
  },
});
