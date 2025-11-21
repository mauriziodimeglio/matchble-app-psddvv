
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { mockTournaments, sportIcons } from '@/data/mockData';
import { StandingsTable } from '@/components/StandingsTable';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import * as Haptics from 'expo-haptics';

type TabType = 'standings' | 'matches' | 'teams' | 'info';

export default function TournamentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isAuthenticated, isGuest } = useAuth();
  const { isTournamentFavorite, toggleTournamentFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState<TabType>('standings');

  const tournament = mockTournaments.find(t => t.id === id);

  if (!tournament) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Torneo non trovato</Text>
      </View>
    );
  }

  const sportData = sportIcons[tournament.sport];
  const isFavorite = isTournamentFavorite(tournament.id);

  const handleToggleFavorite = () => {
    if (!isAuthenticated || isGuest) {
      router.push('/auth/register');
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleTournamentFavorite(tournament.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return colors.live;
      case 'upcoming': return colors.scheduled;
      case 'finished': return colors.finished;
      default: return colors.textSecondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ongoing': return 'In Corso';
      case 'upcoming': return 'Prossimo';
      case 'finished': return 'Concluso';
      default: return status;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'standings':
        return <StandingsTable tournamentId={tournament.id} />;
      case 'matches':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoonText}>Calendario partite in arrivo</Text>
          </View>
        );
      case 'teams':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoonText}>Lista squadre in arrivo</Text>
          </View>
        );
      case 'info':
        return (
          <View style={styles.tabContent}>
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>📍 Luogo</Text>
              <Text style={styles.infoValue}>{tournament.location.venue}</Text>
              <Text style={styles.infoSubvalue}>{tournament.location.city}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>📅 Date</Text>
              <Text style={styles.infoValue}>
                Dal {formatDate(tournament.dates.start)}
              </Text>
              <Text style={styles.infoSubvalue}>
                Al {formatDate(tournament.dates.end)}
              </Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>👥 Squadre</Text>
              <Text style={styles.infoValue}>
                {tournament.registeredTeams} / {tournament.maxTeams} iscritte
              </Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>🔓 Visibilità</Text>
              <Text style={styles.infoValue}>
                {tournament.isPublic ? 'Pubblico' : 'Privato'}
              </Text>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol ios_icon_name="chevron.left" android_material_icon_name="arrow_back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{tournament.name}</Text>
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <IconSymbol
            ios_icon_name={isFavorite ? "heart.fill" : "heart"}
            android_material_icon_name={isFavorite ? "favorite" : "favorite_border"}
            size={24}
            color={isFavorite ? colors.live : colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.hero, { backgroundColor: `${sportData.color}20` }]}>
        <Text style={styles.heroEmoji}>{sportData.emoji}</Text>
        <Text style={styles.heroTitle}>{tournament.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(tournament.status) }]}>
          <Text style={styles.statusText}>{getStatusLabel(tournament.status)}</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'standings' && styles.tabActive]}
          onPress={() => setActiveTab('standings')}
        >
          <Text style={styles.tabEmoji}>📊</Text>
          <Text style={[styles.tabText, activeTab === 'standings' && styles.tabTextActive]}>
            Classifica
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'matches' && styles.tabActive]}
          onPress={() => setActiveTab('matches')}
        >
          <Text style={styles.tabEmoji}>{sportData.emoji}</Text>
          <Text style={[styles.tabText, activeTab === 'matches' && styles.tabTextActive]}>
            Partite
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'teams' && styles.tabActive]}
          onPress={() => setActiveTab('teams')}
        >
          <Text style={styles.tabEmoji}>👥</Text>
          <Text style={[styles.tabText, activeTab === 'teams' && styles.tabTextActive]}>
            Squadre
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'info' && styles.tabActive]}
          onPress={() => setActiveTab('info')}
        >
          <Text style={styles.tabEmoji}>ℹ️</Text>
          <Text style={[styles.tabText, activeTab === 'info' && styles.tabTextActive]}>
            Info
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderTabContent()}
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
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginHorizontal: spacing.md,
  },
  favoriteButton: {
    padding: spacing.sm,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.card,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabEmoji: {
    fontSize: 20,
    marginBottom: spacing.xs,
  },
  tabText: {
    fontSize: 11,
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
    paddingBottom: 100,
  },
  tabContent: {
    padding: spacing.lg,
  },
  comingSoonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: spacing.xxl,
  },
  infoSection: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  infoSubvalue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
