
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockTournaments } from '@/data/mockData';
import { sportIcons } from '@/data/mockData';

type TabType = 'tournaments' | 'groups' | 'teams';

export default function FavoritesScreen() {
  const { isAuthenticated, isGuest } = useAuth();
  const { 
    favoriteTournaments, 
    favoriteGroups, 
    favoriteTeams,
    toggleTournamentFavorite,
    toggleGroupFavorite,
    toggleTeamFavorite,
  } = useFavorites();
  
  const [activeTab, setActiveTab] = useState<TabType>('tournaments');

  if (!isAuthenticated || isGuest) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Preferiti</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🔒</Text>
          <Text style={styles.emptyTitle}>Accedi per Salvare i Preferiti</Text>
          <Text style={styles.emptyText}>
            Registrati per seguire tornei, gironi e squadre e ricevere notifiche sui risultati
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

  const favoriteTournamentsList = mockTournaments.filter(t => 
    favoriteTournaments.includes(t.id)
  );

  const renderTournaments = () => {
    if (favoriteTournamentsList.length === 0) {
      return (
        <View style={styles.emptySection}>
          <Text style={styles.emptySectionEmoji}>🏆</Text>
          <Text style={styles.emptySectionText}>
            Nessun torneo nei preferiti.{'\n'}
            Aggiungi tornei per seguirli e ricevere notifiche!
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.push('/(tabs)/tournaments')}
          >
            <Text style={styles.browseButtonText}>Esplora Tornei</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.list}>
        {favoriteTournamentsList.map((tournament, index) => {
          const sportData = sportIcons[tournament.sport];
          
          return (
            <React.Fragment key={index}>
              <View style={styles.favoriteCard}>
                <TouchableOpacity
                  style={styles.favoriteContent}
                  onPress={() => router.push(`/tournament-detail?id=${tournament.id}`)}
                >
                  <View style={[styles.sportIcon, { backgroundColor: `${sportData.color}20` }]}>
                    <Text style={styles.sportEmoji}>{sportData.emoji}</Text>
                  </View>
                  
                  <View style={styles.favoriteInfo}>
                    <Text style={styles.favoriteName}>{tournament.name}</Text>
                    <Text style={styles.favoriteLocation}>📍 {tournament.location.city}</Text>
                    <Text style={styles.favoriteStatus}>
                      {tournament.status === 'ongoing' ? '🔴 In Corso' : 
                       tournament.status === 'upcoming' ? '🟡 Prossimo' : '✅ Concluso'}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => {
                    Alert.alert(
                      'Rimuovi dai Preferiti',
                      `Vuoi rimuovere "${tournament.name}" dai preferiti?`,
                      [
                        { text: 'Annulla', style: 'cancel' },
                        { 
                          text: 'Rimuovi', 
                          style: 'destructive',
                          onPress: () => toggleTournamentFavorite(tournament.id)
                        },
                      ]
                    );
                  }}
                >
                  <IconSymbol
                    ios_icon_name="heart.fill"
                    android_material_icon_name="favorite"
                    size={24}
                    color={colors.live}
                  />
                </TouchableOpacity>
              </View>
            </React.Fragment>
          );
        })}
      </View>
    );
  };

  const renderGroups = () => {
    if (favoriteGroups.length === 0) {
      return (
        <View style={styles.emptySection}>
          <Text style={styles.emptySectionEmoji}>📊</Text>
          <Text style={styles.emptySectionText}>
            Nessun girone nei preferiti.{'\n'}
            Segui i gironi per ricevere aggiornamenti sui risultati!
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.list}>
        <Text style={styles.comingSoonText}>Funzionalità in arrivo</Text>
      </View>
    );
  };

  const renderTeams = () => {
    if (favoriteTeams.length === 0) {
      return (
        <View style={styles.emptySection}>
          <Text style={styles.emptySectionEmoji}>⚽</Text>
          <Text style={styles.emptySectionText}>
            Nessuna squadra nei preferiti.{'\n'}
            Segui le squadre per non perdere nessuna partita!
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.list}>
        <Text style={styles.comingSoonText}>Funzionalità in arrivo</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferiti</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tournaments' && styles.tabActive]}
          onPress={() => setActiveTab('tournaments')}
        >
          <Text style={[styles.tabText, activeTab === 'tournaments' && styles.tabTextActive]}>
            🏆 Tornei ({favoriteTournaments.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'groups' && styles.tabActive]}
          onPress={() => setActiveTab('groups')}
        >
          <Text style={[styles.tabText, activeTab === 'groups' && styles.tabTextActive]}>
            📊 Gironi ({favoriteGroups.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'teams' && styles.tabActive]}
          onPress={() => setActiveTab('teams')}
        >
          <Text style={[styles.tabText, activeTab === 'teams' && styles.tabTextActive]}>
            ⚽ Squadre ({favoriteTeams.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {activeTab === 'tournaments' && renderTournaments()}
        {activeTab === 'groups' && renderGroups()}
        {activeTab === 'teams' && renderTeams()}
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: 100,
  },
  list: {
    gap: spacing.md,
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  favoriteContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  sportIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sportEmoji: {
    fontSize: 28,
  },
  favoriteInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  favoriteLocation: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  favoriteStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  removeButton: {
    padding: spacing.sm,
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
  emptySection: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptySectionEmoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptySectionText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  browseButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.card,
  },
  comingSoonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
