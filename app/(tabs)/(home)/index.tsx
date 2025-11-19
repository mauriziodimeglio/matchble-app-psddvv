
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Sport } from '@/types';
import { mockMatches } from '@/data/mockData';
import SportFilter from '@/components/SportFilter';
import MatchCard from '@/components/MatchCard';
import { IconSymbol } from '@/components/IconSymbol';

const SPORT_CONFIGS = {
  calcio: {
    name: 'Calcio',
    emoji: '⚽',
    gradient: ['#00C853', '#00E676'],
    icon: 'soccerball',
    androidIcon: 'sports_soccer',
  },
  basket: {
    name: 'Basket',
    emoji: '🏀',
    gradient: ['#FF6D00', '#FF9100'],
    icon: 'basketball.fill',
    androidIcon: 'sports_basketball',
  },
  volley: {
    name: 'Volley',
    emoji: '🏐',
    gradient: ['#2979FF', '#448AFF'],
    icon: 'volleyball.fill',
    androidIcon: 'sports_volleyball',
  },
  padel: {
    name: 'Padel',
    emoji: '🎾',
    gradient: ['#D500F9', '#E040FB'],
    icon: 'tennisball.fill',
    androidIcon: 'sports_tennis',
  },
};

export default function HomeScreen() {
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const filteredMatches = selectedSport
    ? mockMatches.filter(match => match.sport === selectedSport)
    : mockMatches;

  const liveMatches = filteredMatches.filter(match => match.status === 'live');
  const otherMatches = filteredMatches.filter(match => match.status !== 'live');

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroGradient}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Matchble</Text>
          <Text style={styles.heroSubtitle}>Per chi gioca</Text>
          <Text style={styles.heroDescription}>
            Risultati in tempo reale, tornei ufficiali e classifiche
          </Text>
        </View>
      </LinearGradient>
    </View>
  );

  const renderSportQuickSelect = () => (
    <View style={styles.quickSelectSection}>
      <Text style={styles.quickSelectTitle}>Scegli il tuo sport</Text>
      <View style={styles.sportGrid}>
        {(Object.keys(SPORT_CONFIGS) as Sport[]).map((sport) => {
          const config = SPORT_CONFIGS[sport];
          const isSelected = selectedSport === sport;
          
          return (
            <TouchableOpacity
              key={sport}
              style={[styles.sportCard, isSelected && styles.sportCardSelected]}
              onPress={() => setSelectedSport(isSelected ? null : sport)}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={config.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sportCardGradient}
              >
                <View style={styles.sportCardContent}>
                  <Text style={styles.sportEmoji}>{config.emoji}</Text>
                  <Text style={styles.sportName}>{config.name}</Text>
                  {isSelected && (
                    <View style={styles.selectedBadge}>
                      <IconSymbol
                        ios_icon_name="checkmark.circle.fill"
                        android_material_icon_name="check_circle"
                        size={24}
                        color="#FFFFFF"
                      />
                    </View>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderStatsBar = () => {
    const totalMatches = filteredMatches.length;
    const liveCount = liveMatches.length;
    const finishedCount = filteredMatches.filter(m => m.status === 'finished').length;

    return (
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalMatches}</Text>
          <Text style={styles.statLabel}>Partite</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.live }]}>{liveCount}</Text>
          <Text style={styles.statLabel}>Live</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{finishedCount}</Text>
          <Text style={styles.statLabel}>Concluse</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {renderHeroSection()}
        {renderSportQuickSelect()}
        {renderStatsBar()}

        {liveMatches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.sectionTitle}>LIVE ORA</Text>
              </View>
            </View>
            {liveMatches.map((match, index) => (
              <React.Fragment key={index}>
                <MatchCard match={match} isLarge={true} />
              </React.Fragment>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {liveMatches.length > 0 ? '📋 Altri Risultati' : '📋 Risultati'}
          </Text>
          <View style={styles.grid}>
            {otherMatches.map((match, index) => (
              <React.Fragment key={index}>
                <View style={styles.gridItem}>
                  <MatchCard match={match} />
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        {filteredMatches.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🏆</Text>
            <Text style={styles.emptyText}>
              Nessun risultato per questo sport
            </Text>
            <Text style={styles.emptySubtext}>
              Prova a selezionare un altro sport o torna più tardi
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 48,
    paddingBottom: 120,
  },
  heroSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 4,
  },
  heroGradient: {
    padding: 32,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20,
  },
  quickSelectSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  quickSelectTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  sportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  sportCard: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  sportCardSelected: {
    transform: [{ scale: 0.98 }],
  },
  sportCardGradient: {
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  sportCardContent: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    position: 'relative',
  },
  sportEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  sportName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.live,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
