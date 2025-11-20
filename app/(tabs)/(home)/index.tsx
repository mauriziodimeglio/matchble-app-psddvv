
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { Sport, Match } from '@/types';
import { mockMatches } from '@/data/mockData';
import { SportFilter } from '@/components/SportFilter';
import { MatchCard } from '@/components/MatchCard';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const { isGuest, user } = useAuth();
  const [selectedSport, setSelectedSport] = useState<Sport | 'all'>('all');
  const [refreshing, setRefreshing] = useState(false);

  const filteredMatches = mockMatches.filter(
    (match) => selectedSport === 'all' || match.sport === selectedSport
  );

  const liveMatches = filteredMatches.filter((m) => m.status === 'live');
  const recentMatches = filteredMatches.filter((m) => m.status === 'finished');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      {/* Simplified Header */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <Image
            source={require('@/assets/images/final_quest_240x240.png')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.logoText}>Matchble</Text>
            <Text style={styles.logoSubtext}>Per chi gioca</Text>
          </View>
        </View>
        
        {isGuest ? (
          <View style={styles.authButtons}>
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => router.push('/auth/guest-access')}
            >
              <Text style={styles.guestButtonText}>Accedi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push('/auth/register')}
            >
              <Text style={styles.registerButtonText}>Registra</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.push('/showcase')}
            >
              <IconSymbol
                ios_icon_name="person.3.fill"
                android_material_icon_name="groups"
                size={22}
                color={colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.push('/messages')}
            >
              <IconSymbol
                ios_icon_name="message.fill"
                android_material_icon_name="message"
                size={22}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Sport Filter */}
        <View style={styles.sportFilterSection}>
          <SportFilter selectedSport={selectedSport} onSelectSport={setSelectedSport} />
        </View>

        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
              <Text style={styles.sectionTitle}>In Corso</Text>
            </View>

            {liveMatches.map((match, index) => (
              <React.Fragment key={index}>
                <MatchCard match={match} isLarge={index === 0} />
              </React.Fragment>
            ))}
          </View>
        )}

        {/* Recent Matches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📊 Risultati Recenti</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/tournaments')}>
              <Text style={styles.seeAllText}>Tutti</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.matchesGrid}>
            {recentMatches.slice(0, 6).map((match, index) => (
              <React.Fragment key={index}>
                <View style={styles.matchGridItem}>
                  <MatchCard match={match} />
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Guest Welcome Section */}
        {isGuest && (
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeEmoji}>🎯</Text>
            <Text style={styles.welcomeTitle}>Benvenuto su Matchble!</Text>
            <Text style={styles.welcomeText}>
              La piattaforma per gestire tornei, risultati e società sportive
            </Text>

            <View style={styles.featuresGrid}>
              <View style={styles.featureCard}>
                <Text style={styles.featureEmoji}>👀</Text>
                <Text style={styles.featureTitle}>Ospite</Text>
                <Text style={styles.featureDescription}>
                  Visualizza risultati e inserisci partite senza registrazione
                </Text>
              </View>

              <View style={styles.featureCard}>
                <Text style={styles.featureEmoji}>⚽</Text>
                <Text style={styles.featureTitle}>Atleta</Text>
                <Text style={styles.featureDescription}>
                  Profilo personale, preferenze tornei e notifiche
                </Text>
              </View>

              <View style={styles.featureCard}>
                <Text style={styles.featureEmoji}>✅</Text>
                <Text style={styles.featureTitle}>Delegato</Text>
                <Text style={styles.featureDescription}>
                  Gestione tornei ufficiali e caricamento massivo
                </Text>
              </View>

              <View style={styles.featureCard}>
                <Text style={styles.featureEmoji}>🏢</Text>
                <Text style={styles.featureTitle}>Manager</Text>
                <Text style={styles.featureDescription}>
                  Gestione completa società, atleti e planning
                </Text>
              </View>
            </View>

            <View style={styles.ctaButtons}>
              <TouchableOpacity
                style={styles.ctaButtonPrimary}
                onPress={() => router.push('/auth/guest-access')}
              >
                <Text style={styles.ctaButtonPrimaryText}>Accedi Senza Registrazione</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.ctaButtonSecondary}
                onPress={() => router.push('/auth/register')}
              >
                <Text style={styles.ctaButtonSecondaryText}>Registrati Ora</Text>
                <IconSymbol
                  ios_icon_name="arrow.right.circle.fill"
                  android_material_icon_name="arrow_circle_right"
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    paddingTop: 56,
    paddingBottom: spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
    ...shadows.sm,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  logoSubtext: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  authButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  guestButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  guestButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  registerButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
  },
  registerButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.card,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerButton: {
    padding: spacing.sm,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  sportFilterSection: {
    backgroundColor: colors.card,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.3,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.live,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.card,
    marginRight: spacing.xs,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.card,
    letterSpacing: 0.5,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  matchesGrid: {
    gap: spacing.md,
  },
  matchGridItem: {
    width: '100%',
  },
  welcomeSection: {
    margin: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    ...shadows.lg,
  },
  welcomeEmoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
    width: '100%',
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  featureTitle: {
    fontSize: 14,
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
  ctaButtons: {
    width: '100%',
    gap: spacing.md,
  },
  ctaButtonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.md,
  },
  ctaButtonPrimaryText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.card,
  },
  ctaButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    gap: spacing.sm,
  },
  ctaButtonSecondaryText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
});
