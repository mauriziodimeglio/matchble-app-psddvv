
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { colors, spacing, borderRadius, shadows } from '@/styles/commonStyles';
import { Sport, Match, MatchStatus } from '@/types';
import { mockMatches } from '@/data/mockData';
import { SportFilter } from '@/components/SportFilter';
import { MatchCard } from '@/components/MatchCard';
import { IconSymbol } from '@/components/IconSymbol';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeScreen() {
  const { isGuest, user } = useAuth();
  const [selectedSport, setSelectedSport] = useState<Sport | 'all'>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [showUserTypes, setShowUserTypes] = useState(isGuest);

  const filteredMatches = mockMatches.filter(
    (match) => selectedSport === 'all' || match.sport === selectedSport
  );

  const liveMatches = filteredMatches.filter((m) => m.status === 'live');
  const recentMatches = filteredMatches.filter((m) => m.status === 'finished');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const userTypes = [
    {
      id: 'guest',
      emoji: '👀',
      title: 'Ospite',
      description: 'Visualizza risultati e inserisci partite',
      color: colors.gray500,
      features: ['Visualizza risultati', 'Inserisci partite', 'Aggiungi foto'],
    },
    {
      id: 'regular',
      emoji: '⚽',
      title: 'Registrato',
      description: 'Profilo atleta e tornei personali',
      color: colors.primary,
      features: ['Profilo atleta', 'Video live', 'Messaggi'],
    },
    {
      id: 'delegate',
      emoji: '✅',
      title: 'Delegato',
      description: 'Tornei ufficiali e gestione completa',
      color: colors.calcio,
      features: ['Tornei ufficiali', 'Upload massivo', 'Analytics'],
    },
    {
      id: 'club_manager',
      emoji: '🏢',
      title: 'Manager',
      description: 'Gestione società e squadre',
      color: colors.basket,
      features: ['Gestione società', 'Atleti', 'Planning'],
    },
    {
      id: 'superuser',
      emoji: '👑',
      title: 'Admin',
      description: 'Controllo totale sistema',
      color: colors.gold,
      features: ['Admin panel', 'Approvazioni', 'Sistema'],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Compact Header */}
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
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Compact User Types Section */}
        {showUserTypes && (
          <View style={styles.userTypesSection}>
            <View style={styles.userTypesHeader}>
              <Text style={styles.userTypesTitle}>🎯 Scegli il Tuo Ruolo</Text>
              <TouchableOpacity onPress={() => setShowUserTypes(false)} style={styles.closeButton}>
                <IconSymbol
                  ios_icon_name="xmark.circle.fill"
                  android_material_icon_name="cancel"
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.userTypesScroll}>
              {userTypes.map((type, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    style={[styles.userTypeCard, { borderColor: type.color }]}
                    onPress={() => router.push('/auth/register')}
                  >
                    <Text style={styles.userTypeEmoji}>{type.emoji}</Text>
                    <Text style={styles.userTypeTitle}>{type.title}</Text>
                    <Text style={styles.userTypeDescription} numberOfLines={2}>{type.description}</Text>
                    
                    <View style={styles.userTypeFeatures}>
                      {type.features.slice(0, 3).map((feature, fIndex) => (
                        <React.Fragment key={fIndex}>
                          <View style={styles.featureItem}>
                            <Text style={styles.featureBullet}>•</Text>
                            <Text style={styles.featureText} numberOfLines={1}>{feature}</Text>
                          </View>
                        </React.Fragment>
                      ))}
                    </View>

                    <View style={[styles.userTypeButton, { backgroundColor: type.color }]}>
                      <Text style={styles.userTypeButtonText}>Scopri</Text>
                    </View>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push('/auth/register')}
            >
              <Text style={styles.registerButtonText}>Registrati Ora</Text>
              <IconSymbol
                ios_icon_name="arrow.right.circle.fill"
                android_material_icon_name="arrow_circle_right"
                size={20}
                color={colors.card}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Sport Filter - More Compact */}
        <View style={styles.sportFilterSection}>
          <SportFilter selectedSport={selectedSport} onSelectSport={setSelectedSport} />
        </View>

        {/* Live Matches - Optimized */}
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

        {/* Recent Matches - Denser Layout */}
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

        {/* Quick Links - Compact Grid */}
        <View style={styles.quickLinksSection}>
          <Text style={styles.sectionTitle}>⚡ Accesso Rapido</Text>
          
          <View style={styles.quickLinksGrid}>
            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => router.push('/venue/register')}
            >
              <Text style={styles.quickLinkEmoji}>🏟️</Text>
              <Text style={styles.quickLinkText}>Campo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => router.push('/showcase')}
            >
              <Text style={styles.quickLinkEmoji}>🌟</Text>
              <Text style={styles.quickLinkText}>Atleti</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => router.push('/club/dashboard')}
            >
              <Text style={styles.quickLinkEmoji}>🏢</Text>
              <Text style={styles.quickLinkText}>Società</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickLinkCard}
              onPress={() => router.push('/delegate/dashboard')}
            >
              <Text style={styles.quickLinkEmoji}>✅</Text>
              <Text style={styles.quickLinkText}>Delegato</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Guest Prompt - Compact */}
        {isGuest && (
          <View style={styles.guestPrompt}>
            <Text style={styles.guestPromptEmoji}>🎉</Text>
            <Text style={styles.guestPromptTitle}>Unisciti a Matchble!</Text>
            <Text style={styles.guestPromptText}>
              Registrati per profilo atleta, video live e messaggistica
            </Text>
            <TouchableOpacity
              style={styles.guestPromptButton}
              onPress={() => router.push('/auth/register')}
            >
              <Text style={styles.guestPromptButtonText}>Registrati Gratis</Text>
            </TouchableOpacity>
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
  userTypesSection: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    marginBottom: spacing.xs,
  },
  userTypesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  userTypesTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
  },
  closeButton: {
    padding: spacing.xs,
  },
  userTypesScroll: {
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  userTypeCard: {
    width: 200,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginRight: spacing.md,
    borderWidth: 2,
    ...shadows.sm,
  },
  userTypeEmoji: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  userTypeTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  userTypeDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: spacing.md,
    height: 32,
  },
  userTypeFeatures: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  featureBullet: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.primary,
  },
  featureText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  userTypeButton: {
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },
  userTypeButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.card,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
    ...shadows.md,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.card,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginHorizontal: -spacing.xs,
  },
  matchGridItem: {
    width: '100%',
  },
  quickLinksSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  quickLinkCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.sm,
  },
  quickLinkEmoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  quickLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  guestPrompt: {
    margin: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    ...shadows.lg,
  },
  guestPromptEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  guestPromptTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.card,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  guestPromptText: {
    fontSize: 14,
    color: colors.card,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  guestPromptButton: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  guestPromptButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.primary,
  },
});
